import axios from 'axios';
import {
    AsyncStorage,
    Alert,
} from 'react-native';

const QuakeData = (apiType, timeStamp, utime, time, quake) => {
    if (apiType === 'usgs') {
        return ({
            apiType: apiType,
            timeStamp: timeStamp,
            utime: utime,
            time: time,
            locality: quake.properties.place,
            depth: (quake.geometry.coordinates[2]).toFixed(1) + ' km',
            // magnitude: (quake.properties.mag).toFixed(1),
            mmi: quake.properties.mmi,
            coordinates: {
                longitude: quake.geometry.coordinates[0],
                latitude: quake.geometry.coordinates[1]
            },
            ...(quake.properties.mag) && {magnitude: (quake.properties.mag).toFixed(1)},
            message: `${time} happened ${(quake.properties.mag) && (quake.properties.mag).toFixed(1)} earthquake in ${quake.properties.place}`,

        });
    } else {
        return ({
            apiType: apiType,
            timeStamp: timeStamp,
            utime: utime,
            time: time,
            locality: quake.properties.locality,
            depth: (quake.properties.depth).toFixed(1) + ' km',
            magnitude: (quake.properties.magnitude).toFixed(1),
            mmi: quake.properties.mmi,
            coordinates: {
                longitude: quake.geometry.coordinates[0],
                latitude: quake.geometry.coordinates[1]
            },
            message: `${time} happened ${(quake.properties.magnitude).toFixed(1)} earthquake in ${quake.properties.locality}`,
        });
    }

}


export const fetchQuakesByApi = (notificationRule, quakeLevel, notificationTypeTime, apiType, url, callback) => {
    AsyncStorage.getItem(notificationTypeTime).then((lastNotifiedTimeValue) => {
            // if (lastNotifiedTimeValue != null) {
            console.log('saved notificationTypeTime is ', lastNotifiedTimeValue)
            axios.get(url)
                .then(function (result) {
                    let quakesData = result.data.features;
                    // if (apiType === 'usgs') {
                    //     quakesData = quakesData.slice(0, 100);
                    // }
                    quakesData = quakesData.slice(0, 100);
                    let quakesArray = [],
                        notificationQuakes = [],
                        lastNotificationTime = 0;

                    for (let quake of quakesData) {
                        let time = quake.properties.time;
                        let utime = new Date(time);
                        var quakeTime = new Date(time).getTime();
                        utime = new Date(utime.toUTCString().slice(0, -4));
                        utime = utime.toString().split('GMT')[0];

                        time = new Date(time);

                        // let notifiedTime = time.getTime();

                        let timeStamp = time.getTime();
                        time = time.toString().split('GMT')[0];

                        var quakeData = QuakeData(apiType, timeStamp, utime, time, quake);
                        //
                        var TenMinutesEarlier = new Date();
                        TenMinutesEarlier.setMinutes(TenMinutesEarlier.getMinutes() - 13);
                        var notifiedTime = TenMinutesEarlier;

                        if (quakeData.magnitude) {
                            /*
                             if (lastNotifiedTimeValue === null) {//not save lastNotifiedTimeValue
                             lastNotificationTime = 0;
                             } else {
                             lastNotificationTime = parseInt(lastNotifiedTimeValue)
                             }
                             if (notifiedTime > lastNotificationTime) {//quake time later than saved lastNotificationTime

                             let notificationQuake = quakeData;
                             notificationQuakes.push(notificationQuake);
                             }
                             */
                            // console.log('notificationRule: ', notificationRule, 'quakeLevel: ', quakeLevel)

                            if (quakeLevel == 'all' || quakeLevel == 0) {
                                console.log('request all or mmi = 0')
                                if (notificationRule <= quakeData.magnitude && notifiedTime <= quakeTime) {// && notifiedTime <= quakeTime
                                    console.log('request all or mmi = 0 data is >= rule')
                                    notificationQuakes.push(quakeData);
                                }
                            }
                            if (notificationRule > quakeLevel && notifiedTime > quakeTime) {
                                console.log('No notified');
                                return;
                            } else if (notificationRule <= quakeLevel && notifiedTime <= quakeTime) {//notifiedTime <= quakeTime
                                console.log('NotifiedTime is later then quakeTime');
                                notificationQuakes.push(quakeData);
                            }
                            // console.log('call back notificationQuakes', notificationQuakes)
                            quakesArray.push(quakeData);
                        }

                    } //for
                    callback(quakesArray, notificationQuakes);

                })//then
            // }else{
            //     console.log('notificationTypeTime is null',lastNotifiedTimeValue)
            // }


        }
    ).done();
// }

}
