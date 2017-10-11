import React, {Component} from 'react';
import {View,ScrollView} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Label from './Label';
import Utils from '../utils/utils';

export default class Copyright extends Component {

    render() {
        const bsdProjects = [{
            name: 'React Native',
            link: 'https://github.com/facebook/react-native',
        }];

        const mitProjects = [
            {
                name: 'React Native Elements',
                link: 'https://github.com/react-native-training/react-native-elements',
            },
            {
                name: 'react-native-gifted-chat',
                link: 'https://github.com/FaridSafi/react-native-gifted-chat',
            },
            {
                name: 'react-native-maps',
                link: 'https://github.com/airbnb/react-native-maps',
            },
            {
                name: 'react-native-push-notification',
                link: 'https://github.com/zo0r/react-native-push-notification'
            },
            {
                name: 'react-navigation',
                linke: 'https://github.com/react-community/react-navigation'
            },
            {
                name: 'axios',
                linke: 'https://github.com/mzabriskie/axios'
            },

            {
                name: 'React Native Google Analytics Bridge',
                link: 'https://github.com/idehub/react-native-google-analytics-bridge',
            },

            {
                name: 'React Native Share',
                link: 'https://github.com/EstebanFuentealba/react-native-share',
            },

            {
                name: 'React Native Vector Icons',
                link: 'https://github.com/oblador/react-native-vector-icons',
            },
            {
                name: 'react-native-appstate-listener',
                link: 'https://github.com/CodingZeal/react-native-appstate-listener',
            },

        ];

        return (
            <View>
                <Label text="MIT"/>
                <List containerStyle={{borderTopWidth: 0}}>
                    {mitProjects.map((project,index) =>
                        <ListItem
                            rightIcon={{name: 'open-in-new'}}
                            key={`index-${project.name}`}
                            title={project.name}
                            onPress={() => {
                                Utils.goToURL(project.link);
                            }}
                        />,
                    )}
                </List>
                <Label text="BSD"/>
                <List containerStyle={{borderTopWidth: 0}}>
                    {bsdProjects.map(project =>
                        <ListItem
                            rightIcon={{name: 'open-in-new'}}
                            key={`index-${project.name}`}
                            title={project.name}
                            onPress={() => {
                                Utils.goToURL(project.link);
                            }}
                        />,
                    )}
                </List>
            </View>
        );
    }
}

