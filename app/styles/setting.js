import colors from '../styles/colors';

export default{
    container: {
        flex: 1,
        // padding: 10,
    },
    box: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        marginTop: 15,

    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    text: {
        padding: 10,
    },
    link: {
        color: colors.primary1,
    },

    image: {
        alignSelf: 'center',
        marginBottom: 10,

    },
    model: {
        marginTop: 100,
        marginBottom: 100,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.grey5,
    },
    caption: {
        fontSize: 16,
    },
    modelContent: {
        height: 100,
    },
    dialogContentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tileText: {
        textAlign: 'center',
    },
    versionBtn: {
        backgroundColor: colors.green2
    },


}