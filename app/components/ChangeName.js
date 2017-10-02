import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Animated,
    Dimensions,
    Alert,
} from 'react-native';
const {width, height} = Dimensions.get("screen");
import firebaseApp from '../config/FirebaseConfig';
import Utils from '../utils/utils';

import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedInfo from './AnimatedInfo';
import colors from '../styles/colors';
import edit from '../styles/edit';
import showInfo from '../styles/showInfo';
import navigationStyle from '../styles/navigation';

export default class ChangeName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',


        };
    }


    render() {

        return (
            <View style={[edit.container, edit.whiteBg]}>
                <View resizeMode="cover">
                    <View style={edit.wrapper}>
                        <View style={edit.inputWrap}>
                            <View style={edit.iconWrap}>
                                <Text style={edit.textItem}>Name</Text>
                            </View>
                            <TextInput
                                placeholderTextColor={colors.grey2}
                                placeholder="Current Name"
                                style={edit.input}
                                secureTextEntry
                                onChangeText={(text) => this.setPassword(text)}
                                value={this.state.password}
                            />
                        </View>


                    </View>


                </View>
            </View>
        );
    }
}

ChangeName.navigationOptions = props => {

    return {
        // Render a button on the right side of the header.
        headerLeft: (
            <View style={[navigationStyle.rightContainer, navigationStyle.containerPadding]}>

                <TouchableOpacity activeOpacity={.5} onPress={() => {
                    props.navigation.navigate('Edit')
                }}>
                    <View >
                        <Text style={edit.buttonText}>Cancel</Text>
                    </View>
                </TouchableOpacity>
            </View>


        ),
        headerRight: (
            <View style={[navigationStyle.rightContainer, navigationStyle.containerPadding]}>
                <TouchableOpacity activeOpacity={.5} onPress={() => {
                    props.navigation.navigate('Edit')
                }}>
                    <View >
                        <Text style={edit.buttonText}>Done</Text>
                    </View>
                </TouchableOpacity>
            </View>


        ),
    };
};