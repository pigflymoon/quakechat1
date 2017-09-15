import React, {Component} from 'react';
import PushNotification from 'react-native-push-notification';
import {NavigationActions} from 'react-navigation'
export default class PushController extends Component {
    constructor(props, context) {
        super(props, context);
        console.log('props', props)
    }

    componentDidMount() {


        var self = this;
        const {navigate} = this.props.navigation;

        PushNotification.configure({
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
                notification.foreground = true;
                notification.userInteraction = false;
                //
                // navigate('Settings', "");

            },

        });

    }

    render() {



        // const navigateAction = NavigationActions.navigate({
        //     routeName: 'Settings',
        //     params: {},
        //
        //     // navigate can have a nested navigate action that will be run inside the child router
        //     action: NavigationActions.navigate({ routeName: 'Settings'})
        // })
        // this.props.navigation.dispatch(navigateAction)
        return null;
    }
}