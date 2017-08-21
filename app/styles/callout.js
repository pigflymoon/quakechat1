import {
    Dimensions,

} from 'react-native';
import colors from '../styles/colors';
const {width, height} = Dimensions.get("window");
export default{
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        borderColor: colors.white,
        // borderWidth: 0.5,
        opacity: 0.8,

    },
    card:{
        width: 300,
        padding: 15,
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    // list:{
    //     borderBottomColor: colors.blue1
    // }



}