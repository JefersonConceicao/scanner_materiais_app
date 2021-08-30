import styled from 'styled-components/native';
import { color } from '../../constants';

export const Label = styled.Text({
    fontWeight: 'bold',
})

export const Row = styled.View({
    marginVertical: '2%',
})

export const Input = styled.TextInput({
    borderBottomWidth:1,
    borderColor: color.primaryColor,
})

export const Footer = styled.View({})

export const SubmitButton = styled.TouchableOpacity({
    backgroundColor: color.primaryColor,
    marginHorizontal:'3%',
    borderRadius:25,
    marginVertical:'3%',
})

export const TextSubmit = styled.Text({
    color:"#ffff",
    textAlign:'center',
    padding:10,
    fontSize:18,
    fontWeight:'bold',
})

export const TextSuccess = styled.Text({
    color: color.primaryColor,
    textAlign:'center',
    padding:10,
    fontSize:18,
    fontWeight:'bold',
})

export const TextError = styled.Text({
    color: color.dangerColor,
    textAlign:'center',
    padding:10,
    fontSize:18,
    fontWeight:'bold',
})