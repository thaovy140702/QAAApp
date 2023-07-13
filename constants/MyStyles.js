import { Dimensions } from "react-native";
import colors from "./colors";

const { width, height } = Dimensions.get("screen");

export default{
    container:{
        width: '100%',
        height: '100%',
        padding: 0,
        margin: 0
    },
    headerSlide: {
        position: 'absolute',
        fontSize: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        // top: '15%',
        marginHorizontal: '5%',
        textAlign: 'center',
        fontFamily: 'bold'
    },
    flexDirection: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    text_sx_bold:{
        fontSize: 9,
        fontFamily: 'bold'
    },
    text_sx:{
        fontSize: 9,
        fontFamily: 'regular'
    },
    text_sm_grey:{
        fontSize: 12,
        color: colors.grey,
        fontFamily: 'light'
    },
    text_sm:{
        fontSize: 12,
        color: 'black',
        fontFamily: 'regular'
    },
    text_sm_bold:{
        fontSize: 12,
        color: 'white',
        fontFamily: 'bold'
    },
    text_md:{
        fontSize: 14,
        color: 'black',
        fontFamily: 'regular'
    },
    text_md_bold:{
        fontSize: 14,
        color: 'black',
        fontFamily: 'bold'
    },
    text_md_grey:{
        fontSize: 14,
        color: colors.grey,
        fontFamily: 'light'
    },
    text_xl:{
        fontSize: 16,
        color: 'black',
        fontFamily: 'bold'        
    },
    text_xxl:{
        fontSize: 20,
        color: 'black',
        fontFamily: 'bold'        
    },
    text_lg:{
        fontSize: 30,
        color: 'black',
        fontFamily: 'bold'
        
    },
    arrowBack:{
        backgroundColor: 'rgba(233, 119, 119, 0.1)',
        borderRadius: 10,
        // alignSelf:'baseline'
    },
    headerPage: {
        width, 
        height, 
        position:'absolute', 
        top:0, 
        backgroundColor: 'white'
    }
}