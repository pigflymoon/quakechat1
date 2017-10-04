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

import {List, ListItem} from 'react-native-elements';
import colors from '../styles/colors';
import listStyle from '../styles/list';
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
