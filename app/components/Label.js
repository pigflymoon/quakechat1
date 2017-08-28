import React from 'react';
import {Text, View} from 'react-native';
import listStyle from '../styles/list';

const Label = props => (
    <View style={listStyle.label}>
        <Text style={listStyle.text}>
            {props.text}
        </Text>
    </View>
);

Label.propTypes = {
    text: React.PropTypes.string.isRequired,
};

export default Label;
