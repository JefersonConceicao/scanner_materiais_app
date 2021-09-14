import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Text, View, FlatList, TouchableOpacity } from 'react-native';
import Layout from '../../components/layout';
import {Grid, Item, Header , Container} from './style';
import {Title} from '../globalStyle';
import {ReqSetores, SetSetorID} from '../../redux/actions';
import { color } from '../../constants';

import IconAnt from 'react-native-vector-icons/AntDesign';

const Home = ({
  //LOADINGS
  loadingSetores, 
  //ACTIONS 
  ReqSetores, 
  SetSetorID,
  //DATA 
  dataSetores,
  //OTHERS
  navigation,
  setorID
}) => {
  useEffect(() => {
    ReqSetores();
  }, []);

  const renderItem = ({item}) => (
    <Item onPress={() => { 
      navigation.navigate('Materiais', {setor_id: item.id})
      SetSetorID(item.id)
    }}> 
      <Text> { item.nome_setor } </Text> 
      <IconAnt 
        name="right"
        color={color.primaryColor}
      />
    </Item>
  )

  return (
    <Layout>
      <Container>
        <Header> 
          <Title> Setores: </Title>
          <TouchableOpacity> 
              <IconAnt 
                name="pluscircleo"
                size={28}
                color={color.primaryColor}
              />
          </TouchableOpacity>
        </Header>
        <Grid>
          <FlatList 
            data={dataSetores}
            onRefresh={() => ReqSetores()}
            refreshing={loadingSetores}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </Grid>
      </Container>
    </Layout>
  );
};

const mapStateToProps = ({Setores}) => {
  const {loadingSetores, dataSetores, setorID} = Setores;
  return {loadingSetores, dataSetores, setorID};
};

export default connect(mapStateToProps, {
  ReqSetores,
  SetSetorID,
})(Home);
