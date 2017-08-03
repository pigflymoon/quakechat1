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
            loading: true,
            error: null,
            isConnected: false,
            marker1: true,
            marker2: false,
            pincolor: colorByMmi(2),

        };
        // console.log('navigate', this.props.navigation)
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('map net work is update ', nextProps.isConnected)
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
                // console.log('slidermap')
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
                    loading: false,
                    error: null,
                    mapType: 'Map'
                }
            );
        })


    }

    loadFeatures() {
        markersData = [];

        let post = this.props.mapInfo;
        var marker = post.quake
        markersData.push(post.quake);
        this.setState({
                quakes: markersData,
                loading: false,
                error: null,
                mapType: 'detail'
            }
        );
    }

    handleMarker = (data) => {
        var coord = data.nativeEvent.coordinate;
        coord.latitude += 0.006;
        this.refs.MapView.animateToRegion({
            latitude: coord.latitude,
            longitude: coord.longitude,
            latitudeDelta: 1.5,
            longitudeDelta: 1.2
        }, 1500);
        // this.props.navigation.navigate('Quality', 'test');


    }
    onQuakeDetail = (isConnected, quake, backScreen) => {
        if (backScreen == 'Map') {
            this.props.navigation.navigate('Detail', {isConnected, quake, backScreen});

        } else {
            return false;
        }
    };

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

                {this.state.quakes.map((quake, index) => (
                    <MapView.Marker style={map.marker}
                                    coordinate={quake.coordinates}
                                    key={`quake-${index}`}
                                    pinColor={colorByMmi(quake.mmi)}
                                    onPress={(data) => {
                                        this.handleMarker(data)

                                    }}
                                    onCalloutPress={() => this.onQuakeDetail(true, quake, this.state.mapType)}

                    >
                        <MapView.Callout tooltip={true}>
                            <CustomCallout>
                                <Text
                                    style={map.info}>{`Time: ${quake.time}`}
                                </Text>
                                <Text
                                    style={map.info}>{`Locality:${quake.locality}`}
                                </Text>
                                <Text
                                    style={map.info}>{`Depth: ${quake.depth}`}
                                </Text>
                                <Text
                                    style={map.info}>{`Magnitude: ${quake.magnitude}`}
                                </Text>
                                <Text
                                    style={map.info}>{`mmi:${quake.mmi}`}
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

