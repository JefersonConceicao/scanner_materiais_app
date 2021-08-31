import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FlatList, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { BottomPopUp } from 'react-native-gpp-utils';
import Layout from '../../components/layout';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconIon from 'react-native-vector-icons/Ionicons';

import {
  Grid,
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

import { Title, CardTitle, Row, CardText, SubmitButton, TextSubmit, TextDanger} from '../globalStyle';
import { color } from '../../constants';
import { ReqMateriais, ReqUpdateMateriais } from '../../redux/actions';

const Materiais = ({
  navigation,
  route,
  loadingMateriais,
  dataMateriais,
  ReqMateriais,
  ReqUpdateMateriais,
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

  useEffect(() => {
    ReqMateriais(route.params);
  }, []);

  const handleDelete = id => {
    Alert.alert("Tem certeza?", "Deseja realmente excluír este item?", [
      { 
        text: "Cancelar", 
      },
      {
        style:"Sim, excluir",
        onPress:() => { 
          console.log("delete material item " + id);
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
    <CardItem onPress={() => { 
       setItem(item)
       setFormUpdate({...item})
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
            <SubmitButton style={{width:'100%'}} onPress={() => handleSubmitFormEdit()}>
              <TextSubmit> Salvar </TextSubmit>   
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
  const { loadingMateriais, dataMateriais, loadingUpdateMateriais } = Materiais;

  return {
    loadingMateriais,
    dataMateriais,
    loadingUpdateMateriais,
  };
};

export default connect(mapStateToProps, {
  ReqMateriais,
  ReqUpdateMateriais,
})(Materiais);
