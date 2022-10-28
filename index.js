/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import React from "react";
import GoogleLogin from './src/GoogleLogin';
import {name as appName} from './app.json';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';

const Main = () => {
  
    return (
      <>
              <NavigationContainer>
                <App />
              </NavigationContainer>
      </>
    );
  };
  LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => Main);
