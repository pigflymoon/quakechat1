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
import colors from '../styles/colors';
import {bind} from '../utils/utils';
import PushController from '../components/PushController';


export default class Settings extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: false,
            isNotified: true,
            isSilent: true,
        };

        bind(this)('renderLoadingView');
    }


    componentDidMount() {
        // console.log('is notified', this.state.isNotified)

        AsyncStorage.getItem("isNotified").then((value) => {
            // console.log('first is notified', value)

            if (value) {
                var val = (value === "true");
                // console.log('val is ', val)
                this.setState({"isNotified": val});
            }else{
                // console.log('set state to item ')
                AsyncStorage.setItem("isNotified", this.state.isNotified.toString());
            }

        }).done();
        //
        AsyncStorage.getItem("isSilent").then((value) => {
            if (value) {
                var val = (value === "true");
                this.setState({"isSilent": val});
            }

        }).done();

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


    onAbout = () => {
        this.props.navigation.navigate('About', {});
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
                        hideChevron
                        title={`Notifications`}
                        switchOnTintColor={colors.primary1}
                        switchButton
                        onSwitch={this.toggleNotificationSwitch}
                        switched={this.state.isNotified}

                    />
                    <ListItem
                        hideChevron
                        title={`Do not disturb`}
                        switchOnTintColor={colors.primary1}
                        subtitle={'Notification that arrive during 22:00 to 8:00 will be silenced'}
                        subtitleStyle={{marginRight: 10, fontWeight: 'normal'}}
                        switchButton
                        onSwitch={this.toggleDisturbSwitch}
                        switched={this.state.isSilent}

                    />
                    <ListItem
                        title={`About`}
                        onPress={() => this.onAbout()}

                    />
                    <PushController />
                </List>
            </ScrollView>
        )
    }

}
