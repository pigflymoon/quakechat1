import {
    Dimensions,

} from 'react-native';
import colors from '../styles/colors';
const {width, height} = Dimensions.get("window");
const SCREEN_WIDTH = width;
export default{
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.grey6,
    },
    map: {
        // width: SCREEN_WIDTH,
        flexGrow: 3
    },
    info: {
        backgroundColor: colors.white,
        fontSize: 12,
        marginVertical: 5,
        padding: 5,
        borderBottomColor: colors.blue2,
        borderBottomWidth: 1,
    },
    marker: {
        width: 5,
        height: 5,
    }

}