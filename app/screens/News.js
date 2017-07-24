import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Linking,
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import axios from 'axios';

import NetInfoChecking from '../utils/NetInfoChecking';

var news;

export default class News extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: [],
            isLoading: false,
            isConnected: null,
        };
    }

    connectChecking = (isConnected) => {
        this.setState({isConnected: isConnected});
    }

    fetchApiData = () => {
        if (this.state.dataSource.length <= 0) {
            axios.get(`https://api.geonet.org.nz/news/geonet`)
                .then(res => {
                    news = res.data.feed.map(function (item) {
                        if (item.published) {
                            item.published = item.published.slice(0, 10).replace(/-/g, "-")
                        }

                        return item;
                    });
                    this.setState({
                        dataSource: news,
                        isLoading: false
                    })
                });
            // this.timer = setInterval(() => {
            //     axios.get(`https://api.geonet.org.nz/news/geonet`)
            //         .then(res => {
            //             news = res.data.feed.map(function (item) {
            //                 if (item.published) {
            //                     item.published = item.published.slice(0, 10).replace(/-/g, "-")
            //                 }
            //
            //                 return item;
            //             });
            //             this.setState({
            //                 dataSource: news,
            //                 isLoading: false
            //             })
            //         });
            // }, 1000 * 60 * 60 * 24);

        }
    }
    fetchNews = (isConnected) => {
        if (isConnected) {
            this.fetchApiData()
        }
    }

    componentDidMount() {
        if (this.state.isConnected) {
            this.fetchNews(true);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        var isConnected = nextState.isConnected;
        if (isConnected) {
            this.fetchNews(true);
            return true;
        }
        return false;
    }


    renderLoadingView = () => {
        return (
            <ScrollView>
                <Text>Loading...</Text>
            </ScrollView>
        )
    }

    goToURL = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log('Don\'t know how to open URI: ' + url);
            }
        });
    }


    render() {
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }

        return (
            <ScrollView>
                <NetInfoChecking connectCheck={this.connectChecking}/>
                <List>
                    {this.state.dataSource.map((news, index) => (
                        <ListItem
                            key={`list-${index}`}
                            title={news.title}
                            subtitle={news.published}
                            onPress={() => this.goToURL(news.link)}
                        />
                    ))}
                </List>
            </ScrollView>
        )
    }
}
