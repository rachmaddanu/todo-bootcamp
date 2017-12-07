import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Header, Button, FormLabel, FormInput, Card } from 'react-native-elements';
import firebase from 'firebase';

export class TODOScreen extends React.Component {
    state = { phoneNumber: '', add: '' }

    componentDidMount() {
        this.setState({ phoneNumber: this.props.navigation.state.params.nomer });
    }

    todoDone() {
        firebase.database().ref('users/' + this.state.phoneNumber + '/todo')
        
                const ref = firebase.database().ref('users/' + this.state.phoneNumber + '/todo');
        
                    ref.on('value', (snapshot) => { 
                        ref.off();
                        const userData = snapshot.val();
                    });
    }

    listTodo() {
        firebase.database().ref('users/' + this.state.phoneNumber + '/todo')

        const ref = firebase.database().ref('users/' + this.state.phoneNumber + '/todo');

            ref.on('value', (snapshot) => { 
                // ref.off(); 
                const userData = snapshot.val();
                if (userData) {
                    userData.map((data, i) => {
                        return (
                            <ScrollView>
                                <Card key={i}>
                                    <Text>data</Text>
                                    <Button
                                        icon={{ name: 'add' }}
                                        title='done'
                                        // onPress={this.todoDone.bind(this)} 
                                    />
                                </Card>
                            </ScrollView>
                        );
                    });
                }
            });

    }

    renderLogic() {
        firebase.database().ref('users/' + this.state.phoneNumber)
        .update({ todo: [this.state.add] });
    }

    render() {
        console.log(this.props.navigation.state.params.nomer);
        return (
            <View>
                <Header
                    centerComponent={{ 
                        text: this.state.phoneNumber, 
                        style: { color: '#fff', fontWeight: '600' } 
                    }}
                />
                <FormLabel>ToDo :</FormLabel>
                <FormInput onChangeText={(text) => this.setState({ add: text })} />
                <Button
                    icon={{ name: 'add' }}
                    title='add'
                    onPress={this.renderLogic.bind(this)} 
                />
                {this.listTodo()}
            </View>
        );
    }
}