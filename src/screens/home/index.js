import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { styles } from './style';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import Orientation from 'react-native-orientation';

import {
  ReqScanner 
} from '../../redux/actions';

const Home = ({
  ReqScanner,
  loadingScanner,
  dataScan
}) => {
  const [viewCamera, setViewCamera] = useState(false);
  const [{cameraRef, type}] = useCamera();
  const [scannerBar, setScannerBar] = useState('');

  useEffect(() => {
    if(!!viewCamera){
        Orientation.lockToLandscape()
    }else{
        Orientation.lockToPortrait()
    }
  }, [viewCamera])
  console.log(dataScan);

  return (
    <>
      <View style={styles.headerBar}>
        <Text style={styles.titleText}> Scanner Materiais - GETI </Text>
      </View>
      <View style={{flex: 6}}>
        {viewCamera && (
          <View style={{flex: 1}}>
            <RNCamera
              style={{flex: 1}}
              ref={cameraRef}
              type={type}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: 'Permissão para usar a camera',
                message:
                  'Nós precisamos da sua permissão para utilizar sua camera.',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              onBarCodeRead={({data}) => {
                if (!!data) {
                  setViewCamera(false);
                  ReqScanner({codigo_barra: data});
                }
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setViewCamera(false);
                  }}>
                  <Text style={styles.backButtonScanner}> Voltar </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contentScan}/> 
            </RNCamera>
          </View>
        )}

        {!viewCamera &&
          <View style={styles.descriptMaterial}> 
            <Text> 
              { !dataScan?.material?.nome_material 
              ? "Nome do material não encontrado"
              :`Nome: ${dataScan.material.nome_material}`
            } </Text>
             <Text> 
              { !dataScan?.material?.codigo_barra_material 
              ? "Código do material não encontrado"
              : `Código: ${dataScan?.material?.codigo_barra_material}`
            } </Text>
          </View>
        }
      </View>

      {!viewCamera && (
        <View style={styles.footerHome}>
          <TouchableOpacity
            style={styles.buttonScanner}
            onPress={() => {
              setViewCamera(true);
            }}>
            <Text style={styles.textSubmit}>Scanner </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const mapStateToProps = ({ Scanner }) => {
  const { loadingScanner, dataScan } = Scanner;

  return {
    loadingScanner,
    dataScan
  }
} 

export default connect(mapStateToProps,{
  ReqScanner,
})(Home);
