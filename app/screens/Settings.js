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
    Item,
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import colors from '../styles/colors';
import quakeStyle from '../styles/quake';
import PushController from '../components/PushController';



export default class Settings extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: false,
            isNotified: true,
            isSilent: true,
            rule: 'All',
            ruleValue: '0',

        };
        AsyncStorage.setItem('ruleValue', "0");
    }


    componentDidMount() {
        AsyncStorage.getItem("isNotified").then((value) => {

            if (value) {
                var val = (value === "true");
                this.setState({"isNotified": val});
            } else {
                AsyncStorage.setItem("isNotified", this.state.isNotified.toString());
            }

        }).done();

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

    onResources = () => {
        this.props.navigation.navigate('Resources', {});
    };

    updateRule = (rule) => {
        let showRules = ['All', 'Weak+', 'Light+', 'Moderate+', 'Strong+', 'Severe+'];

        this.setState({rule: rule}, function () {
            for (let rule of showRules) {
                if (this.state.rule === rule) {
                    let index = showRules.indexOf(rule);
                    let value = ( index == 0 ) ? 0 : (index + 2);
                    AsyncStorage.setItem('ruleValue', value.toString());
                    this.setState({ruleValue: value});
                }

            }
        })

    }

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

                    <Picker selectedValue={this.state.rule} onValueChange={this.updateRule}>
                        <Picker.Item label="All" value="All"/>
                        <Picker.Item label="Weak+" value="Weak+"/>
                        <Picker.Item label="Light+" value="Light+"/>
                        <Picker.Item label="Moderate+" value="Moderate+"/>
                        <Picker.Item label="Strong+" value="Strong+"/>
                        <Picker.Item label="Severe+" value="Severe+"/>
                    </Picker>
                    <ListItem
                        title="Notification Rules"
                        rightTitle={this.state.rule}
                        rightTitleStyle={quakeStyle.rightTitle}
                        hideChevron
                    />
                </List>
                <List>
                    <ListItem
                        leftIcon={{name: 'description'}}
                        title={`Resources`}
                        onPress={() => this.onResources()}
                    />
                    <PushController />
                </List>

                <List>
                    <ListItem
                        leftIcon={{name: 'chat'}}
                        title={`Tell a friend`}
                        onPress={() => this.onAbout()}
                    />
                    <ListItem
                        leftIcon={{name: 'favorite'}}
                        title={`Rate us`}
                        onPress={() => this.onAbout()}
                    />
                    <ListItem
                        leftIcon={{name: 'info'}}
                        title={`About`}
                        onPress={() => this.onAbout()}
                    />
                    <ListItem
                        leftIcon={{name: 'perm-device-information'}}
                        title={`Version`}
                        onPress={() => this.onAbout()}
                    />
                </List>
            </ScrollView>
        )
    }

}
