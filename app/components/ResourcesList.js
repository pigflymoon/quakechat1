import React, {Component} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Utils from '../utils/utils';
import ResourcesConfig from '../config/ResourcesConfig';

export default class ResourcesList extends Component {

    keyExtractor = (item, index) => `key${index}`;
    renderList = ({item, index}) => {
        return (
            <ListItem
                rightIcon={{name: 'open-in-new'}}
                key={`index-${item.name}`}
                title={item.name}
                onPress={() => {
                    Utils.goToURL(item.link);
                }}
            />
        )
    }

    render() {
        return (
            <View>
                <List containerStyle={{borderTopWidth: 0}}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={ResourcesConfig.quake_resources}
                        renderItem={this.renderList}
                    />
                </List>

            </View>
        );
    }
}

