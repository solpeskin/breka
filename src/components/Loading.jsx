import React from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';

const Loading = () => {
  const spinValue = new Animated.Value(0);
  const bounceValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    )
  ).start();

  Animated.loop(
    Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(bounceValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ])
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const bounce = bounceValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30] 
  });

  return (
    <View style={styles.loadingContainer}>
      <Animated.View style={{ 
        ...styles.circle, 
        transform: [{ rotate: spin }, { translateY: bounce }] 
      }} />
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 25,
    backgroundColor: '#000',
  },
});
