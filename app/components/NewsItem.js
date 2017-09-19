import React, {Component} from 'react';
import {
    Text,
    View,
    Linking,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import listStyle from '../styles/list';

import Utils from '../utils/utils';
export default class NewsItem extends Component {
    render() {
        let {news} = this.props;
        return (
            <ListItem
                containerStyle={listStyle.listItem}
                title={news.title}
                titleStyle={listStyle.title}
                subtitle={news.published}
                titleNumberOfLines={3}
                onPress={() => Utils.goToURL(news.link)}
            />
        )
    }
}
