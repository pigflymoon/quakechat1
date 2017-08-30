import {
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE = -39.900557;
const LONGITUDE = 172.885971;
const LATITUDE_DELTA = 18;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default Resources = {
    url: {
        getthru: 'http://getthru.govt.nz/disasters/earthquake/',

    },
    quake_resources: [
        {
            name: 'Earthquake Commission',
            link: 'https://www.eqc.govt.nz/',
        },
        {
            name: 'GeoNet',
            link: 'http://www.geonet.org.nz/',
        },
        {
            name: 'Natural Hazards Centre',
            link: 'https://www.naturalhazards.org.nz/',
        },
        {
            name: 'Community Resilience',
            link: 'http://www.resilience.org.nz/',
        },
        {
            name: 'GNS',
            link: 'https://www.gns.cri.nz/Home/Our-Science/Natural-Hazards/Earthquakes',
        },
        {
            name: 'MBIE',
            link: 'http://www.mbie.govt.nz/info-services/nz-govt-procurement-and-property/government-property-group/new-zealand-earthquake',
        },
    ],
    map: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitude_delta: LONGITUDE_DELTA,
        longitude_delta: LONGITUDE_DELTA,
    }
};

