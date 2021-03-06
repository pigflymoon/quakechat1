import React, {Component} from 'react';
import {Button, View, Text,} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';

import News from '../screens/News';
import Chat from '../screens/Chat';
import QuakesList from '../screens/QuakesList';
import QuakesMap from '../screens/QuakesMap';
import QuakeDetail from '../screens/QuakeDetail';
import About from '../screens/About';
import Proversion from '../screens/Proversion';
import Resources from '../screens/Resources';
import Settings from '../screens/Settings';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import ResetPassword from '../components/ResetPassword';
import VerifyEmail from '../components/VerifyEmail';
import Terms from '../components/TermOfUse';
import Policy from '../components/PrivacyPolicy';
import Edit from '../components/EditProfile';
import ChangePassword from '../components/ChangePassword';
import ChangeName from '../components/ChangeName';
export const QuakesListStack = StackNavigator({
    QuakesList: {
        screen: QuakesList,
        navigationOptions: {
            title: 'Quakes List'
        },
    },

    Detail: {
        screen: QuakeDetail,
        navigationOptions: ({navigation}) => ({
            title: 'Quake Detail',
        }),
    },
});

export const ChatStatck = StackNavigator({
        Signin: {
            screen: Signin,
            navigationOptions: ({navigation}) => ({
                title: 'Sign in',
                headerLeft: null
            }),
        },
        ChatRoom: {
            screen: Chat,
            navigationOptions: ({navigation}) => ( {
                title: 'Chat Room',
                headerLeft: null
            }),
        },

        Signup: {
            screen: Signup,
            navigationOptions: ({navigation}) => ({
                title: 'Sign up',
                headerLeft: null
            }),
        },
        ResetPassword: {
            screen: ResetPassword,
            navigationOptions: ({navigation}) => ({
                title: 'Reset Password',
                headerLeft: null
            }),
        },
        VerifyEmail: {
            screen: VerifyEmail,
            navigationOptions: ({navigation}) => ({
                title: 'Verify Email',
                headerLeft: null
            }),
        },
        Terms: {
            screen: Terms,
            navigationOptions: ({navigation}) => ({
                title: 'Terms of Use',

            }),
        },
        Policy: {
            screen: Policy,
            navigationOptions: ({navigation}) => ({
                title: 'Privacy Policy',

            }),
        },
        Edit: {
            screen: Edit,
            navigationOptions: ({navigation}) => ({
                title: 'Options',

            }),
        },
        ChangeName: {
            screen: ChangeName,
            navigationOptions: ({navigation}) => ({
                title: 'Name',
            }),
        },
        ChangePassword: {
            screen: ChangePassword,
            navigationOptions: ({navigation}) => ({
                title: 'Password',
            }),
        }
    }
);


export const SettingsStack = StackNavigator({
    Settings: {
        screen: Settings,
        navigationOptions: {
            title: 'Settings'
        },
    },
    Proversion:{
        screen: Proversion,
        navigationOptions: {
            title: 'PRO Version'
        },
    },
    About: {
        screen: About,
        navigationOptions: ({navigation}) => ({
            title: 'About'
        })
    },
    Resources: {
        screen: Resources,
        navigationOptions: ({navigation}) => ({
            title: 'Resources'
        })
    },
});

export const NewsStack = StackNavigator({
    News: {
        screen: News,
        navigationOptions: {
            title: 'News'
        },
    },
});

export const Tabs = TabNavigator({

    List: {
        screen: QuakesListStack,
        navigationOptions: {
            tabBarLabel: 'Quakes',
            tabBarIcon: ({tintColor}) => <Icon name="home" size={35} color={tintColor}/>,
        },
    },
    News: {
        screen: NewsStack,
        navigationOptions: {
            tabBarLabel: 'News',
            tabBarIcon: ({tintColor}) => <Icon name="list" size={35} color={tintColor}/>,
        },
    },
    Map: {
        screen: QuakesMap,
        headerTitle: 'Quakes Map',
        navigationOptions: {
            tabBarLabel: 'Map',
            tabBarIcon: ({tintColor}) => <Icon name="room" size={35} color={tintColor}/>,
        },
    },
    Chat: {
        screen: ChatStatck,
        navigationOptions: {
            tabBarLabel: 'ChatRoom',
            tabBarIcon: ({tintColor}) => <Icon name='group' type='font-awesome' size={30} color={tintColor}/>,
        }
    },
    Settings: {
        screen: SettingsStack,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({tintColor}) => <Icon name="settings" size={35} color={tintColor}/>,
        }
    },

});
