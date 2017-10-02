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
import AnimatedInfo from './AnimatedInfo';

import colors from '../styles/colors';
import edit from '../styles/edit';
import navigationStyle from '../styles/navigation';
import showInfo from '../styles/showInfo';



export default class ChangeName extends Component {
    constructor(props) {
        super(props);
        var user = firebaseApp.auth().currentUser;
        this.state = {
            name: user.displayName,
            showInfo: false,

        };
    }


    changeName = (text) => {
        this.setState({name: text});
    }

    handleInfo = (showInfo) => {
        this.setState({
            showInfo: showInfo
        })
    }
    updateName = () => {
        var user = firebaseApp.auth().currentUser;
        console.log('user', user, 'props', this.props)
        var self = this;
        if (this.state.name === '') {
            self.setState({
                showInfo: true
            });
        } else {
            user.updateProfile({
                displayName: this.state.name,
            }).then(function () {
                self.props.navigation.goBack();

            }).catch(function (error) {
                console.log('error', error)
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
                                <Text style={edit.textItem}>Name</Text>
                            </View>
                            <TextInput
                                placeholderTextColor={colors.grey2}
                                placeholder="Current Name"
                                style={edit.input}
                                onChangeText={this.changeName}
                                value={this.state.name}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={.5} onPress={this.updateName}>
                            <View style={edit.button}>
                                <Text style={edit.buttonText}>Save</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={showInfo.infoWrapper}>
                        {this.state.showInfo ?
                            <AnimatedInfo showInfo={this.handleInfo}>
                                <Text style={showInfo.infoText}>Update fail, please try again.</Text>
                            </AnimatedInfo>
                            : null}
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