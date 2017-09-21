import {
    Dimensions,

} from 'react-native';
import colors from '../styles/colors';

export default{
    info: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column',
        paddingTop: 10,
    },

    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollview: {
        flex: 1,
        flexDirection: 'column',
    },
    map: {
        flexGrow: 2,
        flexBasis: 400,
    },
    detail: {
        flexGrow: 1,
        flexBasis: 100,
    },
    rightTitle: {
        color: colors.grey1,
    },
    linkTitle: {
        color: colors.primary1
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },

    text: {
        flex: 1,
    },
    qualityText: {
        marginBottom: 10
    },
    quakesContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.grey6,
    },
    // sliderLabel: {
    //     width: SCREEN_WIDTH,
    // }

}