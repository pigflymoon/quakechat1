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
import Utils from '../utils/utils';
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

    componentDidMount() {
        // console.log('news  did mount is ', this.props.screenProps.isConnected)
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

    keyExtractor = (item, index) => `key${index}`;
    renderList = ({item, index}) => {
        return (
            <NewsItem key={`news-${index}`} news={item}/>
        )
    }

    render() {
        var isConnected = this.props.screenProps.isConnected;

        // console.log('news  is ', isConnected)
        if (!isConnected) {
            return Utils.renderOffline();
        }
        if (this.state.isLoading) {
            return Utils.renderLoadingView();
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
                        style={listStyle.listContainer}
                    />
                </List>
            </ScrollView>
        )
    }
}
