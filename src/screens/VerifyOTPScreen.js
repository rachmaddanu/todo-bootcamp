import React from 'react';
import { View, Text, Alert, AsyncStorage } from 'react-native';
import { Header, SearchBar, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

export class VerifyOTPScreen extends React.Component {

    state = { 
        phoneNumber: '',
        code: '',
        token: ''
     }
     
     componentDidMount = async () => {
         const savedtoken = await AsyncStorage.getItem('token');
         this.setState({ token: savedtoken, code: '' });
         this.setState({ phoneNumber: this.props.navigation.state.params.nomer });
     }

     async loginfirebase() {
        try {
            const response = await axios({
                method: 'POST',
                url: 'https://us-central1-fir-otp-ce2d1.cloudfunctions.net/verify_OTP',
                data: { 
                    "phone": this.state.phoneNumber,
                    "code": this.state.code
                    }
               });
               console.log(this.state.phoneNumber)
               console.log(this.state.code)
               Alert.alert(String(response.data.message));
                AsyncStorage.setItem('token', response.data.token);
                AsyncStorage.setItem('phone', this.state.phoneNumber);
                firebase.auth().signInWithCustomToken(response.data.token)
                .then(() => {
                    console.log('ok');
                });
                this.props.navigation.navigate('TodoScrn', { nomer: this.state.phoneNumber });
        } catch (error) {
            Alert.alert(String(error));
        }
     }

    renderLogic() {
        if (this.state.code === '') {
           return Alert.alert('OTP tidak boleh kosong');
        }

        // this.getToken();      
            this.loginfirebase();     
    }

    render() {
        return (
            <View>
                <Header
                    centerComponent={{ 
                        text: this.state.phoneNumber, 
                        style: { color: '#fff', fontWeight: '600' } 
                    }}
                />
                <Text>OTP</Text>
                <SearchBar 
                    onChangeText={(text) => { this.setState({ code: text }); }}
                    placeholder='xxxx'
                    lightTheme 
                />
                <Button
                    icon={{ name: 'search' }}
                    title='Verify OTP'
                    onPress={this.renderLogic.bind(this)} 
                />
            </View>
        );
    }
}