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
import * as StoreReview from 'react-native-store-review';
import colors from '../styles/colors';
import quakeStyle from '../styles/quake';
import listStyle from '../styles/list';
import Utils from '../utils/utils';
import Config from '../config/ApiConfig';


export default class Settings extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isNotified: true,
            isSilent: true,
            rule: 'All',
            ruleValue: '0',
            version: '1.0',
            dataSource: 'GEONET'

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
            let currentHour = new Date().getHours();
            if (value) {
                var val = (value === "true");
                if (currentHour <= 8 || currentHour >= 22) {
                    val = true;
                }
                this.setState({"isSilent": val});
            } else {
                if (currentHour <= 8 || currentHour >= 22) {
                    AsyncStorage.setItem("isSilent", 'true');
                } else {
                    AsyncStorage.setItem("isSilent", 'false');
                }

            }

        }).done();
        AsyncStorage.getItem("dataSource").then((value) => {
            if (value) {
                this.setState({"dataSource": value.toUpperCase()});
            } else {
                AsyncStorage.setItem("dataSource", this.state.dataSource.toString().toLowerCase());
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
        let currentHour = new Date().getHours();
        if (value) {
            if (currentHour <= 8 || currentHour >= 22) {
                AsyncStorage.setItem("isSilent", 'true');
            } else {
                AsyncStorage.setItem("isSilent", 'false');
            }
        } else {
            AsyncStorage.setItem("isSilent", 'false');
        }

        this.setState({"isSilent": value});

    }


    onAbout = () => {
        this.props.navigation.navigate('About', {});
    };

    onResources = () => {
        this.props.navigation.navigate('Resources', {});
    };
    onShare = () => {
        const message = 'I am using QuakeChat. Life is s more meaningful when you share,chat and help each other! :) Download QuakeChat for iOS, and start QuakeChating with friends today.'
        const url = Config.share.url;
        Utils.shareText(message, url)
    }


    onRate() {
        let link = '';

        if (Platform.OS === 'ios') {
            if (StoreReview.isAvailable) {
                return StoreReview.requestReview();
            }

            link = '';
        }

        return Utils.goToURL(link);
    }

    updateDataSource = (dataSource) => {
        let showDataSource = ['GEONET', 'USGS'];
        this.setState({dataSource: dataSource}, function () {
            for (let data of showDataSource) {
                if (this.state.dataSource === data) {
                    AsyncStorage.setItem('dataSource', data.toLowerCase()).then( this.setState({dataSource: data}));
                }

            }
        })

    }
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

    render() {
        return (
            <ScrollView>

                <List>
                    <ListItem containerStyle={listStyle.listItem}
                              title="DataSource"
                              leftIcon={{name: 'description', color: colors.grey2}}
                              rightTitle={this.state.dataSource}
                              rightTitleStyle={quakeStyle.rightTitle}
                              hideChevron
                    />
                    <Picker selectedValue={this.state.dataSource} onValueChange={this.updateDataSource}>
                        <Picker.Item label="GEONET(NewZealand)" value="GEONET"/>
                        <Picker.Item label="USGS(Global)" value="USGS"/>
                    </Picker>

                    <ListItem
                        containerStyle={listStyle.listItem}
                        hideChevron
                        leftIcon={{name: 'notifications', color: colors.grey2}}

                        title={`Notifications`}
                        switchOnTintColor={colors.primary1}
                        switchButton
                        onSwitch={this.toggleNotificationSwitch}
                        switched={this.state.isNotified}
                    />
                    <ListItem
                        containerStyle={listStyle.listItem}
                        hideChevron
                        leftIcon={{name: 'brightness-3', color: colors.grey2}}
                        title={`Do not disturb`}
                        switchOnTintColor={colors.primary1}
                        subtitle={'Notification that arrive during 22:00 to 8:00 will be silenced'}
                        subtitleStyle={{marginRight: 10, fontWeight: 'normal'}}
                        subtitleNumberOfLines={2}
                        switchButton
                        onSwitch={this.toggleDisturbSwitch}
                        switched={this.state.isSilent}
                    />
                    <ListItem
                        title="Notification Rules"
                        leftIcon={{name: 'add-alert', color: colors.grey2}}
                        rightTitle={this.state.rule}
                        rightTitleStyle={quakeStyle.rightTitle}
                        hideChevron
                    />
                    <Picker selectedValue={this.state.rule} onValueChange={this.updateRule}>
                        <Picker.Item label="All" value="All"/>
                        <Picker.Item label="Weak+" value="Weak+"/>
                        <Picker.Item label="Light+" value="Light+"/>
                        <Picker.Item label="Moderate+" value="Moderate+"/>
                        <Picker.Item label="Strong+" value="Strong+"/>
                        <Picker.Item label="Severe+" value="Severe+"/>
                    </Picker>

                </List>
                <List>
                    <ListItem
                        containerStyle={listStyle.listItem}
                        leftIcon={{name: 'description', color: colors.grey2}}
                        title={`Resources`}
                        onPress={() => this.onResources()}
                    />

                </List>

                <List>
                    <ListItem
                        containerStyle={listStyle.listItem}
                        leftIcon={{name: 'chat', color: colors.grey2}}
                        title={`Tell a friend`}
                        onPress={() => this.onShare()}
                    />
                    <ListItem
                        containerStyle={listStyle.listItem}
                        leftIcon={{name: 'favorite', color: colors.grey2}}
                        title={`Rate us`}
                        onPress={() => this.onRate()}
                    />
                    <ListItem
                        containerStyle={listStyle.listItem}
                        leftIcon={{name: 'info', color: colors.grey2}}
                        title={`About`}
                        onPress={() => this.onAbout()}
                    />
                    <ListItem
                        containerStyle={listStyle.listItem}
                        leftIcon={{name: 'perm-device-information', color: colors.grey2}}
                        title={`Version`}
                        subtitle={this.state.version}
                    />
                </List>
            </ScrollView>
        )
    }

}
