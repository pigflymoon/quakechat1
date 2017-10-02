import colors from '../styles/colors';
export default{
    container: {
        flex: 1,
    },
    whiteBg: {
        backgroundColor: colors.white,
    },
    wrapper: {
        marginHorizontal: 20,
        marginBottom: 10,
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,

    },
    iconWrap: {
        alignItems: "center",
        justifyContent: "center",
        flex: 2,

    },
    textItem: {
        fontSize: 18,
    },
    input: {
        flex: 6,
        color: colors.grey1,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey5,
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
    rightButton: {
        backgroundColor: colors.white,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 30,
        // marginHorizontal: 10,
        marginLeft: 15,
        borderWidth: 1,
        borderColor: colors.grey5,
        borderRadius: 5,
    },
    buttonText: {
        color: colors.primary1,
        fontSize: 18,
    },

}