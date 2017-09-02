import React, {Component} from 'react';
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
import Resources from '../screens/Resources';
import Settings from '../screens/Settings';


const QuakeDetailScreen = ({navigation, screenProps}) => {
    var currentScreen = screenProps.currentScreen;
    console.log('currentScreen', screenProps)
    if (currentScreen == 'Detail') {
        console.log(' Detail')
        return <QuakeDetail navigation={navigation} screenProps={screenProps}/>
    } else {
        return null;
    }

}
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
    },
    Resources: {
        screen: Resources,
        navigationOptions: ({navigation}) => ({
            title: 'Resources'
        })
    },
    // Resources: {
    //     screen: Resources,
    //     navigationOptions: ({navigation}) => ({
    //         title: 'Resources'
    //     })
    // }
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
const QuakeMapScreen = ({navigation, screenProps}) => {
    var currentScreen = screenProps.currentScreen;

    if (currentScreen !== 'Map') {
        console.log('not map')
        return null;
    } else {
        return <QuakesMap navigation={navigation} screenProps={screenProps}/>
    }
}


// export const mapsStack = StackNavigator({
//     Map: {
//         screen: QuakeMapScreen,
//         navigationOptions: {
//             title: 'Quakes Map'
//         },
//         // Detail: {
//         //     screen: QuakeDetail,
//         //     navigationOptions: ({navigation}) => ({
//         //         title: 'Quake Detail'
//         //     }),
//         // },
//     },
// });
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
    Map: {
        screen: QuakeMapScreen,
        navigationOptions: {
            tabBarLabel: 'Map',
            title: 'Quakes Map',
            tabBarIcon: ({tintColor}) => <Icon name="room" size={35} color={tintColor}/>,
        },
    },

    News: {
        screen: NewsStack,
        navigationOptions: {
            tabBarLabel: 'News',
            tabBarIcon: ({tintColor}) => <Icon name="list" size={35} color={tintColor}/>,
        },
    },


    ChatRoom: {
        screen: ChatRoom,
        navigationOptions: {
            tabBarLabel: 'ChatRoom',
            tabBarIcon: ({tintColor}) => <Icon name='group' type='font-awesome' size={30} color={tintColor}/>,
        }
    },


});
