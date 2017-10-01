import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Linking,
    AppState,
    Picker,
    Platform,
    AsyncStorage,
    Item,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {List, ListItem} from 'react-native-elements';
import * as StoreReview from 'react-native-store-review';
import colors from '../styles/colors';
import quakeStyle from '../styles/quake';
import listStyle from '../styles/list';
import Utils from '../utils/utils';
import Config from '../config/ApiConfig';

import chat from '../styles/chat';
export default class EditProfile extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '',
        };

    }

    changeName = (text) => {
        this.setState({name: text});
    }

    changePassword = () => {
        this.props.navigation.navigate('ChangePassword', {});
    };

    saveName = (name) => {
    }

    componentDidMount() {


    }


    render() {
        return (
            <ScrollView style={chat.whiteBg}>
                <List>
                    <View style={chat.inputWrap}>
                        <View style={chat.iconWrap}>
                            <Icon name="user" size={20} style={chat.icon}/>
                        </View>
                        <TextInput
                            placeholder="Name"
                            style={chat.input}
                            onChangeText={(text) => this.changeName(text)}
                            value={this.state.name}
                        />
                        <TouchableOpacity activeOpacity={.5} onPress={this.saveName}>
                            <View style={chat.button}>
                                <Text style={chat.buttonText}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </List>
                <List>
                    <ListItem
                        containerStyle={listStyle.listItem}
                        leftIcon={{name: 'info', color: colors.grey2}}
                        title={`Change Password`}
                        onPress={() => this.changePassword()}
                    />
                </List>

            </ScrollView>
        )
    }

}
