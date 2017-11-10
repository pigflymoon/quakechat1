import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Linking,
} from 'react-native';
import {PricingCard} from 'react-native-elements';

import SettingStyle from '../styles/setting';

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
                <PricingCard
                    color='#4f9deb'
                    title='PRO Version'
                    price='$1.49'
                    info={['More quakes list  in global or in New Zealand', 'Even more settings', 'All Core Features', 'Some upcoming features']}
                    button={{title: 'Love and Share', icon: 'favorite'}}
                />
            </ScrollView>
        )
    }

}

