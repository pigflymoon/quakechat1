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
import {List, ListItem, Tile} from 'react-native-elements';
import * as StoreReview from 'react-native-store-review';
import {NativeModules} from 'react-native';
const {InAppUtils}  = NativeModules;
import showInfo from '../styles/showInfo';
import probg from '../images/pro-bg.jpg';


import colors from '../styles/colors';
import quakeStyle from '../styles/quake';
import listStyle from '../styles/list';
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
            modalVisible: false,


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

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
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

    onPay = () => {
        InAppUtils.canMakePayments((enabled) => {
            if (enabled) {
                Alert.alert('IAP enabled');
                var products = [
                    'com.lucy.quakechat.productid',
                ];

                InAppUtils.loadProducts(products, (error, products) => {
                    //update store here.
                    console.log('IAP ', products);
                    var productIdentifier = 'com.lucy.quakechat.productid';
                    InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
                        // NOTE for v3.0: User can cancel the payment which will be available as error object here.
                        if (response && response.productIdentifier) {
                            console.log('response' + response);

                            console.log('Purchase Successful', 'Your Transaction ID is ' + response.transactionIdentifier);
                            this.setState({showUsgs: true, isPro: 'Available'})
                            this.setModalVisible(true)
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
        console.log('showUsgs', showUsgs)
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
        let link = '';
        //
        // if (Platform.OS === 'ios') {
        //     if (StoreReview.isAvailable) {
        //         return StoreReview.requestReview();
        //     }
        //
        //     link = '';
        // }
        //
        // return Utils.goToURL(link);
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


    // hanldeUpdateVersion = (update)=>{
    //     console.log('update',update)
    //     console.log('showUsgs',update.showUsgs,'isPro ',update.isPro)
    //     this.setState({showUsgs:update.showUsgs,isPro:update.isPro})
    //
    // }
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
    handleInfo = (showInfo) => {
        this.setState({
            showInfo: showInfo
        })
    }

    render() {
        // const {setParams,state} = this.props.navigation;
        // console.log('state.params',this.props.navigation.state.params)
        return (
            <ScrollView>

                <List>
                    <ListItem
                        containerStyle={listStyle.listItem}
                        leftIcon={{name: 'favorite', color: colors.grey2}}
                        title={`PRO Version`}
                        titleStyle={this.titleStyle()}
                        rightTitle={this.state.isPro}
                        rightTitleStyle={this.titleStyle()}
                        onPress={() => this.onPay()}
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
                <View style={showInfo.infoWrapper}>


                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                alert("Modal has been closed.")
                            }}
                        >
                            <View style={{marginTop: 22}}>
                                <Tile
                                    imageSrc={probg}
                                    title="Thank you for your support!"
                                    featured
                                    icon={{name: 'play-circle', type: 'font-awesome'}}  // optional
                                    contentContainerStyle={{height: 70}}
                                >
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text>Love and share</Text>
                                        <TouchableHighlight onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible)
                                        }}>
                                            <Text>Close</Text>
                                        </TouchableHighlight>
                                    </View>
                                </Tile>

                            </View>
                        </Modal>




                </View>
            </ScrollView>
        )
    }

}
