import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    Linking,
    RefreshControl,
    Alert,
    FlatList,
} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import showInfo from '../styles/showInfo';
import listStyle from '../styles/list';
import Config from '../config/ApiConfig';
import axios from 'axios';

var news;

export default class News extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            news: [],
            isLoading: false,
            refreshing: false,
            isConnected: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        var isConnected = nextProps.screenProps;//update netinfo
        this.setState({isConnected: isConnected});
        if (!nextProps.screenProps) {
            this.setState({
                refreshing: false,
            });
        }


    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     var isConnected = nextProps.screenProps;//update netinfo
    //     this.setState({isConnected: isConnected});
    //     if (isConnected) {
    //         return true;
    //     } else {
    //         this.setState({
    //             refreshing: false
    //         });
    //         return false;
    //     }
    // }

    fetchApiData = () => {
        axios.get(Config.api.news_url)
            .then(res => {
                news = res.data.feed.map(function (item) {
                    if (item.published) {
                        item.published = item.published.slice(0, 10).replace(/-/g, "-")
                    }

                    return item;
                });
                this.setState({
                    news: news,
                    isLoading: false,
                    refreshing: false,
                })
            })
            .catch(error => {
                Alert.alert(
                    'Network unavailable',
                    `The Internet connection appears to be offline`,
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false}
                )
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
        //                 news: news,
        //                 isLoading: false
        //             })
        //         });
        // }, 1000 * 60 * 60 * 24);

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

    //
    // shouldComponentUpdate(nextProps, nextState) {
    //     var isConnected = nextProps.screenProps;//update netinfo
    //     if (isConnected) {
    //         this.setState({isConnected: isConnected});
    //         this.fetchNews(true);
    //         return true;
    //     }
    //     return false;
    // }

    componentDidMount() {
        if (this.props.screenProps) {//check netinfo
            this.fetchNews(true);
        }
    }

    getRefreshData = () => {
        if (!this.state.isConnected) {
            this.setState({
                refreshing: false
            });
        } else {
            this.setState({
                refreshing: true,
            });
            this.fetchNews(true);
        }

    }

    renderOffline = () => {
        return (
            <View style={showInfo.container}><Text style={showInfo.text}>Offline: Cannot Connect to App.</Text></View>
        )
    }


    keyExtractor = (item, index) => `list-${index}`;
    renderItem = ({item, index}) => (
        <ListItem
            key={`list-${index}`}
            title={item.title}
            subtitle={item.published}
            onPress={() => this.goToURL(item.link)}
        />

    )

    render() {
        var isConnected = this.props.screenProps;

        if (!isConnected) {
            return this.renderOffline();
        }
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }
        return (
            <ScrollView
                style={listStyle.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.getRefreshData}
                    />}
            >
                <FlatList
                    data={this.state.news}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                />
            </ScrollView>
        )
    }
}
