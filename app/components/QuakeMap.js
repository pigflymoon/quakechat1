import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions
} from 'react-native';
import {Card,List, ListItem} from 'react-native-elements';

import MapView from 'react-native-maps';
import axios from 'axios';
import CustomCallout from './CustomCallout'
import showInfo from '../styles/showInfo';

import map from '../styles/map';
import callout from '../styles/callout';

import {colorByMmi} from '../utils/utils';
import {fetchQuakesByApi} from '../utils/FetchQuakesByApi';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE = -39.900557;
const LONGITUDE = 172.885971;
const LATITUDE_DELTA = 18;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var markersData = [];

export default class QuakeMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quakes: [],
            error: null,
            isConnected: false,
            marker1: true,
            marker2: false,
            pincolor: colorByMmi(2),


        };
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     var isConnected = nextProps.isConnected;
    //     if (isConnected) {
    //         this.setState({isConnected: isConnected});
    //         return true;
    //     }
    //     return false;
    // }

    componentWillReceiveProps(nextProps) {
        var isConnected = nextProps.isConnected;//update netinfo
        this.setState({isConnected: isConnected});
        if (this.props.type && this.props.type == "SliderMap") {
            this.loadMapInfo(nextProps)
        }
    }

    componentDidMount() {
        this.setState({isConnected: this.props.isConnected})
        if (this.props.isConnected) {
            if (this.props.type && this.props.type == "SliderMap") {
                this.loadMapInfo("");
            } else {
                this.loadFeatures("");
            }
        }
    }


    loadMapInfo(nextProps) {
        let self = this;
        let url = self.props.nps_source;

        if (nextProps) {
            url = url + nextProps.level;
        } else {
            url = url + self.props.level;
        }
        //callback to get quakes
        fetchQuakesByApi(url, function (quakes) {
            self.setState({
                    quakes: quakes,
                    error: null,
                    mapType: 'Map',
                    // region: {
                    //     latitude: LATITUDE,
                    //     longitude: LONGITUDE,
                    //     latitudeDelta: LATITUDE_DELTA,
                    //     longitudeDelta: LONGITUDE_DELTA,
                    // }

                }
            );
        })
        console.log(self.refs.MapView);
    }

    loadFeatures() {
        markersData = [];

        let post = this.props.mapInfo;

        markersData.push(post.quake);
        console.log('markersData', markersData)
        this.setState({
                quakes: markersData,
                error: null,
                mapType: 'detail'
            }
        );
    }


    // onQuakeDetail = (isConnected, quake, backScreen) => {
    //     if (backScreen == 'Map') {
    //         console.log('quake', quake)
    //         // this.hideCallout();
    //         // this.props.navigation.navigate('Detail', {isConnected, quake, backScreen});
    //
    //     } else {
    //         return false;
    //     }
    // };

    renderPosts() {
        if (this.state.error) {
            return this.renderError();
        }

        return (
            <MapView
                ref="MapView"
                style={map.map}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={false}
                rotateEnabled={false}
                showsScale
                loadingEnabled={true}
                region={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}>

                {this.state.quakes.map((quake, index) => (
                    <MapView.Marker style={map.marker}
                                    coordinate={quake.coordinates}
                                    key={`quake-${index}`}
                                    pinColor={colorByMmi(quake.mmi)}
                    >
                        <MapView.Callout style={callout.container}>

                            <Card style={callout.card} title='Quake detail'>

                                    <ListItem
                                        hideChevron
                                        title={`Time: ${quake.time}`}
                                    />
                                    <ListItem
                                        hideChevron
                                        title={`Locality:${quake.locality}`}
                                    />
                                    <ListItem
                                        hideChevron
                                        title={`Depth: ${quake.depth}`}
                                    />
                                    <ListItem
                                        hideChevron
                                        title={`Magnitude: ${quake.magnitude}`}
                                    />
                                    <ListItem
                                        hideChevron
                                        title={`mmi:${quake.mmi}`}
                                    />



                            </Card>

                        </MapView.Callout>

                    </MapView.Marker>
                ))}

            </MapView>
        );
    }


    renderError() {
        return (
            <Text>
                Uh oh: {this.state.error.message}
            </Text>
        );
    }

    renderOffline = () => {
        return (
            <View style={showInfo.container}><Text style={showInfo.text}>Offline: Cannot Connect to App.</Text></View>
        )
    }

    render() {
        var isConnected = this.props.isConnected;
        if (!isConnected) {
            return this.renderOffline();
        }
        return (
            <View style={map.container}>
                { this.renderPosts()}
            </View>
        )
    }
}

