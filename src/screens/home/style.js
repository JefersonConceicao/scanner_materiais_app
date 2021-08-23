import{ StyleSheet } from 'react-native'
import { color } from '../../constants';

export const styles = StyleSheet.create({
    headerBar: {
        backgroundColor: color.primaryColor,
        alignItems:'center',
        padding:15,

    },
    footerHome:{
        flex:1, 
        justifyContent:'flex-end'
    },
    buttonScanner:{ 
        backgroundColor: color.primaryColor,
        marginHorizontal: '5%',
        padding:10,
        borderRadius:12,
        marginBottom:8,
    },
    titleText: {
        fontSize:18,
        color:"#fff",
    },
    textSubmit: {
        textAlign:'center',
        color:"#ffff"
    },
    content:{
        flex:1,
    },
    contentScan:{
        marginVertical:'10%',
        marginHorizontal:'4%',
        width:'90%',
        alignItems:'center',
        padding:20,
        borderLeftWidth:3,
        borderRightWidth:3,
        borderColor:'#ffff',
        borderColor:color.primaryColor,
    },
    backButtonScanner:{
        marginLeft:'2%',
        fontSize:15,
        color:'#fff',
    },
    descriptMaterial:{
        alignItems:'center',
        marginVertical:'2%',
    }
});