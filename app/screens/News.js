import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Linking,
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import axios from 'axios';

var news;

export default class News extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSource: [],
            isLoading: false,
            isConnected: false,
        };
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


    shouldComponentUpdate(nextProps, nextState) {
        var isConnected = nextProps.screenProps;//update netinfo
        if (isConnected) {
            this.setState({isConnected: isConnected});
            this.fetchNews(true);
            return true;
        }
        return false;
    }

    componentDidMount() {
        if (this.props.screenProps) {//check netinfo
            this.fetchNews(true);
        }
    }


    render() {
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }
        return (
            <ScrollView>
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
