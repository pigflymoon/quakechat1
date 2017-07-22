import {
    Dimensions,

} from 'react-native';
import colors from '../styles/colors';
const {width, height} = Dimensions.get("window");
export default{
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        width: 300,
        padding: 15,
        // height: 100,
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: colors.blue1,
        // paddingHorizontal: 20,
        // paddingVertical: 12,
        borderRadius: 6,
        borderColor: colors.blue2,
        borderWidth: 0.5,
    },
    amount: {
        flex: 1,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: colors.blue1,
        alignSelf: 'center',
        marginTop: -32,
        marginLeft: 75,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: colors.blue2,
        alignSelf: 'center',
        marginTop: -0.5,
        marginLeft: 75,
        // marginLeft: 50,
    },
}