import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Utils from '../utils/utils';
import quakeStyle from '../styles/quake';

export default class QuakeItem extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('quake re-render?', nextProps.quake.time !== this.props.quake.time)
        return nextProps.quake.time !== this.props.quake.time
    }

    onQuakeDetail = (isConnected, quake) => {
        this.props.navigation.navigate('Detail', {isConnected, quake});
    };

    onQuakeColor = (type, mmi, mag) => {
        console.log('quake color',type)
        if (type === 'usgs') {
            return Utils.colorByMag(mag)
        }
        return Utils.colorByMmi(mmi)
    }

    render() {
        let {quake, isConnected} = this.props;
        console.log('data',quake)
        return (
            <ListItem
                leftIcon={{
                    name: 'map-marker',
                    type: 'font-awesome',
                    size: 35,
                    color: this.onQuakeColor(quake.apiType, quake.mmi, quake.magnitude)
                }}
                title={`NZST: ${quake.time}`}
                subtitle={
                    <View style={quakeStyle.info}>
                        <Text>Magnitude: {quake.magnitude}</Text>
                        <Text>Depth: {quake.depth}</Text>
                        <Text>Locality: {quake.locality}</Text>
                    </View>
                }

                onPress={() => this.onQuakeDetail(isConnected, quake)}
            />
        )
    }
}
