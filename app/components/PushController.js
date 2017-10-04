import React, {Component} from 'react';
import PushNotification from 'react-native-push-notification';
export default class PushController extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        var self = this;
        const {navigate} = this.props.navigation;

        PushNotification.configure({
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
                notification.foreground = true;
                notification.userInteraction = false;
            },

        });
    }

    render() {
        return null;
    }
}