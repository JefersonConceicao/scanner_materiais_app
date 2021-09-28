import React, { useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { FlatList, Text, View, Alert, RefreshControl } from 'react-native';
import { BottomPopUp } from 'react-native-gpp-utils';
import { Spinner } from 'native-base';
import Layout from '../../components/layout';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconIon from 'react-native-vector-icons/Ionicons';

import {
  Container,
  CardItem,
  TitleItem,
  SubTitleItem,
  SettingsItem,
  TextButton,
  PrimaryButton,
  TextEmpty,
  HeaderList,
  InputInPopUp,
  DeleteTouch,
} from './style';

import { Title, CardTitle, Row,  SubmitButton, TextSubmit, TextDanger, SubTitle} from '../globalStyle';
import { color } from '../../constants';
import { ReqMateriais, ReqUpdateMateriais, ReqDeleteMateriais } from '../../redux/actions';

const Materiais = ({
  navigation,
  route,
  //actions
  ReqMateriais,
  ReqUpdateMateriais,
  ReqDeleteMateriais,
  //loadings
  loadingMateriais,
  loadingUpdateMateriais,
  //data
  dataMateriais,
}) => {
  const [item, setItem] = useState(null)
  const [formUpdate, setFormUpdate] = useState({
    id:"",
    nome_material: "",
    situacao:"",
    local:"",
    conta:"",
    setor_id:"",
  })

  useLayoutEffect(() => {
    ReqMateriais({setor_id: route.params.setor});
  }, []);

  const handleDelete = id => {
    Alert.alert("Tem certeza?", "Deseja realmente excluír este item?", [
      { text: "Cancelar" },
      {
        style:"Sim, excluir",
        onPress:() => { 
          ReqDeleteMateriais(id);
          setItem(null)
        }
      }
    ])
  }

  const handleSubmitFormEdit = () => {
    if(formUpdate.nome_material == "" || formUpdate.localizacao == ""){
      Alert.alert("Preencha o formulário", "revise o formulário e tente novamente");
      return;
    }
    
    ReqUpdateMateriais(formUpdate);
  }

  const renderItem = ({ item }) => (
    <CardItem 
      onPress={() => { 
       setItem(item)
       setFormUpdate({...item})
    }}>
      <View style={{ width:'70%'}}>
        <TitleItem> {!!item.nome_material ? item.nome_material : "N/A"} </TitleItem>
        <SubTitleItem />
        <SubTitleItem> {!!item.codigo_barra ? item.codigo_barra : "N/A"} </SubTitleItem>
      </View>
      <View style={{width:'30%'}}>
        <SettingsItem> {!!item.situacao ? item.situacao : "N/A"} </SettingsItem>
        <SettingsItem bold> {!!item.local ? item.local : "N/A"} </SettingsItem>
      </View>
    </CardItem>
  );

  const renderEmptyComponent = () => {
    return(
      <View style={{ flex:1, alignItems:'center'}}> 
        <TextEmpty> Sem itens  </TextEmpty>
      </View>
    )
  }

  return (
    <Layout withback>
      <Container style={{ marginTop:'3%'}}>
        <HeaderList>
          <View>
            <Title> Itens </Title>
            <SubTitle> Setor: {route.params.dataSetor.nome_setor} </SubTitle>
          </View>
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
        {loadingMateriais ? 
            <Spinner color={color.primaryColor}/> 
          :
          <FlatList
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            data={dataMateriais}
            keyExtractor={(item) => item.id.toString()}
            extraData={item}
            refreshControl={
              <RefreshControl 
                colors={[color.primaryColor]}
                onRefresh={() => {
                  ReqMateriais({setor_id: route.params.setor})
                }}
              />
            }
            refreshing={loadingMateriais}
            ListEmptyComponent={renderEmptyComponent}
          />
        }
      </Container>
      {!!item &&
        <BottomPopUp
          visible={item}
          onDismiss={() => {
            setItem(null)
          }}
        >
          <Row>
            <CardTitle> Nome do Material: </CardTitle>
            <InputInPopUp 
              defaultValue={item?.nome_material}
              onChangeText={value => {
                setFormUpdate({...formUpdate, nome_material: value})
              }}
            />
          </Row>
          <Row>
            <CardTitle> Situação  </CardTitle>
            <InputInPopUp 
              defaultValue={item?.situacao}
              onChangeText={value => {
                setFormUpdate({...formUpdate, situacao: value})
              }}
            />
          </Row>
          <Row> 
            <CardTitle> Localização  </CardTitle>
            <InputInPopUp 
              defaultValue={item?.local}
              onChangeText={value => {
                setFormUpdate({...formUpdate, localizacao: value})
              }}
            />
          </Row>
          <Row> 
            <CardTitle> Conta  </CardTitle>
            <InputInPopUp 
              defaultValue={item?.conta}
              onChangeText={value => {
                setFormUpdate({...formUpdate, conta: value})
              }}
            />
          </Row>
          <Row>
            <SubmitButton 
              style={{width:'100%'}} 
              onPress={() => handleSubmitFormEdit()}
              disabled={loadingUpdateMateriais}
            >
              <TextSubmit> {loadingUpdateMateriais == false ? "Salvar" : "Carregando..."} </TextSubmit>   
            </SubmitButton>
          </Row>
          <DeleteTouch onPress={() => {
            handleDelete(item?.id)
          }}>
            <TextDanger> 
              <IconIon name="trash" size={20} color={color.dangerColor}/> 
              Excluir este material 
            </TextDanger>
          </DeleteTouch>
        </BottomPopUp>
      } 
    </Layout>
  );
};

const mapStateToProps = ({ Materiais }) => {
  const { 
    loadingMateriais, 
    loadingUpdateMateriais,
    loadingDeleteMateriais, 
    dataMateriais
  } = Materiais;

  return {
    loadingMateriais,
    loadingUpdateMateriais,
    loadingDeleteMateriais,
    dataMateriais,
  };
};

export default connect(mapStateToProps, {
  ReqMateriais,
  ReqUpdateMateriais,
  ReqDeleteMateriais,
})(Materiais);
