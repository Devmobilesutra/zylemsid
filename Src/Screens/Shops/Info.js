import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, Image, AsyncStorage, PermissionsAndroid, BackHandler } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Actions } from 'react-native-router-flux';
import { FAB, Portal, Provider } from 'react-native-paper';
import { FloatingAction } from "react-native-floating-action";
import Geolocation from 'react-native-geolocation-service';
import { TOTAL_SHOPS, SHOP_INFO, SHOP_VISITED_TODAY } from '../../Redux/actions/ShopAction'
import { connect } from 'react-redux'
import MapView, { Polyline, Marker } from "react-native-maps";
import Database from './../../utility/Database'
const db = new Database();
var open

const actions = [
    {
        text: "Create New Order",
        color: 'transperent',
        name: "bt_create",
        position: 2,
        textColor: 'black',
        textStyle: { fontSize: 14, fontWeight: 'bold', marginHorizontal: 10 },
        buttonSize: 0,

    },
    {
        text: "Accept Payment",
        color: 'transperent',
        name: "bt_payment",
        position: 3,
        textColor: 'black',
        textStyle: { fontSize: 14, fontWeight: 'bold', marginHorizontal: 15, },
        buttonSize: 0,
    },
    {
        text: "Take A Survey",
        color: 'transperent',
        name: "bt_survey",
        position: 4,
        textColor: 'black',
        textStyle: { fontSize: 14, fontWeight: 'bold', marginHorizontal: 22, },
        buttonSize: 0,
    },
    {
        text: "Audit Assets",
        color: 'transperent',
        name: "bt_assets",
        position: 1,
        textColor: 'black',
        textStyle: { fontSize: 14, fontWeight: 'bold', marginHorizontal: 25, },
        buttonSize: 0,
    },
];
var outletId = ''
var InfoString = ''
var shop = ''
var Latitude, Longitude, RegisterOn, Owner, Contact, ShopType, RegistrationNo, ShopId, ContactPerson, ShopArea, Address
export class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShopName: '', Area: '', Address: '', Contact: '', Latitude: '', Longitude: '', RegisterOn: '', Owner: '', MobileNo: '', ShopType: '', RegistrationNo: '', ShopId: '', ContactPerson: '',
            hasMapPermission: true,
            userLatitude: 0,
            userLongitude: 0,
            totalVisited: '',
            active: false
        };
        //  alert(this.props.shopId)  
        this.props.navigation.setParams({
            shopId: this.props.shopId
        });

        //  [{"ShopArea":"","ContactPerson":"Abc","ShopId":"12","RegistrationNo":"Yshdhdd","ShopType":"",
        //"MobileNo":"9767296769","RegisteredOn":"2020-7-7 15:59:25","Longitude":"73.810024","Latitude":"18.4942002",
        //"Outlet_Info":"Zbxjd","Party":"Rajani","id":"772020155925"}]
        db.getOutletInfo(this.props.shopId).then((data) => {
            //console.log("my data==",JSON.stringify(data))
            for (var i = 0; i < data.length; i++) {
                Latitude = data[0].Latitude
                Longitude = data[0].Longitude
                ShopArea = data[0].ShopArea
                Address = data[0].Outlet_Info
                Contact = data[0].MobileNo
                Owner = data[0].Owner
                RegisterOn = data[0].RegisteredOn
                RegistrationNo = data[0].RegistrationNo
                ShopType = data[0].ShopType
                ShopId = data[0].ShopId
                ContactPerson = data[0].ContactPerson
                shop = data[0].Party
                InfoString = data[0].Outlet_Info
                //console.log("Sras==",data[0].Outlet_Info)
            }
            if (InfoString.includes('||')) {
                var nameArr = InfoString.split('||');
                var Areas = InfoString.split('||')[0]
                var Addresss = InfoString.split('||')[1]
                var Contacts = InfoString.split('||')[2]
                // alert(Addresss)
                //console.log(Addresss)
                this.props.saveShopInfo(Areas, shop, Addresss, Contacts, this.props.shopId)
                AsyncStorage.setItem('shopId', JSON.stringify(this.props.shopId));
                this.setState({ ShopName: shop })
                this.setState({ Area: Areas })
                this.setState({ Address: Addresss })
                this.setState({ Contact: Contacts })
            } else {
                this.setState({
                    ShopName: shop,
                    Area: ShopArea,
                    Address: Address,
                    Contact: Contact,
                    Owner: Owner,
                    RegisterOn: RegisterOn,
                    RegistrationNo: RegistrationNo,
                    ShopType: ShopType,
                    ShopId: ShopId,
                    ContactPerson: ContactPerson

                })
                this.props.saveShopInfo(this.state.Area, shop, this.state.Address, this.state.Contact, this.props.shopId)
                AsyncStorage.setItem('shopId', JSON.stringify(this.props.shopId));
            }
            // var nameArr = InfoString.split('||');
            // var Areas=InfoString.split('||')[0]
            // var Addresss=InfoString.split('||')[1]
            // var Contacts=InfoString.split('||')[2]
            // // alert(Addresss)
            // //console.log(Addresss)
            // this.props.saveShopInfo(Areas,shop,Addresss,Contacts,this.props.shopId) 
            // this.setState({ShopName:shop})
            // this.setState({Area:Areas})
            // this.setState({Address:Addresss})
            // this.setState({Contact:Contacts})
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

    async getUserPosition() {
        this.setState({ hasMapPermission: true });
        // this.locationWatchId = Geolocation.getCurrentPosition(
        Geolocation.getCurrentPosition(
            pos => {
                //alert(pos.coords.latitude)
                this.setState({
                    userLatitude: pos.coords.latitude,
                    userLongitude: pos.coords.longitude
                });
                //console.log(this.state.userLatitude)
            })
    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        //console.log("componentDidMount callee")
        this._componentFocused();

        this._sub = this.props.navigation.addListener(
            'didFocus',
            this._componentFocused

        );
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        Actions.Shops();
        return true;
    }
    //  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);  



    _componentFocused = () => {
        this.requestFineLocation();
        AsyncStorage.setItem('shopId', JSON.stringify(this.props.shopId));
        //    db.getOutletInfo(this.props.shopId).then((data) => {
        //      //console.log("my data==+==========================================================",JSON.stringify(data))
        //     for(var i=0;i<data.length;i++){
        //         shop=data[0].Party
        //      InfoString=data[0].Outlet_Info

        //     }

        // var nameArr = InfoString.split('||');
        // var Areas=InfoString.split('||')[0]
        // var Addresss=InfoString.split('||')[1]
        // var Contacts=InfoString.split('||')[2]
        // // alert(Addresss)
        // //console.log(Contacts)

        // this.props.saveShopInfo(Areas,shop,Addresss,Contacts,this.props.shopId) 
        // this.setState({ShopName:shop})
        // this.setState({Area:Areas})
        // this.setState({Address:Addresss})
        // this.setState({Contact:Contacts})
        // })   
        db.getOutletInfo(this.props.shopId).then((data) => {
            //console.log("my data==",JSON.stringify(data))
            for (var i = 0; i < data.length; i++) {
                Latitude = data[0].Latitude
                Longitude = data[0].Longitude
                ShopArea = data[0].ShopArea
                Address = data[0].Outlet_Info
                Contact = data[0].MobileNo
                Owner = data[0].Owner
                RegisterOn = data[0].RegisteredOn
                RegistrationNo = data[0].RegistrationNo
                ShopType = data[0].ShopType
                ShopId = data[0].ShopId
                ContactPerson = data[0].ContactPerson
                shop = data[0].Party
                InfoString = data[0].Outlet_Info
                //console.log("Sras==",data[0].Outlet_Info)
            }
            if (InfoString.includes('||')) {
                var nameArr = InfoString.split('||');
                var Areas = InfoString.split('||')[0]
                var Addresss = InfoString.split('||')[1]
                var Contacts = InfoString.split('||')[2]
                // alert(Addresss)
                //console.log(Addresss)
                this.props.saveShopInfo(Areas, shop, Addresss, Contacts, this.props.shopId)
                AsyncStorage.setItem('shopId', JSON.stringify(this.props.shopId));
                this.setState({ ShopName: shop })
                this.setState({ Area: Areas })
                this.setState({ Address: Addresss })
                this.setState({ Contact: Contacts })
            } else {
                this.setState({
                    ShopName: shop,
                    Area: ShopArea,
                    Address: Address,
                    Contact: Contact,
                    Owner: Owner,
                    RegisterOn: RegisterOn,
                    RegistrationNo: RegistrationNo,
                    ShopType: ShopType,
                    ShopId: ShopId,
                    ContactPerson: ContactPerson

                })
                this.props.saveShopInfo(this.state.Area, shop, this.state.Address, this.state.Contact, this.props.shopId)
                AsyncStorage.setItem('shopId', JSON.stringify(this.props.shopId));

            }
            // var nameArr = InfoString.split('||');
            // var Areas=InfoString.split('||')[0]
            // var Addresss=InfoString.split('||')[1]
            // var Contacts=InfoString.split('||')[2]
            // // alert(Addresss)
            // //console.log(Addresss)
            // this.props.saveShopInfo(Areas,shop,Addresss,Contacts,this.props.shopId) 
            // this.setState({ShopName:shop})
            // this.setState({Area:Areas})
            // this.setState({Address:Addresss})
            // this.setState({Contact:Contacts})
        })


        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var datess = year + '-' + month + '-' + date
    }
    render() {
        const {

            userLatitude,
            userLongitude,

        } = this.state;


        let polyline = null;
        let marker = null;

        marker = (
            <Marker coordinate={{ latitude: this.state.userLatitude, longitude: this.state.userLongitude }} style={{
                height: 50,
                width: 50,
            }} />
        );
        return (
            <View>
                <ImageBackground
                    source={require('../../assets/Icons/android_BG.png')}
                    style={styles.backgroundImgStyle}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Horizontal Images */}
                        <View>
                            <View style={styles.horiImagesMainContainer}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                >
                                    <Image style={styles.horiImageStyles}
                                        source={require('../../assets/ShopInfoImg/Koala.jpg')}
                                    />
                                    <Image style={styles.horiImageStyles}
                                        source={require('../../assets/ShopInfoImg/Desert.jpg')}
                                    />
                                    <Image style={styles.horiImageStyles}
                                        source={require('../../assets/ShopInfoImg/Hydrangeas.jpg')}
                                    />
                                    <Image style={styles.horiImageStyles}
                                        source={require('../../assets/ShopInfoImg/Penguins.jpg')}
                                    />
                                </ScrollView>
                            </View>
                        </View>

                        {/* Address */}
                        <View>
                            <View style={styles.addressMainContainer}>
                                <Text style={styles.addressHeaderTextStyle}>
                                    ADDRESS
                    </Text>

                                <Text style={styles.addressTextStyle}>
                                    {this.state.Address}
                                </Text>

                                {/* <Text style={styles.addressTextStyle}>
                        Pincode: 411 055
                    </Text> */}

                                <View style={styles.mapImgStyle}>
                                    <MapView
                                        ref={this.map}
                                        showsUserLocation
                                        followsUserLocation
                                        style={styles.map}
                                        region={{
                                            latitude: userLatitude,
                                            longitude: userLongitude,

                                            // latitude: 18.499880,
                                            // longitude: 73.810669,
                                            latitudeDelta: 0.2,
                                            longitudeDelta: 0.2
                                        }}
                                    >

                                        {marker}
                                    </MapView>
                                </View>
                                {/* <Image  style={styles.mapImgStyle}
                                            source = {require('../../assets/Icons/MapImg2.png')}
                    /> */}
                                <TouchableOpacity>
                                    <Text style={styles.navigateTextStyle}>
                                        Navigate
                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Owner Details */}
                        <View>
                            <View style={styles.ownerDetailMainContainer}>
                                {/* Owner */}
                                <View style={styles.ownerColumnContainer}>
                                    <Text style={styles.ownerHeaderTextStyles}>
                                        OWNER
                        </Text>
                                    <Text style={styles.ownerNameTextStyle}>
                                        {this.state.Owner}
                                    </Text>
                                </View>
                                {/* Middle Line */}
                                <View
                                    style={styles.middleLineStyle}
                                />
                                {/* Mob No. */}
                                <View style={styles.mobNoMainContainer}>
                                    <View style={styles.mobNoInnerContainer}>
                                        <Text style={styles.mobNoTextStyle}>
                                            {this.state.Contact}
                                        </Text>
                                    </View>
                                    <View style={styles.messageColumnContainer}>
                                        <TouchableOpacity>
                                            <Text style={styles.messageTextStyle}>
                                                Message
                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.callColumnContainer}>
                                        <TouchableOpacity>
                                            <Text style={styles.callTextStyle}>
                                                Call
                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* Middle Line */}
                                <View
                                    style={styles.middleLineStyle}
                                />
                                {/* owner's email  */}
                                {/* <Text style={styles.emailTextStyle}>
                            Owneremail@gmail.com
                    </Text> */}
                            </View>
                        </View>

                        {/* Conract Person */}
                        <View>
                            <View style={styles.contactPersonMainContainer}>
                                {/* Contact Person */}
                                <View style={styles.contactPersonColumnContainer}>
                                    <Text style={styles.contactPersonTextStyle}>
                                        Contact Person
                        </Text>
                                    <Text style={styles.contactPersonNameStyle}>
                                        {this.state.ContactPerson}
                                    </Text>
                                </View>
                                {/* Middle Line */}
                                <View
                                    style={styles.middleLineStyle}
                                />
                                {/* Mob No. */}
                                <View style={styles.CPMobNoMainContainer}>
                                    <View style={styles.CPMobInnerContainer}>
                                        <Text style={styles.CPMobNoTextStyle}>
                                            {this.state.Contact}
                                        </Text>
                                    </View>
                                    <View style={styles.CPMessageContainer}>
                                        <TouchableOpacity>
                                            <Text style={styles.CPMessageTextStyle}>
                                                Message
                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.CPCallContainer}>
                                        <TouchableOpacity>
                                            <Text style={styles.CPCallTextStyle}>
                                                Call
                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Registration View */}
                        <View>
                            <View style={styles.registrationMainContainer}>
                                {/* Registration no */}
                                <View style={styles.regiNoRowContainer}>
                                    <View style={styles.regNoColContainer}>
                                        <Text style={styles.regNoTextStyle}>
                                            REGISTRATION NO.
                            </Text>
                                        <Text style={styles.regNameTextStyle}>
                                            {this.state.RegistrationNo}
                                        </Text>
                                    </View>
                                    <View style={styles.shopIdColContainer}>
                                        <Text style={styles.shopIdTextContainer}>
                                            SHOP ID
                            </Text>
                                        <Text style={styles.shopNameTextStyle}>
                                            {this.state.ShopId}
                                        </Text>
                                    </View>
                                </View>
                                {/* Middle Line */}
                                <View
                                    style={styles.middleLineStyle}
                                />
                                {/* Shop Area */}
                                <View style={styles.shopAreaRowContainer}>
                                    <View style={styles.shopAreaColContainer}>
                                        <Text style={styles.areaHeaderTextContainer}>
                                            SHOP AREA
                            </Text>
                                        <Text style={styles.areaCountTextStyle}>
                                            {this.state.Area}
                                        </Text>
                                    </View>
                                    <View style={styles.typeColContainer}>
                                        <Text style={styles.typeHeaderTextStyle}>
                                            TYPE
                            </Text>
                                        <Text style={styles.typeTextStyle}>
                                            {this.state.ShopType}
                                        </Text>
                                    </View>
                                </View>
                                {/* Registered On */}
                                <View style={styles.regOnColContainer}>
                                    <Text style={styles.regOnHeaderStyle}>
                                        REGISTERED ON
                            </Text>
                                    <Text style={styles.regOnDateTextStyle}>
                                        {this.state.RegisterOn}
                                    </Text>
                                </View>
                            </View>
                        </View>


                        <View style={{ height: hp('10') }}></View>
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
                            if (name == "bt_assets") {
                                Actions.AssetUpdate()
                                this.setState({
                                    active: !this.state.active,
                                })
                            }
                            else if (name == "bt_create") {
                                AsyncStorage.setItem('outletName', "");
                                AsyncStorage.setItem('outletId', "");
                                AsyncStorage.setItem('beatName', "");
                                AsyncStorage.setItem('beatId', "");
                                AsyncStorage.setItem('distributorName', "");
                                AsyncStorage.setItem('SearchString', "");

                                Actions.CreateNewOrderFirst()
                                this.setState({
                                    active: !this.state.active,
                                })
                            } else if (name == "bt_survey") {
                                Actions.AssetUpdate()
                                this.setState({
                                    active: !this.state.active,
                                })
                            }

                        }}
                        onPressMain={() => {
                            if (this.state.active == false) {
                                this.setState({
                                    active: !this.state.active,
                                })
                                //  BackHandler.addEventListener('hardwareBackPress', () => Actions.TabBar());
                            }
                            else {
                                this.setState({
                                    active: !this.state.active,
                                })

                            }
                        }
                        }
                        onPressBackdrop={() => {
                            if (this.state.active == false) {
                                this.setState({
                                    active: !this.state.active,
                                })
                                //BackHandler.addEventListener('hardwareBackPress', () => Actions.drawerMenu());
                            }
                            else {
                                this.setState({
                                    active: !this.state.active,
                                })

                            }
                        }
                        }

                    />
                </ImageBackground>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shops: state.shops,
    };
};
const mapDispatchToProps = dispatch => ({
    saveShopInfo: (Areas, shop, Addresss, Contacts, shopId) => { dispatch(SHOP_INFO(Areas, shop, Addresss, Contacts, shopId)); },
    shopVisited: (visiteds) => { dispatch(SHOP_VISITED_TODAY(visiteds)); },
}
)
export default connect(mapStateToProps, mapDispatchToProps)(Info)


