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
    TouchableOpacity,
    Alert,
    Modal,
    TouchableHighlight,
} from 'react-native';
import {List, ListItem, Card, Tile, Icon,} from 'react-native-elements';
import * as StoreReview from 'react-native-store-review';
import {NativeModules} from 'react-native';
const {InAppUtils}  = NativeModules;
import showInfo from '../styles/showInfo';
import probg from '../images/pro-bg.jpg';


import colors from '../styles/colors';
import quakeStyle from '../styles/quake';
import listStyle from '../styles/list';
import SettingStyle from '../styles/setting';

import Utils from '../utils/utils';
import Config from '../config/ApiConfig';
// let showDataSource = ['GEONET'];//
export default class Settings extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isNotified: true,
            isSilent: true,
            rule: 'All',
            ruleValue: '0',
            version: '1.0',
            dataSource: 'GEONET',
            showUsgs: false,
            isPro: 'DISABLED',


        };
        AsyncStorage.setItem("ruleValue", "0");
        AsyncStorage.setItem("isNotified", "true");
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
//

        //
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
    onProversion = () => {
        this.props.navigation.navigate('Proversion', {});
    };

    onResources = () => {
        this.props.navigation.navigate('Resources', {});
    };
    onShare = () => {
        const message = 'I am using QuakeChat. Life is s more meaningful when you share,chat and help each other! :) Download QuakeChat for iOS, and start QuakeChating with friends today.'
        const url = Config.share.url;
        Utils.shareText(message, url)
    }

    onPay = () => {
        InAppUtils.canMakePayments((enabled) => {
            if (enabled) {
                var products = [
                    'com.lucy.quakechat.productid',
                ];

                InAppUtils.loadProducts(products, (error, products) => {
                    //update store here.
                    var productIdentifier = 'com.lucy.quakechat.productid';
                    InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
                        // NOTE for v3.0: User can cancel the payment which will be available as error object here.
                        if (response && response.productIdentifier) {
                            this.setState({showUsgs: true, isPro: 'Available'})
                            //unlock store here.
                        }
                    });
                });

            } else {
                Alert.alert('IAP disabled');
            }
        });
    }
    titleStyle = () => {
        const {showUsgs} = this.state;
        if (showUsgs) {
            return {
                color: colors.green
            }
        } else {
            return {
                color: colors.red
            }
        }

    }

    onRate() {
        let link = 'https://itunes.apple.com/cn/app/quakechat/id1304970962';
        //
        if (Platform.OS === 'ios') {
            if (StoreReview.isAvailable) {
                return StoreReview.requestReview();
            }

            link = '';
        }

        return Utils.goToURL(link);
    }

    updateDataSource = (dataSource) => {
        let showDataSource = ['GEONET', 'USGS'];//
        // let showDataSource = ['GEONET'];//, 'USGS'
        this.setState({dataSource: dataSource}, function () {
            for (let data of showDataSource) {
                if (this.state.dataSource === data) {
                    AsyncStorage.setItem('dataSource', data.toLowerCase()).then(this.setState({dataSource: data}));
                }

            }
        })
        AsyncStorage.setItem("notificationQuakesData", "");

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

    renderDataSource = () => {
        const {showUsgs} = this.state;
        return (showUsgs ? <Picker selectedValue={this.state.dataSource} onValueChange={this.updateDataSource}>
                    <Picker.Item label="GEONET(NewZealand)" value="GEONET"/>
                    <Picker.Item label="USGS(Global)" value="USGS"/>
                </Picker> :
                <Picker selectedValue={this.state.dataSource} onValueChange={this.updateDataSource}>
                    <Picker.Item label="GEONET(NewZealand)" value="GEONET"/>
                </Picker>
        );
    }


    render() {
        return (
            <ScrollView>
                <List>
                    <Card>
                        <View style={{paddingTop: 20}}>
                            <Tile
                                imageSrc={probg}
                                title="Thank you for your support"
                                titleStyle={{fontSize: 20}}
                                activeOpacity={1}
                                width={310}
                                contentContainerStyle={{height: 100}}


                                onPress={() => {
                                    Alert.alert('Hi')
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 10,
                                        alignItems: 'center',
                                    }}
                                >

                                    <TouchableOpacity activeOpacity={.5} onPress={() => {
                                        this.onPay()
                                    }}>
                                        <View style={{
                                            backgroundColor: '#4f9deb',
                                            paddingVertical: 5,
                                            paddingHorizontal: 10,
                                        }}>

                                            <Text style={{color: '#ffffff'}}>Get PRO Version</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={.5} onPress={() => this.onProversion()}>
                                        <View>
                                            <Text style={{color: 'grey'}}>Find out more ></Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </Tile>
                        </View>
                    </Card>
                    <ListItem
                        containerStyle={listStyle.listItem}
                        leftIcon={{name: 'favorite', color: colors.grey2}}
                        title={`PRO Version`}
                        titleStyle={this.titleStyle()}
                        rightTitle={this.state.isPro}
                        rightTitleStyle={this.titleStyle()}
                        hideChevron
                    />
                    <ListItem containerStyle={listStyle.listItem}
                              title="DataSource"
                              leftIcon={{name: 'description', color: colors.grey2}}
                              rightTitle={this.state.dataSource}
                              rightTitleStyle={quakeStyle.rightTitle}
                              hideChevron
                    />
                    {this.renderDataSource()}

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
