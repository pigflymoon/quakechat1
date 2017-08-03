import React, {Component} from 'react';
import {
    Slider,
    Text,
    StyleSheet,
    View,
    Alert,
} from 'react-native';
import slider from '../styles/slider';


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

    handlerSlide = (value) => {
        this.setState({value: value});
        this.props.onChooseLevel(value);
    }


    render() {
        return (
            <View>
                <Text style={slider.text}>
                    MMI: {this.state.value && +this.state.value.toFixed(1)}
                </Text>
                <Slider
                    {...this.props}
                    onValueChange={this.handlerSlide}/>
            </View>
        );
    }
}



