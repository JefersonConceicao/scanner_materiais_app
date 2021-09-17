import React, { useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { useValidation } from 'react-native-form-validator';

import Layout from '../../components/layout';
import {
  Row,
  Footer,
  SubmitButton,
  TextSubmit,
} from './style';

import {
  Title,
  Container,
  FormGroup,
  FormLabel,
  FormInput,
  LabelDanger,
} from '../globalStyle';

import { ReqScanner, ReqSaveMateriais } from '../../redux/actions';

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
      ? { ...dataScan, setor_id: setorID }
      : {
        patrimonio: !!route.params ? route.params : '',
        conta: "",
        descricao: "",
        localizacao: "",
        situacao_fisica: "",
        setor_id: setorID,
      },
  );

  const { validate, isFieldInError, getErrorsInField, getErrorMessages, isFormValid } = useValidation({
    state: {
      patrimonio: form.patrimonio,
      descricao: form.descricao,
      localizacao: form.localizacao,
      situacao_fisica: form.situacao_fisica
    },
    messages: {
      en: { required: "Campo obrigatório" },
    }
  })

  useLayoutEffect(() => {
    ReqScanner({ codigo_barra: route.params });
  }, []);

  const handleSubmit = () => {
    validate({
      patrimonio: { required: true },
      descricao: { required: true },
      localizacao: { required: true },
      situacao_fisica: { required: true }
    })

    if (!!isFormValid()) {
      ReqSaveMateriais(form, navigation);
    }
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
          <Text> Caso os campos não estejam preenchidos, preencha manualmente. </Text>
          <Container>
            <Row>
              <FormGroup>
                <FormLabel> Patrimônio <LabelDanger> * </LabelDanger> </FormLabel>
                <FormInput
                  autoFocus={true}
                  defaultValue={!!route.params ? route.params : ''}
                  onChangeText={(value) => {
                    setForm({ ...form, patrimonio: value });
                  }}
                />
                {isFieldInError('patrimonio') && getErrorsInField('patrimonio').map((errorMessage, index) => (
                  <Text style={{ color: 'red' }} key={index}> {errorMessage} </Text>
                ))}
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <FormLabel> Conta </FormLabel>
                <FormInput
                  defaultValue={!!dataScan?.conta ? dataScan.conta : ''}
                  onChangeText={(value) => {
                    setForm({ ...form, conta: value });
                  }}
                />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <FormLabel> Descrição <LabelDanger> * </LabelDanger> </FormLabel>
                <FormInput
                  defaultValue={!!dataScan?.descricao ? dataScan.descricao : ''}
                  onChangeText={(value) => {
                    setForm({ ...form, descricao: value });
                  }}
                />
                {isFieldInError('descricao') && getErrorsInField('descricao').map((errorMessage, index) => (
                  <Text style={{ color: 'red' }} key={index}> {errorMessage} </Text>
                ))}
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <FormLabel> Localização <LabelDanger> * </LabelDanger> </FormLabel>
                <FormInput
                  defaultValue={
                    !!dataScan?.localizacao ? dataScan.localizacao : ''
                  }
                  onChangeText={(value) => {
                    setForm({ ...form, localizacao: value });
                  }}
                />
                {isFieldInError('localizacao') && getErrorsInField('localizacao').map((errorMessage, index) => (
                  <Text style={{ color: 'red' }} key={index}> {errorMessage} </Text>
                ))}
              </FormGroup>
            </Row>
            <Row>
              <FormLabel> Situação Fisica  <LabelDanger> * </LabelDanger> </FormLabel>
              <FormInput
                defaultValue={
                  !!dataScan?.situacao_fisica ? dataScan.situacao_fisica : ''
                }
                onChangeText={(value) => {
                  setForm({ ...form, situacao_fisica: value });
                }}
              />
              {isFieldInError('situacao_fisica') && getErrorsInField('situacao_fisica').map((errorMessage, index) => (
                <Text style={{ color: 'red' }} key={index}> {errorMessage} </Text>
              ))}
            </Row>
          </Container>
          <Row>
            <Footer>
              <SubmitButton onPress={handleSubmit} disabled={loadingSaveMateriais}>
                <TextSubmit>
                  {!loadingSaveMateriais ? 'Salvar' : 'Carregando...'}
                </TextSubmit>
              </SubmitButton>
            </Footer>
          </Row>
        </Container>
      )}
    </Layout>
  );
};

const mapStateToProps = ({ Scanner, Materiais, Setores }) => {
  const { loadingScanner, dataScan } = Scanner;
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
