import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Linking,
} from 'react-native';
import {NativeModules} from 'react-native';
const {InAppUtils}  = NativeModules;
import { NavigationActions } from 'react-navigation'

import { Button,Tile } from 'react-native-elements'
import Label from '../components/Label';
import colors from '../styles/colors';
import probg from '../images/pro-bg.jpg';
import SettingStyle from '../styles/setting';

export default class Proversion extends Component {

    constructor(props, context) {
        super(props, context);
    }
    onPay = () => {
        var self = this;
        const {navigate} = this.props.navigation;
        InAppUtils.canMakePayments((enabled) => {
            if (enabled) {
                // Alert.alert('IAP enabled');
                var products = [
                    'com.lucy.quakechat.productid',
                ];

                InAppUtils.loadProducts(products, (error, products) => {
                    //update store here.
                    var productIdentifier = 'com.lucy.quakechat.productid';
                    InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
                        // NOTE for v3.0: User can cancel the payment which will be available as error object here.
                        if (response && response.productIdentifier) {
                            console.log('response' + response);

                            console.log('Purchase Successful', 'Your Transaction ID is ' + response.transactionIdentifier);
                            // this.setState({showUsgs: true, isPro: 'Available'})
                            // self.props.updateVersion({showUsgs: true, isPro: 'Available'})
                            // self.props.navigate("Settings", {showUsgs: true, isPro: 'Available'})
                            // this.props.navigation.navigate(
                            //     'Settings',
                            //     {
                            //         onGoBack: () => console.log('Will go back from nextComponent'),
                            //     }
                            // );
                            // navigate('Setting', {showUsgs: true, isPro: 'Available'})
                            // const navigateAction = NavigationActions.navigate({
                            //     routeName: 'Setting',
                            //     params: {showUsgs: true, isPro: 'Available'},
                            //
                            //     // navigate can have a nested navigate action that will be run inside the child router
                            //     // action: NavigationActions.navigate({ routeName: 'Setting'})
                            // })
                            // this.props.navigation.dispatch(navigateAction)
                            // this.props.navigation.setParams({showUsgs: true, isPro: 'Available'})
                            this.props.navigation.navigate('ScreenName', {showUsgs: true, isPro: 'Available'})
                            //unlock store here.


                        }
                    });
                });

            } else {
                Alert.alert('IAP disabled');
            }
        });
    }
    render() {

        return (
            <ScrollView style={SettingStyle.container}>
                <View style={SettingStyle.box}>
                    <Tile
                        imageSrc={probg}
                        title="Thank you for your support!"
                        featured
                        caption="love and share"
                    />
                    <Button
                        large
                        icon={{name: 'squirrel', type: 'octicon', }}
                        backgroundColor={colors.green2}
                        title='$1.49/Pro Version'
                        onPress={() => this.onPay()}
                    />



                </View>



            </ScrollView>
        )
    }

}

