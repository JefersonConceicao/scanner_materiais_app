import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import Orientation from 'react-native-orientation';
import {ReqScanner} from '../../redux/actions';

import Layout from '../../components/layout';
import { 
    Title,
    Container,
} from '../globalStyle';

const MateriaisPrev = ({ route, loadingScanner, ReqScanner, dataScan}) => {
  const {data} = route.params;
  console.log(dataScan)
  useEffect(() => {
    ReqScanner({codigo_barra: "0000083"});
  },[])

  return (
    <Layout>
      <Container>
        <Title> Pré Visualização </Title>

            

      </Container>
    </Layout>
  );
};

const mapStateToProps = ({Scanner}) => {
  const {loadingScanner, dataScan} = Scanner;

  return {
    loadingScanner,
    dataScan,
  };
};

export default connect(mapStateToProps, {
  ReqScanner,
})(MateriaisPrev);
