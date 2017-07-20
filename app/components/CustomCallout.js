import React, {PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
};

class CustomCallout extends React.Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.bubble}>
                    <View style={styles.amount}>
                        {this.props.children}
                    </View>
                </View>
                <View style={styles.arrowBorder}/>
                <View style={styles.arrow}/>
            </View>
        );
    }
}

CustomCallout.propTypes = propTypes;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        width: 300,
        padding: 15,
        // height: 100,
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: colors.blue1,
        // paddingHorizontal: 20,
        // paddingVertical: 12,
        borderRadius: 6,
        borderColor: colors.blue2,
        borderWidth: 0.5,
    },
    amount: {
        flex: 1,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: colors.blue1,
        alignSelf: 'center',
        marginTop: -32,
        marginLeft: 75,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: colors.blue2,
        alignSelf: 'center',
        marginTop: -0.5,
        marginLeft: 75,
        // marginLeft: 50,
    },
});

module.exports = CustomCallout;