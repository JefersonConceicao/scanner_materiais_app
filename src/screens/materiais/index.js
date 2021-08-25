import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {FlatList, Text} from 'react-native';
import Layout from '../../components/layout';
import {
    Grid, 
    Container, 
    CardItem, 
    ColumnDescItem, 
    ColumnSettingsItem,
    TitleItem,
    SubTitleItem,
    SettingsItem, 
    Footer,
} from './style';
import { Title, Row} from '../globalStyle';
import {ReqMateriais} from '../../redux/actions';

const Materiais = ({
  navgation,
  route,
  ReqMateriais,
  loadingMateriais,
  dataMateriais,
}) => {
  const [item, setItem] = useState(null)

  useEffect(() => {
    ReqMateriais(route.params);
  }, []);

  const renderItem = ({item}) => (
    <CardItem>
        <ColumnDescItem>
            <TitleItem> {!!item.nome_material ? item.nome_material : "N/A"} </TitleItem>
            <SubTitleItem> {!!item.codigo_barra ? item.codigo_barra : "N/A"} </SubTitleItem>
        </ColumnDescItem>
        <ColumnSettingsItem>
            <SettingsItem> {!!item.situacao ? item.situacao : "N/A" } </SettingsItem>
            <SettingsItem> {!!item.valor ? item.valor : "N/A"} </SettingsItem>
            <SettingsItem bold> {!!item.local ? item.local : "N/A"} </SettingsItem>
        </ColumnSettingsItem>
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
      </Container>
    </Layout>
  );
};

const mapStateToProps = ({Materiais}) => {
  const {loadingMateriais, dataMateriais} = Materiais;

  return {
    loadingMateriais,
    dataMateriais,
  };
};

export default connect(mapStateToProps, {
  ReqMateriais,
})(Materiais);
