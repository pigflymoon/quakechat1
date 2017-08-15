import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Linking,
    Picker,
    Platform,
    Switch,
    Image,
} from 'react-native';
import {Icon, Tile, Card} from 'react-native-elements';
import background from '../images/dropcoverhold.png';

import SettingStyle from '../styles/setting';


export default class Links extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <ScrollView style={SettingStyle.container}>

                <Text style={SettingStyle.link}
                      onPress={() => Linking.openURL('https://www.eqc.govt.nz/be-prepared')}>
                    EQC
                </Text>
                <Text style={SettingStyle.link}
                      onPress={() => Linking.openURL('http://getthru.govt.nz/disasters/earthquake/')}>
                    Get Ready, Get Thru
                </Text>
                <Card title="CARD WITH DIVIDER">
                    <View>
                        <Image
                            style={SettingStyle.image}
                            resizeMode="cover"
                            source={background}
                        />
                        <Text>Caption</Text>
                    </View>
                </Card>

                <Card title="CARD WITH DIVIDER">
                    <View>
                        <Text style={SettingStyle.text}>
                            COVER under a sturdy table or desk. If there is no shelter nearby, cover your head and neck with
                            your arms and hands.
                        </Text>
                    </View>
                </Card>
                <Card title="CARD WITH DIVIDER">
                    <View>
                        <Text style={SettingStyle.text}>
                            HOLD on to your shelter (or to your head and neck) until the shaking stops.
                        </Text>
                    </View>
                </Card>

                <Card title="CARD WITH DIVIDER">
                    <View>
                        <Text style={SettingStyle.text}>
                            If you use a wheelchair, or are otherwise unable to Drop, Cover and Hold, brace yourself as best you
                            can and try to find a way to protect your head and neck
                        </Text>
                    </View>
                </Card>



            </ScrollView>
        )
    }

}

