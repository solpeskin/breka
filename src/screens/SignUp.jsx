import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../services/authService';
import InputForm from '../components/InputForm';
import { setUser } from '../features/user/userSlice';
import { signupSchema } from '../validations/authSchema';
import { insertSession } from '../presistence';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [firebaseError, setFirebaseError] = useState("");

  const dispatch = useDispatch();

  const [triggerSignUp, result] = useSignUpMutation();

  useEffect(() => {
    if (result.isSuccess) {  
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId
        })
      );
    } else if (result.isError) {
      handleFirebaseError(result.error);
    } 
  }, [result]);

  const handleFirebaseError = (error) => {
    switch (error.data.error.message) {
      case 'EMAIL_EXISTS':
        setFirebaseError("The email address is already in use by another account.");
        break;
      case 'OPERATION_NOT_ALLOWED':
        setFirebaseError("Password sign-in is disabled for this project.");
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        setFirebaseError("We have blocked all requests from this device due to unusual activity. Try again later.");
        break;
      default:
        setFirebaseError("An unknown error occurred.");
    }
  };

  const onSubmit = () => {
    try {
      setFirebaseError(""); 
      const validation = signupSchema.validateSync({ email, password, confirmPassword });
      triggerSignUp({ email, password, returnSecureToken: true });
    } catch (err) {
      console.log("Validation Error:", err.path, err.message);
      switch (err.path) {
        case "email":
          setErrorMail(err.message);
          break;
        case "password":
          setErrorPassword(err.message);
          break;
        case "confirmPassword":
          setErrorConfirmPassword(err.message);
          break;
        default:
          break;
      }
    }
  };

  const onChange = (setState, value) => {
    setErrorMail("");
    setErrorPassword("");
    setErrorConfirmPassword("");
    setFirebaseError("");
    setState(value);
  };

  const handleLogIn = () => {
    navigation.navigate('LogIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN UP</Text>
      <InputForm label={"E-MAIL"} onChange={(value) => onChange(setEmail, value)} error={errorMail} />
      <InputForm label={"PASSWORD"} onChange={(value) => onChange(setPassword, value)} error={errorPassword} isSecure={true} />
      <InputForm label={"CONFIRM PASSWORD"} onChange={(value) => onChange(setConfirmPassword, value)} error={errorConfirmPassword} isSecure={true} />
      {firebaseError ? <Text style={styles.errorText}>{firebaseError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogIn} style={styles.signUpLink}>
        <Text style={{ fontWeight: 300, fontSize: 11 }}>Have an account? Log Up</Text>
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
    backgroundColor: "white"
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
    width: "80%",
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

export default SignUp;