const styles = StyleSheet.create({
    backgroundImgStyle: {
        // height:hp('163'), 
        width: wp('100'),
        resizeMode: 'cover',
        justifyContent: 'center',
    },

    horiImagesMainContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderColor: '#E6DFDF',
        justifyContent: 'center',
        alignSelf: 'center',
        height: hp('26'),
        width: wp('100'),
        marginBottom: hp('1'),
    },

    horiImageStyles: {
        marginLeft: hp('3'),
        marginBottom: hp('0.5'),
        height: hp('20'),
        width: wp('40'),
        borderRadius: wp('2'),
    },

    addressMainContainer: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        marginBottom: hp('1'),
        borderColor: '#E6DFDF',
        height: hp('49'),
        width: wp('100'),
    },

    addressHeaderTextStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
        marginLeft: wp('6'),
        marginTop: hp('3'),
    },

    addressTextStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        marginLeft: wp('6'),
        marginTop: hp('1'),
        marginRight: hp('1'),
    },

    mapImgStyle: {
        height: hp('25'),
        width: wp('88'),
        marginTop: hp('2'),
        borderRadius: wp('2'),
        alignSelf: 'center',
    },

    navigateTextStyle: {
        color: '#3955CB',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        marginTop: hp('2'),
        alignSelf: 'center',
    },

    ownerDetailMainContainer: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        marginBottom: hp('1'),
        borderColor: '#E6DFDF',
        height: hp('28'),
        width: wp('100'),
    },

    ownerColumnContainer: {
        flexDirection: 'column',
    },

    ownerHeaderTextStyles: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
        marginLeft: wp('6'),
        marginTop: hp('3'),
    },

    ownerNameTextStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        marginLeft: wp('6'),
        marginTop: hp('1'),
    },

    middleLineStyle: {
        width: wp('90'),
        borderBottomColor: '#E6DFDF',
        borderBottomWidth: wp('0.5'),
        alignSelf: 'center',
        marginTop: hp('2.5')
    },

    mobNoMainContainer: {
        flexDirection: 'row',
        marginTop: hp('3'),
    },

    mobNoInnerContainer: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    mobNoTextStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        marginLeft: wp('6'),
    },

    messageColumnContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    messageTextStyle: {
        color: '#3955CB',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
    },

    callColumnContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    callTextStyle: {
        color: '#3955CB',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        marginRight: wp('8'),
    },

    emailTextStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        marginLeft: wp('6'),
        marginTop: hp('2.5'),
    },

    contactPersonMainContainer: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        marginBottom: hp('1'),
        borderColor: '#E6DFDF',
        height: hp('20'),
        width: wp('100'),
    },

    contactPersonColumnContainer: {
        flexDirection: 'column',
    },

    contactPersonTextStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
        marginLeft: wp('6'),
        marginTop: hp('3'),
    },

    contactPersonNameStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        marginLeft: wp('6'),
        marginTop: hp('1'),
    },

    CPMobNoMainContainer: {
        flexDirection: 'row',
        marginTop: hp('3'),
    },

    CPMobInnerContainer: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    CPMobNoTextStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        marginLeft: wp('6'),
    },

    CPMessageContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    CPMessageTextStyle: {
        color: '#3955CB',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
    },

    CPCallContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    CPCallTextStyle: {
        color: '#3955CB',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        marginRight: wp('8'),
    },

    registrationMainContainer: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        marginBottom: hp('1'),
        borderColor: '#E6DFDF',
        height: hp('33'),
        width: wp('100'),
    },

    regiNoRowContainer: {
        flexDirection: 'row',
    },

    regNoColContainer: {
        flexDirection: 'column',
    },

    regNoTextStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
        marginTop: hp('3'),
        marginLeft: wp('6%'),
    },

    regNameTextStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        marginTop: hp('1'),
        marginLeft: wp('6%'),
    },

    shopIdColContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },

    shopIdTextContainer: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
        marginTop: hp('3'),
    },

    shopNameTextStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        marginTop: hp('1'),
        marginRight: wp('5'),
    },

    map: {
        ...StyleSheet.absoluteFillObject
    },
    container1: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    shopAreaRowContainer: {
        flexDirection: 'row',
    },

    shopAreaColContainer: {
        flexDirection: 'column',
    },

    areaHeaderTextContainer: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
        marginTop: hp('3'),
        marginLeft: wp('6%'),
    },

    areaCountTextStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        marginTop: hp('1'),
        marginLeft: wp('6%'),
    },

    typeColContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },

    typeHeaderTextStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
        marginTop: hp('2.5'),
        marginLeft: wp('8'),
    },

    typeTextStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        marginTop: hp('1'),
        marginLeft: wp('20'),
    },

    regOnColContainer: {
        flexDirection: 'column',
    },

    regOnHeaderStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        fontWeight: 'bold',
        marginTop: hp('3'),
        marginLeft: wp('6%'),
    },

    regOnDateTextStyle: {
        color: '#362828',
        fontSize: 12,
        fontFamily: 'Proxima Nova',
        marginTop: hp('1'),
        marginLeft: wp('6%'),
    },
})
