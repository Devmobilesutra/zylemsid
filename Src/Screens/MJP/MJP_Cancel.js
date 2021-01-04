import React, {Component} from 'react';
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
  AsyncStorage
} from 'react-native';
import axios from 'axios'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import Database from './../../utility/Database'
const db = new Database();

class MJP_Cancel extends React.Component {
    state = {
       
        reasonId:'000000000001656',
        remarks:'',
        currencies: ['USD', 'AUD', 'SGD', 'PHP', 'EUR'],
        UI_data:[],
        Shop_Name:'',
        Reasons:'',
        tokens: '',
        arrItems:[
          {
            0:0
      
          },
          {
            1:1
          }
         

        ],
        JSONObj: {},
      };
     
     constructor(props) {
      super(props)
      AsyncStorage.getItem('JWTToken').then((keyValue) => {

        const tok = JSON.parse((keyValue))
        this.setState({ tokens: tok })
    })

      // this.props.PlannedDate,this.props.EntityTypeID,this.props.EntityType,this.props.Meeting_Id,this.props.IsActivityDone
      db.SelectDistForMeet(this.props.EntityTypeID).then((data)=>{
        console.log("Distributor Meeting",data);
            this.setState({ UI_data: data })
            console.log("card data for meet1",this.state.UI_data);
            this.setState({Shop_Name:this.state.UI_data[0].Shop_name})
            this.setState({Shop_Add:this.state.UI_data[0].location})
           
            
         })
         db.GetReasonForCancel().then((data)=>{
        
          this.setState({Reasons:data})   
          console.log("array of cancel reasons",this.state.Reasons) 
          data.map((item, i) => {
           var selectedName=item.Name
            console.log("names",selectedName);
        }) 
           })
        
     }

     onChangeEnteredBox(text)
     {
       this.setState({remarks:text})
      
     }

     MeetingCancel()
     {
      var OrderMaster = []
     
      this.state.isLoading = true
      this.setState({ isLoading: true })
      this.setState({ JSONObj: {} })
     
        data={
          ID: this.state.reasonId,
"EntityID": "23222",
"EntityType": "1",
"Latitude": "18.9728767"
,"Longitude": "77.599013"
,"TotalAmount": "0"
,"FromDate": this.props.PlannedDate
,"ToDate": ""
,"CollectionType": this.props.EntityTypeID
,"UserID": "52362"
,"Remark": this.state.remarks
,"CurrentDatetime": "2020-Dec-05 03:20:00"
,"DefaultDistributorId": "0"
,"ExpectedDeliveryDate": null
        }
          console.log("ordermaster for sync", JSON.stringify(data))
          OrderMaster.push(data)
    
          this.state.JSONObj["OrderMaster"] = data
    
          console.log("json",JSON.stringify(this.state.JSONObj));
          console.log("token",this.state.tokens);
      
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
                                              alert("Meeting cancelled")
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
                              alert("Something went wrong")
                          }
    
     }
    render() {
     
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
  Cancel Meeting 
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
 {this.state.Shop_Name}
  </Text>
  <View style={{flexDirection:'row',marginTop:hp('1%')}}>
  <Text style={{justifyContent:'center',alignItems:'center',fontWeight:'700', color:'black',fontSize:wp('4%')}}>
  30 Aug 2020
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
  Reason For Cancellation
  </Text>
 <View style={{height: hp('8%'), width:wp('85%'),borderWidth:1,borderColor:'grey',alignItems:'center',borderRadius:10,marginTop:hp('2%')}}>
 <Picker

  selectedValue={this.state.reasonId}
  mode="dropdown"
  style={{height:hp('8%'), width:wp('85%'),borderWidth:1,borderColor:'grey',alignItems:'center',borderRadius:10}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({reasonId: itemValue})
  
  }>
  <Picker.Item label="Postpond by Trainer" value="000000000001656" />
  <Picker.Item label="Cancelled By Outlet" value="000000000001657" />
  <Picker.Item label="Cancelled By Distributor" value="000000000001658" />
  <Picker.Item label="Others Reasons" value="000000000001659" />
 

</Picker> 

 {/* <Picker selectedValue={this.state.reason}
  mode="dropdown"
  style={{height:hp('8%'), width:wp('85%'),borderWidth:1,borderColor:'grey',alignItems:'center',borderRadius:10}}
          onValueChange={(itemValue, itemIndex) =>   this.setState({reason: itemValue})}>
        <Picker.Item label="Pune" value="javaa" />
        </Picker> */}
 
 </View>

<Text style={{justifyContent:'center',alignItems:'center',fontWeight:'700', color:'#796A6A',fontSize:wp('3.5%'),marginTop:hp('1.5%')}}>
  Add Remarks
  </Text>
  <View style={{marginTop:hp('2%') }}/>

  <TextInput
      style={{  height:hp('28%'), borderColor: 'gray', borderWidth: 1,borderRadius:10 }}
      editable={true}
      onChangeText={text => this.onChangeEnteredBox(text)}
      multiline={true}
     numberOfLines={6}
     textAlignVertical='top'
        />

            </View>

            <View style={{alignItems:'center',justifyContent:'center',marginTop:hp('5%')}}>
            {/* <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('CustomerList');
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
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
          this.MeetingCancel()
          }}
          style={{
            backgroundColor: 'red',
            width: wp('70%'),
            height: hp('7%'),
            borderRadius: 28,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:hp('3%'),
            
            
            
          }}>
          <Text style={{color: 'white',fontWeight:'bold', fontSize:wp('4%')}}>Cancel</Text>
        </TouchableOpacity>

        </View>



        </View>

        </View>
    </SafeAreaView>
         );
        }
      }
      export default MJP_Cancel;
      