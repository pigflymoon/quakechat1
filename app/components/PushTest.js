import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, AppState, Platform } from 'react-native';

import PushNotification from 'react-native-push-notification';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    picker: {
        width: 100,
    },
});

export default class PushTest extends Component {
    constructor(props) {
        super(props);

        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.state = {
            seconds: 5,
        };
    }

    componentDidMount() {
        PushNotification.configure({
            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                console.log( 'NOTIFICATION:', notification );
            },
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: false,
                badge: true,
                sound: true
            },

        });
        AppState.addEventListener('change', this.handleAppStateChange);

    }


    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange(appState) {
        if (appState === 'background') {
            let date = new Date(Date.now() + (this.state.seconds * 1000));

            if (Platform.OS === 'ios') {
                date = date;
            }

            PushNotification.localNotificationSchedule({
                message: "My Notification Message",
                date,
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Choose your notification time in seconds.
                </Text>
                <Picker
                    style={styles.picker}
                    selectedValue={this.state.seconds}
                    onValueChange={(seconds) => this.setState({ seconds })}
                >
                    <Picker.Item label="5" value={5} />
                    <Picker.Item label="10" value={10} />
                    <Picker.Item label="15" value={15} />
                </Picker>

            </View>
        );
    }
}