import styled from 'styled-components/native';
import { color } from '../constants';

export const Container = styled.ScrollView({
    marginHorizontal: '3%',
    marginVertical:'3%',
})

export const Title = styled.Text({
    fontFamily: 'Roboto',
    fontWeight:'100',
    fontSize:20,
})

export const Row = styled.View({
    flexDirection:'row',
    justifyContent:'space-between',
    margin:'2%',
})

export const TextSubmit = styled.Text({
    color:"#ffff",
    textAlign:'center',
    padding:10,
    fontSize:18,
    fontWeight:'bold',
})

export const SubmitButton = styled.TouchableOpacity({
    backgroundColor: color.primaryColor,
    marginHorizontal:'3%',
    borderRadius:25,
})

export const CardTitle = styled.Text({
    fontWeight: 'bold',
    fontSize:15,
})

export const CardText = styled.Text({
    fontSize:15,
})

export const TextDanger = styled.Text({
    color: color.dangerColor,
    fontWeight:'bold',
})
