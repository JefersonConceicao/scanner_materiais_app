import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { BottomPopUp } from 'react-native-gpp-utils';

import Layout from '../../components/layout';
import { 
  Grid, 
  Item, 
  Header, 
  Container,
  ButtonDeleteSetor,
  LabelDeleteSetor  
} from './style';

import { 
  Title, 
  CardTitle, 
  FormGroup,
  FormLabel,
  FormInput, 
} from '../globalStyle';

import { color } from '../../constants';

import { ReqSetores, SetSetorID, ReqDeleteSetor, ReqStoreCreate } from '../../redux/actions';

import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';

const Home = ({
  //LOADINGS
  loadingSetores,
  loadingDeleteSetor,
  //ACTIONS 
  ReqSetores,
  SetSetorID,
  ReqDeleteSetor,
  ReqStoreCreate,
  //DATA 
  dataSetores,
  //OTHERS
  navigation,
}) => {
  useEffect(() => {
    ReqSetores();
  }, []);

  const [item, setItem] = useState(null)
  const [popupCreate, setPopupCreate] = useState(false)
  const [popupSettings, setPopupSettings] = useState(false)

  const closePopups = () => {
    setPopupSettings(false);
  }

  const showPopupSettings = () => {
    if(!!item){
      return(
        <BottomPopUp
          visible={popupSettings}
          onDismiss={() => setPopupSettings(false)}
          minHeight={80}
        >
          <ButtonDeleteSetor 
            onPress={() => {
              ReqDeleteSetor(item.id, closePopups)
          }}> 
            <IconFeather 
              name="trash-2"
              color="#ffff"
              size={25}
            />
            <LabelDeleteSetor> 
              {!loadingDeleteSetor ? `Excluir ${item.nome_setor}` : ` Carregando... `} 
            </LabelDeleteSetor>
          </ButtonDeleteSetor>
      </BottomPopUp>
      )
    }
  }

  const showPopupCreate = () => {
    return (
      <BottomPopUp
        visible={popupCreate}
        onDismiss={() => setPopupCreate(false)}
        minHeight={100}
      >
        <Title> Cadastre um novo setor</Title>
        <FormGroup>

          <FormInput
            placeholder="Preencha o nome do setor"
            autoFocus={true}
          /> 
        </FormGroup>
      </BottomPopUp>
    )
  }

  const renderItem = ({ item }) => (
    <Item
      onPress={() => {
        navigation.navigate('Materiais', { setor_id: item.id })
        SetSetorID(item.id)
      }}
      onLongPress={() => {
        setItem(item);
        setPopupSettings(true)
      }}
    >
      <Text> {item.nome_setor} </Text>
        <IconAnt
          name="right"
          color={color.primaryColor}
          size={20}
        />
    </Item>
  )

  return (
    <Layout>
      <Container>
        <Header>
          <Title> Setores: </Title>
          <TouchableOpacity 
            onPress={() => {
              setPopupCreate(true)
            }}
          >
            <IconAnt
              name="pluscircleo"
              size={30}
              color={color.primaryColor}
            />
          </TouchableOpacity>
        </Header>
        <Grid>
          <FlatList
            data={dataSetores}
            refreshControl={
              <RefreshControl
                colors={[color.primaryColor]}
                refreshing={loadingSetores}
              />
            }
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </Grid>
      </Container>
      {showPopupSettings()}
      {showPopupCreate()}
    </Layout>
  );
};

const mapStateToProps = ({ Setores }) => {
  const { loadingSetores, dataSetores, loadingDeleteSetor, setorID} = Setores;

  return { 
    loadingSetores, 
    dataSetores, 
    setorID, 
    loadingDeleteSetor 
  };
};

export default connect(mapStateToProps, {
  ReqSetores,
  SetSetorID,
  ReqDeleteSetor,
  ReqStoreCreate,
})(Home);
