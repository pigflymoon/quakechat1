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

import firebaseApp from '../config/FirebaseConfig';
import Utils from '../utils/utils';

import AnimatedInfo from './AnimatedInfo';
import colors from '../styles/colors';
import edit from '../styles/edit';
import showInfo from '../styles/showInfo';
import navigationStyle from '../styles/navigation';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        var user = firebaseApp.auth().currentUser;
        this.state = {
            passwordFirst: '',
            passwordSecond: '',
            showInfo: false,


        };
    }

    changePasswordFirst = (text) => {
        this.setState({passwordFirst: text});
    }
    changePasswordSecond = (text) => {
        this.setState({passwordSecond: text});
    }

    handleInfo = (showInfo) => {
        this.setState({
            showInfo: showInfo
        })
    }
    updatePassword = () => {
        var user = firebaseApp.auth().currentUser;
        var newPassword = this.state.passwordFirst;

        var self = this;
        if (this.state.passwordFirst === '' || this.state.passwordSecond === '' || (this.state.passwordFirst !== this.state.passwordSecond)) {
            self.setState({
                showInfo: true
            });
        } else {
            user.updatePassword(newPassword).then(function () {
                self.props.navigation.goBack();

            }).catch(function (error) {
                self.setState({
                    showInfo: true
                });
            });

        }

    }

    render() {

        return (
            <View style={[edit.container, edit.whiteBg]}>
                <View resizeMode="cover">
                    <View style={edit.wrapper}>

                        <View style={edit.inputWrap}>
                            <View style={edit.iconWrap}>
                                <Text style={edit.textItem}>New</Text>
                            </View>
                            <TextInput
                                placeholderTextColor={colors.grey2}
                                placeholder="New password"
                                style={edit.input}
                                secureTextEntry
                                onChangeText={(text) => this.changePasswordFirst(text)}
                                value={this.state.passwordFirst}
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
                                onChangeText={(text) => this.changePasswordSecond(text)}
                                value={this.state.passwordSecond}
                            />
                        </View>

                        <TouchableOpacity activeOpacity={.5} onPress={this.updatePassword}>
                            <View style={edit.button}>
                                <Text style={edit.buttonText}>Save</Text>
                            </View>
                        </TouchableOpacity>


                    </View>


                </View>
                <View style={showInfo.infoWrapper}>
                    {this.state.showInfo ?
                        <AnimatedInfo showInfo={this.handleInfo}>
                            <Text style={showInfo.infoText}>Update fail, please try again.</Text>
                        </AnimatedInfo>
                        : null}
                </View>
            </View>
        );
    }
}

ChangePassword.navigationOptions = props => {

    return {
        // Render a button on the right side of the header.
        headerLeft: (
            <View style={[navigationStyle.rightContainer, navigationStyle.containerPadding]}>

                <TouchableOpacity activeOpacity={.5} onPress={() => {
                    props.navigation.goBack()
                }}>
                    <View >
                        <Text style={edit.buttonText}>Cancel</Text>
                    </View>
                </TouchableOpacity>
            </View>


        ),

    };
};