import React, {Component} from 'react';
import {
    Slider,
    Text,
    StyleSheet,
    View,
} from 'react-native';


export default  class QuakeSlider extends Component {
    static defaultProps = {
        value: 1,
    };

    constructor(props, context) {
        super(props, context)
    }

    state = {
        value: this.props.value,
    };

    render() {
        return (
            <View>
                <Text style={styles.text}>
                    MMI: {this.state.value && +this.state.value.toFixed(1)}
                </Text>
                <Slider
                    {...this.props}
                    onValueChange={(value) => {
                        this.setState({value: value});
                        this.props.onChooseLevel(value);
                    }}/>
            </View>
        );
    }
}


var styles = StyleSheet.create({
    slider: {
        height: 10,
        margin: 10,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
        paddingTop: 10,
    },
});



