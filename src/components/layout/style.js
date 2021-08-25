import styled from 'styled-components/native';
import { color } from '../../constants/index';

export const Header = styled.View({
    backgroundColor: color.primaryColor,
    justifyContent:'center',
    height:50,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
}); 

export const TextTitle = styled.Text({
    color: "#ffff",
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',

})

export const Container = styled.View({
    flex:1,
    backgroundColor:'white',
})

