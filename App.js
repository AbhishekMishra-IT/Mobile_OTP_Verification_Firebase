import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

const App = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  function onAuthStateChanged(user) {
    console.log('user', user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
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
      onPress={() => signInWithPhoneNumber('+91 7800766004')}>
        <Text>Phone Number Sign In</Text>
        
      </TouchableOpacity>
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
};
export default App;
