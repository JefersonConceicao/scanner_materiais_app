import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { BottomPopUp, Select } from 'react-native-gpp-utils';
import Layout from '../../components/layout';
import {
  Grid,
  Container,
  CardItem,
  TitleItem,
  SubTitleItem,
  SettingsItem,
  Footer,
  TextButton,
  PrimaryButton,
} from './style';
import { Title } from '../globalStyle';
import { ReqMateriais } from '../../redux/actions';

const Materiais = ({
  navigation,
  route,
  ReqMateriais,
  dataMateriais,
}) => {
  const [item, setItem] = useState(null)

  useEffect(() => {
    ReqMateriais(route.params);
  }, []);

  const renderItem = ({ item }) => (
    <CardItem onPress={() => { 
        setItem(item);
    }}>
      <View>
        <TitleItem> {!!item.nome_material ? item.nome_material : "N/A"} </TitleItem>
        <SubTitleItem />
        <SubTitleItem> {!!item.codigo_barra ? item.codigo_barra : "N/A"} </SubTitleItem>
      </View>
      <View>
        <SettingsItem> {!!item.situacao ? item.situacao : "N/A"} </SettingsItem>
        <SettingsItem> {!!item.valor ? item.valor : "N/A"} </SettingsItem>
        <SettingsItem bold> {!!item.local ? item.local : "N/A"} </SettingsItem>
      </View>
    </CardItem>
  );

  return (
    <Layout>
      <Container>
        <Title> Itens: </Title>
        <Grid>
          <FlatList
            renderItem={renderItem}
            data={dataMateriais}
            keyExtractor={(item) => item.id.toString()}
            extraData={item}
          />
        </Grid>
        <Footer>
          <PrimaryButton onPress={() => {
            navigation.navigate('Scanner')
          }}>
            <TextButton> Scanear Material </TextButton>
          </PrimaryButton>
        </Footer>
      </Container>
    </Layout>
  );
};

const mapStateToProps = ({ Materiais }) => {
  const { loadingMateriais, dataMateriais } = Materiais;

  return {
    loadingMateriais,
    dataMateriais,
  };
};

export default connect(mapStateToProps, {
  ReqMateriais,
})(Materiais);
