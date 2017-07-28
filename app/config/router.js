import React from 'react';
import {Button} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';

import News from '../screens/News';
import QuakesList from '../screens/QuakesList';
import QuakesMap from '../screens/QuakesMap';
import QuakeDetail from '../screens/QuakeDetail';
import QuakeQuality from '../screens/QuakeQuality';
import ChatGroup from '../screens/ChatGroup';
import Chat from '../screens/Chat';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import About from '../screens/About';
import Settings from '../screens/Settings';
import firebaseApp from '../config/FirebaseConfig';

const QuakesListScreen = ({navigation, screenProps}) => (
    <QuakesList navigation={navigation} screenProps={screenProps}/>
);
const QuakesMapScreen = ({navigation, screenProps}) => (
    <QuakesMap navigation={navigation} screenProps={screenProps}/>
);
const ChatScreen = ({navigation, screenProps}) => (
    <Chat navigation={navigation} screenProps={screenProps}/>
);
const ChatGroupScreen = ({navigation, screenProps}) => (
    <ChatGroup navigation={navigation} screenProps={screenProps}/>
);
const SigninScreen = ({navigation, screenProps}) => (
    <Signin navigation={navigation} screenProps={screenProps}/>
);

ChatGroupScreen.navigationOptions = props => {
    const {navigation} = props;
    const {state, setParams} = navigation;
    const {params} = state;
    return {
        headerTitle: `${params.name}'s live chat!`,
        // Render a button on the right side of the header.
        // When pressed switches the screen to edit mode.
        headerRight: (
            <Button
                title={'Sign out'}
                onPress={() => {
                    console.log('Sign out')
                    firebaseApp.auth().signOut().then(function () {
                        console.log('Sign out')
                        navigation.navigate('Signin');
                    }).catch(function (error) {
                        console.log('sign out error', error);
                    })

                }}


            />
        ),
    };
};
const SignupScreen = ({navigation, screenProps}) => (
    <Signup navigation={navigation} screenProps={screenProps}/>
);
const NewsScreen = ({navigation, screenProps}) => (
    <News navigation={navigation} screenProps={screenProps}/>
);
const SettingsScreen = ({navigation, screenProps}) => (
    <Settings navigation={navigation} screenProps={screenProps}/>
);
const TabNav = TabNavigator({
    Chat: {
        screen: ChatScreen,
        path: '/chat',
        navigationOptions: {
            title: 'Chat Room',
            tabBarLabel: 'ChatRoom',
            tabBarIcon: ({tintColor}) => <Icon name='group' type='font-awesome' size={30} color={tintColor}/>,
        },
    },
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
    SignIn: {
        screen: SigninScreen,
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
    ChatGroup: {
        screen: ChatGroupScreen,
        path: '/chatroom',
        navigationOptions: ({navigation}) => {
            title:`Chat Room`;
        },
    },
    // ResetPassword:{
    //     screen: ResetPassword,
    //     path: '/resetpassword/:userid',
    //     navigationOptions: ({navigation}) => {
    //         title:`Reset Password`;
    //     },
    // },
    // VerifyEmail:{
    //     screen: VerifyEmail,
    //     path: '/verfigyemail/:userid',
    //     navigationOptions: ({navigation}) => {
    //         title:`Verify Email`;
    //     },
    // },


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