import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, BackHandler, AsyncStorage, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dash from 'react-native-dash';

import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Dropdown } from 'react-native-material-dropdown';
import { Card } from 'react-native-elements';
import { FAB } from 'react-native-paper';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux'
import { Searchbar } from 'react-native-paper';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import NextButton from '../../components/NextButton';
import DropdownCommon from '../../components/DropdownCommon';

import SideorderEdit from './SideorderEdit';

import Database from './../../utility/Database'
import { Actions } from 'react-native-router-flux';
import { InputAutoSuggest } from 'react-native-autocomplete-search';
import { TOTAL_ORDER_VALUE } from '../../Redux/actions/CreateOrderAction';
import User from '../../utility/User';

const db = new Database();
let outletId = ''
var selectedStartDate1

export class sideordermedit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Shop_det:[
           ],
           ItemId:"0",
           Shop_name:"abc",
           Shop_id:"1",
           Total_amt:"0",
           collapsed: false,
            PREVIOUSDAYORDERDAYS: '',
            totalOrder: '0',
            visiblecal1: '',
            productChoose: 'false', date: '', list1: [], list2: [], JoinString: [], getBrandData: [], dataSource: [], dataSourceSubBrand: [], isbrandSelect: 'false', search: '', brandId: ''
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    static navigationOptions = {
        title: 'Create New Order',
        color: 'white',
        headerStyle: {
            backgroundColor: '#221818'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff', marginLeft: wp('-2'),fontSize:20
        },
        headerLeft: (
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
                <TouchableOpacity onPress={() => Actions.sideorder()}>
                    <Image style={{ marginLeft: wp('4'), }}
                        source={require('../../assets/Icons/Back_White.png')}
                    />
                </TouchableOpacity>

            </View>
        )
    }


    onDateChange1(dates) {

        var d = new Date(dates);
        var maxDate = moment(d).utc().format('DD-MMM-YYYY')
        selectedStartDate1 = maxDate
    }
    calenderpopup1 = () => {
        const { navigation } = this.props;
        this.setState({ visiblecal1: true });
    }
    componentWillMount() {

User.entityvar=this.props.entity_id;
User.collectionvar=this.props.collection_type;
console.log("entity_id on main page sir",User.entityvar);
console.log("collection_type on main page sir",User.collectionvar);
db.getCustomerShopName(this.props.entity_id).then((data)=>{
    console.log("medit shop-details",data);
    //this.state.Shop_det.push(data);  
    this.setState({Shop_det:data})
    this.setState({Shop_name:this.state.Shop_det[0].Party})
    this.setState({Shop_id:this.state.Shop_det[0].entity_id})
    this.setState({Total_amt:this.state.Shop_det[0].total_amount})
   
    db.getDetailsItem(this.state.Shop_det[0].id).then((data)=>{
        console.log("item id details....",data);
        this.setState({dataSource:data})
        this.setState({ItemId:data[0].item_id})
        User.itemidvar=data[0].item_id;
        User.qty_1=data[0].quantity_one;
        User.qty_2=data[0].quantity_two;
        User.unit_small=data[0].small_Unit;
        User.unit_large=data[0].large_Unit;
        User.rate=data[0].rate;
        User.Amount=data[0].Amount;
        //latest final
        User.orderidvar=data[0].order_id;
       console.log("details for main itemidvar", User.itemidvar);
       console.log("details for main",this.state.dataSource);
       console.log("details for controx",this.state.ItemId);
        
        })
    })
    this.searchResultss();
    
        db.getPrevOrdersDayNo().then((data) => {
            //console.log("bbb=", data)
            var prod = []
            prod = data
            prod.map((Value, i) => {
                this.setState({ PREVIOUSDAYORDERDAYS: Value.Value })
            })
        })

        AsyncStorage.getItem('outletId').then((keyValue) => {
            this.setState({ outletId: JSON.parse(keyValue) })
            db.getTotalOrderValue(JSON.parse(keyValue), "0").then((data) => {
                this.state.totalOrder = data;
                this.setState({ totalOrder: data })
                this.props.orderValue(this.state.totalOrder)
            })
        })
        AsyncStorage.getItem('outletName').then((keyValue) => {
            this.setState({ outletName: JSON.parse(keyValue) })
        })
        db.getSearchProdect().then((data) => {

            var prod = []
            prod = data
            prod.map((Value, i) => {
                this.setState({ list1: Value.Value })
                AsyncStorage.getItem('SearchString').then((keyValue) => {
                    if (JSON.parse(keyValue) != null) {
                        this.state.search = JSON.parse(keyValue)
                        this.setState({ search: JSON.parse(keyValue) })
                        this.setState({ isbrandSelect: 'true' })

                        // db.getBrandSearchData(this.state.search, this.state.list1, this.state.JoinString).then((data) => {
                        //     this.state.dataSource = []
                        //     this.setState({
                        //         dataSource: data,
                        //     });
                        //     this.setState({
                        //         dataSource: data,
                        //     });
                        // })

                    }
                })
            })

            prod.map((Value, i) => {
                this.state.list2.push([Value.Value])
            })
            this.state.JoinString = this.state.list2.join('|')
        })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }


    SearchFilterFunction(text) {
        AsyncStorage.setItem('SearchString', JSON.stringify(text));
        this.setState({ isbrandSelect: 'true' })
        this.setState({
            search: text,
        });
        
        db.getBrandSearchEdit(text).then((data) => {
            console.log("data for search",data);
            this.state.dataSource = []
            this.setState({
                dataSource: data,
            });
        })

    }



    SchemesArrow() {

        if (this.state.collapsed == false) {
            return (

                <TouchableOpacity>
                    <Image style={styles.downSublistArrowStyle}
                        source={require('../../assets/Icons/Add.png')} />
                </TouchableOpacity>
            )
        }
        else if (this.state.collapsed == true) {
            return (
                <View>
                    <Image style={styles.downSublistArrowStyle}
                        source={require('../../assets/Icons/minus_white.png')} />
                </View>
            )
        }
    }

   
    // searchResultss() {

    //     const { navigation } = this.props;
       
           
    //             return this.state.dataSource.map((item, i) => {
    //                 return (
    //                     <View>

                           
    //                                 <View style={styles.collapseHeaderStyle} >
    //                                     <View style={styles.nameOfBrandContainer} >
    //                                         <Text key={i} style={styles.nameOfBrandTextStyle}  >
    //                                             {item.item_Name}
    //                                         </Text>

    //                                     </View>
    //                                     <View style={styles.schemesIconContainer}>
    //                                         <View style={styles.roundedtext}>
    //                                             <Image style={{ tintColor: "#EAA304" }}
    //                                                 source={require('../../assets/Icons/Schemes_drawer.png')} />
    //                                         </View>

    //                                     </View>
    //                                     <View style={styles.schemesDownArrowContainer} key={i}>

    //                                         {this.SchemesArrow()}
    //                                     </View>

    //                                 </View>
                                   
                                    
                                
                           
    //                     </View>
    //                 );
    //             })
            
        

    // }
    searchResultss() {

        const { navigation } = this.props;
       
                return this.state.dataSource.map((item, i) => {
                    return (
                        <View>

                            <View style={styles.searchResultsResulContainer} >
                                <Collapse

                                    onToggle={() => this.setState({
                                        collapsed: !this.state.collapsed,

                                    })}
                                >
                                    <CollapseHeader style={styles.collapseHeaderStyle} >
                                        <View style={styles.nameOfBrandContainer} >
                                            <Text key={i} style={styles.nameOfBrandTextStyle}  >
                                            {item.item_Name}
                                            </Text>

                                        </View>
                                        <View style={styles.schemesIconContainer}>
                                            <View style={styles.roundedtext}>
                                                <Image style={{ tintColor: "#EAA304" }}
                                                    source={require('../../assets/Icons/Schemes_drawer.png')} />
                                            </View>

                                        </View>
                                        <View style={styles.schemesDownArrowContainer} key={i}>

                                            {this.SchemesArrow()}
                                        </View>

                                    </CollapseHeader>
                                    <CollapseBody>
                                   <ListItem >
                                            <SideorderEdit  navigation={navigation}
 
                                                id={item.item_id}
                                                item_Name={item.item_Name}
                                                itemidvar={item.item_id}
                                                qty_1={item.quantity_one}
                                                qty_2={item.quantity_two}
                                                unit_small={item.small_Unit}
                                                 unit_large={item.large_Unit}
                                                rate={item.rate}
                                                Amount={item.Amount}
                                                selected_flag={item.selected_flag}
                                                sync_flag={item.sync_flag}/>
                                        </ListItem>
                                    </CollapseBody>
                                </Collapse>
                            </View>
                        </View>
                    );
                })
            }
        

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        // Registered function to handle the Back Press
        // We are generating an alert to show the back button pressed
        // alert('You clicked back. Now Screen will move to ThirdPage');
        // We can move to any screen. If we want
        Actions.sideorder()
        //  this.props.navigation.navigate('CreateNewOrderFirst');
        // Returning true means we have handled the backpress
        // Returning false means we haven't handled the backpress
        return true;
    }
    NextButton = () => {
        db.checkOrderIdInDb(this.state.Shop_id, "0").then((len) => {
            console.log("failed alert",this.state.outletId);
            if (len === 0) {
               
                alert('Please Add the Order');

            } else {
                Actions.editpreview({order_id:User.orderidvar})
            }

        })


    }

    render() {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        date = date + '/' + month + '/' + year

        //  var datess= year + '-' + month + '-' + date

        var newDate = moment().format('DD-MMM-YYYY')
        const startDate1 = selectedStartDate1 ? selectedStartDate1.toString() : newDate;
        const minDate1 = new Date(Date.now() - this.state.PREVIOUSDAYORDERDAYS * 24 * 60 * 60 * 1000); // Min date
        const maxDate1 = new Date(Date.now())  // Max date


        const { navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>

                <ImageBackground
                    source={require('../../assets/Icons/android_BG.png')}
                    style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', }}
                >
                    <ScrollView
                        keyboardShouldPersistTaps={'handled'}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Header */}
                        <View style={styles.container}>
                            <View style={styles.totalOrderContainer}>
                                <Text style={styles.totalOrderValueText}>
                                    TOTAL ORDER VALUE
                        </Text>
                                <Text style={styles.totalOrderValuesValueText} >
                                    {this.state.Total_amt}
                                </Text>
                            </View>

                            <View style={styles.orderDateContainer}>
                                <Text style={styles.orderDateText}>
                                    ORDER DATE
                        </Text>
                                <View style={styles.dateCalendarRowContainer}>
                                    <Text style={styles.orderDatesDate}>
                                        {startDate1}
                                    </Text>
                                    <TouchableOpacity onPress={this.calenderpopup1.bind(this)}>
                                        <View >
                                            <Dialog
                                                visible={this.state.visiblecal1}
                                                onTouchOutside={() => {
                                                    this.setState({ visiblecal1: false });
                                                }}
                                                previousTitle="<"
                                                previousTitleStyle={{ color: '#fff' }}
                                                nextTitle=">"
                                                nextTitleStyle={{ color: '#f00' }}
                                                width={wp('93')}
                                                footer={
                                                    <DialogFooter>
                                                        <DialogButton
                                                            text="OK"
                                                            textStyle={{ color: 'white' }}
                                                            style={{ backgroundColor: '#46BE50' }}
                                                            onPress={() => { this.setState({ visiblecal1: false }); }}
                                                        />
                                                    </DialogFooter>
                                                }
                                            >
                                                <DialogContent>
                                                    <CalendarPicker
                                                        previousTitle="Previous"
                                                        nextTitle="Next"
                                                        todayBackgroundColor="#e6ffe6"
                                                        selectedDayColor="#66ff33"
                                                        selectedDayTextColor="#000000"
                                                        scaleFactor={375}
                                                        textStyle={{
                                                            fontFamily: 'Cochin',
                                                            color: '#000000',
                                                        }}
                                                        startFromMonday={true}
                                                        minDate={minDate1}
                                                        maxDate={maxDate1}
                                                        onDateChange={this.onDateChange1} />
                                                </DialogContent>
                                            </Dialog>
                                        </View>

                                        <Image style={styles.calendarImg}
                                            source={require('../../assets/Icons/Calendar_normal.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* Store Name Id and History */}
                        <View style={{ flex: 0.1 }}>
                            <View style={styles.storeInfoMainContainer}>
                                <View style={styles.storeTextContainer}>
                                    <Text style={styles.storeNameText}>
                                         {this.state.Shop_name} 
                                    </Text>
                                </View>

                                <View style={styles.historyTextContainer}>
                                    <Text style={styles.historyText}>
                                        HISTORY
                            </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.storeIdText}>
                                    Store ID :
                    </Text>

                                <Text style={styles.storeIdStyle}>
                                     {this.state.Shop_id} 
                                </Text>
                            </View>
                        </View>

                        {/* Dash Line */}
                        <View style={styles.dashLineContainer}>
                            <Dash style={styles.dashLineStyle}
                                dashLength={2}
                                dashColor='#ADA2A2'
                            />
                        </View>

                        <View style={styles.textDropdownContainer}>
                            <Text style={styles.dropdownheadingTitleText}>CHOOSE PRODUCT</Text>
                            <Searchbar
                                style={styles.searchbarContainerStyle}
                                inputStyle={{ fontSize: RFValue('15'), fontFamily: 'Proxima Nova', color: '#362828' }}
                                placeholder="Search Product/SKU"
                                theme={false}
                                icon={false}
                                value={this.state.search}
                                onChangeText={input => {
                                    this.setState({ search: input });
                                    this.SearchFilterFunction(input)
                                }
                                }
                            />

                        </View>
                        <View style={styles.searchResultContainer}>
                            <Text style={styles.searchResultTextStyle} >
                                Search Results
                            </Text>
                        </View>
                        {this.searchResultss()}
                    </ScrollView>


                    <View style={{ alignItems: 'flex-end' }}>
                        <FAB
                            style={styles.fab}
                            color="#ffffff"
                            onPress={() => this.props.navigation.navigate('FilterPage')}
                            icon="filter-variant"

                        />
                    </View>
                    {/* Next Button */}
                    <View>
                        <TouchableOpacity onPress={this.NextButton.bind(this)}>
                            <NextButton />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        createOrder: state.createOrder

    };
};

