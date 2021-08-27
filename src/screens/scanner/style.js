import styled from 'styled-components/native';
import { color } from '../../constants';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions;

export const ContainerScanner = styled.View({
    height: height,
})

export const Scanned = styled.TouchableOpacity({
    backgroundColor: color.primaryColor,
})



