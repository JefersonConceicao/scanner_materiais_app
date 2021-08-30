import React from 'react';
import {
    Text,
} from 'react-native'
import {
    Header,
    Container,
    TextTitle,
    BackButton,
    TitleView,
} from './style';

import IconFA from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Layout = ({
    children,
    withback
}) => {
    const navigation = useNavigation()    

    return (
        <>
            <Header>  
                <BackButton
                    hitSlop={{right:50}} 
                    disabled={withback == false} 
                    onPress={() => {
                        navigation.pop()
                    }}
                > 
                    {withback && <IconFA name="chevron-left" size={20} color="#ffff"/>}
                </BackButton>
                
                <TitleView>
                    <TextTitle> 
                        Scanner Materiais  
                    </TextTitle>
                </TitleView>
            </Header>
            <Container>
                {children}
            </Container>
        </>
    )
}

export default Layout;