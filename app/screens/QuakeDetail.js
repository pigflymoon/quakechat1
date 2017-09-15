import React, {Component} from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    Share,
    Button,
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import colors from '../styles/colors';
import quakeStyle from '../styles/quake';
import navigationStyle from '../styles/navigation';
import {Icon} from 'react-native-elements';
import Utils from '../utils/utils';
import Config from '../config/ApiConfig';

import QuakeMap from '../components/QuakeMap';

export default class QuakeDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isConnected: true,
        };
    }

    componentDidMount() {
        console.log('share', this.props.navigation)
        this.props.navigation.setParams({handleShare: this.onShare})
    }

    componentWillReceiveProps(nextProps) {
        var isConnected = nextProps.navigation.state.params.isConnected;
        this.setState({isConnected: isConnected});
    }

    onShare = (message, url) => {
        Utils.shareText(message, url)
    }

    render() {
        const {isConnected, quake} = this.props.navigation.state.params;
        console.log('detail quake', quake)

        if (this.props.screenProps.currentScreen !== 'Detail') {
            return <View/>
        }
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
                            title="Location"
                            rightTitle={quake.locality}
                            rightTitleNumberOfLines={2}
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


                    </List>
                </ScrollView>
            </View>
        )
    }
}

QuakeDetail.navigationOptions = props => {
    const {quake, quakeSource} = props.navigation.state.params;
    const {params = {}} = props.navigation.state
    console.log('goback',props.navigation)
    // var time = quake.time;
    // var magnitude = quake.magnitude;
    // var locality = quake.locality;
    var message = quake.message + 'by @QuakeChat';
    // var message = `${time} happened ${magnitude} earthquake in ${locality} by @QuakeChat `;

    const url = Config.share.url;
    if (quakeSource == 'notification') {
        return {
            headerLeft: (
                // <Text></Text>
                 <Button title="Home" onPress={() => props.navigation.goBack(null)} />
            ),
            headerRight: (
                <Icon name='share' type='font-awesome' size={18} color={colors.primary1}
                      style={navigationStyle.rightTitle}
                      onPress={() => {
                          params.handleShare(message, url);
                      }}
                />

            ),
        }


    }
    return {
        // Render a button on the right side of the header.

        headerRight: (
            <Icon name='share' type='font-awesome' size={18} color={colors.primary1} style={navigationStyle.rightTitle}
                  onPress={() => {
                      params.handleShare(message, url);
                  }}
            />

        ),
    };
};
