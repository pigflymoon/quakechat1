import React, {Component} from 'react';
import {
    Text,
    View,
    Linking,
} from 'react-native';
import {ListItem} from 'react-native-elements';

import Utils from '../utils/utils';
export default class NewsItem extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        console.log('news re-render?',nextProps.news !== this.props.news)
        return nextProps.news !== this.props.news
    }

    render() {
        let {news} = this.props;
        return (
            <ListItem
                title={news.title}
                subtitle={news.published}
                onPress={() => Utils.goToURL(news.link)}
            />
        )
    }
}
