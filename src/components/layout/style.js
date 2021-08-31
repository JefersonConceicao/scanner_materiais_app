import styled from 'styled-components/native';
import { color } from '../../constants/index';

export const Header = styled.View({
    flexDirection:'row',
    backgroundColor: color.primaryColor,
    height:50,
   
}); 

export const BackButton = styled.TouchableOpacity({
    marginVertical:'4%',
    marginHorizontal:'2%',
})

export const TitleView = styled.View({
    width:'80%',
    alignItems:'center',
    justifyContent:'center',
})

export const TextTitle = styled.Text({
    color: "#ffff",
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
})


export const Container = styled.View({
    flex:1,
    backgroundColor:' #FFFF' ,
})

