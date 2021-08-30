import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { BottomPopUp, Select } from 'react-native-gpp-utils';
import Layout from '../../components/layout';
import IconAnt from 'react-native-vector-icons/AntDesign';

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
  TextEmpty,
  HeaderList,
} from './style';
import { Title } from '../globalStyle';
import { ReqMateriais } from '../../redux/actions';

const Materiais = ({
  navigation,
  route,
  loadingMateriais,
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
        <SettingsItem bold> {!!item.local ? item.local : "N/A"} </SettingsItem>
      </View>
    </CardItem>
  );

  const renderEmptyComponent = () => {
    return(
      <View> 
        <TextEmpty> Nenhum item na lista </TextEmpty>
      </View>
    )
  }

  return (
    <Layout withback>
      <Container>
        <HeaderList>
          <Title> Itens: </Title>
          <PrimaryButton onPress={() => {
            navigation.navigate('Scanner')
          }}>
          <TextButton> 
            <IconAnt 
              name="barcode" 
              size={30} 
              color="#ffff"
            />
          </TextButton>
        </PrimaryButton>
        </HeaderList>
        <Grid>
          <FlatList
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            data={dataMateriais}
            keyExtractor={(item) => item.id.toString()}
            extraData={item}
            onRefresh={() => {
              ReqMateriais(route.params)
            }}
            refreshing={loadingMateriais}
            ListEmptyComponent={renderEmptyComponent}
          />
        </Grid>
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
