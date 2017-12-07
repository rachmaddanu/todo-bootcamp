import React from 'react';
import { View, Text, Alert, AsyncStorage } from 'react-native';
import { Button, Card, SearchBar, Header } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

export class RequestOTPScreen extends React.Component {

    state = { input: '', savedToken: '', savedPhone: '' }

    componentDidMount = async () => {
        const savedtoken = await AsyncStorage.getItem('token');
        const savedphone = await AsyncStorage.getItem('phone');
        this.setState({ savedToken: savedtoken, savedPhone: savedphone });
        console.log(this.state.savedToken);
        if (this.state.savedToken) {
            firebase.auth().signInWithCustomToken(this.state.savedToken)
            .catch(() => {
                this.setState({ savedToken: '', savedPhone: '' });
            });
            this.props.navigation.navigate('TodoScrn', { nomer: this.state.savedPhone });
            Alert.alert('Already SignedIn');
        }
    }

    async renderLogic() {
        const conv = (this.state.input).split('');
        conv[0] = '0';
        conv[1] = '8';
        const phoneNumber = String(conv).replace(/[^\d]/g, '');

        try {
            const response = await axios({
                method: 'POST',
                url: 'https://us-central1-fir-otp-ce2d1.cloudfunctions.net/request_OTP',
                data: { "phone": phoneNumber }
            });
            console.log(response.data)
            Alert.alert(String(response.data.message));
            this.props.navigation.navigate('verifyScrn', { nomer: phoneNumber });
        } catch (error) {
            Alert.alert(String(error));
        }
    }

    render() {
        return (
            <Card>
                <Header
                    centerComponent={{ 
                        text: 'Danu toDo App', 
                        style: { color: '#fff', fontWeight: '600' } 
                    }}
                />
                <Text style={{ padding: 5 }}>Phone Number</Text>
                <SearchBar 
                    onChangeText={(text) => { this.setState({ input: text }); }}
                    placeholder='08xx-xxxx-xxxx'
                    lightTheme 
                />
                <Button
                    icon={{ name: 'search' }}
                    title='Request OTP'
                    onPress={this.renderLogic.bind(this)} 
                />
            </Card>
        );
    }
}