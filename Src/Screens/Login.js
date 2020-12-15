import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView,BackHandler, TextInput, AsyncStorage, Switch,ImageBackground} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
 import NetInfo from '@react-native-community/netinfo'
 import { Item, Input, Icon, Label } from 'native-base';
//Screens
import Logo from '../components/Logo'
import Loader from '../components/Loader'
import { login,loginLoading } from './../Redux/actions/LoginAction'
import Next from '../components/NextButton'
import Database from './../utility/Database'
const db = new Database();
var  isInternet =true
export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: true,
      user: null,
      pass: null,
      isLoading: true,
      loading: false,
      icon: "eye-off",
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  doLogin = async () => {
    let { user, pass } = this.state;
    const unsubscribe = NetInfo.addEventListener(state => {
      //console.log("Connection type", state.type);
   //  alert(state.isConnected)
    isInternet=state.isConnected
    //  this.setState({isInternet:state.isConnected})
      //console.log("Is connected?Out", isInternet);

    });

    if(!isInternet){
      alert("Please Check Your Internet Connection")
   
  }else{
    if (user) {
      if (pass) {
        AsyncStorage.setItem('usernamess', JSON.stringify(user));        
        AsyncStorage.setItem('username', JSON.stringify(user))
        AsyncStorage.setItem('password', JSON.stringify(pass))
        this.props.onLogin(user, pass, this.props.navigation);
      } else {
        alert('Please Enter Password');
      }
    } else {
      alert('Please Enter UserName');
    }   
  }
  }


  
  componentDidMount() {
    //console.log("componentDidMount callee")
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  
     this.props.navigation.addListener("didBlur", () => {
        // user has navigated away from this screen
    });
}
handleBackButtonClick() {
  BackHandler.exitApp();
}
toggleSwitch=()=> {
  this.setState({ showPassword: !this.state.showPassword });
  this.setState(prevState => ({
    icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
   
}));
}


componentWillUnmount() {
 
 BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}



  render() {
    let { hasError, isLogged, isLoading, data } = this.props;
    const { label, icon, onChange } = this.props;
    if (isLogged) {
      

      //console.log("isLogged=", isLogged)
      AsyncStorage.setItem('isLogged', JSON.stringify(true));
      
    }
    
/////////////////////////////////
    if(hasError==true){
    //  alert("invalid credentials..........")
    }




    //  if (isLoading) return <Text>Getting Data.......</Text>;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Loader loading={isLoading} />
        <ImageBackground
                source={require('../assets/Icons/android_BG.png')}
                 style={{flex:1, resizeMode: 'cover',  justifyContent: 'center',}}
            >
        <ScrollView
        keyboardShouldPersistTaps={'handled'} 
          showsVerticalScrollIndicator={false}
        >
          <Logo />
          {/* <Form navigation={navigation}/> */}
          <View style={styles.containerForm}>
            <TextInput style={styles.inputBox}
              placeholder="User Id"
              placeholderTextColor="grey"
              selectionColor="black"
              keyboardType="default"
              onChangeText={(user) => this.setState({ user })}

            />
            <View  style={styles.inputBox1}>
      
            <TextInput
            style={{flex:10,   
            fontSize: hp(2),
            color: 'black',
            }}
              placeholder="Password"
              secureTextEntry={this.state.showPassword}
              placeholderTextColor="grey"
              selectionColor="black"
              keyboardType="default"
              onChangeText={(pass) => this.setState({ pass })}

            />
            {/* <Switch
          onValueChange={this.toggleSwitch}
          value={!this.state.showPassword}
        />  */}
        <View style={{flex:1,alignContent:'center',justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
         <Icon   name={this.state.icon} onPress={() => this.toggleSwitch()} />
         </View>
                  </View>
             
        {/* <Text>Show</Text> */}
            <TouchableOpacity style={styles.button} onPress={() => { this.doLogin() }} >
              <Text style={styles.buttonText} > LOGIN </Text>
            </TouchableOpacity>
            
          

          </View>

          <View style={styles.forgetTextCont}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetUserIdOrPass')}>
              <Text style={styles.forgetText}>Forget User ID or Password? </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    isLogged: state.login.isLogged,
    hasError: state.login.hasError,
    isLoading: state.login.isLoading,
    loginLoading:state.loginLoading,
    data: state.login.data
  };
};

const mapDispatchToProps = dispatch => ({
  onLogin: (username, password, navigation) => {
    dispatch(login(username, password, navigation));     
  },
  isLoadingss: () => {
    dispatch(dispatch(loginLoading(false)));     
  },
 


})
export default connect(mapStateToProps, mapDispatchToProps)(Login)



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgetTextCont: {
    flexGrow: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: hp('3'),
    flexDirection: 'row',
  },
  forgetText: {
    color: '#362828',
    fontSize: hp(2),
    fontFamily: 'Proxima Nova',
  },
  containerForm: {
    flexGrow: 1,
    // justifyContent: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: hp('7')
  },
  inputBox: {
    width: wp('90'),
    height: hp('8'),
    borderColor: '#E6DCDC',
    borderWidth: wp('0.5'),
    paddingHorizontal: hp('3'),
    fontSize: hp(2),
    color: 'black',
    marginVertical: hp('1.5'),
    borderRadius: wp('2'),
  },
  inputBox1: {
    flex:1,
    flexDirection:'row',
    width: wp('90'),
    height: hp('8'),
    borderColor: '#E6DCDC',
    borderWidth: wp('0.5'),
    paddingHorizontal: hp('3'),
    fontSize: hp(2),
    color: 'black',
    marginVertical: hp('1.5'),
    borderRadius: wp('2'),
  
  },
  buttonText: {
    fontSize: 16,
    // fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
       alignItems: 'center',
       justifyContent: 'center',
       fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
   

  },
  button: {
    width: wp('90'),
    height: hp('8'),
    backgroundColor: '#362828',
    borderRadius: wp('2'),
    marginVertical: 10,
    paddingVertical: 13,
    justifyContent:'center'
  }


});
