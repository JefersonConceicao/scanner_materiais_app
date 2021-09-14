import styled from 'styled-components/native';
import { color } from '../../constants';

export const Container = styled.View({
    marginHorizontal: '3%',
    marginVertical:'3%',
})

export const Header = styled.View({
    flexDirection: 'row',
    justifyContent:'space-between',
    margin:'2%',
})

export const Grid = styled.View({
    flexDirection: 'row',
    justifyContent:'space-around',
    flexWrap:'wrap',
    margin:'2%',
})

export const Item = styled.TouchableOpacity({
    borderBottomWidth: 0.6,
    borderColor: color.primaryColor,
    padding:'5%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
})

export const DescriptSetor = styled.Text({
    fontSize:20,
    color:color.primaryColor,
    fontWeight:'100',
})

