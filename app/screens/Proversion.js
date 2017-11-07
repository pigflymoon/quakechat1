import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Linking,
} from 'react-native';
import { Button } from 'react-native-elements'
import Label from '../components/Label';
import colors from '../styles/colors';

import SettingStyle from '../styles/setting';

export default class Proversion extends Component {

    constructor(props, context) {
        super(props, context);
        console.log('props updateVersion',this.props)
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
                <Label text="PRO Version"/>

                <View style={SettingStyle.box}>
                    <Button
                        large
                        icon={{name: 'squirrel', type: 'octicon', }}
                        backgroundColor={colors.green2}
                        title='$1.49/Pro Version'
                        onPress={() => this.onPay()}
                    />
                    <Text style={SettingStyle.text}>
                        QuakeChat has utilized the following copyrighted matererial:
                        We acknowledge the New Zealand GeoNet project and its sponsors EQC, GNS Science and LINZ,
                        for providing data used by this app.
                    </Text>

                </View>



            </ScrollView>
        )
    }

}

