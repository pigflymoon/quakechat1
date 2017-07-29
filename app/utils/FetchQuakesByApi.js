import axios from 'axios';

export const fetchQuakesByApi = (url,callback) => {
    axios.get(url)
        .then(function (result) {
            let quakesData = result.data.features;
            let quakesArray = [];
            for (let quake of quakesData) {
                let time = quake.properties.time;
                let utime = new Date(time);

                utime = new Date(utime.toUTCString().slice(0, -4));
                utime = utime.toString().split('GMT')[0];

                time = new Date(time);
                time = time.toString().split('GMT')[0];
                var quake = {
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
                    quality:quake.properties.quality
                };

                quakesArray.push(quake);
            } //for
            // console.log('quakesArray in utils',quakesArray)
            callback(quakesArray);

        }); //then
}