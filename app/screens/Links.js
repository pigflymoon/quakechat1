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
import {Icon, Tile, Card, Button} from 'react-native-elements';
import drop from '../images/drop.png';
import cover from '../images/cover.png';
import hold from '../images/hold.png';
import SettingStyle from '../styles/setting';
import Resources from '../config/Resources';
import {goToURL} from '../utils/utils';


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
                <Card title='DROP'>
                    <Image
                        style={SettingStyle.image}
                        resizeMode="cover"
                        source={drop}
                    />
                    <Text style={{marginBottom: 10}}>
                        COVER under a sturdy table or desk. If there is no shelter nearby, cover your head and neck with
                        your arms and hands. </Text>

                </Card>
                <Card title='COVER'>
                    <Image
                        style={SettingStyle.image}
                        resizeMode="cover"
                        source={cover}
                    />
                    <Text style={{marginBottom: 10}}>
                        HOLD on to your shelter (or to your head and neck) until the shaking stops.
                    </Text>

                </Card>
                <Card title='HOLD'>
                    <Image
                        style={SettingStyle.image}
                        resizeMode="cover"
                        source={hold}
                    />
                    <Text style={{marginBottom: 10}}>
                        If you use a wheelchair, or are otherwise unable to Drop, Cover and Hold, brace yourself as best
                        you
                        can and try to find a way to protect your head and neck </Text>
                    <Button
                        onPress={() => {

                            goToURL(Resources.url.getthru)}}
                        icon={{name: 'code'}}
                        backgroundColor='#03A9F4'

                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='READ MORE'/>
                </Card>


            </ScrollView>
        )
    }

}

