import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class DiscardOrderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>DISCARD</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'flex-end',
    flexDirection: 'column',
  },

  //  button: {
  //     width: wp('47'),
  //     height: hp('8'),
  //     backgroundColor: '#FFFFFF',
  //     paddingVertical: 15,
  //     justifyContent: 'center',
  //     marginLeft: hp('1'),
  //     borderColor: '#796A6A',
  //     borderWidth: wp('0.3'),
  //   //   marginHorizontal: hp('2'),
  //     borderRadius: wp('2'),
  //     marginVertical: wp('1'),
  //   },

  button: {
    width: wp('47'),
    height: hp('8'),
    backgroundColor: '#46BE50',
    paddingVertical: 15,
    justifyContent: 'center',
    marginLeft: hp('1'),
    //   marginHorizontal: hp('1'),
    borderRadius: wp('2'),
    marginVertical: wp('1'),
  },

  buttonText: {
    fontSize: 16,
    // color: '#796A6A',
    color: '#ffffff',
    textAlign: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontFamily: 'Proxima Nova',
  },
});
