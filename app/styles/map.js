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
        width: SCREEN_WIDTH,
        flexGrow: 3
    },
    info: {
        fontSize: 12,
    }
}