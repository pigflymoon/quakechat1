import {
    Dimensions,

} from 'react-native';
import colors from '../styles/colors';
const {width, height} = Dimensions.get("window");
export default{
    container: {
        flex: 1,
    },
    background: {
        width,
        height,
        backgroundColor: colors.white,
    },
    markWrap: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    circleIcon: {
        // backgroundColor: colors.white,
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        alignItems: "center",
        justifyContent: "center",
    },

    wrapper: {
        marginHorizontal: 10,
        marginBottom: 10,
    },
    verifyWrapper: {
        flex: 2
    },

    footerWrap: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey5
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        height: 20,
        width: 20,
        backgroundColor: "transparent",
        color: colors.grey5,
    },
    input: {
        flex: 1,
        color: colors.grey1,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: colors.white,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.grey5,
        borderRadius: 5,
    },
    buttonText: {
        color: colors.primary1,
        fontSize: 18,
    },
    forgotPasswordText: {
        color: colors.grey2,
        backgroundColor: "transparent",
        textAlign: "right",
        paddingRight: 15,
    },
    accountText: {
        color: colors.grey2
    },
    linkText: {
        color: colors.primary1,
        marginLeft: 5,
    },
    infoWrapper: {
        flexDirection: "column",
        justifyContent: "flex-start",
        marginHorizontal: 10,

    },
    infoText: {
        color: colors.white,
    },
    barButtonIconStyle: {
        tintColor: 'rgb(255,255,255)'
    },
    rightButton: {
        marginRight: 10,
    },
    rightBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },

}