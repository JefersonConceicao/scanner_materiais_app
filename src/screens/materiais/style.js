import styled from 'styled-components/native';
import { color } from '../../constants';

export const Grid = styled.View({
    marginHorizontal:'3%',
    marginVertical:'2%',
    height:'83%',
})

export const Container = styled.View({
    marginHorizontal: '3%',
    marginVertical:'3%',
})

export const CardItem = styled.TouchableOpacity({
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:"#F3F1F1",
    borderWidth:1,
    borderColor: color.primaryColor,
    elevation:"8px",
    marginVertical:'4%',
})

export const TitleItem = styled.Text({
    fontSize: 18,
    fontWeight:'100',
})

export const SubTitleItem = styled.Text({
    fontSize:14,
    color: color.secondaryColor,
})

export const SettingsItem = styled.Text({
    textAlign:'right',
    fontSize:14,
    color: color.secondaryColor,
    fontWeight: (props) => !!props.bold ? 'bold' : '100', 
})

export const Footer = styled.View({    

})

export const PrimaryButton = styled.TouchableOpacity({
    backgroundColor: color.primaryColor,
    width:'100%',
    borderColor:'black',
    borderRadius:25,
})

export const TextButton = styled.Text({
    color: "white",
    fontWeight:'bold',
    fontSize:18,
    textAlign:'center',
    padding:10,
});

