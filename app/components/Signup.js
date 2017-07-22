import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    TouchableHighlight,
    ActivityIndicator,
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get("window");

import {Actions} from 'react-native-router-flux';
import firebaseApp from '../config/FirebaseConfig';

import Icon from 'react-native-vector-icons/FontAwesome';
import Fade from './Fade';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            email: '',
            password: '',
            name: '',
            isLoading: false,
            showInfo: false,
        }
        ;
    }

    handleSignin = () => {
        Actions.signin();
    }

    setEmail = (text) => {
        this.setState({email: text});
    }

    setName = (text) => {
        this.setState({name: text});
    }

    setPassword = (text) => {
        this.setState({password: text});
    }

    registerUserAndWaitEmailVerification(email, password) {
        var self = this;
        return new Promise(function (resolve, reject) {
            // let interval = null;
            console.log('new promise');
            firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(
                user => {
                    user.updateProfile({
                        displayName: self.state.name
                    });

                    Actions.verifyEmail({user: user, email: email});
                }, error => {
                    console.log('registerUserAndWaitEmailVerification: createUserWithEmailAndPassword failed ! ' + error.message + ' (' + error.code + ')');
                    reject(error);
                }
            );
        });
    }

    handleSignup = (e) => {
        e.preventDefault();

        if (!this.state.email) {
            this.setState({
                showInfo: true
            });
        } else if (!this.state.password) {
            this.setState({
                showInfo: true
            });
        } else {

            this.registerUserAndWaitEmailVerification(this.state.email, this.state.password);
        }
    }
    removeInfo = () => {
        console.log('called')
        this.setState({
            showInfo: false,
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.background}>
                    <View style={[styles.markWrap]}>
                        <View style={styles.circleIcon}>
                            <Icon name="user-plus" size={75} color={colors.primary1} style={[styles.mark]}/>
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
                                <Icon name="user" size={20} style={styles.icon}/>
                            </View>
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor={colors.white}
                                style={styles.input}
                                onChangeText={(text) => this.setName(text)}
                                value={this.state.name}
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

                        <TouchableOpacity activeOpacity={.5} onPress={this.handleSignup}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.footerWrap}>
                            <Text style={styles.accountText}>Already have an account?</Text>
                            <TouchableOpacity activeOpacity={.5} onPress={this.handleSignin}>
                                <View>
                                    <Text style={styles.linkText}>Sign In</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.infoWrapper}>

                        {this.state.showInfo ?
                            <TouchableOpacity activeOpacity={.5} onPress={this.removeInfo}>

                                <Fade>
                                    <Text style={styles.infoText}>Sign in fail, please try again.</Text>
                                </Fade>
                            </TouchableOpacity> : null}

                    </View>

                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
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
        // backgroundColor: colors.white,
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        alignItems: "center",
        justifyContent: "center",
    },

    wrapper: {
        marginHorizontal: 10,
        marginBottom: 10,
    },
    footerWrap: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,
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
    infoWrapper: {
        flexDirection: "column",
        justifyContent: "flex-start",
        marginHorizontal: 10,

    },
    infoText: {
        color: colors.white,
    },
})