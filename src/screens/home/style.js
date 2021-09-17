import styled from 'styled-components/native';
import { color } from '../../constants';

export const Container = styled.View({
    marginHorizontal: '3%',
    marginVertical:'3%',
})

export const Header = styled.View({
    marginVertical:'2%',
    paddingBottom:'5%',                        
    flexDirection: 'row',
    justifyContent:'space-between',
})  

export const Grid = styled.View({
    flexDirection: 'row',
    justifyContent:'space-around',
    flexWrap:'wrap',
    margin:'2%',
})

export const Item = styled.TouchableOpacity({
    borderWidth: 0.8,
    borderColor: color.primaryColor,
    padding:'6%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:'3%',
})

export const DescriptSetor = styled.Text({
    fontSize: 20,
    color:color.primaryColor,
    fontWeight:'100',
})

export const ButtonDeleteSetor = styled.TouchableOpacity({
    backgroundColor: color.dangerColor,
    padding:10,
    flexDirection:'row',
    justifyContent:'center',
    borderRadius:5,
})

export const LabelDeleteSetor = styled.Text({
    color: "#ffff",
    fontWeight:'bold',
    paddingLeft:'5%',
    fontSize:16,
})


