import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Text , View } from 'react-native';

import Layout from '../../components/layout';

import { 
  Container,
  Title,
  Grid,
  Item,
  DescriptSetor,
} from './style';

import { ReqSetores } from '../../redux/actions'; 

const Home = ({
  loadingSetores,
  dataSetores,
  ReqSetores,
}) => {
  useEffect(() => {
    ReqSetores()
  },[])

  return (
    <Layout>
      <Container>
        <Title> Setores: </Title>
        <Grid>
          <Item>
              <DescriptSetor> GETI </DescriptSetor>
          </Item>
          <Item>
              <DescriptSetor> GETI </DescriptSetor>
          </Item>
        </Grid>
      </Container>
    </Layout>
  )
}

const mapStateToProps = ({Setores}) => {
  const { loadingSetores, dataSetores } = Setores;
  return { loadingSetores, dataSetores}
}

export default connect(mapStateToProps, {
  ReqSetores,
})(Home);