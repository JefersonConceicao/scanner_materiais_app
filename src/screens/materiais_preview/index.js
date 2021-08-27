import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Orientation from 'react-native-orientation';

import Layout from '../../components/layout';
import { Label, Input, Row, Footer, SubmitButton, TextSubmit } from './style';
import {
  Title,
  Container,
} from '../globalStyle';

import { ReqScanner, ReqSaveMateriais } from '../../redux/actions';
import { BottomPopUp } from 'react-native-gpp-utils';
import { PrimaryButton } from '../materiais/style';

const MateriaisPrev = ({ 
  navigation,
  route, 
  loadingScanner,
  loadingSaveMateriais,
  ReqScanner, 
  ReqSaveMateriais, 
  dataScan 
}) => {
  useEffect(() => {
    ReqScanner({ codigo_barra: "0000083" });
  }, [])

  const [visible, setVisible] = useState(false)
  const [dataMaterial, setDataMaterial] = useState(null)

  const afterSubmit = (data) => {
      setVisible(true)
      setDataMaterial({...data});
  }

  return (
    <Layout>
      {!!loadingScanner ?
        <Text> Carregando... </Text>
        :
        <Container>
          <Title> Pré Visualização: </Title>
          <Container>
            <Row>
              <Label> Conta: </Label>
              <Input
                defaultValue={!!dataScan?.conta ? dataScan.conta : "Não informado"}
              />
            </Row>
            <Row>
              <Label> Descrição: </Label>
              <Input
                defaultValue={!!dataScan?.descricao ? dataScan.descricao : "Não informado"}
              />
            </Row>
            <Row>
              <Label> Localização: </Label>
              <Input
                defaultValue={!!dataScan?.localizacao ? dataScan.localizacao : "Não informado"}
              />
            </Row>
            <Row>
              <Label> Situação Fisica </Label>
              <Input
                defaultValue={!!dataScan?.situacao_fisica ? dataScan.situacao_fisica : "Não informado"}
              />
            </Row>
          </Container>
          <Row>
            <Footer>
              <SubmitButton 
                onPress={() => {
                  ReqSaveMateriais(dataScan, afterSubmit)
                }} 
                disabled={loadingSaveMateriais}
              >
                <TextSubmit> {!loadingSaveMateriais ? "Salvar" : "Carregando..."} </TextSubmit>
              </SubmitButton>
            </Footer>
          </Row>
        </Container>
      }

      <BottomPopUp
        minHeight={500}
        visible={visible}
        onDismiss={() => {
          navigation.pop()
        }}
      >
        {!dataMaterial?.error ?
            <Container>
              <Text> {dataMaterial?.msg} </Text>
              <PrimaryButton onPress={() => {
                navigation.replace("Scanner")
              }}>  
                  <TextSubmit> Escanear Novamente </TextSubmit>
              </PrimaryButton>
            </Container>
          :
            <Text> Algo deu errado </Text>
        }
      </BottomPopUp>
    </Layout>
  );
};

const mapStateToProps = ({ Scanner }) => {
  const { loadingScanner, loadingSaveMateriais, dataScan } = Scanner;

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
