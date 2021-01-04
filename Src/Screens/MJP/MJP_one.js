import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image,FlatList,BackHandler} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import Dash from 'react-native-dash';
import moment from 'moment';
import { connect } from 'react-redux'
import Database from './../../utility/Database'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Item } from 'native-base';

const db = new Database();
class MJP_one extends React.Component {
  state={
   
    shop_data:
     [
      {
          shop_name: "abc",
          shop_add:"abc add",
          
      },
      {
        shop_name: "pqr",
        shop_add:"pqr add",
      },
       {
        shop_name: "ghaw",
        shop_add:"ghaw add",
      },
      
  ],
  Card_data:[],
Planned_dates:[],
currentDate:'',
DateNow:0,
DateThen:''

  }

  
constructor(props) {

    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    setTimeout(function(){this.setState({showWarning: true}); }.bind(this), 1000);  
    // db.GetMJPMasterDetails().then((data)=>{
    //     console.log("shop Card info",data);
    //         this.setState({ Card_data: data })
    //         this.setState({ Planned_dates: data})
    //         console.log("card data for meet1",this.state.Card_data);
    //         console.log("card data planned date",this.state.Planned_dates);
    //      })
   
db.getPlannedDates().then((data)=>{
        this.setState({ Planned_dates: data})
       console.log("card data planned date",this.state.Planned_dates);
       console.log("first date",this.state.Planned_dates[0].PlannedDate);
       this.setState({currentDate:this.state.Planned_dates[0].PlannedDate});
db.GetMJPMasterDetails(this.state.currentDate).then((data)=>{
        console.log("shop Card info",data);
            this.setState({ Card_data: data })
          
            console.log("card data for meet1",this.state.Card_data);
           
         })
     })
   
  
}

componentWillMount() {
    setTimeout(function(){this.setState({showWarning: true}); }.bind(this), 1000);  
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.setState({currentDate:moment().format('DD MMM')})
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
}

NextDate(i)
{
   this.setState({DateNow:i})
   
    try{
 
 console.log(this.state.Planned_dates[i].PlannedDate);
 this.setState({currentDate:this.state.Planned_dates[i].PlannedDate})
 db.GetMJPMasterDetails(this.state.Planned_dates[i].PlannedDate).then((data)=>{
    console.log("shop Card info",data);
        this.setState({ Card_data: data })
      
        console.log("card data for meet1",this.state.Card_data);
       
     })
    
    }
 catch(error)
 {
     alert("No more meetings available")
 }

}

PrevDate(i)
{
   // alert(parseInt(this.state.DateNow));
   this.setState({DateNow:i})
 
  try{
  
    console.log(this.state.Planned_dates[i].PlannedDate);
   // this.setState({DateNow:this.state.DateNow+1});

console.log(this.state.Planned_dates[i].PlannedDate);
this.setState({currentDate:this.state.Planned_dates[i].PlannedDate})
db.GetMJPMasterDetails(this.state.Planned_dates[i].PlannedDate).then((data)=>{
console.log("shop Card info",data);
    this.setState({ Card_data: data })
  
    console.log("card data for meet1",this.state.Card_data);
   
 })

}   
catch(error)
{
 alert("No more meetings available")
}

}

//new render
render() {
  // this._componentFocused();
     setTimeout(function(){this.setState({showWarning: true}); }.bind(this), 1000);
   
     return (
         <View>
             <View style={{backgroundColor:'#221818',height:hp('30%')}}>

<View>

  <View style={{flexDirection:'row'}}>

  <TouchableOpacity onPress={() =>this.handleBackButtonClick()} style={{ marginTop:hp('4%'),marginLeft:wp('2%')}}>
    <Text style={{color:'white',fontSize:wp('12%')}}>
    ←
    </Text>

  </TouchableOpacity>
  <Text style={{justifyContent:'center',alignItems:'center', color:'#796A6A',fontSize:wp('6%'),marginTop:hp('7.4%'),marginLeft:wp('3%')}}>
    Meetings
    </Text>
  <TouchableOpacity  onPress={() => this.props.navigation.navigate('Meeting')} style={{marginLeft:('7%'), marginTop:hp('7.1%')}}>
  <Image
 source={require('../../assets/Icons/Search.png')}
  style={{marginTop:hp('1%'),marginLeft:wp('39%'), width:25,height:25}}/>

  </TouchableOpacity>

  </View>
  <View style={{
       marginTop:hp('1%'),
       borderStyle: 'dotted',
       borderWidth: 1,
       borderRadius: 2,
       borderColor:'#362828'
    }}>
  </View>
  
  <View style={{flexDirection:'row'}}>

  <TouchableOpacity onPress={() => this.PrevDate(this.state.DateNow-1)} style={{marginLeft:('5%'), marginTop:hp('2.5%')}}>
<Image
source={require('../../assets/Icons/left.png')}
style={{marginTop:hp('1%'),marginLeft:wp('3%'), width:30,height:30}}/>

</TouchableOpacity>
<Text style={{justifyContent:'center',alignItems:'center', color:'white',fontWeight:'bold',fontSize:wp('5.5%'),marginTop:hp('3.2%'),marginLeft:wp('25%')}}>
{moment(this.state.currentDate).format('MMM DD')}
</Text>
<TouchableOpacity  onPress={() => this.NextDate(this.state.DateNow+1)} style={{marginLeft:('7%'), marginTop:hp('2.5%')}}>
<Image
source={require('../../assets/Icons/right.png')}
style={{marginTop:hp('1%'),marginLeft:wp('20%'), width:30,height:30}}/>

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
</View>
</View>  
<ImageBackground
source={require('../../assets/Icons/android_BG.png')}
style={{width:wp('100'), height:hp('70'),resizeMode: 'cover',  justifyContent: 'center'}}
> 
<ScrollView 
showsVerticalScrollIndicator={false}>
<FlatList data={this.state.Card_data}
renderItem={({ item,i=0 }) => (
<View style={styles.orderDetailsMainContainer}>
<View style={styles.orderHeaderBGContainer}>
<View style={styles.ordHeaderRowContainer}>
<View style={styles.orderLabelContainer}>
<Text style={styles.orderLabelTextStyle}>
00:00 AM TO 00:00 PM
</Text>
</View>
<View style={styles.amtContainer}>
<Text style={styles.amtTextStyle}>
{moment(item.PlannedDate).format('MMM DD')}
</Text>
</View> 
</View>
</View>
<View style={styles.oredrDetaileWhiteBG}>
<View style={styles.orderDateRowContainer}>
<View style={styles.orderDateColContainer}>
<Text style={styles.ordDateLabelStyle}>
{item.ActivityTitle}
</Text>
<Text style={styles.orderDateDateStyle}>
</Text>
</View>
<View>
<TouchableOpacity  onPress={() => this.props.navigation.navigate('Meeting')} style={{marginRight:wp('5')}}>
<Image source={require('../../assets/Icons/Call.png')} style={{ width:40,height:40}}/>
</TouchableOpacity>
</View>
</View>
<View style={styles.ordDetDashContainer}>
                     <Dash style={styles.ordDetDashStyle}
                         dashLength = {2}
                         dashColor = '#E6DFDF'
                     />
                 </View>
                 <View style={{flexDirection:'row',justifyContent: 'center',alignContent: 'center'}}>

                 <TouchableOpacity style={{marginLeft:('4%'),justifyContent: 'center',
              alignContent: 'center'}} onPress={() => Actions.MJP_Cancel({PlannedDate:item.PlannedDate,EntityTypeID:item.EntityTypeID,EntityType:item.EntityType,Meeting_Id:item.ID,IsActivityDone:item.IsActivityDone})}>
            <Text style={{color:'red',fontSize:wp('3.5%'),}}>
               CANCEL
               </Text>

             </TouchableOpacity>
             <TouchableOpacity style={{justifyContent: 'center',alignContent: 'center'}}>
               <Text style={{color:'blue',marginLeft:wp('8%') ,fontSize:wp('3.5%')}}>
               SUBMIT REPORT
               </Text>

             </TouchableOpacity>
                 
                 <TouchableOpacity onPress={() => Actions.MJP_two({PlannedDate:item.PlannedDate,EntityTypeID:item.EntityTypeID,EntityType:item.EntityType,Meeting_Id:item.ID,IsActivityDone:item.IsActivityDone})}
            style={{
              width: wp('25%'),
              height: 35,
              borderRadius: 15,
              marginLeft:wp('8%'),
              margin:wp('2%'),
              backgroundColor: '#2FC36E',
              justifyContent: 'center',
              alignContent: 'center'
            }}
            >
              <Text style={{
                color: 'white',
                marginLeft:wp('6.5%')
              }}>START</Text>
            </TouchableOpacity>
            </View>
           </View>    
             </View>
             )}
             />
         <View style={{height:hp('10')}}></View>
         </ScrollView>
         </ImageBackground>
         </View>
     );
    
 }


}
export default MJP_one;
const styles = StyleSheet.create({
  totalShopsMainContainer:{ 
      flex:1, 
      flexDirection:'row', 
      marginTop:hp('2'),
      
  },

  processColContainer:{ 
      flex:0.5, 
      flexDirection:'column', 
      alignItems:'flex-start',
      justifyContent:'center',
  },

  inProcessCountTextStyle: {  
      color: '#221818', 
      fontSize:18,
      fontWeight: 'bold',
      marginLeft: wp('12'), 
      fontFamily: 'Proxima Nova',   
  },

  inProcessHeadingTextStyle:{  
      color: '#8C7878', 
      fontSize:12,  
      fontWeight: 'bold', 
      marginTop:hp('0.5'), 
      marginLeft: wp('5'), 
      fontFamily: 'Proxima Nova', 
  },

  deliveredColContainer:{ 
      flex:0.5, 
      flexDirection:'column',
      alignItems:'flex-start',
  },

  deliveredCountTextStyle:{  
      color: '#221818', 
      fontSize:18, 
      fontWeight: 'bold', 
      marginLeft:wp('7'),
      fontFamily: 'Proxima Nova', 
      fontWeight: 'bold',  
  },

  deliveredHeadingTextStyle:{  
      color: '#8C7878', 
      fontSize:12,  
      fontWeight: 'bold',  
      marginTop:hp('0.5'),
      marginLeft:wp('2'),
      fontFamily: 'Proxima Nova', 
  },

  totalCountMainContainer:{
      alignItems:'flex-end',
      flexDirection:'column',
  },

  totalCountTextStyle: {  
      color: '#221818', 
      fontSize:18, 
      fontWeight: 'bold', 
      marginRight:wp('13'),
      fontFamily: 'Proxima Nova', 
      fontWeight: 'bold',  
  },

  totalCountHeadingTextStyle: {  
      color: '#8C7878', 
      fontSize:12,  
      fontWeight: 'bold',  
      marginTop:hp('0.5'),
      marginRight:wp('11'),
      fontFamily: 'Proxima Nova', 
  },

  filterIconContainer:{ 
      flex:0.5, 
      flexDirection:'column',
      alignItems:'flex-end',
      marginTop:hp('1'),
  },

  filterIconStyle:{ 
      justifyContent: 'center',
      height:hp('4'),
      width:wp('8'), 
      marginRight:wp('5'),
      marginTop: hp('1'),
  },

  dashLineContainer: {
      flex:1, 
      marginTop:hp('2.5'), 
      alignContent: 'center', 
      alignItems: 'center',
  },

  dashLineStyle: {
      width:wp('100'), 
      height:hp('1'), 
      color: '#ADA2A2',
  },

  orderDetailsMainContainer: {
      marginTop:hp('3'),
  },

  orderHeaderBGContainer: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
      borderWidth: 1,
      height:hp('10'),
      width:wp('90'),
      borderColor: '#E6DFDF',
      borderTopLeftRadius: wp('2'), 
      borderTopRightRadius: wp('2'), 
      marginTop:hp('-1'),
      alignSelf:'center',
      justifyContent:'center',
  },

  ordHeaderRowContainer:{
      flexDirection:'row',
  },

  orderLabelContainer:{
      flex:2.5,
      alignItems:'flex-start', 
      flexDirection:'column',
      justifyContent:'center',
  },

  orderLabelTextStyle:{
      color:'black', 
      fontWeight: 'bold', 
      fontFamily:'Proxima Nova', 
      fontSize:14,
      marginLeft:wp('4'),
  },

  amtContainer:{
      flex:1,
      alignItems:'flex-end', 
      flexDirection:'column',
      justifyContent:'center',
  },

  amtTextStyle:{
      color:'black', 
      fontWeight: 'bold', 
      fontFamily:'Proxima Nova', 
      fontSize:14,
      marginRight:wp('4'),
  },

  oredrDetaileWhiteBG:{
      flexDirection:'column',
      backgroundColor: '#FFFFFF', 
      flex:1,
      borderColor: '#E6DFDF',
      alignSelf:'center',
      borderBottomLeftRadius: wp('2'), 
      borderBottomRightRadius: wp('2'),
      height: hp('24'), 
      width: wp('90'),
      borderWidth: hp('0.2'),
      borderTopWidth:hp('0'), 
  },

  orderDateRowContainer:{
      flex:1,
      flexDirection:'row', 
      marginTop:hp('2'), 
  },

  orderDateColContainer:{
      flex:2,
      flexDirection:'column', 
      alignItems:'flex-start',
      marginLeft:wp('4'),
  },

  ordDateLabelStyle:{
      color:'#362828', 
      fontWeight: 'bold', 
      fontFamily:'Proxima Nova', 
      fontSize:10,
  },

  orderDateDateStyle:{
      color:'#362828', 
      fontFamily:'Proxima Nova', 
      fontSize:12, 
      marginTop:hp('1'),
  },

  salesColContainer:{
      flex:2,
      flexDirection:'column', 
      alignItems:'flex-start',
      marginLeft:wp('2'),
  },
  salesColContainer1:{
      flex:2,
      flexDirection:'column', 
      alignItems:'flex-start',
      marginLeft:wp('2'),
  },

  salesLabelStyle:{
      color:'#362828', 
      fontWeight: 'bold', 
      fontFamily:'Proxima Nova', 
      fontSize:10, 
  },

  salesNameStyle:{
      color:'#362828',
      fontFamily:'Proxima Nova', 
      fontSize:12,
      marginTop:hp('1'),
  },

  ordDetDashContainer: {
      // flex:1, 
      marginTop:hp('-5'), 
      alignContent: 'center', 
      alignItems: 'center',
  },

  ordDetDashStyle:{  
      width:wp('85'),  
      height:hp('1'),
  },

  deliveryMainContainer: {
      flex:1,
      flexDirection:'row', 
      marginTop:hp('2'), 
  },

  deliveryColContainer:{
      flex:1,
      flexDirection:'column', 
      alignItems:'flex-start',
      marginLeft:wp('4'),
  },

  deliveryLabelStyle:{
      color:'#362828', 
      fontWeight: 'bold', 
      fontFamily:'Proxima Nova', 
      fontSize:10,
  },

  deliveryStatusContainer:{
      flex:1,
      flexDirection:'column',
      marginTop:hp('-2'), 
  },

  deliverySeparateContainer: {
      flexDirection:'row', 
      marginTop:hp('3'),
  },

  deliveryStusMainContainer: {
      flexDirection:'row', 
      marginTop:hp('2'),
  },

  deliveryStatusColContainer:{
      flex:1,
      flexDirection:'column', 
      alignItems:'flex-start',
      marginLeft:wp('4'),
  },

  statusPinkBG:{
      backgroundColor: '#0FB4AD',
      justifyContent:'center',
      marginRight:hp('3'),
      borderColor: '#CC1167',
      height:hp('4'),
      width:wp('22'),
      borderRadius:wp('5'),
  },

  statusTextStyle:{
      alignSelf:'center', 
      color:'#FFFFFF', 
      fontFamily:'Proxima Nova',
      fontSize:10, 
      fontWeight: 'bold', 
      padding:10,
  },

  deliveredDateStyle:{
      color:'#362828', 
      fontFamily:'Proxima Nova', 
      fontSize:RFValue(12), 
      marginTop:hp('0.5'),
  },

  viewDetailsMainContainer:{
      flex:1,
      flexDirection:'column',  
  },

  viewDetailesLabelContainer:{
      flex:1,
      flexDirection:'column', 
      alignItems:'flex-end',
  },

  viewDetaileTextStyle:{
      color:'#3955CB', 
      fontFamily:'Proxima Nova',
      fontSize:12, 
      marginRight:wp('9'), 
      marginTop:hp('0.5'),
  },

  viewDetailesArrowContainer:{
      flexDirection:'column', 
      alignItems:'flex-end',
      marginTop:hp('0'),
      marginRight:wp('4'),
  },

  viewDetailsArrowStyle:{
      tintColor:'#3955CB', 
      height:hp('3.5'), 
      width:wp('3.5'),
  },

})
        

       