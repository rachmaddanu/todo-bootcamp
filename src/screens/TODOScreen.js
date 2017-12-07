import React from 'react';
import { View, ScrollView, Text, AsyncStorage, Alert, BackHandler } from 'react-native';
import { Header, Button, FormLabel, FormInput, Card } from 'react-native-elements';
import firebase from 'firebase';

import CardSection from './../components/CardSection';

export class TODOScreen extends React.Component {
    state = { phoneNumber: '', add: '', arr: [] }

    async componentDidMount() {
        this.setState({ phoneNumber: await this.props.navigation.state.params.nomer });
        const ref = firebase.database().ref('users/' + this.state.phoneNumber + '/todo/');
        console.log(this.state.phoneNumber);
        ref.on('value', snap => {
            const arrTemp = [];
            snap.forEach(shot => {
                console.log(shot.val());
              arrTemp.push(shot.val());
            });
            this.setState({ arr: arrTemp });
          }); 
          BackHandler.addEventListener('hardwareBackPress', () => {
              this.props.navigation.goBack();
            return false;
           });
        }

    todoDone(index) {
        const ref = firebase.database().ref('users/' + this.state.phoneNumber + '/todo/');
        const temp = this.state.arr;
        temp.splice(index, 1);
        ref.set(temp);
        this.setState({ arr: temp });
        console.log(this.state.arr);
        console.log(temp);
    }

    listTodo() {
        if (this.state.arr.length > 0) {
           return this.state.arr.map((data, i) => {
                return (
                    <CardSection key={i}>
                        <Text style={{ flex: 4, padding: 10 }}>{data.item}</Text>
                        <Button 
                            buttonStyle={{ flex: 1 }}
                            icon={{ name: 'done' }}
                            title='done'
                            onPress={() => this.todoDone(i)} 
                        />
                    </CardSection>
                );
            });
        }
    }

    logOut() {
        firebase.auth().signOut()
        .then(() => {
                AsyncStorage.setItem('token', '');
                AsyncStorage.setItem('phone', '');
                this.props.navigation.goBack();
            }
        )
        .catch(() => {
            Alert.alert('gagal SignOut');
        });
    }

    renderLogic() {
        const angka = (Math.random() * 8999) + 1000; 
        const Id = Math.floor(angka);
        const ref = firebase.database().ref('users/' + this.state.phoneNumber + '/todo/');
        const data = {
            id: Id,
            item: this.state.add,
        };
        const temp = this.state.arr;

        if (data.item.length) {
            temp.push(data);
           ref.set(temp);
           this.setState({ add: '', arr: temp }); 
        } 
    }

    render() {
        
        return (
            <View>
                <Header
                    centerComponent={{ 
                        text: this.state.phoneNumber, 
                        style: { color: '#fff', fontWeight: '600' } 
                    }}
                    rightComponent={ 
                        <Button
                            title='Log Out'
                            onPress={this.logOut.bind(this)}
                        />
                    }
                />
                <FormLabel>ToDo :</FormLabel>
                <FormInput onChangeText={(text) => this.setState({ add: text })} />
                <Button
                    icon={{ name: 'add' }}
                    title='add'
                    onPress={this.renderLogic.bind(this)} 
                />
                <ScrollView>
                    {this.listTodo()}
                </ScrollView>
            </View>
        );
    }
}