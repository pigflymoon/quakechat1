import React, {Component} from 'react';
import {
    Slider,
    Text,
    View,
    Alert,
} from 'react-native';
import slider from '../styles/slider';
export default  class QuakeSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            level: 0,
            isConnected: true,
            value: ''
        };
    }

    handlerSlide = (value) => {
        this.setState({value: value.toFixed()});
        console.log('value is ',value.toFixed())
        this.props.onChooseLevel(value);
    }

    render() {
        return (
            <View>
                <Text style={slider.text}>
                    MMI: {this.state.value}
                </Text>
                <Slider
                    {...this.props}
                    onValueChange={this.handlerSlide}/>
            </View>
        );
    }
}



