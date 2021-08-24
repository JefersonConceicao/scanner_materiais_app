import React from 'react';
import {
    Text,
} from 'react-native'
import {
    Header,
    Container,
    TextTitle,
} from './style';

const Layout = ({
    children,
}) => {
    return (
        <>
            <Header>
                <TextTitle> Scanner Materiais  </TextTitle>
            </Header>
            <Container>
                {children}
            </Container>
        </>
    )
}

export default Layout;