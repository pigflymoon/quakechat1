import colors from '../styles/colors';
import fonts from '../styles/fonts';

export const bind = (context) => (...methods) => (methods.forEach(method => context[method] = context[method].bind(context)));

export const colorByMmi = (mmi) => {
    switch (mmi) {
        case -1:
        case 0: return colors.orange1
        case 1:
        case 2:
            return colors.orange2
            break;
        case 3:
            return colors.orange3
            break;
        case 4:
            return colors.orange4
            break;
        case 5:
            return colors.orange5
            break;
        case 6:
            return colors.orange6
            break;
        case 7:
        case 8:
            return colors.orange7
            break;
        default:
            return colors.orange7
    }
}