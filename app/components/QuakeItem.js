import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Utils from '../utils/utils';
import listStyle from '../styles/list';

export default class QuakeItem extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('quake re-render?', nextProps.quake.time !== this.props.quake.time)
        return nextProps.quake.time !== this.props.quake.time
    }

    onQuakeDetail = (isConnected, quake) => {
        this.props.navigation.navigate('Detail', {isConnected, quake});
    };

    render() {
        let {quake, isConnected} = this.props;
        return (
            <ListItem
                containerStyle={listStyle.listItem}
                leftIcon={{
                    name: 'map-marker',
                    type: 'font-awesome',
                    size: 35,
                    color: Utils.colorByLevel(quake.apiType, quake.mmi, quake.magnitude)
                }}
                title={`NZST: ${quake.time}`}
                titleStyle={listStyle.title}
                subtitle={
                    <View style={listStyle.info}>
                        <Text style={listStyle.subtitle}>Magnitude: {quake.magnitude}</Text>
                        <Text style={listStyle.subtitle}>Depth: {quake.depth}</Text>
                        <Text style={listStyle.subtitle}>Locality: {quake.locality}</Text>
                    </View>
                }

                onPress={() => this.onQuakeDetail(isConnected, quake)}
            />
        )
    }
}
