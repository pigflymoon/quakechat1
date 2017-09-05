import React, {Component} from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    Share,
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
            isConnected: false,
        };
    }

    onQuakeQuality = (quake) => {
        this.props.navigation.navigate('Quality', quake);
    };

    componentDidMount() {
        this.props.navigation.setParams({handleShare: this.onShare})
    }

    componentWillReceiveProps(nextProps) {
        var isConnected = nextProps.navigation.state.params.isConnected
        this.setState({isConnected: isConnected});
    }

    componentWillUnmount() {
        console.log('detail will unmount')
    }

    onShare = (message, url) => {
        Utils.shareText(message, url)
    }

    render() {
        const {isConnected, quake} = this.props.navigation.state.params;
        console.log('detail ', this.props.screenProps.currentScreen)
        if (this.props.screenProps.currentScreen !== 'Detail') {
            console.log('not detail')
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

                        {quake.apiType === 'geonet' ? (
                                <ListItem
                                    title="Quality"
                                    rightTitle={quake.quality}
                                    rightTitleStyle={quakeStyle.linkTitle}
                                    hideChevron
                                    onPress={() => this.onQuakeQuality(quake.quality)}
                                />
                            ) : null
                        }
                    </List>
                </ScrollView>
            </View>
        )
    }
}

QuakeDetail.navigationOptions = props => {
    const {quake} = props.navigation.state.params;
    const {params = {}} = props.navigation.state
    var time = quake.time;
    var magnitude = quake.magnitude;
    var locality = quake.locality;
    var message = `${time} happened ${magnitude} earthquake in ${locality} by @QuakeChat `;
    const url = Config.share.url;

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
