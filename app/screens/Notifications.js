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
    Switch,
    AsyncStorage,
} from 'react-native';
// import PushTest from '../components/PushTest';
import PushNotification from 'react-native-push-notification';

import {List, ListItem} from 'react-native-elements';

import colors from '../styles/colors';
import {bind} from '../utils/utils';


export default class Notifications extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isNotified: true,
            isSilent: false,

        };
        this.handleAppStateChange = this.handleAppStateChange.bind(this);

    }


    componentDidMount() {
        AsyncStorage.getItem("isNotified").then((value) => {
            var val = (value === "true");
            this.setState({"isNotified": val});
        }).done();

        AsyncStorage.getItem("isSilent").then((value) => {
            var val = (value === "true");
            this.setState({"isSilent": val});
        }).done();

        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange(appState) {

        if (appState === 'background') {
            let date = new Date(Date.now() + (2 * 1000));
           if(this.state.isNotified){
               PushNotification.localNotificationSchedule({
                   message: "My Notification Message",
                   date: date,
                   number: 0

               });
           }


        }
    }

    toggleNotificationSwitch = (value) => {
        AsyncStorage.setItem("isNotified", value.toString());
        this.setState({"isNotified": value});
        AsyncStorage.getItem("isNotified").then((value) => {
            var val = (value === "true");
            this.setState({"isNotified": val});


        }).done();

    }
    toggleDisturbSwitch = (value) => {
        AsyncStorage.setItem("isSilent", value.toString());
        this.setState({"isSilent": value});

    }

    render() {

        return (
            <ScrollView>
                <List>


                    <ListItem
                        hideChevron
                        title={`Notifications`}
                        switchButton
                        onSwitch={this.toggleNotificationSwitch}
                        switched={this.state.isNotified}

                    />
                    <ListItem
                        hideChevron
                        title={`Do not disturb`}
                        subtitle={'Notification that arrive during 22:00 to 8:00 will be silenced'}
                        subtitleStyle={{marginRight: 10, fontWeight: 'normal'}}
                        switchButton
                        onSwitch={this.toggleDisturbSwitch}
                        switched={this.state.isSilent}

                    />
                </List>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    rightTitleView: {
        // flexDirection: 'row',

        width: 100,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    switch: {
        // marginLeft: 20,
        // marginBottom: 10,
        // alignSelf: 'flex-end',
    }
});