const mapDispatchToProps = dispatch => ({
    orderValue: (val) => {
        dispatch(TOTAL_ORDER_VALUE(val));

    },
})
export default connect(mapStateToProps, mapDispatchToProps)(sideordermedit)


const styles = StyleSheet.create({
    container: {
        flex: 5,
        flexDirection: 'row',
        backgroundColor: '#221818'
    },

    totalOrderContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    totalOrderValueText: {
        color: '#796A6A',
        fontSize: wp('2.5%'),
        fontWeight: 'bold',
        marginTop: hp('3%'),
        fontFamily: 'Proxima Nova',
        marginLeft: wp('5%'),
    },

    totalOrderValuesValueText: {
        color: 'white',
        fontSize: wp('3%'),
        marginTop: hp('1%'),
        marginLeft: wp('5%'),
        fontFamily: 'Proxima Nova',
        marginBottom: hp('2')
    },

    orderDateContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-end'
    },

    orderDateText: {
        color: '#796A6A',
        fontSize: wp('2.5%'),
        fontWeight: 'bold',
        marginTop: hp('3%'),
        marginRight: wp('19%'),
        fontFamily: 'Proxima Nova', alignContent: 'center'
    },

    dateCalendarRowContainer: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },

    orderDatesDate: {
        color: '#796A6A',
        fontSize: wp('3%'),
        marginTop: hp('1%'),
        marginRight: wp('3%'),
        fontFamily: 'Proxima Nova',
        marginBottom: hp('2'), alignContent: 'center'
    },

    calendarImg: {
        marginRight: wp('10'),
        marginTop: hp('1%'),
        marginBottom: hp('2'),
    },

    storeInfoMainContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    storeTextContainer: {
        flex: 0.5,
        flexDirection: 'column',
    },

    historyTextContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    storeNameText: {
        color: '#796A6A',
     //   fontSize: wp('3.5%'),
        fontWeight: 'bold',
        marginTop: hp('2%'),
        marginLeft: wp('6%'),
        fontFamily: 'Proxima Nova',fontSize:16
    },

    historyText: {
        color: '#3955CB',
     //   fontSize: wp('3%'),
        fontWeight: 'bold',
        marginTop: hp('2.5%'),
        fontFamily: 'Proxima Nova',
        marginRight: wp('9%'),fontSize:10
    },

    storeIdText: {
        color: '#796A6A',
        fontSize: wp('2.3%'),
        fontWeight: 'bold',
        marginTop: hp('1%'),
        marginLeft: wp('6%'),
        fontFamily: 'Proxima Nova'
    },

    storeIdStyle: {
        color: '#796A6A',
        fontSize: wp('2.3%'),
        marginTop: hp('1%'),
        marginLeft: hp('0.6%'),
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        alignContent: 'flex-end',
    },

    dashLineContainer: {
        flex: 1,
        marginTop: hp('2'),
        alignContent: 'center',
        alignItems: 'center',
    },

    dashLineStyle: {
        width: wp('89'),
        height: hp('1'),
        color: '#ADA2A2',
    },

    textDropdownContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginTop: hp('2'),
        //   marginVertical: hp('3'),
        marginHorizontal: wp('4'),
    },

    dropdownheadingTitleText: {
      //  fontSize: wp('3'),
        fontSize:10,
        color: '#796A6A',
        fontWeight: 'bold',
        fontFamily: 'Proxima Nova',
        marginLeft: wp('1'),
        marginVertical: wp('1'),
    },

    searchbarContainerStyle: {
        height: hp('9'),
        width: wp('88'),
        borderColor: '#E6DFDF',
        borderWidth: wp('0.4'),
        borderRadius: wp('2'),
        marginTop: hp('1'),
        alignSelf: 'center',
        elevation: 0,
    },


    filterCircleColor: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        backgroundColor: '#CC1167',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: hp('2'),
        marginHorizontal: wp('4'),
        resizeMode: 'contain',

    },

    filterImageStyle: {
        height: hp('4'),
        width: wp('7'),
    },

    dropDownStyle: {
        width: wp('90'),
        //   backgroundColor: 'white',

    },

    searchResultContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginHorizontal: hp('3'),
        marginTop: wp('2'),
        marginTop: hp('3'),
    },

    searchResultTextStyle: {
        
        color: '#8C7878',
      
        fontFamily: 'Proxima Nova',
        fontSize: RFValue(11),
    },

    searchResultsResulContainer: {
        flex: 1,
        marginTop: wp('4')
    },

    collapseHeaderStyle: {
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderColor: '#E6DFDF',
        borderRadius: wp('2'),
        height: hp('9'),
        width: wp('88'),
        borderWidth: hp('0.2'),
        // marginHorizontal: wp('4'),
    },

    nameOfBrandContainer: {
        flex: 3,                                                                                  //28-03
        alignItems: 'flex-start',
    },

    nameOfBrandTextStyle: {
        marginLeft: wp('5'),
      
        fontFamily: 'Proxima Nova',
     //   fontSize: RFValue(13),
     fontSize:12,
        color: '#362828'
    },

    schemesIconContainer: {
        flex: 1,                                                                                 //28-3
        alignItems: 'flex-end',
        flexDirection: 'row',
        //marginRight: wp('-4')
    },

    schemesDownArrowContainer: {
        // marginRight:wp('6'),
    },

    schemesIconStyle: {
        marginLeft: wp('27'),
    },

    roundedtext: {
        width: 18,
        height: 18,
        flexWrap: "wrap",                                                  //28-03
        justifyContent: 'center',
        alignItems: 'center',


        marginLeft: wp('12'),                                               //28-03                                                                              
    },

    downSublistArrowStyle: {
        // marginLeft: wp('2'), 
        height: hp('4'),
        width: wp('7'),
        marginRight: wp('4'),
    },

    filterButtonContainer: {
        alignItems: 'flex-end',
    },



    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#CC1167",
    },





});