import {
    Dimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
var ASPECT_RATIO;
if (width > height) {
    ASPECT_RATIO = height / width;
} else {
    ASPECT_RATIO = width / height;
}

const LATITUDE = -39.900557;
const LONGITUDE = 172.885971;
const LATITUDE_DELTA = 25;
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
        {
            name:'What\'s the Plan, Stan?',
            link:'https://www.whatstheplanstan.govt.nz/events/earthquakes/',
        }
        ,
        {
            name:'New Zealand\'s tsunami hazard',
            link:'https://www.whatstheplanstan.govt.nz/events/tsunami/',
        }
        ,
        {
            name:'Dealing with earthquake-related hazards',
            link:'http://www.worksafe.govt.nz/worksafe/information-guidance/all-guidance-items/position-statements/position-statement-dealing-with-earthquake-related-hazards',
        }
    ],
    map: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitude_delta: LONGITUDE_DELTA,
        longitude_delta: LONGITUDE_DELTA,
    }
};

