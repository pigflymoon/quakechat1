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
    proContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 15,
        alignItems: 'center',
    },
    more: {
        alignSelf: 'flex-end',
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    getAppContainer: {
        backgroundColor: colors.green2,
        paddingVertical: 5,
        paddingHorizontal: 10,

    },
    getRestoreContainer: {
        backgroundColor: colors.blue3,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    link: {
        color: colors.primary1,
    },

    image: {
        alignSelf: 'center',
        marginBottom: 10,

    },
    proImage: {
        height: '50%',
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
    iconTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.blue3
    },
    infoContainer: {
        flex: 1,


    },
    fonts: {
        marginBottom: 8,
        color: colors.grey2,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    proTitle: {
        color: colors.blue3,
    }

}