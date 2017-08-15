import React from 'react';
import {Button} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';

import News from '../screens/News';
import QuakesList from '../screens/QuakesList';
import QuakesMap from '../screens/QuakesMap';
import QuakeDetail from '../screens/QuakeDetail';
import QuakeQuality from '../screens/QuakeQuality';
import ChatRoom from '../screens/ChatRoom';
import About from '../screens/About';
import Settings from '../screens/Settings';
import Share from 'react-native-share';
import colors from '../styles/colors';
import navigationStyle from '../styles/navigation';


export const QuakesListStack = StackNavigator({
    List: {
        screen: QuakesList,
        navigationOptions: {
            title: 'Quakes List'
        },
    },

    Detail: {
        screen: QuakeDetail,
        navigationOptions: ({navigation}) => ({
            title: 'Quake Detail',
            // headerRight: (
            //     <Icon name='share' type='font-awesome' size={18} color={colors.primary1}
            //           style={navigationStyle.rightTitle}
            //           onPress={() => {
            //               var time = navigation.state.params.quake.time;
            //               var magnitude = navigation.state.params.quake.magnitude;
            //               var locality = navigation.state.params.quake.locality;
            //               let shareOptions = {
            //                   title: "Quake Chat",
            //                   message: `${time} happened ${magnitude} earthquake in ${locality}`,
            //                   url: "http://facebook.github.io/react-native/",
            //                   subject: "Share Link" //  for email
            //               };
            //               Share.open(shareOptions);
            //           }}
            //     />
            //
            // ),
        }),
    },
    Quality: {
        screen: QuakeQuality,
        navigationOptions: ({navigation}) => ({
            title: 'Quake Quality',

        })
    }
});

export const SettingsStack = StackNavigator({
    Settings: {
        screen: Settings,
        navigationOptions: {
            title: 'Settings'
        },
    },
    About: {
        screen: About,
        navigationOptions: ({navigation}) => ({
            title: 'About'
        })


    }
});

export const ChatRoomStack = StackNavigator({
    ChatRoom: {
        screen: ChatRoom,
        navigationOptions: {
            title: 'ChatRoom'
        },
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
export const mapsStack = StackNavigator({
    Map: {
        screen: QuakesMap,
        navigationOptions: {
            title: 'Quakes Map'
        },
        Detail: {
            screen: QuakeDetail,
            navigationOptions: ({navigation}) => ({
                title: 'Quake Detail'
            }),
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
    Settings: {
        screen: SettingsStack,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({tintColor}) => <Icon name="settings" size={35} color={tintColor}/>,
        }
    },

    News: {
        screen: NewsStack,
        navigationOptions: {
            tabBarLabel: 'News',
            tabBarIcon: ({tintColor}) => <Icon name="list" size={35} color={tintColor}/>,
        },
    },

    Map: {
        screen: mapsStack,
        navigationOptions: {
            tabBarLabel: 'Map',
            title: 'Quakes Map',
            tabBarIcon: ({tintColor}) => <Icon name="room" size={35} color={tintColor}/>,
        },
    },

    ChatRoom: {
        screen: ChatRoomStack,
        navigationOptions: {
            tabBarLabel: 'ChatRoom',
            tabBarIcon: ({tintColor}) => <Icon name='group' type='font-awesome' size={30} color={tintColor}/>,
        }
    },


});

export const Root = StackNavigator({
    Tabs: {
        screen: Tabs,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
})