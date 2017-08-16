import React, {Component} from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    Clipboard,
    ToastAndroid,
    AlertIOS,
    TouchableHighlight,
    Share,
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import colors from '../styles/colors';
import quakeStyle from '../styles/quake';
import navigationStyle from '../styles/navigation';
import {Icon, Header} from 'react-native-elements';

import QuakeMap from '../components/QuakeMap';


export default class QuakeDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
        };
    }

    onQuakeQuality = (quake) => {
        this.props.navigation.navigate('Quality', quake);
    };


    _shareMessage() {
        Share.share({
            message: 'React Native | A framework for building native apps using React'
        })
            .then(this._showResult)
            .catch((error) => this.setState({result: 'error: ' + error.message}));
    }

    _shareText() {
        Share.share({
            message: 'A framework for building native apps using React',
            url: 'http://facebook.github.io/react-native/',
            title: 'React Native'
        }, {
            dialogTitle: 'Share React Native website',
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ],
            tintColor: 'green'
        })
            .then(this._showResult)
            .catch((error) => this.setState({result: 'error: ' + error.message}));
    }

    _showResult(result) {
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                this.setState({result: 'shared with an activityType: ' + result.activityType});
            } else {
                this.setState({result: 'shared'});
            }
        } else if (result.action === Share.dismissedAction) {
            this.setState({result: 'dismissed'});
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        var isConnected = nextProps.navigation.state.params.isConnected
        if (isConnected) {
            this.setState({isConnected: isConnected});
            return true;
        }
        return false;
    }


    render() {
        const {isConnected, quake, share} = this.props.navigation.state.params;
        var time = quake.time;
        var magnitude = quake.magnitude;
        var locality = quake.locality;
        var message = `${time} happened ${magnitude} earthquake in ${locality}`;
        var shareOptions = {
            title: "Quake Chat",
            message: message,
            url: "http://facebook.github.io/react-native/",
            subject: `${magnitude} earthquake` //  for email
        };

        return (
            <View style={quakeStyle.container}>

                <ScrollView style={StyleSheet.absoluteFill}
                            contentContainerStyle={quakeStyle.scrollview}>
                    <QuakeMap style={quakeStyle.map} mapInfo={this.props.navigation.state.params}
                              isConnected={isConnected}/>

                    <List style={quakeStyle.detail}>
                        <ListItem
                            title="Universal Time"
                            rightTitle={quake.utime}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Time"
                            rightTitle={quake.time}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Magnitude"
                            rightTitle={quake.magnitude}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Depth"
                            rightTitle={quake.depth}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Latitude"
                            rightTitle={`${(quake.coordinates).latitude}`}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Longitude"
                            rightTitle={`${(quake.coordinates).longitude}`}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Location"
                            rightTitle={quake.locality}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        {/*<ListItem*/}
                            {/*title="Quality"*/}
                            {/*rightTitle={quake.quality}*/}
                            {/*rightTitleStyle={quakeStyle.linkTitle}*/}
                            {/*hideChevron*/}
                            {/*onPress={() => this.onQuakeQuality(quake.quality)}*/}
                        {/*/>*/}
                    </List>
                    <View>
                        <TouchableHighlight
                            onPress={this._shareMessage}>
                            <View >
                                <Text>Click to share message</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={this._shareText}>
                            <View >
                                <Text>Click to share message, URL and title</Text>
                            </View>
                        </TouchableHighlight>
                        <Text>{this.state.result}</Text>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

QuakeDetail.navigationOptions = props => {
    const {navigation} = props;
    const {state, setParams} = navigation;
    const {params} = state;
    const {share} = params;

    return {
        // Render a button on the right side of the header.

        headerRight: (
            <Icon name='share' type='font-awesome' size={18} color={colors.primary1} style={navigationStyle.rightTitle}
                  onPress={() =>
                      setParams({share: true})
                  }
            />

        ),
    };
};
