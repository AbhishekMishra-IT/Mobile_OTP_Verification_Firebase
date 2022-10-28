import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';

const PhoneOtp = () => {


    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);

    const [code, setCode] = useState('');

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Handle create account button press
    async function createAccount() {
        try {
            await auth().createUserWithEmailAndPassword('abhishek@ipangram.com', 'ipangram');
            console.log('User account created & signed in!');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }
            console.error(error);
        }
    }

    // Handle the verify phone button press
    async function verifyPhoneNumber(phoneNumber) {
        const confirmation = await auth().verifyPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    }

    // Handle confirm code button press
    async function confirmCode() {
        try {
            const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
            let userData = await auth().currentUser.linkWithCredential(credential);
            setUser(userData.user);
        } catch (error) {
            if (error.code == 'auth/invalid-verification-code') {
                console.log('Invalid code.');
            } else {
                console.log('Account linking error');
            }
        }
    }

    if (initializing) return null;

    if (!user) {
        return <TouchableOpacity 
        style={{
          borderWidth: 0.5,
          height:50,
          width: 250,
          justifyContent:'center', 
          alignItems:'center',
          alignSelf:'center',
          marginTop:100
  
        }}
        onPress={createAccount}>
          <Text>Phone Otp</Text>
          
        </TouchableOpacity>;
    } else if (!user.phoneNumber) {
        if (!confirm) {
            return (
                <Button
                    title="Verify Phone Number"
                    onPress={() => verifyPhoneNumber('+91 7800766004')}
                />
            );
        }
        return (
            <>
                <TextInput value={code} onChangeText={text => setCode(text)} />
                <Button title="Confirm Code" onPress={() => confirmCode()} />
            </>
        );
    } else {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:18}}>
                    Welcome! Abhishek
                    {/* {user.phoneNumber} */}
                </Text>
            </View>
        );
    }
};
export default PhoneOtp;
