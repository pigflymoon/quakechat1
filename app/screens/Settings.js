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
    TouchableHighlight,
    Image,
} from 'react-native';
import {List, ListItem, Card, Tile, Icon, Button} from 'react-native-elements';

import * as StoreReview from 'react-native-store-review';
import {NativeModules} from 'react-native';
const {InAppUtils}  = NativeModules;
// import receiptsFirebase from '../config/FirebaseReceiptsconfig';
import axios from 'axios';

import colors from '../styles/colors';
import quakeStyle from '../styles/quake';
import listStyle from '../styles/list';
import SettingStyle from '../styles/setting';

import Utils from '../utils/utils';
import Config from '../config/ApiConfig';
var verifysandboxHost = Config.receiptVerify.Host.sandboxHost;
var verifyproductionHost = Config.receiptVerify.Host.productionHost;
var verifyHost = verifysandboxHost;
// let showDataSource = ['GEONET'];//
export default class Settings extends Component {
    receiptsRef = null;

    constructor(props, context) {
        super(props, context);
        this.state = {
            isNotified: true,
            isSilent: true,
            rule: 'All',
            ruleValue: '0',
            version: '1.0',
            dataSource: 'GEONET',
            showUsgs: false,//remove in-purchase
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
        AsyncStorage.getItem("isPro").then((value) => {
            if (value) {
                var val = (value === "true");
                if (val) {
                    this.setState({showUsgs: true, isPro: 'Available'})
                }
            } else {
                AsyncStorage.setItem("isPro", this.state.showUsgs.toString());
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
    sendRecipt = (receipt, receiptData) => {

        // this.receiptsRef = receiptsFirebase.database().ref('receipts');
        // console.log('this.receiptsRef ', this.receiptsRef)
        // this.receiptsRef.set({
        //     receiptData: receiptData,
        //     transaction_id: (receipt.in_app)[0].transaction_id,
        //     application_version: receipt.application_version,
        //     bundle_id: receipt.bundle_id,
        //     original_application_version: receipt.original_application_version,
        //     original_purchase_date: receipt.original_purchase_date,
        //     original_purchase_date_pst: receipt.original_purchase_date_pst,
        //     receipt_creation_date: receipt.receipt_creation_date,
        //     receipt_creation_date_pst: receipt.receipt_creation_date_pst,
        //     receipt_type: receipt.receipt_type,
        // });

    }

    onPay = () => {
        var self = this;
        InAppUtils.canMakePayments((enabled) => {

            if (enabled) {
                var productIdentifier = Config.products.productIdentifier;
                var products = [
                    productIdentifier,
                ];

                InAppUtils.loadProducts(products, (error, products) => {
                    //update store here.
                    var productIdentifier = Config.products.productIdentifier;
                    InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
                        // NOTE for v3.0: User can cancel the payment which will be available as error object here.
                        //transactionReceipt
                        if (response && response.transactionReceipt) {
                            InAppUtils.receiptData((error, receiptData) => {
                                if (error) {
                                    Alert.alert('itunes Error', 'Receipt not found.');
                                } else {
                                    //send to validation server
                                    console.log('receiptData ', receiptData)
                                    axios.post(verifyHost, {
                                        'receipt-data': receiptData,
                                    })
                                        .then(function (response) {
                                            console.log('receipt ', response)
                                            self.sendRecipt(response.data.receipt, receiptData);
                                            var status = response.data.status;
                                            var statusCode = Config.receiptVerify.statusCode;
                                            for (var prop in statusCode) {

                                                if (status == prop) {
                                                    if (statusCode[prop].valid) {
                                                        AsyncStorage.setItem("isPro", 'true');
                                                        self.setState({showUsgs: true, isPro: 'Available'})
                                                    } else {
                                                        Alert.alert('Message: ' + statusCode[prop].message);
                                                    }


                                                }
                                            }

                                        })
                                        .catch(function (error) {
                                            Alert.alert(error)
                                            console.log('validate error', error);
                                        })
                                }
                            });
                        }

                    });
                });

            } else {
                Alert.alert('IAP disabled');
            }
        });
    }
    onRestore = () => {
        InAppUtils.restorePurchases((error, response) => {
            if (error) {
                Alert.alert('itunes Error', 'Could not connect to itunes store.');
            } else {
                Alert.alert('Restore Successful', 'Successfully restores all your purchases.');

                if (response.length === 0) {
                    Alert.alert('No Purchases', "We didn't find any purchases to restore.");
                    return;
                }
                var productIdentifier = Config.products.productIdentifier;//com.lucy.quakechat.productid

                response.forEach((purchase) => {
                    if (purchase.productIdentifier === productIdentifier) {
                        // Handle purchased product.
                        this.setState({showUsgs: true, isPro: 'Available'})
                    }
                });
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

    componentWillUnmount() {
        if (this.receiptsRef) {
            this.receiptsRef.off();
        }
    }


    render() {
        return (
            <ScrollView>


                <List>
                    <Card
                        containerStyle={{marginTop: 15, marginBottom: 15}}
                        title="Thank you for your support"
                        titleStyle={{color: colors.blue3}}
                    >
                        <View style={SettingStyle.proContainer}>
                            <TouchableOpacity activeOpacity={.5} onPress={this.onPay}>
                                <View style={SettingStyle.getAppContainer}>
                                    <Text style={{color: '#ffffff'}}>Get PRO Version</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={.5} onPress={() => {
                                this.onRestore()
                            }}>
                                <View style={SettingStyle.getRestoreContainer}>
                                    <Text style={{color: '#ffffff'}}>Restore Purchases</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={SettingStyle.container}>
                            <TouchableOpacity activeOpacity={.5} onPress={() => this.onProversion()}
                                              style={SettingStyle.more}>
                                <View>
                                    <Text style={SettingStyle.link}>Find out more ></Text>
                                </View>
                            </TouchableOpacity></View>

                    </Card>


                    <ListItem
                        containerStyle={listStyle.listItem}
                        leftIcon={{name: 'favorite', color: colors.grey2}}
                        title={`PRO Version`}
                        titleStyle={this.titleStyle()}
                        rightTitle={this.state.isPro}
                        rightTitleStyle={this.titleStyle()}
                        hideChevron
                        onPress={() => {
                            this.onPay()
                        }}
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
