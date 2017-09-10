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
import NewsItem from '../components/NewsItem';
import axios from 'axios';
import utils from '../utils/utils';


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
        var isConnected = nextProps.screenProps.isConnected;//update netinfo
        this.setState({isConnected: isConnected});

        if (isConnected) {
            this.setState({
                refreshing: true,
            });
            this.fetchNews(true);
        }
    }

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
                utils.netWorkError();

            });
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


    componentDidMount() {
        if (this.props.screenProps.isConnected) {//check netinfo
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

    keyExtractor = (item, index) => `key${index}`;
    renderList = ({item, index}) => {
        return (
            <NewsItem key={`news-${index}`} news={item}/>
        )
    }

    render() {
        var isConnected = this.props.screenProps.isConnected;
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
                <List>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.news}
                        renderItem={this.renderList}
                    />
                </List>
            </ScrollView>
        )
    }
}
