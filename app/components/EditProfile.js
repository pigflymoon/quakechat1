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
import edit from '../styles/edit';

export default class EditProfile extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '',
        };

    }

    changeName = (text) => {
        this.props.navigation.navigate('ChangeName', {});

    }

    changePassword = () => {
        this.props.navigation.navigate('ChangePassword', {});
    };


    componentDidMount() {


    }


    render() {
        return (
            <ScrollView style={edit.whiteBg}>
                <List>
                    <ListItem
                        containerStyle={listStyle.listItem}
                        leftIcon={{name: 'account-circle', color: colors.grey2}}
                        title={`Change Name`}
                        onPress={() => this.changeName()}
                    />
                </List>
                <List>
                    <ListItem
                        containerStyle={listStyle.listItem}
                        leftIcon={{name: 'lock', color: colors.grey2}}
                        title={`Change Password`}
                        onPress={() => this.changePassword()}
                    />
                </List>

            </ScrollView>
        )
    }

}
