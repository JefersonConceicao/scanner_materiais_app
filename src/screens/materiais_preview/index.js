import React, {useState, useLayoutEffect} from 'react';
import {connect} from 'react-redux';
import {Text, Alert} from 'react-native';
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
  setorID,
}) => {
  const [form, setForm] = useState(
    Object.keys(dataScan).length > 0
      ? {...dataScan, setor_id: setorID}
      : {
          patrimonio: !!route.params ? route.params : '',
          descricao: '',
          setor_id: setorID,
        },
  );
  const [visible, setVisible] = useState(false);
  const [dataMaterial, setDataMaterial] = useState(null);

  useLayoutEffect(() => {
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
        <Container 
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
        >
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
                  {!loadingSaveMateriais ? 'Salvar' : 'Carregando...'}
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
          setVisible(false)
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

const mapStateToProps = ({Scanner, Materiais, Setores}) => {
  const {loadingScanner,  dataScan} = Scanner;
  const { loadingSaveMateriais } = Materiais;
  const { setorID } = Setores;

  return {
    loadingScanner,
    loadingSaveMateriais,
    dataScan,
    setorID,
  };
};

export default connect(mapStateToProps, {
  ReqScanner,
  ReqSaveMateriais,
})(MateriaisPrev);
