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

const QuakesListScreen = ({navigation,screenProps}) => (
    <QuakesList navigation={navigation} screenProps={screenProps} />
);
const QuakesMapScreen = ({navigation,screenProps}) => (
    <QuakesMap navigation={navigation} screenProps={screenProps} />
);
const ChatRoomScreen = ({navigation,screenProps}) => (
    <ChatRoom navigation={navigation} screenProps={screenProps} />
);
const NewsScreen = ({navigation,screenProps}) => (
    <News navigation={navigation} screenProps={screenProps} />
);
const SettingsScreen = ({navigation,screenProps}) => (
    <Settings navigation={navigation} screenProps={screenProps} />
);
const TabNav = TabNavigator({
    Quakes: {
        screen: QuakesListScreen,
        path: '/',
        navigationOptions: {
            title: 'Quakes List',
            tabBarLabel: 'Quakes',
            tabBarIcon: ({tintColor}) => <Icon name="home" size={35} color={tintColor}/>,
        },
    },
    Map: {
        screen: QuakesMapScreen,
        path: '/map',
        navigationOptions: {
            title: 'Quakes Map',
            tabBarLabel: 'Map',
            tabBarIcon: ({tintColor}) => <Icon name="room" size={35} color={tintColor}/>,
        },
    },
    Chat: {
        screen: ChatRoomScreen,
        path: '/chat',
        navigationOptions: {
            title: 'Chat Room',
            tabBarLabel: 'ChatRoom',
            tabBarIcon: ({tintColor}) => <Icon name='group' type='font-awesome' size={30} color={tintColor}/>,
        },
    },
    News: {
        screen: NewsScreen,
        path: '/news',
        navigationOptions: {
            title: 'News',
            tabBarLabel: 'News',
            tabBarIcon: ({tintColor}) => <Icon name="list" size={35} color={tintColor}/>,
        },
    },
    Settings: {
        screen: SettingsScreen,
        path: '/settings',
        navigationOptions: {
            title: 'Settings',
            tabBarLabel: 'Settings',
            tabBarIcon: ({tintColor}) => <Icon name="settings" size={35} color={tintColor}/>,
        },
    }

});
export const StacksOverTabs = StackNavigator({
    TabNav: {
        screen: TabNav,
    },
    Detail: {
        screen: QuakeDetail,
        path: '/quake/:publicID',
        navigationOptions: ({navigation}) => {
            title:`${navigation.state.params.publicID}'s detail`;
        },
    },
    Quality: {
        screen: QuakeQuality,
        path: '/quality/',
        navigationOptions: ({navigation}) => {
            title:`Quake Quality`;
        },
    },
    About: {
        screen: About,
        path: '/about/',
        navigationOptions: ({navigation}) => {
            title:`About`;
        },
    }
});