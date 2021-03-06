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
            magnitude: (quake.properties.mag) ? (quake.properties.mag).toFixed(1) : 0,
            // ...(quake.properties.mag) && {magnitude: (quake.properties.mag).toFixed(1)},
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

export const fetchQuakesByApi = (notificationRule, quakeLevel, apiType, url, callback) => {
    /*
    axios.get(url)
        .then(function (result) {
            let quakesData = result.data.features;

            quakesData = quakesData.slice(0, 100);
            let quakesArray = [],
                notificationQuakes = [];


            for (let quake of quakesData) {
                let time = quake.properties.time;
                let utime = new Date(time);
                // var quakeTime = new Date(time).getTime();
                utime = new Date(utime.toUTCString().slice(0, -4));
                utime = utime.toString().split('GMT')[0];

                time = new Date(time);


                let timeStamp = time.getTime();
                time = time.toString().split('GMT')[0];

                var quakeData = QuakeData(apiType, timeStamp, utime, time, quake);

                // console.log('apiType', apiType, 'quakeData', quakeData);
                if (quakeData.magnitude) {

                    if (quakeLevel == 'all' || quakeLevel == 0) {
                        // console.log('request all or mmi = 0')
                        if (notificationRule <= quakeData.magnitude) {// && notifiedTime <= quakeTime
                            notificationQuakes.push(quakeData);
                        }
                    } else if (notificationRule <= quakeLevel) {//
                        notificationQuakes.push(quakeData);
                    } else {
                        return;
                    }

                    quakesArray.push(quakeData);
                }

            } //for
            // console.log('return notificationQuakes', (notificationQuakes));


            callback(quakesArray, notificationQuakes);

        })
        .catch((error) => {
            console.warn('fetch quake data error: ', error)
        })

    */
    // console.log('fetch api try to fetch**********')
    fetch(url, {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            // console.log('responseData',responseData.features)
            let quakesData = responseData.features;

            quakesData = quakesData.slice(0, 100);
            let quakesArray = [],
                notificationQuakes = [];


            for (let quake of quakesData) {
                let time = quake.properties.time;
                let utime = new Date(time);
                // var quakeTime = new Date(time).getTime();
                utime = new Date(utime.toUTCString().slice(0, -4));
                utime = utime.toString().split('GMT')[0];

                time = new Date(time);


                let timeStamp = time.getTime();
                time = time.toString().split('GMT')[0];

                var quakeData = QuakeData(apiType, timeStamp, utime, time, quake);

                // console.log('apiType', apiType, 'quakeData', quakeData);
                if (quakeData.magnitude) {

                    if (quakeLevel == 'all' || quakeLevel == 0) {
                        // console.log('request all or mmi = 0')
                        if (notificationRule <= quakeData.magnitude) {// && notifiedTime <= quakeTime
                            notificationQuakes.push(quakeData);
                        }
                    } else if (notificationRule <= quakeLevel) {//
                        notificationQuakes.push(quakeData);
                    } else {
                        return;
                    }

                    quakesArray.push(quakeData);
                }

            } //for
            // console.log('return notificationQuakes', (notificationQuakes));


            callback(quakesArray, notificationQuakes);

        })
        .catch((error)=>{console.warn('fetch quake data error: ',error)})





}
export const fetchMapQuakesByApi = (apiType, url, callback) => {
    axios.get(url)
        .then(function (result) {
            let quakesData = result.data.features;
            quakesData = quakesData.slice(0, 100);
            let quakesArray = [];
            for (let quake of quakesData) {
                let time = quake.properties.time;
                let utime = new Date(time);

                utime = new Date(utime.toUTCString().slice(0, -4));
                utime = utime.toString().split('GMT')[0];

                time = new Date(time);

                let timeStamp = time.getTime();
                time = time.toString().split('GMT')[0];

                var quakeData = QuakeData(apiType, timeStamp, utime, time, quake);

                if (quakeData.magnitude) {
                    quakesArray.push(quakeData);
                }

            } //for
            callback(quakesArray);
        })
}