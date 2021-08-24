import styled from 'styled-components/native';
import { color } from '../../constants';

export const Container = styled.ScrollView({
    marginHorizontal: '3%',
    marginVertical:'3%',
})

export const Title = styled.Text({
    fontFamily: 'Roboto',
    fontWeight:'100',
    fontSize:20,
})

export const Grid = styled.View({
    flexDirection: 'row',
    justifyContent:'space-around',
    flexWrap:'wrap',
    margin:'4%',
})

export const Item = styled.TouchableOpacity({
    backgroundColor:"#fff",
    height:142,
    width:127,
    borderWidth:1,
    borderColor: color.primaryColor,
    alignItems:'center',
    justifyContent:'center',
    elevation: '8',
    borderRadius:3,
})

export const DescriptSetor = styled.Text({
    fontSize:20,
    color:color.primaryColor,
    fontWeight:'100',
})

