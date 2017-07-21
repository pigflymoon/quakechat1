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
const {width, height} = Dimensions.get("window");

import Icon from 'react-native-vector-icons/FontAwesome';
import Fade from './Fade';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            email: '',
            password: '',
            name: '',
            names: [],
            showInfo: false,
        };


    }

    signup = () => {
        Actions.signup();
    }

    handleSignin = (e) => {
        var self = this;
        e.preventDefault()
        if (!this.state.email) {
            this.setState({
                showInfo: true
            });
        }

        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(function (user) {
                firebaseApp.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        console.log('********** In Sign in moudle********* ', user, ' is signed in');
                        Actions.chat();
                    } else {
                        console.log('error')
                    }
                })
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                switch (errorCode) {
                    case 'auth/invalid-email':
                    case 'auth/user-disabled':
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        self.setState({
                            showInfo: true
                        });
                        break;
                    default:
                        self.setState({
                            showInfo: true
                        });


                }

                console.log(error);
            });


    }

    setEmail = (text) => {
        this.setState({email: text});
    }


    setPassword = (text) => {
        this.setState({password: text});
    }

    handleResetPassword = () => {
        Actions.resetPassword();

    }
    removeInfo = () => {
        this.setState({showInfo: false});
    }

    render() {
        const visible = 1;
        return (
            <View style={styles.container}>
                <View style={styles.background} resizeMode="cover">
                    <View style={[styles.markWrap]}>
                        <View style={styles.circleIcon}>
                            <Icon name="sign-in" size={75} color={colors.primary1} style={[styles.mark]}/>
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
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Icon name="lock" size={25} style={styles.icon}/>
                            </View>
                            <TextInput
                                placeholderTextColor={colors.white}
                                placeholder="Password"
                                style={styles.input}
                                secureTextEntry
                                onChangeText={(text) => this.setPassword(text)}
                                value={this.state.password}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={.5} onPress={this.handleResetPassword}>
                            <View>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} onPress={this.handleSignin}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </View>
                        </TouchableOpacity>
                        {this.state.showInfo ?


                            <Fade visible={visible}>
                                <TouchableOpacity
                                    onPress={this.removeInfo}
                                    style={styles.button}>
                                    <Text
                                        style={{color: 'white', fontSize: 20}}>
                                        Click Here To Start
                                    </Text>
                                </TouchableOpacity>
                            </Fade>

                            : null}
                    </View>
                    <View style={styles.container}>
                        <View style={styles.footerWrap}>
                            <Text style={styles.accountText}>Don't have an account?</Text>
                            <TouchableOpacity activeOpacity={.5} onPress={this.signup}>
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
        borderColor: colors.grey5,
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
    },
    infoBar: {
        backgroundColor: colors.orange6,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.orange2,
        borderRadius: 5,

    },
    infoText: {
        color: colors.white,
    },
});