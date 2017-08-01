import axios from 'axios';
import {
    AsyncStorage,
} from 'react-native';
export const fetchQuakesByApi = (url, callback) => {
    axios.get(url)
        .then(function (result) {
            let quakesData = result.data.features;
            let quakesArray = [],
                // notificationQuakes = [],
                notificationQuakes = [],
                notificationRule = 0;

            AsyncStorage.getItem("ruleValue").then((value) => {
                notificationRule = value;
            });
            for (let quake of quakesData) {
                let time = quake.properties.time;
                let utime = new Date(time);

                utime = new Date(utime.toUTCString().slice(0, -4));
                utime = utime.toString().split('GMT')[0];

                time = new Date(time);
                let timeStamp = time.getTime();
                time = time.toString().split('GMT')[0];
                console.log('timeStamp', timeStamp)

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


                if (quake.properties.mmi >= notificationRule) {

                    let notificationQuake = {
                        timeStamp: timeStamp,
                        time: time,
                        message: `${time} happened ${quake.properties.magnitude.toFixed(1)} earthquake in ${quake.properties.locality}`,


                    };
                    notificationQuakes.push(notificationQuake);
                }

                quakesArray.push(quakeData);
            } //for
            console.log('quakesArray in utils', quakesArray)
            callback(quakesArray, notificationQuakes);

        }); //then
}