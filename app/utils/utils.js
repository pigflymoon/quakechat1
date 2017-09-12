import colors from '../styles/colors';
import {
    Alert,
    Linking,
    Share,
} from 'react-native';


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
    static colorByLevel= (type, mmi, mag) => {
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
            `The Internet connection appears to be offline`,
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


}