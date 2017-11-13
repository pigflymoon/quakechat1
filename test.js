import React, {Component} from "react";
import {
    AppRegistry,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import CodePush from "react-native-code-push";
let codePushOptions = {checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME};

export default class MyApp extends Component {
    checkUpdate = () => {
        CodePush.sync({
            installMode: CodePush.InstallMode.IMMEDIATE
        });
    }

    componentDidMount() {

        this.checkUpdate();
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    第3次更新测试:添加资源
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        paddingTop: 50
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 20
    },
});
MyApp = CodePush(codePushOptions)(MyApp);