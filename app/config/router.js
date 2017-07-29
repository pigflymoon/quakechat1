import React from 'react';
import {Button} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {NavigationActions} from 'react-navigation'

import {Icon} from 'react-native-elements';

import News from '../screens/News';
import QuakesList from '../screens/QuakesList';
import QuakesMap from '../screens/QuakesMap';
import QuakeDetail from '../screens/QuakeDetail';
import QuakeQuality from '../screens/QuakeQuality';
import ChatRoom from '../screens/ChatRoom';
import SignIn from '../screens/SignIn';
import Signup from '../screens/Signup';
import About from '../screens/About';
import Settings from '../screens/Settings';
import firebaseApp from '../config/FirebaseConfig';

/**
 * For QuakesListTab
 * @param navigation
 * @param screenProps
 * @constructor
 */
const QuakesScreen = ({navigation, screenProps}) => (
    <QuakesList navigation={navigation} screenProps={screenProps}/>
);
const DetailScreen = ({navigation, screenProps}) => (
    <QuakeDetail navigation={navigation} screenProps={screenProps}/>
);

const QualityScreen = ({navigation, screenProps}) => (
    <QuakeQuality navigation={navigation} screenProps={screenProps}/>
);
/**
 *  For ChatTab
 * @param navigation
 * @param screenProps
 * @constructor
 */
const ChatRoomScreen = ({navigation, screenProps}) => (
    <ChatRoom navigation={navigation} screenProps={screenProps}/>
);

ChatRoomScreen.navigationOptions = props => {
    const {navigation} = props;
    const {state, setParams} = navigation;
    const {params} = state;
    console.log(props)
    return {
        headerTitle: `live chat!`,
        // Render a button on the right side of the header.
        // When pressed signout navigate to signin
        title: '',
        headerRight: (
            <Button
                title={'Sign out'}
                onPress={() => {
                    firebaseApp.auth().signOut().then(function () {
                        console.log('Sign out')
                        const backAction = NavigationActions.back({
                            key: 'SignIn'
                        })
                        props.navigation.dispatch(backAction)


                    }).catch(function (error) {
                        console.log('sign out error', error);
                    })

                }}
            />
        ),
    };
};
const SignInScreen = ({navigation, screenProps}) => (
    <SignIn navigation={navigation} screenProps={screenProps}/>
);

const SignupScreen = ({navigation, screenProps}) => (
    <Signup navigation={navigation} screenProps={screenProps}/>
);
/**
 * For QuakesMapTab
 * @param navigation
 * @param screenProps
 * @constructor
 */
const MapScreen = ({navigation, screenProps}) => (
    <QuakesMap navigation={navigation} screenProps={screenProps}/>
);
/**
 * For NewsTab
 * @param navigation
 * @param screenProps
 * @constructor
 */
const NewsScreen = ({navigation, screenProps}) => (
    <News navigation={navigation} screenProps={screenProps}/>
);
/**
 * For SettingTab
 * @param navigation
 * @param screenProps
 * @constructor
 */
const SettingsScreen = ({navigation, screenProps}) => (
    <Settings navigation={navigation} screenProps={screenProps}/>
);
const AboutScreen = ({navigation, screenProps}) => (
    <About navigation={navigation} screenProps={screenProps}/>
);

const QuakesListTab = StackNavigator({
    Quakes: {
        screen: QuakesScreen,
        path: '/',
        navigationOptions: {
            title: 'Welcome',
        },
    },
    Detail: {
        screen: DetailScreen,
        path: '',
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params}'s detail`
        }),
    },
    Quality: {
        screen: QualityScreen,
        path: '/quality/',
        navigationOptions: ({navigation}) => ({
            title: `Quake Quality`,
        }),
    },
});
const ChatTab = StackNavigator({
    ChatRoom: {
        screen: ChatRoomScreen,
        path: '/chat',
        navigationOptions: {
            title: 'Chat Room',
            tabBarLabel: 'ChatRoom',
            tabBarIcon: ({tintColor}) => <Icon name='group' type='font-awesome' size={30} color={tintColor}/>,
        },
    },
    SignIn: {
        screen: SignInScreen,
        path: '/sigin',
        navigationOptions: ({navigation}) => {
            title:`Sign In`;
        },
    },
    SignUp: {
        screen: SignupScreen,
        path: '/sigup',
        navigationOptions: ({navigation}) => {
            title:`Sign Up`;
        },
    },
});

const QuakesMapTab = StackNavigator({
    Map: {
        screen: MapScreen,
        path: '/map',
        navigationOptions: {
            title: 'Quakes Map',
            tabBarLabel: 'Map',
            tabBarIcon: ({tintColor}) => <Icon name="room" size={35} color={tintColor}/>,
        },
    },
});

const NewsTab = StackNavigator({
    News: {
        screen: NewsScreen,
        path: '/news',
        navigationOptions: {
            title: 'News',
            tabBarLabel: 'News',
            tabBarIcon: ({tintColor}) => <Icon name="list" size={35} color={tintColor}/>,
        },
    },
});


const SettingsTab = StackNavigator({
    Settings: {
        screen: SettingsScreen,
        path: '/settings',
        navigationOptions: {
            title: 'Settings',
            tabBarLabel: 'Settings',
            tabBarIcon: ({tintColor}) => <Icon name="settings" size={35} color={tintColor}/>,
        },
    },
    About: {
        screen: AboutScreen,
        path: '/about/',
        navigationOptions: ({navigation}) => {
            title:`About`;
        },
    },
});

export const StacksInTabs = TabNavigator(
    {
        QuakesListTab: {
            screen: QuakesListTab,
            path: '/',
            navigationOptions: {
                title: 'Quakes List',
                tabBarLabel: 'Quakes',
                tabBarIcon: ({tintColor}) => <Icon name="home" size={35} color={tintColor}/>,
            },
        },
        ChatTab: {
            screen: ChatTab,
            path: '/chat',
            navigationOptions: {
                title: 'Chat Room',
                tabBarLabel: 'ChatRoom',
                tabBarIcon: ({tintColor}) => <Icon name='group' type='font-awesome' size={30} color={tintColor}/>,
            },
        },
        QuakesMapTab: {
            screen: QuakesMapTab,
            path: '/map',
            navigationOptions: {
                title: 'Quakes Map',
                tabBarLabel: 'Map',
                tabBarIcon: ({tintColor}) => <Icon name="room" size={35} color={tintColor}/>,
            },
        },
        NewsTab: {
            screen: NewsTab,
            path: '/news',
            navigationOptions: {
                title: 'News',
                tabBarLabel: 'News',
                tabBarIcon: ({tintColor}) => <Icon name="list" size={35} color={tintColor}/>,
            },
        },
        SettingsTab: {
            screen: SettingsTab,
            path: '/settings',
            navigationOptions: {
                title: 'Settings',
                tabBarLabel: 'Settings',
                tabBarIcon: ({tintColor}) => <Icon name="settings" size={35} color={tintColor}/>,
            },
        }
    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    }
);