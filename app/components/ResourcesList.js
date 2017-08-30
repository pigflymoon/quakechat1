import React, {Component} from 'react';
import {View,ScrollView} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Utils from '../utils/utils';
import ResourcesConfig from '../config/ResourcesConfig';

export default class ResourcesList extends Component {

    render() {

        const resources = [
            {
                name: 'Earthquake Commission',
                link: 'https://www.eqc.govt.nz/',
            },
            {
                name: 'GeoNet',
                link: 'http://www.geonet.org.nz/',
            },
            {
                name: 'Natural Hazards Centre',
                link: 'https://www.naturalhazards.org.nz/',
            },
            {
                name: 'Community Resilience',
                link: 'http://www.resilience.org.nz/',
            },
            {
                name: 'GNS',
                link: 'https://www.gns.cri.nz/Home/Our-Science/Natural-Hazards/Earthquakes',
            },
            {
                name: 'MBIE',
                link: 'http://www.mbie.govt.nz/info-services/nz-govt-procurement-and-property/government-property-group/new-zealand-earthquake',
            },

        ];

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

