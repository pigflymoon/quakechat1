import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
import axios from 'axios';
import CustomCallout from './CustomCallout'
import showInfo from '../styles/showInfo';

import map from '../styles/map';

import {colorByMmi} from '../utils/utils';
const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE = -39.900557;
const LONGITUDE = 172.885971;
const LATITUDE_DELTA = 18;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import flagBlueImg from '../images/flag-blue.png';
import flagPinkImg from '../images/flag-pink.png';

var markersData = [];

export default class QuakeMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            markers: [],
            loading: true,
            error: null,
            isConnected: false,
            marker1: true,
            marker2: false,
            pincolor: colorByMmi(2),

        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('map net work is update ', nextProps.isConnected)
        var isConnected = nextProps.isConnected;
        if (isConnected) {
            this.setState({isConnected: isConnected});
            return true;
        }
        return false;
    }

    componentWillReceiveProps(nextProps) {
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
        let self = this
        let url = self.props.nps_source

        if (nextProps) {
            url = url + nextProps.level;
        } else {
            url = url + self.props.level;
        }
        axios.get(url)
            .then(function (result) {
                // console.log('slider map  and url', url)
                markersData = [];
                for (let post of result.data.features) {
                    let time = post.properties.time;
                    time = new Date(time);
                    time = time.toString().split('GMT')[0];
                    var marker = {
                        locality: post.properties.locality,
                        time: time,
                        depth: post.properties.depth.toFixed(1) + ' km',
                        magnitude: post.properties.magnitude.toFixed(1),
                        mmi: post.properties.mmi,
                        coordinates: {
                            longitude: post.geometry.coordinates[0],
                            latitude: post.geometry.coordinates[1]
                        }

                    };
                    markersData.push(marker);
                } // for

                // markersData['coordinates'] = coordinates;
                // console.log('markersData', markersData)
            }); //then

        this.setState({
                markers: markersData,
                loading: false,
                error: null
            }
        );


    }

    loadFeatures() {
        markersData = [];
        let post = this.props.mapInfo;
        var marker = {
            locality: post.properties.locality,
            time: post.properties.time,
            depth: post.properties.depth,
            magnitude: post.properties.magnitude,
            mmi: post.properties.mmi,
            coordinates: {
                longitude: post.geometry.coordinates[0],
                latitude: post.geometry.coordinates[1]
            }
        };
        markersData.push(marker);
        this.setState({
                markers: markersData,
                loading: false,
                error: null
            }
        );
    }

    handleMarker(marker, e) {
        console.log(text);
        this.setState({pincolor:colorByMmi(5)})
    }

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
                initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}>

                {this.state.markers.map((marker, index) => (
                    <MapView.Marker style={map.marker}
                                    coordinate={marker.coordinates}
                                    key={`marker-${index}`}
                                    pinColor={colorByMmi(marker.mmi)}
                                    onPress={(data) => {
                                        var coord = data.nativeEvent.coordinate;
                                        coord.latitude += 0.006;
                                        this.refs.MapView.animateToRegion({ latitude: coord.latitude, longitude: coord.longitude, latitudeDelta: 1.5, longitudeDelta: 1.2 }, 1500);
                                    }}

                    >
                        <MapView.Callout tooltip={true}>
                            <CustomCallout>
                                <Text
                                    style={map.info}>{`Time: ${marker.time}`}
                                </Text>
                                <Text
                                    style={map.info}>{`Locality:${marker.locality}`}
                                </Text>
                                <Text
                                    style={map.info}>{`Depth: ${marker.depth}`}
                                </Text>
                                <Text
                                    style={map.info}>{`mmi:${marker.mmi} Magnitude: ${marker.magnitude}`}
                                </Text>
                            </CustomCallout>
                        </MapView.Callout>

                    </MapView.Marker>
                ))}

            </MapView>
        );
    }

    renderLoading() {
        return <Text>Loading...</Text>;
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
                {this.state.loading ?
                    this.renderLoading()
                    : this.renderPosts()}
            </View>
        )
    }
}

