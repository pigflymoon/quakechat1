import {
    Dimensions,

} from 'react-native';
import colors from '../styles/colors';
const {width, height} = Dimensions.get("window");
const SCREEN_WIDTH = width;
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
        flexBasis: 200,
    },
    detail: {
        flexGrow: 1,
        flexBasis: 200,

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
    sliderLabel: {
        width: SCREEN_WIDTH,
    }

}