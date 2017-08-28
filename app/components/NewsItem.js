import React, {Component} from 'react';
import {
    Text,
    View,
    Linking,
} from 'react-native';
import {List, ListItem} from 'react-native-elements';

import {goToURL} from '../utils/utils';
export default class NewsItem extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        console.log('news re-render?',nextProps.news !== this.props.news)
        return nextProps.news !== this.props.news
    }

    // goToURL = (url) => {
    //     Linking.canOpenURL(url).then(supported => {
    //         if (supported) {
    //             Linking.openURL(url);
    //         } else {
    //             console.log('Don\'t know how to open URI: ' + url);
    //         }
    //     });
    // }

    render() {
        let {news} = this.props;
        return (
            <ListItem
                title={news.title}
                subtitle={news.published}
                onPress={() => goToURL(news.link)}
            />
        )
    }
}
