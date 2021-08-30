import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text, Alert} from 'react-native';
import Orientation from 'react-native-orientation';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import IconAnt from 'react-native-vector-icons/AntDesign';

import Layout from '../../components/layout';
import {
  Label,
  Input,
  Row,
  Footer,
  SubmitButton,
  TextSubmit,
  TextSuccess,
  TextError,
} from './style';
import {Title, Container} from '../globalStyle';

import {ReqScanner, ReqSaveMateriais} from '../../redux/actions';
import {BottomPopUp} from 'react-native-gpp-utils';
import {PrimaryButton} from '../materiais/style';

const MateriaisPrev = ({
  navigation,
  route,
  loadingScanner,
  loadingSaveMateriais,
  ReqScanner,
  ReqSaveMateriais,
  dataScan,
}) => {
  const [form, setForm] = useState(
    Object.keys(dataScan).length > 0
      ? {...dataScan}
      : {
          patrimonio: !!route.params ? route.params : '',
          descricao: '',
        },
  );
  const [visible, setVisible] = useState(false);
  const [dataMaterial, setDataMaterial] = useState(null);

  useEffect(() => {
    ReqScanner({codigo_barra: route.params});
  }, []);

  const handleSubmit = () => {
    if (form.patrimonio == '' || form.descricao == '') {
      Alert.alert(
        'Preencha o formulário',
        'preencha o formulário corretamente',
      );
      return;
    }

    console.log(form);
    ReqSaveMateriais(form, afterSubmit);
  };

  const afterSubmit = (data) => {
    setVisible(true);
    setDataMaterial({...data});
  };

  return (
    <Layout withback>
      {!!loadingScanner ? (
        <Text> Carregando... </Text>
      ) : (
        <Container keyboardShouldPersistTaps={'handled'}>
          <Title> Informações do Item: </Title>
          <Container>
            <Row>
              <Label> Patrimônio * </Label>
              <Input
                defaultValue={!!route.params ? route.params : ''}
                onChangeText={(value) => {
                  setForm({...form, patrimonio: value});
                }}
              />
            </Row>
            <Row>
              <Label> Conta </Label>
              <Input
                defaultValue={!!dataScan?.conta ? dataScan.conta : ''}
                onChangeText={(value) => {
                  setForm({...form, conta: value});
                }}
              />
            </Row>
            <Row>
              <Label> Descrição * </Label>
              <Input
                defaultValue={!!dataScan?.descricao ? dataScan.descricao : ''}
                onChangeText={(value) => {
                  setForm({...form, descricao: value});
                }}
              />
            </Row>
            <Row>
              <Label> Localização </Label>
              <Input
                defaultValue={
                  !!dataScan?.localizacao ? dataScan.localizacao : ''
                }
                onChangeText={(value) => {
                  setForm({...form, localizacao: value});
                }}
              />
            </Row>
            <Row>
              <Label> Situação Fisica </Label>
              <Input
                defaultValue={
                  !!dataScan?.situacao_fisica ? dataScan.situacao_fisica : ''
                }
                onChangeText={(value) => {
                  setForm({...form, situacao_fisica: value});
                }}
              />
            </Row>
          </Container>
          <Row>
            <Footer>
              <SubmitButton
                onPress={() => {
                  handleSubmit();
                }}
                disabled={loadingSaveMateriais}>
                <TextSubmit>
                  {' '}
                  {!loadingSaveMateriais ? 'Salvar' : 'Carregando...'}{' '}
                </TextSubmit>
              </SubmitButton>
            </Footer>
          </Row>
        </Container>
      )}

      <BottomPopUp
        minHeight={200}
        visible={visible}
        onDismiss={() => {
          navigation.pop()
        }}>
        <Container>
          <IconAnt
            name={!dataMaterial?.error ? 'checkcircle' : 'closecircle'}
            size={40}
            style={{
              textAlign: 'center',
              color: !dataMaterial?.error ? 'green' : 'red',
            }}
          />
          <TextSuccess> {dataMaterial?.msg} </TextSuccess>

          <PrimaryButton
            onPress={() => {
              navigation.replace('Scanner');
            }}>
            {!dataMaterial?.error && (
              <TextSubmit> Escanear Novamente </TextSubmit>
            )}
          </PrimaryButton>
        </Container>
      </BottomPopUp>
    </Layout>
  );
};

const mapStateToProps = ({Scanner}) => {
  const {loadingScanner, loadingSaveMateriais, dataScan} = Scanner;

  return {
    loadingScanner,
    loadingSaveMateriais,
    dataScan,
  };
};

export default connect(mapStateToProps, {
  ReqScanner,
  ReqSaveMateriais,
})(MateriaisPrev);
