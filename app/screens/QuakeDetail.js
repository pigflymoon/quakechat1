import React, {Component} from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    Clipboard,
    ToastAndroid,
    AlertIOS
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import colors from '../styles/colors';
import quakeStyle from '../styles/quake';
import navigationStyle from '../styles/navigation';
import {Icon, Header} from 'react-native-elements';
import Share, {ShareSheet, Button} from 'react-native-share';
import QuakeMap from '../components/QuakeMap';
import ShareInfo from '../components/ShareInfo';
var shareOptions;
var visible = false;
export default class QuakeDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            visible: false,
        };
    }

    onQuakeQuality = (quake) => {
        this.props.navigation.navigate('Quality', quake);
    };


    shouldComponentUpdate(nextProps, nextState) {
        var isConnected = nextProps.navigation.state.params.isConnected
        if (isConnected) {
            this.setState({isConnected: isConnected});
            return true;
        }
        return false;
    }


    render() {
        const {isConnected, quake,share} = this.props.navigation.state.params;
        console.log('navigation', this.props.navigation)
        // const { state, setParams } = navigation;
        // const { visible } = state;
        console.log('param',this.props.navigation.state.params)
        var time = quake.time;
        var magnitude = quake.magnitude;
        var locality = quake.locality;
        var message = `${time} happened ${magnitude} earthquake in ${locality}`;
        shareOptions = {
            title: "Quake Chat",
            message: message,
            url: "http://facebook.github.io/react-native/",
            subject: "Share Link" //  for email
        };
        // Share.open(shareOptions);
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
                        <ListItem
                            title="Quality"
                            rightTitle={quake.quality}
                            rightTitleStyle={quakeStyle.linkTitle}
                            hideChevron
                            onPress={() => this.onQuakeQuality(quake.quality)}
                        />
                    </List>
                    <ShareInfo shareOptions={shareOptions} visible={share}/>

                </ScrollView>
            </View>
        )
    }
}

QuakeDetail.navigationOptions = props => {
    const {navigation} = props;
    const {state, setParams} = navigation;
    const {params} = state;

    return {
        // Render a button on the right side of the header.

        headerRight: (
            <Icon name='share' type='font-awesome' size={18} color={colors.primary1} style={navigationStyle.rightTitle}
                  onPress={() =>
                      setParams({share: props.navigation.state.params.share === true ? false : true})
                  }
            />

        ),
    };
};
