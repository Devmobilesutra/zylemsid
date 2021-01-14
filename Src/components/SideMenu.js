import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Actions} from 'react-native-router-flux';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import axios from 'axios';
import {connect} from 'react-redux';
import Database from './../utility/Database';
import Loader from '../components/LoaderSync';
import {Icon} from 'react-native-elements';
import RNFS from 'react-native-fs';
const db = new Database();
var tokenss = '';
//var JSONObj={};
var myObj = {};

const DrawerList = [
  {
    syncNow: 'Sync Now',
    home: 'Home',
    shops: 'Shops',
    Surveys: 'Surveys',
    Orders: 'Orders',
  },
];

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      deviceId: '',
      tokens: '',
      OrderMaster: [],
      OrderDetails: [],
      Discount: [],
      ImageDetails1: [],
      ImageDetails: [],
      aa: '',
      isLoading: false,
      AssetDetails: [],
      JSONObj: {},
    };
  }

  //////////////////////////////////////////
  syncNowFunction() {
    var OrderMaster = [];
    var OrderDetails = [];
    var Discount = [];
    var ImageDetails = [];
    var AssetDetails = [];
    this.state.isLoading = true;
    this.setState({isLoading: true});
    this.setState({JSONObj: {}});
    db.getOrderMasterSyncData('N').then(data => {
      if (data.length > 0) {
        console.log('ordermaster for sync', JSON.stringify(data));
        OrderMaster.push(data);
        this.state.JSONObj['OrderMaster'] = data;
      }
      db.getOrderDetailsSyncData().then(data => {
        if (data.length > 0) {
          console.log('orderdetails for sync', JSON.stringify(data));
          OrderDetails = data;
          this.state.JSONObj['OrderDetails'] = data;
        }
        db.getDiscountSyncData().then(data => {
          if (data.length > 0) {
            console.log('discount for sync', JSON.stringify(data));
            Discount = data;
            this.state.JSONObj['Discount'] = data;
          }
          this.state.ImageDetails1 = [];
          db.getImageDetailsyncData().then(data => {
            if (data.length > 0) {
              this.setState({ImageDetails1: data});
              this.state.ImageDetails1.map((item, key) => {
                var bytess;
                this.state.ImageDetails = [];
                RNFS.readFile(item.ImageBytes, 'base64').then(res => {
                  bytess = res;
                  this.state.ImageDetails.push({
                    ID: item.ID,
                    OrderID: item.OrderID,
                    ImageDatetime: item.ImageDateTime,
                    ImageName: item.ImageName,
                    ImageBytes: bytess,
                  });
                });
              });
              ImageDetails = this.state.ImageDetails;
              this.state.JSONObj['ImageDetails'] = this.state.ImageDetails;
            }
            db.getAssetDetailData().then(data => {
              if (data.length > 0) {
                //console.log("asset=", JSON.stringify(data))
                AssetDetails = data;
                this.state.JSONObj['AssetDetails'] = data;
              }
              ////////////////////////////////////////////////////////////
              //console.log("rjjjjjjjjjjjjjjj..........", this.state.JSONObj)
              var count;
              count = Object.keys(this.state.JSONObj).length;
              // alert(count)

              if (count > 0) {
                //console.log("ssdds=========", this.state.tokens)
                const headers = {
                  authheader: this.state.tokens,
                };
                var datas = {
                  OrderMaster: OrderMaster,
                  OrderDetails: OrderDetails,
                  Discount: Discount,
                  ImageDetails: ImageDetails,
                  AssetDetails: AssetDetails,
                };
                //console.log("boduy of postApi=", this.state.JSONObj)
                //  //console.log("boduy of postApi2=", datas)
                //   const url = 'http://zylemdemo.com/ZyleminiPlusCoreAPI/api/Data/PostData'

                const url =
                  'http://sapltest.com/ZyleminiPlusAPI/api/Data/PostData';
                axios
                  .post(url, this.state.JSONObj, {
                    headers: headers,
                  })
                  .then(response => {
                    console.log(
                      'response of post=',
                      JSON.stringify(response.data),
                    );
                    var responss = [];
                    // /{"Data":{"Order":{"Status":"Data saved successfully.",
                    //"Orders":[{"OrderStatus":"Order Existed","OrderId":"78",
                    //"MobileGenPrimaryKey":"167202012142"},
                    //{"OrderStatus":"Order Existed","OrderId":"79","MobileGenPrimaryKey":"167202012551"}]},"NewParty":null,"NewPartyTargetId":null,"PreviousData":null}}
                    // LOG  count is.......... 3
                    if (response.data.Data.Order) {
                      //  alert("in if")
                      //
                      try {
                        if (response.data.Data.Order.hasOwnProperty('Orders')) {
                          // alert("in ifffff")
                          for (
                            let i = 0;
                            i < response.data.Data.Order.Orders.length;
                            i++
                          ) {
                            db.updateOrderMasterSyncFlag(
                              response.data.Data.Order.Orders[i]
                                .MobileGenPrimaryKey,
                            );
                            db.updateOrderDetailSyncFlag(
                              response.data.Data.Order.Orders[i]
                                .MobileGenPrimaryKey,
                            );
                            db.updateimageDetailSyncFlag(
                              response.data.Data.Order.Orders[i]
                                .MobileGenPrimaryKey,
                            );
                            db.updateDiscountSyncFlag(
                              response.data.Data.Order.Orders[i]
                                .MobileGenPrimaryKey,
                            );
                          }
                          alert('Data Sync Successfull');
                        }
                      } catch (error) {}

                      alert(response.data.Data.Order.Status);
                    } else {
                      //console.log("count is..........", count)
                      //  alert("in else")
                      // if(count>0){
                      //
                      // }else{
                      //     alert("There is No data for Sync")
                      // }
                      //  alert("Sync Failed Please Try Again!")
                    }
                    this.setState({isLoading: false});
                  })
                  .catch(error => {
                    //console.log("error post=", error)
                    this.setState({isLoading: false});
                    alert(error);
                  });
              } else {
                this.setState({isLoading: false});
                alert('You have no data for Sync');
              }

              ///////////////////////////////////////////////////
            });
          });
        });
      });
    });
  }

  ///////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  // syncNowFunction(){

  //     var OrderMaster= []
  //     var OrderDetails= []
  //     var Discount= []
  //     var ImageDetails= []
  //     var AssetDetails=[]
  //     this.state.isLoading=true
  //    this.setState({isLoading:true})

  //     db.getOrderMasterSyncData().then((data) => {
  //         if(data.length > 0){
  //         //console.log("ordermaster=", JSON.stringify(data))
  //        OrderMaster.push(data)
  //        this.state.JSONObj["OrderMaster"] = data
  //         }

  //     })

  //     db.getOrderDetailsSyncData().then((data) => {
  //         if(data.length > 0){
  //         //console.log("orderdetails=", JSON.stringify(data))
  //         OrderDetails=data
  //         this.state.JSONObj["OrderDetails"] = data
  //         }

  //     })

  //    // this.state.Discount=[]
  //     db.getDiscountSyncData().then((data) => {
  //         if(data.length > 0){
  //         //console.log("discount=", JSON.stringify(data))
  //         Discount=data
  //         this.state.JSONObj["Discount"] = data
  //         }

  //     })
  //     this.state.ImageDetails1=[]
  //     db.getImageDetailsyncData().then((data) => {
  //        if(data.length > 0){
  //        this.setState({ ImageDetails1: data })
  //        this.state.ImageDetails1.map((item, key) => {
  //         var bytess
  //         this.state.ImageDetails=[]
  //           RNFS.readFile(item.ImageBytes, 'base64').then(res => {
  //                  bytess=res
  //                       this.state.ImageDetails.push({
  //                    ID: item.ID,
  //                    OrderID: item.OrderID,
  //                    ImageDatetime: item.ImageDateTime,
  //                    ImageName: item.ImageName,
  //                    ImageBytes: bytess,

  //              });
  //           })
  //    })
  //    ImageDetails=this.state.ImageDetails
  //    this.state.JSONObj["ImageDetails"] = this.state.ImageDetails
  // }
  //     })

  //     db.getAssetDetailData().then((data) => {
  //         if(data.length > 0){
  //         //console.log("asset=", JSON.stringify(data))
  //     AssetDetails=data

  //     this.state.JSONObj["AssetDetails"] = data
  //         }
  //     })

  // ////////////////////////////////////////////////////
  //     //console.log("rjjjjjjjjjjjjjjj..........",this.state.JSONObj)
  //     var count
  //      count = Object.keys(this.state.JSONObj).length;
  //    // alert(count)

  //   if(this.state.JSONObj){
  //     //console.log("ssdds=========", this.state.tokens)
  //     const headers = {
  //         'authheader': this.state.tokens
  //     }
  //     var datas = {
  //         'OrderMaster': OrderMaster,
  //         'OrderDetails': OrderDetails,
  //         'Discount': Discount,
  //         'ImageDetails': ImageDetails,
  //         'AssetDetails':AssetDetails
  //     }
  //     //console.log("boduy of postApi=",this.state.JSONObj)
  //     //console.log("boduy of postApi2=",datas)
  //     const url = 'http://zylemdemo.com/ZyleminiPlusCoreAPI/api/Data/PostData'
  //     axios.post(url, this.state.JSONObj, {
  //         headers: headers
  //     }).then((response) => {

  //         //console.log("response of post=", JSON.stringify(response.data))
  //         var responss = []
  //       //  {"Data":{"Order":null,"NewParty":null,"NewPartyTargetId":null,"PreviousData":null}}
  //     //  response.data.Data.hasOwnProperty('Order')
  //                  if(response.data.Data.Order){
  //                    if(response.data.Data.Order.hasOwnProperty('Orders')){
  //                     for (let i = 0; i < response.data.Data.Order.Orders.length; i++) {
  //                         db.updateOrderMasterSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
  //                         db.updateOrderDetailSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)
  //                         db.updateimageDetailSyncFlag(response.data.Data.Order.Orders[i].MobileGenPrimaryKey)

  //                     }

  //                 }
  //                     alert(response.data.Data.Order.Status)
  //                  }else{
  //                     //console.log("count is..........", count)
  //                     alert(response.data.Data.Order)
  //                     // if(count>0){
  //                     //     alert("Sync Failed Please Try Again!")
  //                     // }else{
  //                     //     alert("There is No data for Sync")
  //                     // }

  //                  }
  //         this.setState({ isLoading: false })
  //         // if(response.data.Data.Order){
  //         //    // alert(response.data.Data.Order.Status)
  //         // }
  //     })
  //         .catch((error) => {
  //             //console.log("error post=", error)
  //             this.setState({ isLoading: false })
  //             alert(error)
  //         })
  //     }else{
  //         this.setState({ isLoading: false })
  //         alert("No data for Sync")
  //     }
  // }
  Logout = async () => {
    await AsyncStorage.clear();
    Actions.login();
  };
  SyncNow = () => {
    Alert.alert(
      'Sync Now',
      'Do you want to sync data to Server?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => this.syncNowFunction(),
        },
      ],
      {cancelable: false},
    );
  };
  NavigateShop = () => {
    AsyncStorage.setItem('routeName', '');
    AsyncStorage.setItem('routeId', '');
    Actions.Shops();
  };

  MoveToOrders = () => {
    AsyncStorage.setItem('routeName', '');
    AsyncStorage.setItem('routeId', '');
    Actions.sideorder();
  };

  NavigateDC = () => {
    AsyncStorage.setItem('outletNameDC', '');
    AsyncStorage.setItem('outletIdDC', '');
    AsyncStorage.setItem('beatNameDC', '');
    AsyncStorage.setItem('beatIdDC', '');

    AsyncStorage.setItem('SearchStringDC', '');
    Actions.DataCollectionStep1();
  };

  MJP = () => {
    Actions.MJP_one();
  };
  componentWillMount() {
    AsyncStorage.getItem('username').then(keyValue => {
      //console.log("name1=", JSON.parse((keyValue)))
      const username = JSON.parse(keyValue);
      this.setState({username: username});
    });
    AsyncStorage.getItem('JWTToken').then(keyValue => {
      const tok = JSON.parse(keyValue);
      this.setState({tokens: tok});
    });
  }

  render() {
    return DrawerList.map((item, index) => (
      <View style={styles.container}>
        <Loader loading={this.state.isLoading} />

        {/* Header */}
        <View style={styles.headerBackgrounContainer}>
          <View
            style={{flex: 0.4, flexDirection: 'column', marginTop: hp('2')}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: RFValue(13),
                  fontWeight: 'bold',
                  fontFamily: 'Proxima Nova',
                  color: '#8C7878',
                  marginRight: wp('3'),
                }}>
                EDIT
              </Text>
              <TouchableOpacity onPress={() => Actions.drawerToggle()}>
                <Image
                  style={{marginRight: wp('3')}}
                  source={require('../assets/Icons/Close.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerContainer}>
            <View style={styles.headerImgContainer}>
              <Image
                style={styles.headerImgStyle1}
                source={require('../assets/Icons/User_Profile_Pic_Default.png')}
              />
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerNameStyle}>{this.state.username}</Text>
              <Text style={styles.headerSubNameStyle}>
                Sr. Sales Executive@
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: hp('35'),
            borderWidth: hp('0.09'),
            borderColor: '#E6DFDF',
            marginLeft: hp('3'),
          }}
        />
        {/* List */}
        <View style={styles.drawerListContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={this.SyncNow}>
              <View style={styles.drawerNameImgContainer}>
                <Image
                  style={styles.drawerLabelImgStyle}
                  source={require('../assets/Icons/refresh_button.png')}
                />
                <Text style={styles.drawerLabelStyle}>{item.syncNow}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.drawerToggle()}>
              <View style={styles.drawerNmaeImgContainer2}>
                <Image
                  style={styles.drawerLabelImgStyle2}
                  source={require('../assets/Icons/home_normal_sidebar.png')}
                />
                <Text style={styles.drawerLabelStyle2}>{item.home}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.NavigateShop}>
              <View style={styles.drawerNmaeImgContainer2}>
                <Image
                  style={styles.drawerLabelImgStyle2}
                  source={require('../assets/Icons/Shop_sidebar.png')}
                />
                <Text style={styles.drawerLabelStyle2}>{item.shops}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.drawerNmaeImgContainer2}>
                <Image
                  style={styles.drawerLabelImgStyle2}
                  source={require('../assets/Icons/Distributor.png')}
                />
                <Text style={styles.drawerLabelStyle2}>Distributors</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.NavigateDC}>
              <View style={styles.drawerNmaeImgContainer2}>
                <Image
                  style={styles.drawerLabelImgStyle2}
                  source={require('../assets/Icons/Shop_sidebar.png')}
                />
                <Text style={styles.drawerLabelStyle2}>Data Collection</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.MoveToOrders}>
              <View style={styles.drawerNmaeImgContainer2}>
                <Image
                  style={styles.drawerLabelImgStyle2}
                  source={require('../assets/Icons/Orders.png')}
                />
                <Text style={styles.drawerLabelStyle2}>Orders</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Actions.MJP_one()}>
              <View style={styles.drawerNmaeImgContainer2}>
                <Image
                  style={styles.drawerLabelImgStyle2}
                  source={require('../assets/Icons/Reports.png')}
                />
                <Text style={styles.drawerLabelStyle2}>Meetings</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.drawerNmaeImgContainer2}>
                <Image
                  style={styles.drawerLabelImgStyle2}
                  source={require('../assets/Icons/Payment.png')}
                />
                <Text style={styles.drawerLabelStyle2}>Payments</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Actions.TabBarSurveys()}>
              <View style={styles.drawerNmaeImgContainer2}>
                <Image
                  style={styles.drawerLabelImgStyle2}
                  source={require('../assets/Icons/SurveyDrawer.png')}
                />
                <Text style={styles.drawerLabelStyle2}>{item.Surveys}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.drawerNmaeImgContainer2}>
                <Image
                  style={styles.drawerLabelImgStyle2}
                  source={require('../assets/Icons/Schemes_drawer.png')}
                />
                <Text style={styles.drawerLabelStyle2}>Schemes</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.drawerNmaeImgContainer2}>
                <Image
                  style={styles.drawerLabelImgStyle2}
                  source={require('../assets/Icons/Resources.png')}
                />
                <Text style={styles.drawerLabelStyle2}>Resources</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Actions.TabBarReports()}>
              <View style={styles.drawerNmaeImgContainer2}>
                <Image
                  style={styles.drawerLabelImgStyle2}
                  source={require('../assets/Icons/Reports.png')}
                />
                <Text style={styles.drawerLabelStyle2}>Reports</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.drawerNmaeImgContainer2}>
                <Image
                  style={styles.drawerLabelImgStyle2}
                  source={require('../assets/Icons/Help.png')}
                />
                <Text style={styles.drawerLabelStyle2}>Help</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.drawerNmaeImgContainer2}>
                <Image
                  style={styles.drawerLabelImgStyle2}
                  source={require('../assets/Icons/Settings.png')}
                />
                <Text style={styles.drawerLabelStyle2}>Settings</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.Logout}>
              <View style={styles.drawerNmaeImgContainer2}>
                {/* <Image style={styles.drawerLabelImgStyle2}
                                        source={require('../assets/Icons/Settings.png')} />
                                         */}
                <Icon name="log-out" color="black" />

                <Text style={styles.drawerLabelStyle2}>LogOut</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Footer Styles */}
        <View style={{flex: 0.2, flexDirection: 'column'}}>
          <View
            style={{
              width: hp('35'),
              borderWidth: hp('0.09'),
              borderColor: '#E6DFDF',
              marginLeft: hp('3'),
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginLeft: hp('4'),
              marginTop: hp('2'),
            }}>
            <Image
              style={{
                width: hp('6'),
                height: hp('7'),
                marginRight: hp('2'),
              }}
              source={require('../assets/Icons/Logo.png')}
            />
            <Text style={styles.zylememiniTextStyle}> ZYLEMINI+</Text>
          </View>

          <View
            style={{
              flex: 0.2,
              flexDirection: 'row',
              marginLeft: wp('7'),
              marginTop: hp('2'),
              alignContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                flex: 2.5,
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
              }}
              onPress={() => Actions.PrivacyPolicy()}>
              <Text style={styles.PPTextStyle}>Privacy Policy</Text>
            </TouchableOpacity>
            <View
              style={{
                width: hp('1'),
                height: hp('2'),
                borderLeftWidth: hp('0.2'),
                borderColor: '#DFE9E0',
              }}
            />

            <TouchableOpacity
              style={{
                flex: 2.7,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginHorizontal: hp('1'),
              }}>
              <Text style={styles.SNTextStyle}>Security Notice</Text>
            </TouchableOpacity>
            <View
              style={{
                width: hp('1'),
                height: hp('2'),
                borderLeftWidth: hp('0.2'),
                borderColor: '#DFE9E0',
              }}
            />

            <TouchableOpacity
              style={{
                flex: 1.5,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginHorizontal: hp('1'),
              }}
              onPress={() => Actions.AboutUs()}>
              <Text style={styles.aboutTextStyle}>About</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 0.1}}>
          <Text style={styles.copyRightTextStyle}>
            Ⓒ 2021 Smile Automation Pvt Ltd.
          </Text>
        </View>
      </View>
    ));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    // marginVertical: wp('5'),
    // marginHorizontal: hp('2')
  },

  headerBackgrounContainer: {
    flex: 0.4,
    // backgroundColor: '#F8F4F4',
  },

  headerContainer: {
    flex: 0.4,
    // marginTop:hp('1'),
    flexDirection: 'row',
  },

  headerImgContainer: {
    flex: 0.7,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: wp('5'),
  },

  headerImgStyle: {
    width: wp('23'),
    height: hp('13'),
  },
  headerImgStyle: {
    width: wp('23'),
    height: hp('13'),
  },
  headerTextContainer: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: wp('-6'),
  },

  headerNameStyle: {
    fontSize: wp('5'),
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
    color: '#362828',
  },

  headerSubNameStyle: {
    fontSize: wp('3'),
    fontFamily: 'Proxima Nova',
    color: '#362828',
  },

  drawerListContainer: {
    flex: 1,
    marginTop: hp('4'),
    marginHorizontal: hp('4'),
  },

  drawerNameImgContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignItems: 'center',
  },

  drawerLabelImgStyle: {
    width: wp('6'),
    height: hp('4'),
  },

  drawerLabelStyle: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: hp('2.5'),
    marginLeft: wp('4'),
  },

  drawerNmaeImgContainer2: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignItems: 'center',
    marginTop: hp('4'),
  },

  drawerLabelImgStyle2: {
    width: wp('7.5'),
    height: hp('4'),
  },

  drawerLabelImgStyle3: {
    width: wp('6.5'),
    height: hp('4.5'),
  },

  drawerLabelStyle2: {
    color: '#362828',
    fontFamily: 'Proxima Nova',
    fontSize: hp('2.5'),
    marginLeft: wp('4'),
  },

  footerMainContainer: {},

  zyleminiTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  zylememiniTextStyle: {
    fontSize: wp('8'),
    fontWeight: 'bold',
    color: 'brown',
  },

  middleLineTextContainer: {
    flexDirection: 'row',
    marginLeft: wp('5'),
  },

  PPtextContainer: {
    flex: 0.5,
    flexDirection: 'column',
  },

  PPTextStyle: {
    color: '#362828',
    fontSize: wp('2.8'),
    fontFamily: 'Montserrat',
  },

  SNTextContainer: {
    flex: 0.7,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignItems: 'center',
  },

  SNTextStyle: {
    color: '#362828',
    fontSize: wp('2.8'),
    fontFamily: 'Montserrat',
    marginLeft: hp('1'),
  },

  aboutTextContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  aboutTextStyle: {
    color: '#362828',
    fontSize: wp('2.8'),

    fontFamily: 'Montserrat',
  },

  copyRightTextStyle: {
    color: '#868686',
    fontSize: wp('2.5'),
    marginLeft: wp('7'),
    marginBottom: hp('1'),

    marginTop: hp('2'),

    fontFamily: 'Montserrat',
  },
});
