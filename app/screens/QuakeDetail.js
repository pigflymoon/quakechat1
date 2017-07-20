import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, Text} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import QuakeMap from '../components/QuakeMap';

export default class QuakeDetail extends Component {
    onQuakeQuality = (quake) => {
        this.props.navigation.navigate('Quality', quake);
    };
    render() {
        const {geometry, properties, utime} = this.props.navigation.state.params;
        return (
            <View style={styles.container}>

                <ScrollView style={StyleSheet.absoluteFill}
                            contentContainerStyle={styles.scrollview}>
                    <QuakeMap style={styles.map} mapInfo={this.props.navigation.state.params}/>


                    <List style={styles.detail}>
                        <ListItem
                            title="Universal Time"
                            rightTitle={utime}
                            rightTitleStyle={styles.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Time"
                            rightTitle={properties.time}
                            rightTitleStyle={styles.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Magnitude"
                            rightTitle={properties.magnitude}
                            rightTitleStyle={styles.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Latitude"
                            rightTitle={(geometry.coordinates)[1].toFixed(2)}
                            rightTitleStyle={styles.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Longitude"
                            rightTitle={(geometry.coordinates)[0].toFixed(2)}
                            rightTitleStyle={styles.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Location"
                            rightTitle={properties.locality}
                            rightTitleStyle={styles.rightTitle}
                            hideChevron
                        />
                        <ListItem
                            title="Quality"
                            rightTitle={properties.quality}
                            rightTitleStyle={styles.linkTitle}
                            hideChevron
                            onPress={() => this.onQuakeQuality(properties.quality)}
                        />

                    </List>


                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollview: {
        flex: 1,
        flexDirection: 'column',
    },
    map: {
        flexGrow: 2,
        flexBasis: 200,
    },
    detail: {
        flexGrow: 1,
        flexBasis: 200,

    },
    rightTitle: {
        color: colors.grey1,
    },
    linkTitle:{
        color:colors.primary1
    }
});