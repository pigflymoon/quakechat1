import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
} from 'react-native';
import {Card, Button} from 'react-native-elements';
import colors from '../styles/colors';

import drop from '../images/drop.png';
import cover from '../images/cover.png';
import hold from '../images/hold.png';
import SettingStyle from '../styles/setting';
import ResourcesConfig from '../config/ResourcesConfig';
import Links from './Links';
import Utils from '../utils/utils';


export default class Resources extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <ScrollView style={SettingStyle.container}>
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
                            Utils.goToURL(ResourcesConfig.url.getthru)
                        }}
                        icon={{name: 'info'}}
                        backgroundColor={colors.primary1}

                        title='READ MORE'/>
                </Card>
                <Links/>

            </ScrollView>
        )
    }

}

