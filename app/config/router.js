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
import ResetPassword from '../screens/ResetPassword';
import VerifyEmail from '../screens/VerifyEmail';
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
    // console.log('chatroomscreen navigation option called!!************')
    // console.log(props)
    return {
        headerTitle: `Live Chat`,
        // Render a button on the right side of the header.
        // When pressed signout navigate to signin
        headerLeft: null,
        headerRight: (
            <Button
                title={'Sign out'}
                onPress={() => {
                    firebaseApp.auth().signOut().then(function () {
                        console.log('Sign out')
                        const navigateAction = NavigationActions.navigate({
                            routeName: 'SignIn',
                            params: {},
                        });
                        console.log('props.navigation sign out')
                        console.log('params.timer', params.timer)
                        clearInterval(params.timer);
                        props.navigation.dispatch(navigateAction);


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


SignInScreen.navigationOptions = props => {
    const {navigation} = props;
    const {state, setParams} = navigation;
    const {params} = state;
    // console.log('SignInScreen navigation option called!!************')
    console.log(props)
    return {
        title: 'Sign In',
        headerTitle: 'Sign In',
        headerLeft: null,

    };
};
const SignupScreen = ({navigation, screenProps}) => (
    <Signup navigation={navigation} screenProps={screenProps}/>
);
// SignupScreen.navigationOptions = props => {
//     const {navigation} = props;
//     const {state, setParams} = navigation;
//     const {params} = state;
//     return {
//         headerTitle: 'Sign Up',
//         headerLeft: null,
//
//     };
// };
const ResetPasswordScreen = ({navigation, screenProps}) => (
    <ResetPassword navigation={navigation} screenProps={screenProps}/>
);
ResetPasswordScreen.navigationOptions = props => {
    const {navigation} = props;
    const {state, setParams} = navigation;
    const {params} = state;
    return {
        headerTitle: 'Reset Password',
        headerLeft: null,

    };
};

const VerifyEmailScreen = ({navigation, screenProps}) => (
    <VerifyEmail navigation={navigation} screenProps={screenProps}/>
);
// VerifyEmailScreen.navigationOptions = props => {
//     const {navigation} = props;
//     const {state, setParams} = navigation;
//     const {params} = state;
//     return {
//         headerTitle: 'Verify Email',
//         headerLeft: null,
//
//     };
// };
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
        key: 'Quakes',
        navigationOptions: {
            title: 'Quakes',
        },
    },
    Detail: {
        screen: DetailScreen,
        path: '',
        key: 'Detail',
        navigationOptions: ({navigation}) => ({
            title: `Quake Detail`
        }),
    },
    Quality: {
        screen: QualityScreen,
        path: '/quality/',
        key: 'Quality',
        navigationOptions: ({navigation}) => ({
            title: `Quake Quality`,
        }),
    },
});
// const ChatTab = StackNavigator({
//
//     SignIn: {
//         screen: SignInScreen,
//         path: '/sigin',
//         // key:'SignIn',
//         navigationOptions: {
//             title: 'Sign In',
//         },
//     },
//     ChatRoom: {
//         screen: ChatRoomScreen,
//         path: '/chat',
//         key: 'ChatRoom',
//         navigationOptions: {
//             title: 'Chat Room',
//
//         },
//     },
//     SignUp: {
//         screen: SignupScreen,
//         path: '/sigup',
//         key: 'SignUp',
//         navigationOptions: {
//             title: 'Sign Up',
//         },
//     },
//     VerifyEmail: {
//         screen: VerifyEmailScreen,
//         path: '/verify',
//         key: 'Verify',
//         navigationOptions: {
//             title: 'Verify Email',
//         },
//     },
//     ResetPassword: {
//         screen: ResetPasswordScreen,
//         path: '/reset',
//         key: 'Reset',
//         navigationOptions: {
//             title: 'Reset Password',
//         },
//     },
//
// });

const navigateOnce = (getStateForAction) => (action, state) => {
    const {type, routeName} = action;
    return (
        state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state);
    // you might want to replace 'null' with 'state' if you're using redux (see comments below)
};

// ChatTab.router.getStateForAction = navigateOnce(ChatTab.router.getStateForAction);
const QuakesMapTab = StackNavigator({
    Map: {
        screen: MapScreen,
        path: '/map',
        key: 'Map',
        navigationOptions: {
            title: 'Quakes Map',

        },
    },
});
const NewsTab = StackNavigator({
    News: {
        screen: NewsScreen,
        path: '/news',
        key: 'News',
        navigationOptions: {
            title: 'News',

        },
    },
});
const SettingsTab = StackNavigator({
    Settings: {
        screen: SettingsScreen,
        path: '/settings',
        key: 'Settings',
        navigationOptions: {
            title: 'Settings',
        },
    },
    About: {
        screen: AboutScreen,
        path: '/about/',
        key: 'About',

        navigationOptions: ({navigation}) => {
            title:`About`;
        },
    },
});

const SignupTab = StackNavigator({
    Signup: {
        screen: SignupScreen,
        path: '/',
        key: '',
        navigationOptions: {
            title: 'Sign Up',
        },
    },
    VerifyEmail: {
        screen: VerifyEmailScreen,
        path: '',
        key: '',
        navigationOptions: ({navigation}) => ({
            title: `Verify Email`
        }),
    },

});
export const ChatTab = TabNavigator(
    {
        SignIn: {
            screen: SignInScreen,
            path: '/',
            navigationOptions: {
                title: 'Sign In',
                tabBarVisible: false,
                // tabBarLabel: 'ChatRoom',
                // tabBarIcon: ({tintColor}) => <Icon name='group' type='font-awesome' size={30} color={tintColor}/>,
            },
        },
        SignUp: {
            screen: SignupTab,
            path: '/',
            navigationOptions: {
                title: 'Sign Up',
                tabBarVisible: false,
                // tabBarLabel: 'ChatRoom',
                // tabBarIcon: ({tintColor}) => <Icon name='group' type='font-awesome' size={30} color={tintColor}/>,
            },
        },
        ChatRoom: {
            screen: ChatRoomScreen,
            path: '/',
            navigationOptions: {
                title: 'Chat Room',
                tabBarVisible: false,
                // tabBarLabel: 'ChatRoom',
                // tabBarIcon: ({tintColor}) => <Icon name='group' type='font-awesome' size={30} color={tintColor}/>,
            },
        },
        // VerifyEmail: {
        //     screen: VerifyEmailScreen,
        //     path: '/',
        //     navigationOptions: {
        //         title: 'Verify Email',
        //         tabBarVisible: false,
        //         // tabBarLabel: 'ChatRoom',
        //         // tabBarIcon: ({tintColor}) => <Icon name='group' type='font-awesome' size={30} color={tintColor}/>,
        //     },
        // },
        ResetPassword: {
            screen: ResetPasswordScreen,
            path: '/',
            navigationOptions: {
                title: 'Reset Password',
                tabBarVisible: false,
                // tabBarLabel: 'ChatRoom',
                // tabBarIcon: ({tintColor}) => <Icon name='group' type='font-awesome' size={30} color={tintColor}/>,
            },
        }
    }, {
        animationEnabled: true,
        swipeEnabled: true,
    }
);


export const StacksInTabs = TabNavigator(
    {
        ChatTab: {
            screen: ChatTab,
            path: '/chat',
            navigationOptions: {
                title: 'Chat Room',
                tabBarLabel: 'ChatRoom',
                tabBarVisible: true,
                tabBarIcon: ({tintColor}) => <Icon name='group' type='font-awesome' size={30} color={tintColor}/>,
            },
        },
        QuakesListTab: {
            screen: QuakesListTab,
            path: '/',
            navigationOptions: {
                title: 'Quakes List',
                tabBarLabel: 'Quakes',
                tabBarIcon: ({tintColor}) => <Icon name="home" size={35} color={tintColor}/>,
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