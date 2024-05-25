import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSignInMutation } from '../services/authService';
import InputForm from '../components/InputForm';
import { setUser } from '../features/user/userSlice';
import { signInSchema } from '../validations/authSchema';
import { insertSession } from '../presistence';

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [firebaseError, setFirebaseError] = useState("");

  const dispatch = useDispatch();

  const [triggerSignIn, result] = useSignInMutation();

  useEffect(() => {
    if (result?.data && result.isSuccess) {
      insertSession({
        email: result.data.email,
        localId: result.data.localId,
        token: result.data.idToken,
      })
      .then((response) => {
        dispatch(
          setUser({
            email: result.data.email,
            idToken: result.data.idToken,
            localId: result.data.localId,
          })
        )
      })
      .catch((err) => {
        console.log(err)
      })
    } else if (result.isError) {
      handleFirebaseError(result.error.data.error.message);
    }
  }, [result])  
  
  const handleFirebaseError = (error) => {
    switch (error) {
      case 'INVALID_PASSWORD':
        setFirebaseError("The password is incorrect.");
        break;
      case 'EMAIL_NOT_FOUND':
        setFirebaseError("The email address is not registered.");
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        setFirebaseError("Incorrect email or password.")
        break;
      default:
        setFirebaseError("An unknown error occurred.");
    }
  };

  const onSubmit = () => {
    setFirebaseError(""); 
    triggerSignIn({ email, password, returnSecureToken: true });
  };

  const onChange = (setState, value) => {
    setErrorMail("");
    setErrorPassword("");
    setFirebaseError("");
    setState(value);
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOG IN</Text>
      <InputForm label={"E-MAIL"} onChange={(value) => onChange(setEmail, value)} error={errorMail} />
      <InputForm label={"PASSWORD"} onChange={(value) => onChange(setPassword, value)} error={errorPassword} isSecure={true} />
      {firebaseError ? <Text style={styles.errorText}>{firebaseError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>SEND</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp} style={styles.signUpLink}>
        <Text style={{ fontWeight: 300, fontSize: 11 }}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 20,
  },
  input: {
    height: 30,
    width: '80%',
    borderWidth: 0,
    borderBottomWidth: 1.5,
    marginBottom: 10,
    fontSize: 11,
    fontWeight: '300',
    paddingHorizontal: 5,
    borderColor: 'black',
  },
  button: {
    backgroundColor: 'black',
    width: '80%',
    paddingVertical: 5,
    marginTop: 50,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 11,
  },
  signUpLink: {
    position: 'absolute',
    bottom: 50,
  },
  errorText: {
    paddintTop: 2,
    fontSize: 10,
    color: 'red',
  }
});

export default LogIn;
