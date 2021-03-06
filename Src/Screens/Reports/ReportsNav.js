import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView,BackHandler, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';



export default class ReportsNav extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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
            <View>
                <View style={styles.mainContainer}>
                    <View style={styles.backArrowContainer}>
                        <TouchableOpacity   onPress={() =>Actions.drawerMenu() }>  
                            <Image  style={styles.backArrowStyle}
                                source = {require('../../assets/Icons/Back_White.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.assetLabelStyle}> Reports </Text>
                    </View>

                    
                <Image  style={styles.searchIconStyle}
                    source = {require('../../assets/Icons/SearchHeader.png')}
                />    
                </View> 

            </View>
        );
    }
}

const styles = StyleSheet.create({

  mainContainer:{
    flexDirection:'row',
    backgroundColor: '#221818', 
    color: '#fff', 
    height:hp('8'),
  },

  backArrowContainer: {
    flexDirection:"row", 
    alignItems:'flex-start',
    flex:1,
    alignSelf:'center',
  },

  backArrowStyle:{
    marginLeft:wp('4'),
  },

  assetLabelStyle:{ 
    justifyContent:'center',
    color: '#F8F4F4', 
    fontSize:24, 
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    alignSelf:'center', 
    marginLeft:wp('1'), marginTop:wp('-2'),
    
  
  },

  searchIconStyle:{
    marginRight:hp('2'),
    marginBottom:hp('0.5'), 
    height:hp('4'), 
    width:wp('7'),
    alignSelf:'center',
  },

});