import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const GoogleLogin = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [ProfileImage, setProfileImage] = useState('');


  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log('UserInfo', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error)
      } else {
        // some other error happened
        console.log(error)
      }
    }
  };

  return (
    <TouchableOpacity 
      style={{
        borderWidth: 0.5,
        height:50,
        width: 250,
        justifyContent:'center', 
        alignItems:'center',
        alignSelf:'center',
        marginTop:100

      }}
      onPress={googleLogin}>
        <Text>Google SignIn</Text>
        
      </TouchableOpacity>
  );
};
export default GoogleLogin;
