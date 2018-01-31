import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Text,
    Alert,
    Linking,
    Share,
    AsyncStorage,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import colors from '../styles/colors';
import showInfo from '../styles/showInfo';

export default class Utils {
    static goToURL = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert(
                    'Network unavailable',
                    'Don\'t know how to open URI:  ${ url}',
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false}
                )

            }
        });
    }
    static colorByLevel = (type, mmi, mag) => {
        var level = (type === 'geonet') ? mmi : parseInt(mag);
        switch (level) {
            case -2:
                return colors.green
            case -1:
            case 0:
                return colors.orange1
            case 1:
            case 2:
                return colors.orange2
                break;
            case 3:
                return colors.orange3
                break;
            case 4:
                return colors.orange4
                break;
            case 5:
                return colors.orange5
                break;
            case 6:
                return colors.orange6
                break;
            case 7:
            case 8:
                return colors.orange7
                break;
            default:
                return colors.orange7
        }
    }

    static bind = (context) => (...methods) => (methods.forEach(method => context[method] = context[method].bind(context)));
    static shareText = (message, url) => {
        var shareText = {
            title: 'QuakeChat-Chat,share and help',
            message: message,
            url: url,

        };
        Share.share(shareText, {
            // Android only:
            dialogTitle: 'QuakeChat',
            // iOS only:

        })
    }

    static netWorkError = () => {
        Alert.alert(
            'Network unavailable',
            `The Internet connection appears to be offline!!!`,
            [
                {text: 'OK'},
            ],
            {cancelable: false}
        )
    }
    static infoAlert = (title, message) => {
        Alert.alert(
            title,
            message,
            [
                {text: 'OK'},
            ],
            {cancelable: false}
        )
    }
    static showError = (error) => {
        Alert.alert(
            'Error',
            `The error message:${error}`,
            [
                {text: 'OK'},
            ],
            {cancelable: false}
        )
    }

    static notificationGenerator = () => {
        AsyncStorage.getItem("ruleValue").then((value) => {
            console.log('rulevalue is ', value)
            AsyncStorage.getItem("notificationQuakesData")
                .then(req => JSON.parse(req))
                .then((notificationQuakes) => {
                    if (notificationQuakes.length >= 1) {
                        var lastNotifiedTimeType = notificationQuakes[0].apiType + 'LastNotifiedTime';
                        var j = 1;
                        AsyncStorage.getItem("dataSource").then((value) => {
                            if (value) {
                                if (notificationQuakes.length >= 1) {
                                    // goBack(null);

                                    AsyncStorage.getItem(lastNotifiedTimeType).then((notificateTime) => {

                                        if (notificateTime) {
                                            if (notificateTime > 0) {
                                                var lastTime;

                                                for (var i = 0, len = notificationQuakes.length; i < len; i++) {

                                                    if (parseInt(notificateTime) < notificationQuakes[i].timeStamp) {
                                                        PushNotification.localNotification({//
                                                            title: 'hello', // (required)
                                                            message: notificationQuakes[0].message,
                                                            number: j,
                                                            playSound: true,
                                                            foreground: true,
                                                        });
                                                    }

                                                }
                                                //
                                                // const {navigate} = this.props.navigation;
                                                // navigate('QuakesList');

                                                lastTime = notificationQuakes.find(function (el) {
                                                    return (el.timeStamp > parseInt(notificateTime))
                                                });
                                                // console.log('lastTime ', lastTime)
                                                if (lastTime) {
                                                    AsyncStorage.setItem(lastNotifiedTimeType, (lastTime.timeStamp).toString());
                                                }

                                                // this.setState({navigateScreen: 'QuakesList'})
                                            }


                                        } else {
                                            console.log('called notification', notificateTime)

                                            PushNotification.localNotification({//
                                                title: 'hello', // (required)
                                                message: notificationQuakes[0].message,
                                                number: j,
                                                playSound: true,
                                                foreground: true,
                                            });
                                            AsyncStorage.setItem(lastNotifiedTimeType, (notificationQuakes[0].timeStamp).toString());
                                        }

                                    });

                                }
                            }


                        });
                    }
                });
        });
    }
    static renderOffline = () => {
        return (
            <View style={showInfo.container}><Text style={showInfo.text}>Offline: Cannot Connect to App.</Text></View>

        )
    }
    static renderLoadingView = () => {
        return (
            <ScrollView>
                <Text>Loading...</Text>
            </ScrollView>
        )
    }


}