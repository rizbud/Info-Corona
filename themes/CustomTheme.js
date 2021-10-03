import { Dimensions } from 'react-native'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default {
    // width & height
    "w-screen": { width },
    "h-screen": { height },

    // font family
    "monst-regular": { fontFamily: "Montserrat" },
}