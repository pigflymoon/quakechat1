import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
import axios from 'axios';
import CustomCallout from './CustomCallout'

import map from '../styles/map';

import {colorByMmi} from '../utils/utils';
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
            markers: [],
            loading: true,
            error: null
        };


    }

    componentWillReceiveProps(nextProps) {
        if (this.props.type && this.props.type == "SliderMap") {
            this.loadMapInfo(nextProps)
        }

    }

    componentDidMount() {
        console.log('map called')
        if (this.props.type && this.props.type == "SliderMap") {
            this.loadMapInfo("");
        } else {
            // console.log('detail map');
            this.loadFeatures("");
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
        console.log('post', post);
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

    renderPosts() {
        if (this.state.error) {
            return this.renderError();
        }

        return (
            <MapView
                style={map.map}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={false}
                rotateEnabled={false}
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


                    >
                        <MapView.Callout tooltip>
                            <CustomCallout  >
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

    render() {
        return (
            <View style={map.container}>
                {this.state.loading ?
                    this.renderLoading()
                    : this.renderPosts()}
            </View>
        )
    }
}

