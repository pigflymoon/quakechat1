import axios from 'axios';
import {
    AsyncStorage,
    Alert,
} from 'react-native';
import utils from '../utils/utils';

export const fetchQuakesByApi = (url, callback) => {
    AsyncStorage.getItem("lastNotificationTime").then((lastNotifiedValue) => {
        axios.get(url)
            .then(function (result) {
                // console.log('fetch data!')
                let quakesData = result.data.features;
                let quakesArray = [],
                    notificationQuakes = [],
                    lastNotificationTime = 0;


                for (let quake of quakesData) {
                    let time = quake.properties.time;

                    let utime = new Date(time);

                    utime = new Date(utime.toUTCString().slice(0, -4));
                    utime = utime.toString().split('GMT')[0];

                    time = new Date(time);
                    let notifiedTime = time.getTime();

                    let timeStamp = time.getTime();
                    time = time.toString().split('GMT')[0];

                    var quakeData = {
                        apiType:'geonet',
                        utime: utime,
                        time: time,
                        locality: quake.properties.locality,
                        depth: quake.properties.depth.toFixed(1) + ' km',
                        magnitude: quake.properties.magnitude.toFixed(1),
                        mmi: quake.properties.mmi,
                        coordinates: {
                            longitude: quake.geometry.coordinates[0],
                            latitude: quake.geometry.coordinates[1]
                        },
                        quality: quake.properties.quality
                    };
                    // AsyncStorage.getItem("lastNotificationTime").then((lastNotifiedValue) => {

                    if (lastNotifiedValue === null) {
                        lastNotificationTime = 0;
                    } else {
                        lastNotificationTime = parseInt(lastNotifiedValue)
                    }

                    if (notifiedTime >= lastNotificationTime) {
                        let notificationQuake = {
                            mmi: quake.properties.mmi,
                            timeStamp: timeStamp,
                            time: time,
                            message: `${time} happened ${quake.properties.magnitude.toFixed(1)} earthquake in ${quake.properties.locality}`,


                        };
                        notificationQuakes.push(notificationQuake);
                    }
                    // }).done();
                    // }).done();
                    quakesArray.push(quakeData);

                } //for

                callback(quakesArray, notificationQuakes);

            })//then
            .catch(error => {
                utils.netWorkError();

            });

    }).done();

}

export const fetchQuakesByUsgsApi = (url, callback) => {
    // AsyncStorage.getItem("lastNotificationTime").then((lastNotifiedValue) => {
        axios.get(url)
            .then(function (result) {

                let quakesData = result.data.features;
                quakesData =  quakesData.slice(0, 100);
                let quakesArray = [],
                    notificationQuakes = [],
                    lastNotificationTime = 0;

                for (let quake of quakesData) {
                    let time = quake.properties.time;

                    let utime = new Date(time);

                    utime = new Date(utime.toUTCString().slice(0, -4));
                    utime = utime.toString().split('GMT')[0];

                    time = new Date(time);
                    let notifiedTime = time.getTime();

                    let timeStamp = time.getTime();
                    time = time.toString().split('GMT')[0];


                    var quakeData = {
                        apiType:'usgs',
                        utime: utime,
                        time: time,
                        locality: quake.properties.place,
                        depth: quake.geometry.coordinates[2].toFixed(1) + ' km',
                        magnitude: quake.properties.mag.toFixed(1),
                        mmi: quake.properties.mmi,
                        coordinates: {
                            longitude: quake.geometry.coordinates[0],
                            latitude: quake.geometry.coordinates[1]
                        },
                        title: quake.properties.title
                    };

                    // AsyncStorage.getItem("lastNotificationTime").then((lastNotifiedValue) => {

                    // if (lastNotifiedValue === null) {
                    //     lastNotificationTime = 0;
                    // } else {
                    //     lastNotificationTime = parseInt(lastNotifiedValue)
                    // }
                    //
                    // if (notifiedTime >= lastNotificationTime) {
                    //     let notificationQuake = {
                    //         mmi: quake.properties.mmi,
                    //         timeStamp: timeStamp,
                    //         time: time,
                    //         message: `${time} happened ${quake.properties.mag.toFixed(1)} earthquake in ${quake.properties.place}`,
                    //
                    //
                    //     };
                    //     notificationQuakes.push(notificationQuake);
                    // }
                    // }).done();
                    // }).done();
                    quakesArray.push(quakeData);

                } //for
                console.log('***************usgs quake data',quakesArray)
                callback(quakesArray, notificationQuakes);


            })//then
            .catch(error => {
                utils.netWorkError();

            });

    // }).done();

}