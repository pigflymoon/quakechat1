import React, {Component} from 'react';
import {
    Text,
    View,
    Linking,
} from 'react-native';
import {ListItem} from 'react-native-elements';

import Utils from '../utils/utils';
export default class NewsItem extends Component {
    render() {
        let {news} = this.props;
        return (
            <ListItem
                title={news.title}
                subtitle={news.published}
                titleNumberOfLines={2}
                onPress={() => Utils.goToURL(news.link)}
            />
        )
    }
}
