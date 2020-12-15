import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, TouchableOpacity, ScrollView, Image, Alert, BackHandler } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { FloatingAction } from "react-native-floating-action";
import { Actions } from 'react-native-router-flux';
import { Fab, Button, Icon } from 'native-base';
import TodaysRoute from './TodaysRoute';
import Today from './Today';
import Payment from './Payment';
import Schemes from './Schemes';
import MyProductivity from './MyProductivity';

import { USER_ID } from '../../Redux/actions/DashboardAction'
import utilss from '../../utility/usableFunctions'
const utils = new utilss();
import { connect } from 'react-redux'
import Database from './../../utility/Database'
const db = new Database();
const actions = [
  {
    text: "Accept Payment",
    color: 'transperent',
    name: "accept_payment",
    position: 4,   
    textColor: 'black',
    textStyle: { fontSize: 14,fontWeight:'bold',marginHorizontal: 19, },
    buttonSize: 0,
  },
  {
    text: "Create New Order",
    color: 'transperent',
    name: "bt_accessibility",
    position: 3,   
    textColor: 'black',
    textStyle: { fontSize: 14,fontWeight:'bold',marginHorizontal: 18, },
    buttonSize: 0,
  },
  {
    text: "Add New Shop",
    color: 'transperent',
    name: "add_shop",
    position: 2,   
    textColor: 'black',
    textStyle: { fontSize: 14,fontWeight:'bold',marginHorizontal: 26, },
    buttonSize: 0,
  },
  {
    text: "Data Collection",
    color: 'transperent',
    name: "collection",
    position: 1,
    textColor: 'black',
    textStyle: { fontSize: 14, fontWeight:'bold',marginHorizontal: 25, },
    buttonSize: 0,
  },
];
var open

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', deviceId: '', open: false, active: false, };

    //  this.getUserData = this.getUserData.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }

  static navigationOptions = ({ navigation }) => ({

    color: 'white',
    headerStyle: {
      backgroundColor: '#221818'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    },
    //  headerRight: <Image source = {require('../../Assets/Icons/Search.png')}/>,
    // <Icon style={{ marginLeft: wp('4%') }} name="search" size={30} color="#fff" />
    headerLeft:
      <TouchableOpacity onPress={() => Actions.drawerToggle()}>
        <Image source={require('../../assets/Icons/menu_white.png')}
          color='white'
        // onPress={() => navigation.openDrawer() }
        // onPress={() => navigation.toggleDrawer()}
        />
      </TouchableOpacity>

  });

  getUserData() {
    alert("in getUserdata........")
    // db.getUserData().then((data) => {
    //     //console.log("getUserData=",JSON.stringify(data))
    // })
  }
  _onStateChange(open) {

  }
  componentWillMount() {
    //   db.getUserData().then((data) => {
    //     //console.log("getUserData=",JSON.stringify(data))
    // })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    AsyncStorage.getItem('userIds').then((keyValue) => {
      this.props.userid(JSON.parse((keyValue)))
    })
    AsyncStorage.getItem('username').then((keyValue) => {
      const username = JSON.parse((keyValue))
      this.setState({ username: username })
    }, (error) => {
      //console.log(error) //Display error
    });
    AsyncStorage.getItem('password').then((keyValue) => {
      const pass = keyValue;
      this.setState({ password: pass })
    }, (error) => {
      //console.log(error) //Display error
    });
    AsyncStorage.getItem('deviceId').then((keyValue) => {
      const deviceId = JSON.parse(keyValue);
      this.setState({ deviceId: deviceId })
    }, (error) => {
      //console.log(error) //Display error
    });
  }

  componentDidMount() {
    this._componentFocused();
    this._sub = this.props.navigation.addListener(
      'didFocus',
      this._componentFocused
    );
  }

  _componentFocused() {
    //  AsyncStorage.getItem('userIds').then((keyValue) => {  
    //  //console.log("UserIddd=",JSON.parse((keyValue)))
    //  this.props.userid(keyValue) 
    //   })
    // AsyncStorage.getItem('username').then((keyValue) => {    
    // //console.log("Name",JSON.parse((keyValue)))
    //     var user=keyValue
    //     this.setState({username:user})
    //   }, (error) => {
    //     //console.log(error) //Display error
    //   });
    //   AsyncStorage.getItem('password').then((keyValue) => {
    //     var pass=keyValue
    //     this.setState({password:pass})
    //   }, (error) => {
    //     //console.log(error) //Display error
    //   });
    //   AsyncStorage.getItem('deviceId').then((keyValue) => {
    //     var user=keyValue
    //     this.setState({deviceId:user})
    //   }, (error) => {
    //     //console.log(error) //Display error
    //   });


  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    // Registered function to handle the Back Press
    // We are generating an alert to show the back button pressed
    // BackHandler.exitApp();
    Alert.alert(
      'Confirm Exit',
      'Do you want to Exit App?',
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        {
          text: 'Ok',
          onPress: () =>
            BackHandler.exitApp(),
        }
      ],
      { cancelable: false }

    );
    // Returning true means we have handled the backpress
    // Returning false means we haven't handled the backpress
    return true;
  }




  _logOut = async () => {
    alert("hii");

  }


  renderFABIcon = () => {
    if (this.state.active) {
      return (<Icon name="ios-close" style={{ fontSize: 45, color: "#FFFFFF", position: 'absolute' }} color="#07B26A"></Icon>);
    }
    else {
      return (<Icon name="ios-add" style={{ fontSize: 45, color: "#FFFFFF", position: 'absolute' }} color="#07B26A"></Icon>);
    }
  }

  render() {

    return (
      <View style={{ flex: 10 }}>
        <ScrollView>
          {/* Header */}
          <View style={{ flex: 0.3, backgroundColor: '#221818' }}>
            <Text style={{
              color: 'white', fontSize: 30, type: 'font-awesome', marginTop: hp('6%'),
              marginLeft: wp('2%')
            }} >
              Hello  {this.state.username}
            </Text>
          </View>
          <TodaysRoute />
          <Today />
          <Payment />
          <Schemes />
          <MyProductivity />

        </ScrollView>
       

        <FloatingAction
          open={open}
          color='#a10d59'
          actions={actions}
          buttonSize={hp('9.5')}
          floatingIcon={this.state.active == false ?
            require('../../assets/Icons/Floating.png')
            :
            require('../../assets/Icons/FAB_Close_Menu.png')
          }
          iconWidth={wp(20)}
          iconHeight={hp(16)}
          // iconWidth={wp(5)}
          // iconHeight={hp(3)}
          shadow='null'
          overlayColor='#221818'
          showBackground={true}
          onPressItem={name => {
            if (name == "bt_accessibility") {
              AsyncStorage.setItem('outletName', "");
              AsyncStorage.setItem('outletId', "");
              AsyncStorage.setItem('beatName', "");
              AsyncStorage.setItem('beatId', "");
              AsyncStorage.setItem('distributorName', "");
              AsyncStorage.setItem('SearchString', "");
              //console.log(`selected button: ${name}`);
              //  alert(name)
              Actions.CreateNewOrderFirst()
              this.setState({ 
                active: !this.state.active,
              })
            }
            else if (name == "collection") {
              AsyncStorage.setItem('outletNameDC', "");
              AsyncStorage.setItem('outletIdDC', "");
              AsyncStorage.setItem('beatNameDC', "");
              AsyncStorage.setItem('beatIdDC', "");
              AsyncStorage.setItem('SearchStringDC', "");
              Actions.DataCollectionStep1()
              this.setState({ 
                active: !this.state.active,
              })
            }else if(name== "add_shop"){
              Actions.AddNewShop()
            }

          }

          }
          onPressMain={() => {
            if (this.state.active == false) {
              this.setState({
                active: !this.state.active,
              })
             // BackHandler.addEventListener('hardwareBackPress', () => Actions.drawerMenu());
            }
            else {
              this.setState({
                active: !this.state.active,
              })

            }
          }
          }
          onPressBackdrop = { () => {
            if(this.state.active==false){
              this.setState({ 
                active: !this.state.active,
              })
              //BackHandler.addEventListener('hardwareBackPress', () => Actions.drawerMenu());
            }
            else{
              this.setState({ 
                active: !this.state.active,
              })
                
              }
            }
          }

        />

     
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};
const mapDispatchToProps = dispatch => ({
  userid: (val) => {
    dispatch(USER_ID(val));

  },
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

