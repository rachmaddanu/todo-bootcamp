import React from 'react';
import { TabNavigator } from 'react-navigation';
import firebase from 'firebase';

import { RequestOTPScreen, VerifyOTPScreen, TODOScreen } from './src/screens';

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyCUBupJh4jDHh4QXAja4IaafVRWLVDjrs8',
      authDomain: 'fir-otp-ce2d1.firebaseapp.com',
      databaseURL: 'https://fir-otp-ce2d1.firebaseio.com',
      projectId: 'fir-otp-ce2d1',
      storageBucket: 'fir-otp-ce2d1.appspot.com',
      messagingSenderId: '1058380066274'  
    };
    firebase.initializeApp(config);
  }
  render() {
    const MainNavigator = TabNavigator({
      requestScrn: { screen: RequestOTPScreen },
      verifyScrn: { screen: VerifyOTPScreen },
      TodoScrn: { screen: TODOScreen }
    }, {
      tabBarPosition: 'bottom',
      lazy: true, 
      swipeEnabled: false,
      animationEnabled: false,
      navigationOptions: {
        tabBarVisible: false
      }
    });
    return (
      <MainNavigator />
    );
  }
}