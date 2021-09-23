import styled from 'styled-components/native';
import { color } from '../../constants';

export const ContainerScanner = styled.View({
   

})

export const Scanned = styled.TouchableOpacity({
    backgroundColor: color.primaryColor,
})

export const ScannerLine = styled.View({
    borderWidth: 0.5,
    borderColor:"#ffff",
    backgroundColor: "transparent",
    width:"80%",
    height:"50%",
})

export const InfoScanner = styled.Text({
    color: color.primaryColor,
    fontWeight:'bold',
    marginVertical:'4%',
    textAlign:'center',
})

