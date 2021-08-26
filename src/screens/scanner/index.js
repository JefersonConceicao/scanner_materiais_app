import React, {useLayoutEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import Orientation from 'react-native-orientation';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';

import Layout from '../../components/layout';
import {ContainerScanner, Scanned} from './style';
import {Container} from '../globalStyle';
import Sound from 'react-native-sound';

const Scanner = ({ navigation }) => {
  var beep = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed loading sound');
    }
  });

  const [{cameraRef, type}, {}] = useCamera();
  useLayoutEffect(() => {
    Orientation.lockToLandscape();

    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <Layout>
      <Container>
        <ContainerScanner>
          <RNCamera
            style={{
              height: 500,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            ref={cameraRef}
            type={type}
            androidCameraPermissionOptions={{
              title: 'Permissão para usar a camera',
              message: 'É necessário permitir o uso da camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permissão para utilizar o áudio',
              message: 'É necessário permitir o uso do áudio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onBarCodeRead={(data) => {
              if (!!data) {
                beep.play((success) => {
                  if (success) console.log('succefully sound played');
                });

                navigation.replace("MateriaisPrev", data);
              }
            }}>
            </RNCamera>
        </ContainerScanner>
      </Container>
    </Layout>
  );
};

const mapStateToProps = ({Scanner}) => {
  return {};
};

export default connect(mapStateToProps, {})(Scanner);
