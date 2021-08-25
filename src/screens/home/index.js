import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import Layout from '../../components/layout';
import {Grid, Item, DescriptSetor} from './style';
import {Title, Container} from '../globalStyle';
import {ReqSetores} from '../../redux/actions';

const Home = ({loadingSetores, dataSetores, ReqSetores, navigation}) => {
  useEffect(() => {
    ReqSetores();
  }, []);

  return (
    <Layout>
      <Container>
        <Title> Setores: </Title>
        <Grid>
          <>
            {!!dataSetores.length &&
              dataSetores.map((value, index) => (
                <Item
                  key={index}
                  onPress={() => {
                    navigation.navigate('Materiais', {setor_id: value.id});
                  }}>
                  <DescriptSetor> {value.nome_setor} </DescriptSetor>
                </Item>
              ))}
          </>
        </Grid>
      </Container>
    </Layout>
  );
};

const mapStateToProps = ({Setores}) => {
  const {loadingSetores, dataSetores} = Setores;
  return {loadingSetores, dataSetores};
};

export default connect(mapStateToProps, {
  ReqSetores,
})(Home);
