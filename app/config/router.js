import React from 'react';
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
            title: 'Quake Detail'
        }),
    },
    Quality: {
        screen: QuakeQuality,
        navigationOptions: ({navigation}) => ({
            title: 'Quake Quality'
        }),
    },
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
    List: {
        screen: QuakesListStack,
        navigationOptions: {
            tabBarLabel: 'Quakes',
            tabBarIcon: ({tintColor}) => <Icon name="home" size={35} color={tintColor}/>,
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