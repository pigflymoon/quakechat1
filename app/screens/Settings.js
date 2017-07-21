import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Linking,
    AppState,
    Picker,
    Platform,
    AsyncStorage,
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import PushNotification from 'react-native-push-notification';

import {bind} from '../utils/utils';


export default class Settings extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: false,

        };

        bind(this)('renderLoadingView', 'handleAppStateChange');
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);

    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange(appState) {
        console.log('called?')

        if (appState === 'background') {
            let date = new Date(Date.now() + (5 * 1000));
            AsyncStorage.getItem("isNotified").then((value) => {
                var isNotified = (value === "true");
                AsyncStorage.getItem("isSilent").then((value) => {
                    var isSilent = (value === "true");
                    if (isNotified) {
                        PushNotification.localNotificationSchedule({
                            message: "My Notification Message",
                            date: date,
                            number: 2,
                            playSound: isSilent,

                        });
                    }
                })

            }).done();

            // if (this.state.isNotified) {
            //
            //
            // }
            PushNotification.setApplicationIconBadgeNumber(0);


        } else if (appState === 'active') {

            PushNotification.setApplicationIconBadgeNumber(0);
        }

    }

    onNotifications = () => {
        console.log('navigation', this.props)
        this.props.navigation.navigate('Notifications', {});
    };

    renderLoadingView() {
        return (
            <ScrollView>
                <Text>Loading...</Text>
            </ScrollView>
        )
    }


    render() {
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }

        return (
            <ScrollView>
                <List>
                    <ListItem
                        leftIcon={{
                            name: 'map-marker',
                            type: 'font-awesome',
                            size: 35,
                        }}
                        title={`Notifications`}
                        onPress={() => this.onNotifications()}

                    />
                </List>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({});