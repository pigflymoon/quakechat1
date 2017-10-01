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

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',


        };
    }



    render() {

        return (
            <View style={edit.container}>
                <View style={{width: this.state.width, height: this.state.height, backgroundColor: colors.white}}
                      resizeMode="cover">

                    <View style={edit.wrapper}>


                        <View style={edit.inputWrap}>
                            <View style={edit.iconWrap}>
                              <Text style={edit.textItem}>Current</Text>
                            </View>
                            <TextInput
                                placeholderTextColor={colors.grey2}
                                placeholder="Current password"
                                style={edit.input}
                                secureTextEntry
                                onChangeText={(text) => this.setPassword(text)}
                                value={this.state.password}
                            />
                        </View>
                        <View style={edit.inputWrap}>
                            <View style={edit.iconWrap}>
                                <Text style={edit.textItem}>New</Text>
                            </View>
                            <TextInput
                                placeholderTextColor={colors.grey2}
                                placeholder="New password"
                                style={edit.input}
                                secureTextEntry
                                onChangeText={(text) => this.setPassword(text)}
                                value={this.state.password}
                            />
                        </View>
                        <View style={edit.inputWrap}>
                            <View style={edit.iconWrap}>
                                <Text style={edit.textItem}>Verify</Text>
                            </View>
                            <TextInput
                                placeholderTextColor={colors.grey2}
                                placeholder="New password again"
                                style={edit.input}
                                secureTextEntry
                                onChangeText={(text) => this.setPassword(text)}
                                value={this.state.password}
                            />
                        </View>

                        <TouchableOpacity activeOpacity={.5} onPress={this.handleSignin}>
                            <View style={edit.button}>
                                <Text style={edit.buttonText}>Save</Text>
                            </View>
                        </TouchableOpacity>


                    </View>


                </View>
            </View>
        );
    }
}

ChangePassword.navigationOptions = props => {

    return {
        // Render a button on the right side of the header.
        headerLeft: (
            <View style={[navigationStyle.rightContainer,navigationStyle.containerPadding]}>

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
            <View style={[navigationStyle.rightContainer,navigationStyle.containerPadding]}>
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