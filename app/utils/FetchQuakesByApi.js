import axios from 'axios';
import {
    AsyncStorage,
    Alert,
} from 'react-native';
export const fetchQuakesByApi = (url, callback) => {
    AsyncStorage.getItem("lastNotificationTime").then((lastNotifiedValue) => {
        axios.get(url)
            .then(function (result) {
                console.log('fetch data!')
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
                Alert.alert(
                    'Network unavailable',
                    `The Internet connection appears to be offline`,
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false}
                )
            });

    }).done();

}