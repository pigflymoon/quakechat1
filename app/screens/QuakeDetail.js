import React, {Component} from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    Share,
    Button,
} from 'react-native';
import {List, ListItem, Icon} from 'react-native-elements';
import colors from '../styles/colors';
import quakeStyle from '../styles/quake';
import navigationStyle from '../styles/navigation';
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
        this.props.navigation.setParams({handleShare: this.onShare})
    }

    componentWillReceiveProps(nextProps) {
        console.log('detail props called')
        var isConnected = nextProps.navigation.state.params.isConnected;
        this.setState({isConnected: isConnected});
    }

    onShare = (message, url) => {
        Utils.shareText(message, url)
    }

    render() {
        const {isConnected, quake} = this.props.navigation.state.params;

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
                            rightTitleNumberOfLines={2}
                            hideChevron
                        />
                        <ListItem
                            title="Time"
                            rightTitle={quake.time}
                            rightTitleStyle={quakeStyle.rightTitle}
                            rightTitleNumberOfLines={2}
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
                            rightTitle={`${((quake.coordinates).latitude).toFixed(1)}`}
                            rightTitleStyle={quakeStyle.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Longitude"
                            rightTitle={`${((quake.coordinates).longitude).toFixed(1)}`}
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
    const {quake} = props.navigation.state.params;
    const {params = {}} = props.navigation.state
    var message = quake.message + 'by @QuakeChat';
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
