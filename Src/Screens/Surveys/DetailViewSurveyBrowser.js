import React, { Component } from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image,BackHandler,AsyncStorage,ActivityIndicator,PermissionsAndroid } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import Geolocation from 'react-native-geolocation-service';
import { WebView } from "react-native-webview";
import { connect } from 'react-redux'
import { SERVEY_INFO} from '../../Redux/actions/ServeyAction'
var user='',pass='',lats='',longs=''
var res3=''
export  class DetailViewSurveyBrowser extends Component {
constructor(props) {
    super(props);
    this.state = {  userLatitude: '',
    userLongitude: '',
    hasMapPermission: '',
    a:'',
    visible: true   };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.requestFineLocation =this.requestFineLocation.bind(this)
}

showSpinner() {
    //console.log('Show Spinner');
    this.setState({ visible: true });
  }

  hideSpinner() {
    //console.log('Hide Spinner');
    this.setState({ visible: false });
  }
async requestFineLocation() {

    try {
        if (Platform.OS === "android") {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.getUserPosition();
            }
            else { this.requestFineLocation() }

        } else {
            this.getUserPosition();
        }
    } catch (err) {
        console.warn(err);
    }
}

async getUserPosition() {
    this.setState({ hasMapPermission: true });
    // this.locationWatchId = Geolocation.getCurrentPosition(
    Geolocation.getCurrentPosition(
        pos => {
            // alert(pos.coords.latitude)
           lats=pos.coords.latitude
           longs=pos.coords.longitude
            this.setState({
                userLatitude: pos.coords.latitude,
                userLongitude: pos.coords.longitude
            });
           
        })
}
componentWillMount(){
    this.requestFineLocation()

}
componentDidMount(){  
  
    var userid=''
    var password=''
    var str=''
    var res=''
    var res1=''
    var res2=''
    
    //console.log("Servey url........",this.props.serveyUrl)
      AsyncStorage.getItem('usernamess').then((keyValue) => {                 
        user=JSON.parse(keyValue)
        })
        AsyncStorage.getItem('password').then((keyValue) => {   
        pass=JSON.parse(keyValue)
        })
    
    userid="userid="+user
   
    password="password="+pass
    var lat="lat="+lats
    var lon="lon="+longs
    // userid=XgNalla
      str=this.props.serveyUrl
     res = str.replace("userid=", userid);
      res1 = res.replace("password=", password);
    res2 = res1.replace("lat=", lat);
    res3 = res2.replace("lon=", lon);
    
  
    //console.log("rrrrrrrrrrrrrrresult-",res3)
    //console.log("lat.........",lat)
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick); 
   
   
}
componentWillUnmount() {   
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
   } 
   handleBackButtonClick() {
     Actions.TabBarSurveys();
     return true;
   }

render() {
    return (
       
        <View

        style={this.state.visible === true ? styles.stylOld : styles.styleNew}>
        {this.state.visible ? (
          <ActivityIndicator
            color="#009688"
            size="large"
            style={styles.ActivityIndicatorStyle}
          />
        ) : null}

        <WebView
          style={styles.WebViewStyle}
          //Loading URL
          source={{ uri: res3 }}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          //View to show while loading the webpage
          //Want to show the view or not
          //startInLoadingState={true}
          onLoadStart={() => this.showSpinner()}
          onLoad={() => this.hideSpinner()}
        />
      </View>

    );
  }
}


const mapStateToProps = (state) => {
    return {     
        login: state.login,
        servey:state.servey
    };
  };
  const mapDispatchToProps = dispatch => ({
    serveyInfos: (SurveyName,CompanyName,PublishedDate,TimeRequired,SurveyURL) => { dispatch(SERVEY_INFO(SurveyName,CompanyName,PublishedDate,TimeRequired,SurveyURL));                                },

  }
  )
  export default connect(mapStateToProps, mapDispatchToProps)(DetailViewSurveyBrowser)
const styles = StyleSheet.create({
    container : {
        flex:5, 
        flexDirection:'row',
        backgroundColor: '#210305'
    },

    companyBrandContainer: {
        flex:0.5, 
        flexDirection:'column', 
        alignItems: 'flex-start',
        marginLeft: wp('6')
    },

    companyBrandTextStyle: {
        color: '#796A6A', 
        fontSize:RFValue(12),
        fontWeight: 'bold',
        marginTop: hp('3%'), 
        fontFamily: 'Proxima Nova', 
        marginLeft: wp('5%'),
    },
  
    publishDateStyle: {
        color: '#796A6A', 
        fontSize:RFValue(12), 
        marginTop: hp('1%'), 
        marginLeft: wp('5%'),
        fontFamily: 'Proxima Nova', 
        marginBottom:hp('2')
    },


    timeRequiredRowContainer: {
        flex:0.5, 
        flexDirection:'row', 
        alignItems: 'flex-end',
        marginLeft: wp('4'),
    },

    timeRequiredTextStyle: {
        color: '#796A6A', 
        fontSize:RFValue(12),
        marginTop: hp('1%'), 
        marginRight: wp('5%'), 
        fontFamily: 'Proxima Nova', 
        marginBottom:hp('2') ,
    },

    blueCardMainContainer:{
        marginTop:hp('2'), 
        alignItems:'center',
    },

    blueCardInnerContainer:{ 
        height:hp('100'), 
        width:wp('100'), 
        
        borderRadius:wp('2'), 
    },

    surveyImgContainer:{
        alignItems:'center',
    },

    surveyImgStyle:{
        height:hp('12'), 
        width:wp('15'), 
        marginTop:hp('10'), 
    },

    questionLableContainer:{
        marginTop:hp('1'), 
        marginLeft:wp('4'), 
        marginRight: wp('2'),
    },

    questionLableStyle:{
        color: 'white', 
        fontSize:RFValue(15), 
        fontFamily: 'Proxima Nova',  
    },

    questionContainer:{
        marginTop:hp('1'), 
        marginLeft:wp('4'), 
        marginRight: wp('2'),
    },

    questionStyle:{
        color: 'white', 
        fontSize:RFValue(20), 
        fontWeight:'bold',
        fontFamily: 'Proxima Nova', 
    },

    middleLineStyle:{
        width:wp('70'),    
        borderBottomColor: 'black',
        borderBottomWidth: wp('0.1'),
        alignSelf:'center',
        marginTop: hp('2.5')
    },
    stylOld: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      styleNew: {
        flex: 1,
      },
      WebViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 0.5,
      },
      ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
      },
});