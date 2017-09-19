import colors from '../styles/colors';

export default{
    tabs: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    tabsTop: {
        marginTop: 10,
    },
    tag:{
        backgroundColor: colors.grey2,
    },
    activeTag: {
        backgroundColor: colors.primary1,
    },
    tagText: {
        color: colors.white,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.grey2,

    },
    tabsContainer: {
        flex: 1,
        marginVertical: 10,
    },
    activeTab: {
        borderBottomColor: colors.primary1,
    },
    tabText: {
        // fontFamily: Fonts.type.base,
        fontSize: 15,
        lineHeight: 23,
        letterSpacing: 0.47,
        color: colors.grey2,

    },
    activeTabText: {
        fontWeight: '600',
        color: colors.primary1,
    }
}