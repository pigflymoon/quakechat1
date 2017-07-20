import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import firebaseApp from '../config/FirebaseConfig';
import firebase from 'firebase';

const {width, height} = Dimensions.get("window");

import Icon from 'react-native-vector-icons/FontAwesome';
import background from '../images/cover_bg.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            email: '',
            password: '',
        };
    }

    setEmail = (text) => {
        this.setState({email: text});
    }

    handleSignup = () => {
        Actions.signup();
    }

    handleResetPassword = () => {

        var auth = firebase.auth();
        var emailAddress = this.state.email;
        console.log('emailAddress', emailAddress)
        auth.sendPasswordResetEmail(emailAddress).then(function () {
            // Email sent.
            console.log('reset password sent to the emailAddress');

            Actions.signin();
        }, function (error) {
            // An error happened.
            console.log('Error', error);
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.background}>
                    <View style={[styles.markWrap]}>
                        <View style={styles.circleIcon}>
                            <Icon name="pencil" size={75} color={colors.primary1} style={[styles.mark]}/>
                        </View>

                    </View>
                    <View style={styles.wrapper}>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Icon name="envelope-o" size={20} style={styles.icon}/>
                            </View>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={colors.white}
                                style={styles.input}
                                onChangeText={(text) => this.setEmail(text)}
                                value={this.state.email}
                            />
                        </View>

                        <TouchableOpacity activeOpacity={.5} onPress={this.handleResetPassword}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Rest Password</Text>
                            </View>
                        </TouchableOpacity>

                    </View>


                    <View style={styles.container}>
                        <View style={styles.footerWrap}>
                            <Text style={styles.accountText}>Don't have an account?</Text>
                            <TouchableOpacity activeOpacity={.5} onPress={this.handleSignup}>
                                <View>
                                    <Text style={styles.linkText}>Sign Up</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width,
        height,
        backgroundColor: colors.white,
    },
    markWrap: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    circleIcon: {
        backgroundColor: colors.white,
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        alignItems: "center",
        justifyContent: "center",
    },

    wrapper: {
        paddingVertical: 30,
        marginHorizontal: 10,
    },
    footerWrap: {
        // backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey5
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        height: 20,
        width: 20,
        backgroundColor: "transparent",
        color: colors.grey5,
    },
    input: {
        flex: 1,
        color: colors.grey1,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: colors.white,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor:colors.grey5,
        borderRadius: 5,
    },
    buttonText: {
        color: colors.primary1,
        fontSize: 18,
    },
    forgotPasswordText: {
        color: colors.grey2,
        backgroundColor: "transparent",
        textAlign: "right",
        paddingRight: 15,
    },
    accountText: {
        color: colors.grey2
    },
    linkText: {
        color: colors.primary1,
        marginLeft: 5,
    }
});