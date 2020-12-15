import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image,BackHandler} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';

import Logo from '../../components/Logo';


export default class AboutUs extends Component {
constructor(props) {
    super(props);
    this.state = {  };
}

static navigationOptions = {
  title: 'About Us',
  color: 'white',
    headerStyle: {
        backgroundColor: 'red'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: '#fff'
    },

  //  headerLeft: <Icon  name="ios-arrow-round-back" size={20} color="white"    padding='20'  
  //               onPress={ () => { Actions.Dashboard() }}   />

  headerLeft: (
        <View style={{flexDirection:"row", alignItems:'center',justifyContent:'center',alignSelf:'center',}}>
            <TouchableOpacity   onPress={() =>Actions.drawerMenu() }>  
                <Image  style={{marginLeft:wp('4'),}}
                    source = {require('../../assets/Icons/Back_White.png')}
                />
            </TouchableOpacity>
            
        </View>
 )
                               
}

componentWillUnmount() {   
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
   } 
   handleBackButtonClick() {
     Actions.drawerMenu();
     return true;
   }
   componentDidMount() {
  
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);  
   
}

render() {
    return (
        <View style={styles.container}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
            <Logo/>
            <Text style={styles.versionTextStyle}>
                Version 1.2.8
            </Text>
             <Text style={styles.TCTextStyle}>
                Terms & Conditions
            </Text>
            </ScrollView>
        </View>   
    );
}
}

const styles = StyleSheet.create({
    container: {
        height: hp('100'), 
        width: wp('100'), 
        backgroundColor:'red',
    },

    versionTextStyle: {
        color: 'white', 
        fontSize:RFValue(18),
        fontFamily: 'Proxima Nova', 
        alignSelf:'center',
        fontWeight: 'bold', 
        marginTop: hp('5'),
    }, 

    TCTextStyle:{
        color: 'white', 
        fontSize:RFValue(18),
        fontFamily: 'Proxima Nova', 
        alignSelf:'center',
        fontWeight: 'bold', 
        marginTop: hp('5'),
    },
});