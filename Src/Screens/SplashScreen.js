/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  ImageBackground,
  AsyncStorage,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import DeviceInfo from 'react-native-device-info';
import {Value} from 'react-native-reanimated';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Database from './../utility/Database';
const db = new Database();

db.initDB();
class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: '',
      isLogged: '',
    };

    //  this._bootstrapAsync();
  }
  performTimeConsumingTask = async () => {
    console.log('hnadjasidaidaidasidasidjasijdnasidnasidjnai');
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
        console.log('aaalllaaareee');
      }, 3000),
    );
  };
  // componentWillMount() {
  //   console.log('in authLoading/////////............');
  //   const devices = DeviceInfo.getUniqueId();
  //   //console.log( "devices=",devices)
  //   AsyncStorage.setItem('deviceId', JSON.stringify(devices));
  //   // this._bootstrapAsync()
  // }

  // _bootstrapAsync = async () => {

  //   //console.log("in _bootstrapAsync")

  //   const data = this.performTimeConsumingTask();
  //   if (data !== null) {
  //   AsyncStorage.getItem('isLogged').then((keyValue) => {
  //     //console.log('isLogged value==',JSON.parse(keyValue));
  //    if(JSON.parse(keyValue)==true && JSON.parse(keyValue)!=undefined){
  //     Actions.App({type: "reset"})
  //    }else{
  //     Actions.Auth({type: "reset"})
  //    }
  //   }, (error) => {
  //     //console.log(error) //Display error
  //   });
  // }
  // }

  async componentDidMount() {
    setTimeout(() => {
      try {
        AsyncStorage.setItem('deviceId', JSON.stringify(devices));
        const devices = DeviceInfo.getUniqueId();

        AsyncStorage.getItem('isLogged').then(
          keyValue => {
            //  Actions.Auth({type: "reset"})
            /////////////////////////////////////
            if (JSON.parse(keyValue) == true && JSON.parse(keyValue) != null) {
              Actions.App({type: 'reset'});
            } else {
              Actions.Auth({type: 'reset'});
            }

            ////////////////////////
          },
          error => {
            //console.log(error) //Display error
          },
        );
      } catch {
        console.error();
      }
    }, 4000);

    // console.log('in componentDidMount');
    // const devices = DeviceInfo.getUniqueId();
    // //console.log( "devices=",devices)
    // AsyncStorage.setItem('deviceId', JSON.stringify(devices));
    // // this._bootstrapAsync()
    // const data = this.performTimeConsumingTask().then(data => {
    //   if (data !== null) {
    //     AsyncStorage.getItem('isLogged').then(
    //       keyValue => {
    //         //  Actions.Auth({type: "reset"})
    //         /////////////////////////////////////
    //         if (JSON.parse(keyValue) == true && JSON.parse(keyValue) != null) {
    //           Actions.App({type: 'reset'});
    //         } else {
    //           Actions.Auth({type: 'reset'});
    //         }

    //         ////////////////////////
    //       },
    //       error => {
    //         //console.log(error) //Display error
    //       },
    //     );
    //   }
    // });
    // console.log('this is data', data);
  }

  render() {
    return (
      <SafeAreaView style={styles.splashContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoView}>
          <ImageBackground
            source={require('../assets/Icons/splashBottom.png')}
            style={{
              flex: 1,
              height: hp('100'),
              width: wp('100'),
              resizeMode: 'cover',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: hp('20'),
              }}>
              {/* <Image style={{width: wp('29'), height: hp('18')}} */}
              <Image
                style={styles.logo}
                source={require('../assets/Icons/zylemini_logo.png')}
              />
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: hp('15'),
    height: hp('19'),
    // resizeMode: 'center',
  },
};

export default SplashScreen;
