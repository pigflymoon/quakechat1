import React, {Component} from 'react';
import {View,ScrollView} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Utils from '../utils/utils';
import ResourcesConfig from '../config/ResourcesConfig';

export default class ResourcesList extends Component {

    render() {
        return (
            <View>
                <List containerStyle={{borderTopWidth: 0}}>
                    {ResourcesConfig.quake_resources.map((project,index) =>
                        <ListItem
                            rightIcon={{name: 'open-in-new'}}
                            key={`index-${project.name}`}
                            title={project.name}
                            onPress={() => {
                                Utils.goToURL(project.link);
                            }}
                        />,
                    )}
                </List>

            </View>
        );
    }
}

