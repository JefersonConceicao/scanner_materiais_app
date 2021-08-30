import styled from 'styled-components/native';
import { color } from '../../constants';

export const Grid = styled.View({
    marginHorizontal:'3%',
    marginVertical:'2%',
})

export const Container = styled.View({
    marginHorizontal: '3%',
    marginVertical:'3%',
})

export const CardItem = styled.TouchableOpacity({
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:'4%',
    borderWidth:1,
    color:'black',
    borderRadius:7,
})

export const TitleItem = styled.Text({
    fontSize: 18,
    fontWeight:'bold',
    color: color.primaryColor,
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

export const TextEmpty = styled.Text({
    fontSize:20,
    color:color.primaryColor,
})


export const HeaderList = styled.View({
    flexDirection:'row',
    justifyContent:'space-between'
})
