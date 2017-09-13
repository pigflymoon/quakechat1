import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import QuakeMap from '../components/QuakeMap';
import QuakeSlider from '../components/QuakeSlider';
import quakeStyle from '../styles/quake';
import showInfo from '../styles/showInfo';
import Config from '../config/ApiConfig';

export default class QuakesMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            level: 0,
            isConnected: true,
        };
    }


    componentWillReceiveProps(nextProps) {
        var isConnected = nextProps.screenProps.isConnected;//update netinfo
        this.setState({isConnected: isConnected});
    }

    handleChooseLevel = (stat) => {
        // console.log('stat level is ',stat);
        if (stat <= 3) {
            this.setState({level: 3});
        } else if (stat <= 4) {
            this.setState({level: 4})
        } else if (stat <= 5) {
            this.setState({level: 5})
        } else if (stat <= 6) {
            this.setState({level: 6})
        } else {
            this.setState({level: 7})
        }

    }

    renderOffline = () => {
        return (
            <View style={showInfo.container}><Text style={showInfo.text}>Offline: Cannot Connect to App.</Text></View>

        )
    }
    renderQuakes = () => {
        return (
            <View style={quakeStyle.quakesContainer}>
                <QuakeMap type="SliderMap"
                          nps_source={Config.api.quakes_geonet_url}
                          level={this.state.level}
                          isConnected={this.props.screenProps.isConnected}
                          navigation={this.props.navigation}
                />

                <View>
                    <QuakeSlider style={quakeStyle.sliderLabel}
                                 onChooseLevel={this.handleChooseLevel}
                                 minimumValue={1}
                                 maximumValue={7}
                                 step={1}
                                 isConnected={this.props.screenProps.isConnected}
                    />
                </View>
            </View>
        )

    }

    render() {
        var isConnected = this.props.screenProps.isConnected;
        if (!isConnected) {
            return this.renderOffline();
        }
        var currentScreen = this.props.screenProps.currentScreen;
        if (currentScreen !== 'Map') {
            return null;
        }
        return this.renderQuakes();

    }

}
