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
    versionBtn:{
        backgroundColor:colors.green2
    },

}