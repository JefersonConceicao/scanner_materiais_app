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



