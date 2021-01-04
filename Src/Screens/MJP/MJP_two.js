import React, {Component} from 'react';
import moment from 'moment';
import {
  Button,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,PermissionsAndroid
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import Database from './../../utility/Database'
import User from '../../utility/User';
import { Actions } from 'react-native-router-flux';
import axios from 'axios'
import Geolocation from 'react-native-geolocation-service';
const db = new Database();
class MJP_two extends React.Component {
    state = {
        language: 'java',
        Remarks:'',
        UI_data:[],
       Shop_final:'shop_name',
       Shop_addFinal:'shop_add',
       Meeting_Id:'0',
       collection_type:'',

       userLatitude: '',
       userLongitude: '',
       hasMapPermission: '',
       username: '', password: '', deviceId: '', tokens: '',
       language: 'java',
       currentDate:'',
   
  
       MeetDraftDetails:[],
      editr:true,
      isLoading: false,
      AssetDetails: [],
      JSONObj: {},
      content:'application/json'
      };

      constructor(props) {
        super(props)
        this.setState({currentDate:moment().format('DD MMM')})
        db.getRemarks(this.props.Meeting_Id).then((data)=>{
          this.setState({ Remarks: data[0].Remarks })
               })
        if(this.props.EntityType==1){
        
          db.SelectDistForMeet(this.props.EntityTypeID).then((data)=>{
            console.log("Distributor Meeting",data);
                this.setState({ UI_data: data })
                console.log("card data for meet1",this.state.UI_data);
                this.setState({ Shop_final: data[0].Shop_name })
                this.setState({ Shop_addFinal: data[0].location })
                this.setState({ collection_type: 6 })
               
                
             })
            
                  }
                  else if(this.props.EntityType==2)
                  {
          
          db.SelectCustForMeet(this.props.EntityTypeID).then((data)=>{
            console.log("Customer Meeting",data);
                this.setState({ UI_data: data })
                console.log("card data for meet1",this.state.UI_data);
                this.setState({ Shop_final: data[0].Shop_name })
                this.setState({ Shop_addFinal: data[0].location })
                this.setState({ collection_type: 7 })
              
               
             })
            
                  }
                  else if(this.props.EntityType==3)
                  {
         
          db.SelectSubForMeet(this.props.EntityTypeID).then((data)=>{
            console.log("subgroup Meeting",data);
            this.setState({ UI_data: data })
            console.log("card data for meet1",this.state.UI_data);
            this.setState({ Shop_final: data[0].Shop_name })
            this.setState({ Shop_addFinal: data[0].location })
            this.setState({ collection_type: 8 })
               
             
             })
           
                  }

                  this.requestFineLocation(); 
       }
  
    componentWillMount() {
      setTimeout(function(){this.setState({showWarning: true}); }.bind(this), 1000);  
      this.setState({Meeting_Id:this.props.Meeting_Id})
      AsyncStorage.getItem('username').then((keyValue) => {
        //console.log("name1=", JSON.parse((keyValue)))
        const username = JSON.parse((keyValue))
        this.setState({ username: username })
    })
    AsyncStorage.getItem('JWTToken').then((keyValue) => {

        const tok = JSON.parse((keyValue))
        this.setState({ tokens: tok })
    })

  
      
}

async getUserPosition() {
  this.setState({ hasMapPermission: true });
  // this.locationWatchId = Geolocation.getCurrentPosition(
  Geolocation.getCurrentPosition(
      pos => {
        // alert(pos.coords.latitude)
          this.setState({
              userLatitude: pos.coords.latitude,
              userLongitude: pos.coords.longitude
          });
          //console.log(this.state.userLatitude)
      })
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
   
    SubmitReport()
    {
//alert("report submitted");

// {"OrderMaster":[{"CollectionType":"6","Remark":"Read KARNATAKA","ToDate":"01-Dec-2020","FromDate":"01-Dec-2020","EntityID":"63","EntityType":"3"},{"CollectionType":"6","Remark":"Added KARNATAKA","ToDate":"01-Dec-2020","FromDate":"01-Dec-2020","EntityID":"68","EntityType":"3"}]}
  var OrderMaster = []
 
  this.state.isLoading = true
  this.setState({ isLoading: true })
  this.setState({ JSONObj: {} })
  db.getMeetForSync(this.props.Meeting_Id).then((data) => {
    if (data.length > 0) {
//       var remain_data={
//         "latitude":"0",
//         "longitude":"0",
//         "TotalAmount": "0",
//          "UserID": "52362",
//          "CurrentDatetime":"0",
//        "DefaultDistributorId": "0",
//        "ExpectedDeliveryDate": "null"
// }

      
      console.log("ordermaster for sync", data)
      OrderMaster.push(JSON.stringify(data))

      this.state.JSONObj["OrderMaster"] = data

      console.log("json",JSON.stringify(this.state.JSONObj));
      console.log("token",this.state.tokens);
  }
                      var count
                      count = Object.keys(this.state.JSONObj).length;
                      

                      if (count > 0) {

                          const headers = {
                              'authheader': this.state.tokens,
                              'Content-Type': 'application / json'
                             }
                          var datas = JSON.stringify(this.state.JSONObj)
                          
                         console.log("date passing post",datas);
                          const url = 'http://sapltest.com/ZyleminiPlusAPI/api/Data/PostData'
                          axios.post(url, datas, {
                              headers: headers
                          }).then((response) => {

                              console.log("response of post=", JSON.stringify(response.data))
                              console.log("url of post=", url)
                              var responss = []
                              
                              if (response.data.Data.Order) {
                                  
                                  try {
                                      if (response.data.Data.Order.hasOwnProperty('Orders')) {
                                                                          
                                          for (let i = 0; i < response.data.Data.Order.Orders.length; i++) {
                                            db.updateOrderMasterSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
                                            db.updateOrderDetailSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
                                            db.updateimageDetailSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
                                            db.updateDiscountSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
                                              
                                          }
                                          alert("Data Sync Successfull")
                                      }

                                  } catch (error) {

                                  }

                                  alert(response.data.Data.Order.Status)
                              } else {
                               

                              }
                              this.setState({ isLoading: false })

                          })
                              .catch((error) => {
                                  //console.log("error post=", error)
                                  this.setState({ isLoading: false })
                                  alert(error)
                              })
                      } else {
                          this.setState({ isLoading: false })
                          alert("You have no data for Sync")
                      }
})

}
    
    
    saveMeet = (Meeting_Id,Shop_Id,Shop_name,PlannedDate,Time,location,Remarks,IsActivityDone,Type_sync,collection_type,latitude,longitude,TotalAmount,UserID,CurrentDatetime,DefaultDistributorId,ExpectedDeliveryDate) => {
     var ID=moment().format('YYYYMMDDHHmm');
     db.MeetDraftDetails().then((data)=>{
      this.setState({ MeetDraftDetails: data })
      if(data.length==0)
      {
        db.InsertMeet(ID,Meeting_Id,Shop_Id,Shop_name,PlannedDate,Time,location,Remarks,IsActivityDone,Type_sync,collection_type,latitude,longitude,TotalAmount,UserID,CurrentDatetime,DefaultDistributorId,ExpectedDeliveryDate);
        alert("meeting details saved in the draft");
      }
     else{
      for(let i=0;i<data.length;i++)
      {
        if(data[i].Meeting_Id==this.props.Meeting_Id)
        {
          db.UpdateDraft(this.state.Remarks,this.props.Meeting_Id);
          alert("Draft Edited Successfully"); 
        }
        else{
          db.InsertMeet(ID,Meeting_Id,Shop_Id,Shop_name,PlannedDate,Time,location,Remarks,IsActivityDone,Type_sync,collection_type,latitude,longitude,TotalAmount,UserID,CurrentDatetime,DefaultDistributorId,ExpectedDeliveryDate);
          alert("meeting details saved in the draft");
        }
      }

     } 
           })
};

  onChangeEnteredBox= (text) => {
    this.setState({ Remarks: text })
    }


    render() {
      setTimeout(function(){this.setState({showWarning: true}); }.bind(this), 5000);  
      return (
        <SafeAreaView >
          <View>
  
          <View style={{flexDirection:'row'}}>
 <TouchableOpacity  onPress={() => this.props.navigation.navigate('Meeting')} style={{marginLeft:wp('7%'), marginTop:hp('3%')}}>
<Image
 source={require('../../assets/Icons/Call.png')} 
style={{ width:30,height:30}}/>

</TouchableOpacity>
<Text style={{justifyContent:'center',alignItems:'center',fontWeight:'700', color:'#796A6A',fontSize:wp('5.2%'),marginTop:hp('3%'),marginLeft:wp('4%')}}>
  Meeting Report
  </Text>
<TouchableOpacity  onPress={() => this.props.navigation.navigate('Meeting')} style={{marginLeft:('34%'), marginTop:hp('3%')}}>
<Image

source={require('../../assets/Icons/cross.png')} 
style={{ width:30,height:30}}/>

</TouchableOpacity>

</View>
<View style={{
  marginTop:hp('3%'),
    borderStyle: 'dotted',
    borderWidth: 1,
     borderRadius: 2,
    borderColor:'#362828'
  }}>
</View>
        <View style={{paddingLeft:wp('8%'),paddingRight:wp('8%'),marginTop:hp('3%')}}>
     
            <View>
            <Text style={{justifyContent:'center',alignItems:'center',fontWeight:'700', color:'black',fontSize:wp('4.5%')}}>
            {this.state.Shop_final}
  </Text>
  <View style={{flexDirection:'row',marginTop:hp('1%')}}>
  <Text style={{justifyContent:'center',alignItems:'center',fontWeight:'700', color:'black',fontSize:wp('4%')}}>
  {this.props.PlannedDate}
  </Text>
  <Text style={{justifyContent:'center',alignItems:'center',fontWeight:'700', color:'black',fontSize:wp('4%'),marginLeft:wp('12%') }}>
  10:00 am To 10:30 am
  </Text>
  </View>
  <View style={{
  marginTop:hp('2%'),
    borderStyle: 'dotted',
    borderWidth: 1,
     borderRadius: 2,
    borderColor:'#362828'
  }}>
</View>
<Text style={{justifyContent:'center',alignItems:'center',fontWeight:'700', color:'#796A6A',fontSize:wp('3.5%'),marginTop:hp('2 %') }}>
  Location
  </Text>
 <View style={{height: hp('8%'), width:wp('85%'),borderWidth:1,borderColor:'grey',alignItems:'center',borderRadius:10,marginTop:hp('2%')}}>
 <Picker
  selectedValue={this.state.language}
  mode="dropdown"
  style={{height:hp('8%'), width:wp('85%'),borderWidth:1,borderColor:'grey',alignItems:'center',borderRadius:10}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({language: itemValue})
  }>
  <Picker.Item label={this.state.Shop_addFinal} value="java" />
  <Picker.Item label="Current loaction" value="js" />
  <Picker.Item label="nagpr" value="jav" />
  <Picker.Item label="Mumbai" value="jss" />
  <Picker.Item label="Pune" value="javaa" />

</Picker> 

 </View>

<Text style={{justifyContent:'center',alignItems:'center',fontWeight:'700', color:'#796A6A',fontSize:wp('3.5%'),marginTop:hp('1.5%')}}
>
  Add Remarks
  </Text>
  <View style={{marginTop:hp('2%') }}/>

  <TextInput
      style={{  height:hp('28%'), borderColor: 'gray', borderWidth: 1,borderRadius:10 }}   
      value={this.state.Remarks}
      editable={this.state.editr} 
      onChangeText={text => this.onChangeEnteredBox(text)}/>

            </View>

            <View style={{alignItems:'center',justifyContent:'center',marginTop:hp('5%')}}>
            <TouchableOpacity
          onPress={() => {

            
            this.saveMeet(this.state.Meeting_Id,this.props.EntityTypeID,this.state.Shop_final,this.props.PlannedDate,"00:00",this.state.Shop_addFinal,this.state.Remarks,this.props.IsActivityDone,"3",this.state.collection_type,"0","0","0","0","2020-Dec-05 03:20:00","0","2020-Dec-05 03:20:00");
         
         
          }}
          style={{
            backgroundColor: 'transparent',
            borderColor:'#46BE50',
            borderWidth:1,
            width: wp('70%'),
            height: hp('7%'),
            borderRadius: 28,
            justifyContent: 'center',
            alignItems: 'center',
            
          }}>
          <Text style={{color: '#46BE50', fontSize: wp('4%'),fontWeight:'bold'}}>Save As Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => Actions.ViewDrafts({Meeting_Id:this.state.Meeting_Id,EntityTypeID:this.props.EntityTypeID,Shop_final:this.state.Shop_final,PlannedDate:this.props.PlannedDate,Time:"00:00",Shop_addFinal:this.state.Shop_addFinal,Remarks:this.state.Remarks,IsActivityDone:this.props.IsActivityDone})}
          onPress={() => this.SubmitReport()}
          style={{
            backgroundColor: '#46BE50',
            width: wp('70%'),
            height: hp('7%'),
            borderRadius: 28,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:hp('3%'),
            
            
            
          }}>
          {/* <Text style={{color: 'white', fontSize:wp('4%')}}>Submit Report</Text> */}
          <Text style={{color: 'white', fontSize:wp('4%')}}>End Meeting And Submit</Text>
        </TouchableOpacity>

        </View>



        </View>

        </View>
    </SafeAreaView>
         );
        }

        
      }
      export default MJP_two;
      