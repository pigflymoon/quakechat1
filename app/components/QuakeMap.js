import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions
} from 'react-native';
import {Card, List, ListItem} from 'react-native-elements';

import MapView from 'react-native-maps';
import showInfo from '../styles/showInfo';

import map from '../styles/map';
import callout from '../styles/callout';

import Utils from '../utils/utils';
import ResourcesConfig from '../config/ResourcesConfig';
import {fetchQuakesByApi} from '../utils/FetchQuakesByApi';
import colors from '../styles/colors';

var markersData = [];

export default class QuakeMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quakes: [],
            error: null,
            isConnected: true,
            pincolor: colors.orange1,
            loading: true,
            region: {
                latitude: ResourcesConfig.map.latitude,
                longitude: ResourcesConfig.map.longitude,
                latitudeDelta: ResourcesConfig.map.latitude_delta,
                longitudeDelta: ResourcesConfig.map.longitude_delta,
            }
        };
    }

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

        if (nextProps && nextProps.level >= 1) {
            url = url + nextProps.level;
            fetchQuakesByApi(url, function (quakes) {
                console.log('url', url)
                self.setState({
                        loading: false,
                        quakes: quakes,
                        error: null,
                        mapType: 'Map',
                    }
                );
            })
        }
    }

    loadFeatures() {
        markersData = [];
        let post = this.props.mapInfo;
        markersData.push(post.quake);

        this.setState({
                loading: false,
                quakes: markersData,
                error: null,
                mapType: 'detail',
                region: {
                    longitude: post.quake.coordinates.longitude,
                    latitude: post.quake.coordinates.latitude,
                    latitudeDelta: ResourcesConfig.map.latitude_delta,
                    longitudeDelta: ResourcesConfig.map.longitude_delta,
                }
            }
        );
    }

    renderPosts() {
        if (this.state.error) {
            return this.renderError();
        }
        if (this.state.loading) {
            return (
                <MapView
                    ref="MapView"
                    style={map.map}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    pitchEnabled={false}
                    rotateEnabled={true}
                    showsScale
                    cacheEnabled
                    region={this.state.region}
                />
            );
        }

        return (
            <MapView
                ref="MapView"
                style={map.map}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={false}
                rotateEnabled={true}
                showsScale
                region={this.state.region}>
                {this.state.quakes.map((quake, index) => (
                    <MapView.Marker style={map.marker}
                                    coordinate={quake.coordinates}
                                    key={`quake-${index}`}
                                    pinColor={Utils.colorByLevel(quake.apiType, quake.mmi, quake.magnitude)}
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
                                    titleNumberOfLines={2}
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
            <Text> Uh oh: {this.state.error.message}</Text>
        );
    }

    renderOffline = () => {
        return (
            <View style={showInfo.container}><Text style={showInfo.text}>Offline: Cannot Connect to App.</Text></View>
        )
    }

    render() {
        console.log('map called?')
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

