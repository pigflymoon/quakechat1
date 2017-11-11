import React, {Component} from 'react';
import {

    View,
    ScrollView,
    Linking,
    Image,
} from 'react-native';
import {
    Card, Icon, Divider,  Text,
} from 'react-native-elements';

import SettingStyle from '../styles/setting';
import colors from '../styles/colors';
import probg from '../images/pro-bg.jpg';

export default class Proversion extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const features = [
            {
                title: 'More quakes list  in global or in New Zealand',
            }, {
                title: 'Even more settings'
            },
            {
                title: 'Some upcoming features'
            },

        ];
        return (
            <ScrollView style={SettingStyle.container}>

                <Card containerStyle={{marginTop: 15, height: 400,}} title="PRO Version ($1.49)"
                      titleStyle={{color: colors.blue3, fontSize: 32, fontWeight: 'bold'}}>
                    <Image
                        style={[SettingStyle.image, SettingStyle.proImage]}
                        resizeMode="center"
                        source={probg}
                    />
                    <View style={SettingStyle.infoContainer}>
                        <Text style={[SettingStyle.fonts,SettingStyle.proTitle]} h6>Thank you for your support</Text>
                        <Text style={[SettingStyle.fonts,SettingStyle.proTitle]} h6>Love and share</Text>


                        <Text style={SettingStyle.fonts} h5>* More quakes list in global or in New Zealand</Text>
                        <Text style={SettingStyle.fonts} h5>* Even more settings</Text>
                        <Text style={SettingStyle.fonts} h5>* All Core Features</Text>
                        <Text style={SettingStyle.fonts} h5>* Some upcoming features</Text>
                    </View>

                </Card>

            </ScrollView>
        )
    }

}

