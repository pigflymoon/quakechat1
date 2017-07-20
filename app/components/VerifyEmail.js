import React, {Component} from 'react';
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
    Dimensions,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import firebaseApp from '../config/FirebaseConfig';
const {width, height} = Dimensions.get("window");

import background from '../images/cover_bg.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export default class ConfirmEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signin: false,
            isLoading: false,
            user: this.props.user,
        };
    }

    handleVerifyEmail = () => {
        let interval = null;
        var self = this;
        var user = this.state.user

        user.sendEmailVerification().then(
            // setTimeout(
            () => {
                self.setState({
                    isLoading: true
                });

                interval = setInterval(() => {
                    console.log('interval called?', user)
                    console.log('user.emailVerified?', user.emailVerified);
                    user.reload().then(
                        () => {
                            console.log('sign up user', user);
                            if (interval && user.emailVerified) {
                                clearInterval(interval);
                                interval = null;

                                console.log('email sent');

                                firebaseApp.auth().onAuthStateChanged((user) => {
                                    self.setState({
                                        isLoading: false
                                    });
                                    console.log('to sign in? user', user)
                                    if (user && user.emailVerified) {
                                        console.log('auth state changed user emailVerified', user.emailVerified);
                                        Actions.chat({name: self.state.name});
                                        clearInterval(interval);
                                        interval = null;
                                    } else {
                                        self.setState({
                                            isLoading: false
                                        });
                                    }
                                });

                            } else {
                                self.setState({
                                    isLoading: false
                                });
                            }
                        }, error => {
                            if (interval) {
                                clearInterval(interval);
                                interval = null;
                                console.log('interval registerUserAndWaitEmailVerification: reload failed ! ' + error.message + ' (' + error.code + ')');

                            }
                        }
                    );
                }, 1000 * 30);

            }, error => {
                console.log('registerUserAndWaitEmailVerification: sendEmailVerification failed ! ' + error.message + ' (' + error.code + ')');

            })
    }

    render() {
        return (

            <View style={styles.container}>
                {this.state.isLoading ? (
                        <View style={styles.loading}>
                            <ActivityIndicator size='large'/>
                        </View>
                    ) : (
                        <View  style={styles.background}>
                            <View style={[styles.markWrap]}>
                                <View style={styles.circleIcon}>
                                    <Icon name="envelope" size={75} color={colors.primary1} style={[styles.mark]}/>
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
                                        value={this.props.email}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={.5} onPress={this.handleVerifyEmail}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>Confirm</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
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