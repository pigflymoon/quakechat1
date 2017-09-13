import axios from 'axios';
import {
    AsyncStorage,
    Alert,
} from 'react-native';
import utils from '../utils/utils';

const QuakeData = (apiType, utime, time, quake) => {
    if (apiType === 'usgs') {
        return ({
            apiType: apiType,
            utime: utime,
            time: time,
            locality: quake.properties.place,
            depth: quake.geometry.coordinates[2].toFixed(1) + ' km',
            magnitude: quake.properties.mag.toFixed(1),
            mmi: quake.properties.mmi,
            coordinates: {
                longitude: quake.geometry.coordinates[0],
                latitude: quake.geometry.coordinates[1]
            }
        });
    } else {
        return ({
            apiType: apiType,
            utime: utime,
            time: time,
            locality: quake.properties.locality,
            depth: quake.properties.depth.toFixed(1) + ' km',
            magnitude: quake.properties.magnitude.toFixed(1),
            mmi: quake.properties.mmi,
            coordinates: {
                longitude: quake.geometry.coordinates[0],
                latitude: quake.geometry.coordinates[1]
            }
        });
    }

}


export const fetchQuakesByApi = (apiType, url, callback) => {
    AsyncStorage.getItem("lastNotificationTime").then((lastNotifiedTimeValue) => {
        axios.get(url)
            .then(function (result) {
                console.log('result', result)
                let quakesData = result.data.features;
                console.log('quakesData', quakesData, "apiType", apiType)
                if (apiType === 'usgs') {

                    quakesData = quakesData.slice(0, 100);
                    console.log('usgs quake', quakesData)
                }

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

                    var quakeData = QuakeData(apiType, utime, time, quake);
                    // var quakeData = {
                    //     apiType: apiType,
                    //     utime: utime,
                    //     time: time,
                    //     locality: quake.properties.place,
                    //     depth: quake.geometry.coordinates[2].toFixed(1) + ' km',
                    //     magnitude: quake.properties.mag.toFixed(1),
                    //     mmi: quake.properties.mmi,
                    //     coordinates: {
                    //         longitude: quake.geometry.coordinates[0],
                    //         latitude: quake.geometry.coordinates[1]
                    //     },
                    // };

                    if (lastNotifiedTimeValue === null) {
                        lastNotificationTime = 0;
                    } else {
                        lastNotificationTime = parseInt(lastNotifiedTimeValue)
                    }
                    console.log('notifiedTime', notifiedTime)
                    console.log('lastNotificationTime', lastNotificationTime)

                    if (notifiedTime > lastNotificationTime) {
                        let notificationQuake = {
                            mmi: quake.properties.mmi,
                            timeStamp: timeStamp,
                            time: time,
                            message: `${time} happened ${quake.properties.mag.toFixed(1)} earthquake in ${quake.properties.place}`,
                        };
                        notificationQuakes.push(notificationQuake);
                    }
                    // console.log('quakeData',quakeData)
                    quakesArray.push(quakeData);

                } //for
                console.log('quakesArray', quakesArray)
                callback(quakesArray, notificationQuakes);


            })//then
        // .catch(error => {
        //     utils.netWorkError();
        //
        // });

    }).done();
}
