import SQLite from "react-native-sqlite-storage";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, AsyncStorage, Alert } from 'react-native';
SQLite.DEBUG(true);
SQLite.enablePromise(true);
const database_name = "ZyleminiPlusDatabase.db";
const database_version = "1.0";
const database_displayname = "ZyleminiPlusDatabase.db";
const database_size = 200000000;

import { Router, Scene, Actions, ActionConst, Stack } from 'react-native-router-flux';
import { getBootloaderSync } from "react-native-device-info";

var isOpen = 'false'
let db1
export default class Database {

  initDB() {

    let db;
    return new Promise((resolve) => {

      SQLite.echoTest()
        .then(() => {
          isOpen = 'true'
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
          )
            .then(DB => {
              db = DB;
              db1 = DB
              db.executeSql('SELECT 1 FROM table_user LIMIT 1').then(() => {

              }).catch((error) => {

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_type VARCHAR(20), targeted_shop INT(10))');
                }).then(() => {

                }).catch(error => {

                });


                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE AdvanceReports(id INTEGER PRIMARY KEY AUTOINCREMENT,AID TEXT,ReportTitle TEXT,ReportType TEXT,ReferenceType TEXT,IsActive TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS sqlite_sequence(name,seq);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, UserID TEXT, UserName TEXT, Password TEXT, IMEINO TEXT,AreaID TEXT,LoginID TEXT)');
                }).then(() => {

                }).catch(error => {
                  //console.log(error);
                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE PDistributor(id INTEGER PRIMARY KEY AUTOINCREMENT,DistributorID TEXT,Distributor TEXT,DistributorAlias TEXT,ERPCode TEXT,AREAID TEXT,AREA TEXT,BRANCHID TEXT,BRANCH TEXT,DISTRIBUTORGROUPID TEXT,DISTRIBUTORGROUP TEXT ,IsSelectedDistributor TEXT,DISTRIBUTORINFO TEXT)');
                }).then(() => {

                }).catch(error => {

                });

                ///MJP create table
        db.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS MJPMaster(ID TEXT, ExecutiveId TEXT, MonthYear TEXT)');
        }).then(() => {

        }).catch(error => {

        });
        
        db.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS MJPMasterDetails(ID TEXT, MJPMasterID TEXT, PlannedDate TEXT,EntityType TEXT,EntityTypeID TEXT,ActivityTitle TEXT,IsActivityDone TEXT)');
        }).then(() => {

        }).catch(error => {

        });

        db.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS SubGroupMaster(Id TEXT, GroupId TEXT, Name TEXT)');
        }).then(() => {

        }).catch(error => {

        });

        db.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS MeetReport(ID,Meeting_Id TEXT,Shop_Id TEXT,Shop_name TEXT,PlannedDate TEXT, Time TEXT,location TEXT,Remarks TEXT,IsActivityDone TEXT,Type_sync TEXT,collection_type TEXT)');
        }).then(() => {

        }).catch(error => {

        });
        

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE Sales(id INTEGER PRIMARY KEY AUTOINCREMENT,UserID TEXT,DistributorID TEXT,CustomerID TEXT,Month INT,ItemID TEXT,Quantity TEXT,Value TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE Target(id INTEGER PRIMARY KEY AUTOINCREMENT,UserID TEXT,TDate TEXT,ClassificationID TEXT,ClassificationName TEXT,Target TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE Pcustomer(id INTEGER PRIMARY KEY AUTOINCREMENT,CustomerId Text,Party TEXT,LicenceNo TEXT,IsActive TEXT,ERPCode TEXT,RouteID TEXT,RouteName TEXT,AREAID TEXT,AREA TEXT,BRANCHID TEXT,BRANCH TEXT,CUSTOMERCLASSID TEXT,CUSTOMERCLASS TEXT,CUSTOMERCLASS2ID TEXT,CUSTOMERCLASS2 TEXT,CUSTOMERGROUPID TEXT,CUSTOMERGROUP TEXT,CUSTOMERSEGMENTID TEXT,CUSTOMERSEGMENT TEXT,CUSTOMERSUBSEGMENTID TEXT, CUSTOMERSUBSEGMENT TEXT,LICENCETYPEID TEXT,LICENCETYPE TEXT,OCTROIZONEID TEXT,OCTROIZONE TEXT,Outlet_Info TEXT,DefaultDistributorId TEXt);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE DistributorContacts(id INTEGER PRIMARY KEY AUTOINCREMENT,DistributorID TEXT,SequenceNo TEXT,Contacatperson TEXT,ContactNumber TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE DistributorDataStatus(id INTEGER PRIMARY KEY AUTOINCREMENT,Branch TEXT, DistributorID TEXT, Area TEXT, Day7 TEXT, Day6 TEXT,Day5 TEXT, Day4 TEXT, Day3 TEXT, Day2 TEXT, Day1 TEXT, LastUploadDate TEXT, LastInvoiceDate TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE SalesYTD(id INTEGER PRIMARY KEY AUTOINCREMENT,UserID TEXT, DistributorID TEXT, CustomerID TEXT, ItemID TEXT, Quantity TEXT, Value TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE UserCustomerItem(id INTEGER PRIMARY KEY AUTOINCREMENT,UserID TEXT, CustomerID TEXT, ItemID TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE ReportControlMaster(id INTEGER PRIMARY KEY AUTOINCREMENT,ControlName TEXT, ControlId TEXT, ReferenceColumn TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE Report(id INTEGER PRIMARY KEY AUTOINCREMENT,MenuKey TEXT, Classification TEXT, ComboClassification TEXT,LabelName TEXT,IsActive TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE Settings(id INTEGER PRIMARY KEY AUTOINCREMENT,Key TEXT, Value TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE AreaParentList(id INTEGER PRIMARY KEY AUTOINCREMENT,Areaid TEXT, Area TEXT,AreaParentId TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE CollectionTypes(Id TEXT,Type TEXT);');
                }).then(() => {

                }).catch(error => {

                });



                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE PItem(id INTEGER PRIMARY KEY AUTOINCREMENT,ItemId TEXT, Item TEXT, ItemAlias TEXT, BPC TEXT, BPC1 TEXT, BPC2 TEXT,ErpCode TEXT, Volume TEXT, ReportingQuantity TEXT, MRP TEXT, PTR TEXT, BRANDID TEXT, BRAND TEXT, BRANDALIAS TEXT, DIVISIONID TEXT, DIVISION TEXT, DIVISIONALIAS TEXT, FLAVOURID TEXT, FLAVOUR TEXT, FLAVOURALIAS TEXT,ITEMCLASSID TEXT, ITEMCLASS TEXT, ITEMCLASSALIAS TEXT, ITEMGROUPID TEXT, ITEMGROUP TEXT, ITEMGROUPALIAS TEXT, ITEMSIZEID  TEXT, ITEMSIZE TEXT, ITEMSIZEALIAS TEXT, ITEMSUBGROUPID TEXT, ITEMSUBGROUP TEXT, ITEMSUBGROUPALIAS TEXT,ITEMTYPEID TEXT, ITEMTYPE TEXT, ITEMTYPEALIAS TEXT, SIZESEQUENCE TEXT, ITEMSIZESEQUENCE TEXT, ITEMSIZEALIASSEQUENCE TEXT,ITEMSEQUENCE TEXT, ITEMALIASSEQUENCE TEXT, BRANDSEQUENCE TEXT, BRANDALIASSEQUENCE TEXT,Focus TEXT,IsSelectedBrand TEXT,IsSelectedBrandProduct TEXT,bottleQut TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE SIPREPORT(id INTEGER PRIMARY KEY AUTOINCREMENT,UserId TEXT,ReportMonth TEXT,SrNo TEXT,AEID TEXT,AMID TEXT,AM TEXT,Executive TEXT,FromDate TEXT,ToDate TEXT,TargetPoints TEXT,TotalPoints TEXT,TargetAcheived TEXT,TeamAcheived TEXT,TeamAcheivementQuantity TEXT,TeamTargetQuantity TEXT,IsManager TEXT,Percentage TEXT,Bucket TEXT);');
                }).then(() => {

                }).catch(error => {

                });


                db.transaction((tx) => {
                  //id,Current_date_time,entity_type,entity_id,latitude,longitude,total_amount,collection_type,user_id              
                  tx.executeSql('CREATE TABLE TABLE_TEMP_OrderMaster (id TEXT,Current_date_time TEXT,entity_type TEXT,entity_id TEXT,latitude TEXT,longitude TEXT,total_amount TEXT,collection_type TEXT,user_id TEXT,selected_flag TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE TABLE_TEMP_ImagesDetails(id INTEGER PRIMARY KEY AUTOINCREMENT,outlet_id TEXT,latitude TEXT,longitude TEXT,image_date_time TEXT,image_name TEXT,user_id TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE OrderMaster(id TEXT ,Current_date_time TEXT,entity_type TEXT,entity_id TEXT,latitude TEXT,longitude TEXT,total_amount TEXT,from_date TEXT,to_date TEXT,collection_type TEXT,user_id TEXT,remark TEXT,selected_flag TEXT,sync_flag TEXT,check_date TEXT,DefaultDistributorId TEXT,ExpectedDeliveryDate TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE OrderDetails(id INTEGER PRIMARY KEY AUTOINCREMENT,order_id TEXT,item_id TEXT,item_Name TEXT,quantity_one TEXT,quantity_two TEXT,small_Unit   TEXT,large_Unit  TEXT,rate TEXT ,Amount TEXT,selected_flag TEXT,sync_flag TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE uses_log(id INTEGER PRIMARY KEY AUTOINCREMENT,menu_keys TEXT,uses_datetime TEXT,is_sync TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE ImagesDetails(id INTEGER PRIMARY KEY AUTOINCREMENT,order_id TEXT,image_date_time TEXT,image_name TEXT,Path TEXT,is_sync TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE TABLE_TEMP_ORDER_DETAILS(id INTEGER PRIMARY KEY AUTOINCREMENT,order_id TEXT,item_id TEXT,item_Name TEXT,quantity_one TEXT,quantity_two TEXT,small_Unit  TEXT,large_Unit  TEXT,from_date TEXT,to_date TEXT,rate TEXT ,bpc TEXT ,Amount TEXT,selected_flag TEXT,bottleQty TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE newpartyoutlet(id INTEGER PRIMARY KEY AUTOINCREMENT,OrderID TEXT,BitID TEXT,OutletName TEXT,ContactNo TEXT,OwnersName TEXT,OutletAddress TEXT,Remark TEXT,Latitude TEXT ,Longitude TEXT ,Is_Sync TEXT,AddedDate TEXT,ShopType TEXT,RegistrationNo TEXT,ShopId TEXT ,ContactPerson TEXT ,ShopArea TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE newpartyImageoutlet(id INTEGER PRIMARY KEY AUTOINCREMENT,OrderID TEXT,Is_Sync TEXT,ImageName TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE uommaster(id INTEGER PRIMARY KEY AUTOINCREMENT, UOMDescription TEXT, ConvToBase TEXT, Formula TEXT, UOMKey TEXT, IsQuantity TEXT, ConversionFormula TEXT,ConversionUomFormula TEXT);');
                }).then(() => {

                }).catch(error => {

                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE TABLE_DISCOUNT(id INTEGER PRIMARY KEY AUTOINCREMENT, OrderID TEXT, DiscountType TEXT, DiscountAmount TEXT,discountadd TEXT, discountless TEXT,RNP TEXT,OnAmount TEXT,OnAmountSmallUnit TEXT,Rate TEXT,BookCode TEXT,OrderedItemID TEXT,BrandCode TEXT,ItemCode TEXT,syncFlag TEXT)');
                }).then(() => {
                }).catch(error => {
                });

                ////////////////////////////////////
                //CREATE TABLE OutletAssetInformation(id INTEGER PRIMARY KEY AUTOINCREMENT,CustomerID TEXT, AssetID TEXT, AssetQRcode TEXT,AssetInformation TEXT,ScanFlag TEXT);
                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE OutletAssetInformation(id INTEGER PRIMARY KEY AUTOINCREMENT,CustomerID TEXT, AssetID TEXT, AssetQRcode TEXT,AssetInformation TEXT,ScanFlag TEXT);');
                }).then(() => {
                }).catch(error => {
                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE assetTypeClassificationList(id INTEGER PRIMARY KEY AUTOINCREMENT, AssetTypeID TEXT, AssetName TEXT, ClassificationList TEXT);');
                }).then(() => {
                }).catch(error => {
                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE AssetPlacementVerification(id INTEGER PRIMARY KEY AUTOINCREMENT, OrderID TEXT, AssetID TEXT, QRCode TEXT, ScanStatus TEXT, AssetInformation TEXT,Remark TEXT,Condition TEXT,AuditDate Text);');
                }).then(() => {
                }).catch(error => {
                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE UsersCustomers(id INTEGER PRIMARY KEY AUTOINCREMENT,UserID TEXT,CustomerID TEXT);');
                }).then(() => {
                }).catch(error => {
                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE UsersItems(id INTEGER PRIMARY KEY AUTOINCREMENT,UserID TEXT, ItemID TEXT);');
                }).then(() => {
                }).catch(error => {
                });

                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE Discounts(ID TEXT,OrderID TEXT,DiscountType TEXT, DiscountAmount TEXT,discountadd TEXT, discountless TEXT,RNP TEXT,OnAmount TEXT,OnAmountSmallUnit TEXT,Rate TEXT,BookCode TEXT,OrderedItemID TEXT,BrandCode TEXT,ItemCode TEXT;');
                }).then(() => {
                }).catch(error => {
                });


                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE SurveyMaster(ID TEXT PRIMARY KEY, SurveyName TEXT,CompanyName TEXT,CustomerID TEXT, PublishedDate TEXT,TimeRequired TEXT,SurveyURL TEXT,SurveyDoneDate TEXT);');
                }).then(() => {
                }).catch(error => {
                });
                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE Resources(ID TEXT,ResourceName TEXT, ParentResourceID TEXT,URL TEXT, Descreption TEXT,FileName TEXT, SequenceNo TEXT,IsDownloadable TEXT, ResourceType TEXT,CreatedDate TEXT,LastUpdatedDate TEXT);');
                }).then(() => {
                }).catch(error => {
                });

              });
              resolve(db);
            })
            .catch(error => {

            });
        })
        .catch(error => {

        });

    });
  };
  // deleteAllTable() {
  //   this.initDB().then((db) => {
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM table_user', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM user', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM sqlite_sequence', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM PDistributor', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM Sales', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM Target', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM Pcustomer', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM DistributorContacts', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM DistributorDataStatus', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM SalesYTD', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM UserCustomerItem', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM ReportControlMaster', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM Report', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM Settings', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM AreaParentList', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM PItem', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM SIPREPORT', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM AdvanceReports', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM TABLE_TEMP_OrderMaster', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM TABLE_TEMP_ImagesDetails ', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM OrderMaster ', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM OrderDetails ', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM uses_log', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM ImagesDetails', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM TABLE_TEMP_ORDER_DETAILS ', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM newpartyoutlet ', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM newpartyImageoutlet ', []).then(([tx, results]) => { resolve(results); }); })
  //     db.transaction((tx) => { tx.executeSql('DELETE FROM newpartyImageoutlet  ', []).then(([tx, results]) => { resolve(results); }); })
  //   }).catch((err) => {

  //   });
  // }
  insertAllData1() {
    // alert("DbCalled")
  }
  insertAllData(data) {
    //  this.initDB().then((db) => {
    var a = "true"
    return new Promise((resolve) => {
      // this.deleteAllTable()
      const result = data
      const abc = JSON.parse(result)
      // //console.log("Sara data",JSON.stringify(abc))

      //myObj.hasOwnProperty('key')
      if (result.length) {
        if (abc.Settings) {
          let settingsData = (abc.Settings)
          this.insertSettingData(settingsData)
        }


        if (abc.Sales) {
          //console.log("in sales insert")
          let sales = (abc.Sales)
          this.insertSalesData(sales)
        }
        if (abc.SalesYTD) {
          let salesytd = (abc.SalesYTD)
          this.insertSalesYTD(salesytd)
        }

        if (abc.ReportControlMaster) {
          let reportcontrolmaster = (abc.ReportControlMaster)
          this.insertReportControlMaster(reportcontrolmaster)
        }

        if (abc.UOMMaster) {
          let UOMMaster = (abc.UOMMaster)
          this.insertuommaster(UOMMaster)
        }

        // if (abc.CollectionType) {
        //   let CollectionType = (abc.CollectionType)
        //   this.insertCollectionType(CollectionType)
        // }

        // if (abc.Discount) {
        //   let Discount = (abc.Discount)
        //   this.insertDiscount(Discount)
        // }

        if (abc.AssetTypeClassificationList) {
          let outletAssetTypeClassificationList = (abc.AssetTypeClassificationList)
          this.insertoutletAssetTypeClassificationList(outletAssetTypeClassificationList)
        }

        if (abc.DistributorDataStatus) {
          let distributordataStatus = (abc.DistributorDataStatus)
          this.insertDistributorDataStatus(distributordataStatus)
        }


        if (abc.OutletAssetInformation) {
          let outletAssetInformation = (abc.OutletAssetInformation)
          this.insertoutletAssetInformation(outletAssetInformation)
        }

        if (abc.SurveyMaster) {
          let SurveyMaster = (abc.SurveyMaster)
          this.insertSurveyMaster(SurveyMaster)
        }

        if (abc.UsersCustomers) {
          let UsersCustomers = (abc.UsersCustomers)
          this.insertUsersCustomers(UsersCustomers)
        }

        if (abc.Report) {
          let report = (abc.Report)
          this.insertReport(report)
        }
        if (abc.AdvancedReport) {
          let advancereports = (abc.AdvancedReport)
          this.insertAdvanceReports(advancereports)
        }


        if (abc.PCustomer) {

          let pcustomerData = (abc.PCustomer)
          this.insertPcustomer(pcustomerData)
        }
        if (abc.PDistributor) {
          let pdistributorData = (abc.PDistributor)
          this.insertPDistributor(pdistributorData)
        }
        if (abc.PItem) {
          let pitemData = (abc.PItem)
          this.insertPItem(pitemData)
        }

        if (abc.UsersItems) {
          let UsersItems = (abc.UsersItems)
          this.insertUsersItems(UsersItems)
        }

        if (abc.Target) {
          let TargetD = (abc.Target)
          this.insertTargetData(TargetD)
        }
//if for mjp
        if (abc.MJPMaster) {
          let MJPMaster_data = (abc.MJPMaster)
          this.insertMJPMaster(MJPMaster_data)
        }

        if (abc.MJPMasterDetails) {
          let MJPMasterDetails_data = (abc.MJPMasterDetails)
          this.insertMJPMasterDetails(MJPMasterDetails_data)
        }

        
        if (abc.SubGroupMaster) {
          let SubGroupMaster_data = (abc.SubGroupMaster)
          this.insertSubGroupMaster(SubGroupMaster_data)
        }



        resolve(a);

      }
    })
  }

  // closeDatabase(db) {

  //   if (db) {  
  //     db.close()
  //       .then(status => {
  //       isOpen='false'
  //       })
  //       .catch(error => {
  //         //  this.errorCB(error);
  //       });
  //   } else {

  //   }
  // };


  insertUserData(userDAta) {
    if (isOpen == 'true') {
      db1.transaction((tx) => {
        var len = userDAta.length;
        var count = 0;

        for (var i = 0; i < userDAta.length; i++) {
          var a = tx.executeSql(
            `insert into user(UserID , UserName , Password , IMEINO ,AreaID ,LoginID )
              VALUES (?,?,?,?,?,?)`,
            [
              userDAta[i].UserID,
              userDAta[i].Name,
              userDAta[i].Password,
              userDAta[i].DeviceID,
              userDAta[i].AreaID,
              userDAta[i].LoginID
            ],
            (tx, results) => {

              AsyncStorage.setItem('userIds', JSON.stringify(userDAta[0].UserID));

              AsyncStorage.setItem('username', JSON.stringify(userDAta[0].Name));


            },
            (err) => { }
          );
        }
      })
    }
  }

  insertSettingData(settingData) {
    if (settingData.length) {
      db1.transaction((tx) => {
        var len = settingData.length;
        var count = 0;
        for (var item of settingData) {
          tx.executeSql(
            `insert into Settings( Key , Value )
                          VALUES (?,?)`,
            [
              item.Key,
              item.Value,
            ],
            (tx, results) => {
              // AsyncStorage.setItem('userIds', JSON.stringify('52362'));

              // AsyncStorage.setItem('username', JSON.stringify(userDAta[0].Name));


            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {

        // }).catch((err) => {

        // });
      }).catch((err) => {

      });
    }
  }

  insertPDistributor(PDistributorData) {
    // this.initDB().then((db) => {
    db1.transaction((tx) => {
      var len = PDistributorData.length;
      var count = 0;

      for (var item of PDistributorData) {
        tx.executeSql(
          `insert into PDistributor(DistributorID ,Distributor ,DistributorAlias ,
              ERPCode ,AREAID ,AREA ,BRANCHID ,BRANCH ,DISTRIBUTORGROUPID ,
              DISTRIBUTORGROUP ,IsSelectedDistributor )
                                    VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
          [
            item.DistributorId,
            item.Distributor,
            item.DistributorAlias,
            item.ERPCode,
            item.AREAID,
            item.AREA,
            item.BRANCHID,
            item.BRANCH,
            item.DISTRIBUTORGROUPID,
            item.DISTRIBUTORGROUP,
            ""
          ],
          (tx, results) => {

          },
          (err) => { console.error("error=", err); }
        );
      }
    }).then((result) => {

    }).catch((err) => {

    });
    // }).catch((err) => {

    // });
  }

  insertSalesData(SalesData) {
    if (SalesData.length) {
      db1.transaction((tx) => {
        var len = SalesData.length;
        var count = 0;
        for (var item of SalesData) {
          tx.executeSql(
            `insert into Sales(UserID ,DistributorID ,CustomerID ,Month ,ItemID ,Quantity ,Value  )
                                              VALUES (?,?,?,?,?,?,?)`,
            [
              

              item.UserID, item.DistributorID, item.CustomerID, item.Month, item.ItemID, item.Quantity, item.Value
            ],
            (tx, results) => {

            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {

      }).catch((err) => {

      });
      // }).catch((err) => {

      // });
    }
  }

  insertTargetData(TargetData) {

    db1.transaction((tx) => {
      var len = TargetData.length;
      var count = 0;
      for (var item of TargetData) {
        tx.executeSql(
          `insert into Target(UserID ,TDate ,ClassificationID ,ClassificationName ,Target  )
                                                        VALUES (?,?,?,?,?)`,
          [
            item.UserID, item.TDate, item.ClassificationID, item.ClassificationName, item.Target],
          (tx, results) => {

          },
          (err) => { console.error("error=", err); }
        );
      }
    }).then((result) => {

    }).catch((err) => {

    });

  }

  insertPcustomer(PcustomerData) {

    //  this.initDB().then((db) => {
    db1.transaction((tx) => {
      var len = PcustomerData.length;
      var count = 0;

      for (var item of PcustomerData) {
        tx.executeSql(
          `insert into Pcustomer(CustomerId ,Party ,LicenceNo ,IsActive ,ERPCode ,RouteID ,RouteName ,AREAID ,AREA 
              ,BRANCHID ,BRANCH ,CUSTOMERCLASSID ,CUSTOMERCLASS ,CUSTOMERCLASS2ID ,CUSTOMERCLASS2 ,CUSTOMERGROUPID ,
              CUSTOMERGROUP ,CUSTOMERSEGMENTID ,CUSTOMERSEGMENT ,CUSTOMERSUBSEGMENTID , CUSTOMERSUBSEGMENT ,
              LICENCETYPEID ,LICENCETYPE ,OCTROIZONEID ,OCTROIZONE,Outlet_Info,DefaultDistributorId)
                                                                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            item.CustomerId,
            item.Party,
            item.LicenceNo,
            item.IsActive,
            item.ERPCode,
            item.RouteID,
            item.RouteName,
            item.AREAID,
            item.AREA,
            item.BRANCHID,
            item.BRANCH,
            item.CUSTOMERCLASSID,
            item.CUSTOMERCLASS,
            item.CUSTOMERCLASS2ID, item.CUSTOMERCLASS2, item.CUSTOMERGROUPID,
            item.CUSTOMERGROUP, item.CUSTOMERSEGMENTID, item.CUSTOMERSEGMENT, item.CUSTOMERSUBSEGMENTID, item.CUSTOMERSUBSEGMENT,
            item.LICENCETYPEID, item.LICENCETYPE, item.OCTROIZONEID, item.OCTROIZONE, item.OUTLETINFO, item.DefaultDistributorId
          ],
          (tx, results) => {

          },
          (err) => { console.error("error=", err); }
        );
      }
    }).then((result) => {
      //  
    }).catch((err) => {
      //console.log(err);
    });
    // }).catch((err) => {
    //   //console.log(err);
    // });
  }

  insertDistributorContacts(DistributorContactsData) {

    //  this.initDB().then((db) => {
    db1.transaction((tx) => {
      var len = DistributorContactsData.length;
      var count = 0;

      for (var item of DistributorContactsData) {
        tx.executeSql(
          `insert into DistributorContacts(DistributorID ,SequenceNo ,Contacatperson ,ContactNumber )
                                                                  VALUES (?,?,?,?)`,
          [
            item.DistributorID, item.SequenceNo, item.Contacatperson, item.ContactNumber
          ],
          (tx, results) => {

          },
          (err) => { console.error("error=", err); }
        );
      }
    }).then((result) => {

    }).catch((err) => {
      //console.log(err);
    });

  }
  insertDistributorDataStatus(DistributorDataStatusData) {

    //  this.initDB().then((db) => {
    db1.transaction((tx) => {
      var len = DistributorDataStatusData.length;
      var count = 0;

      for (var item of DistributorDataStatusData) {
        tx.executeSql(
          `insert into DistributorDataStatus(Branch , DistributorID , Area , Day7 , Day6 ,Day5 , Day4 , Day3 , Day2 , Day1 , LastUploadDate , LastInvoiceDate )
                                                                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            item.Branch, item.DistributorID, item.Area, item.Day7, item.Day6, item.Day5, item.Day4, item.Day3, item.Day2, item.Day1, item.LastUploadDate, item.LastInvoiceDate
          ],
          (tx, results) => {

          },
          (err) => { console.error("error=", err); }
        );
      }
    }).then((result) => {
      //
    }).catch((err) => {
      //console.log(err);
    });
    // }).catch((err) => {
    //   //console.log(err);
    // });
  }
  insertSalesYTD(SalesYTDData) {
    ////console.log("settingDAta", SalesYTDData)
    if (SalesYTDData) {
      db1.transaction((tx) => {
        var len = SalesYTDData.length;
        var count = 0;
        for (var item of SalesYTDData) {
          tx.executeSql(
            `insert into SalesYTD(UserID , DistributorID , CustomerID , ItemID , Quantity , Value  )
                                                                  VALUES (?,?,?,?,?,?)`,
            [
              // "UserID": 52362,
              // "DistributorID": 144,
              // "CustomerID": 14990,
              // "ItemID": 151,
              // "Quantity": 12.00,
              // "Value": 1.00

              item.UserID, item.DistributorID, item.CustomerID, item.ItemID, item.Quantity, item.Value
            ],
            (tx, results) => {

            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {
        //  
      }).catch((err) => {
        //console.log(err);
      });
    }
  }

  insertUserCustomerItem(UserCustomerItemData) {
    if (UserCustomerItemData.length) {
      db1.transaction((tx) => {
        var len = UserCustomerItemData.length;
        var count = 0;

        for (var item of UserCustomerItemData) {
          tx.executeSql(
            `insert into UserCustomerItem(UserID , CustomerID , ItemID  )
                                                                  VALUES (?,?,?)`,
            [
              item.UserID, item.CustomerID, item.ItemID
            ],
            (tx, results) => {

            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {

      }).catch((err) => {
        //console.log(err);
      });

    }
  }

  insertReportControlMaster(ReportControlMasterData) {
    if (ReportControlMasterData.length) {
      db1.transaction((tx) => {
        var len = ReportControlMasterData.length;
        var count = 0;

        for (var item of ReportControlMasterData) {
          tx.executeSql(
            `insert into ReportControlMaster(ControlName , ControlId , ReferenceColumn )
                                                                  VALUES (?,?,?)`,
            [
              item.ControlName, item.ControlId, item.ReferenceColumn
            ],
            (tx, results) => {

            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {
        //  
      }).catch((err) => {
        //console.log(err);
      });
    }
  }

  insertReport(ReportData) {
    if (ReportData.length) {
      db1.transaction((tx) => {
        var len = ReportData.length;
        var count = 0;

        for (var item of ReportData) {
          tx.executeSql(
            `insert into Report(MenuKey , Classification , ComboClassification ,LabelName ,IsActive)
                                                                  VALUES (?,?,?,?,?)`,
            [
              item.MenuKey, item.Classification, item.ComboClassification, item.LabelName, item.IsActive
            ],
            (tx, results) => {

            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {
        //
      }).catch((err) => {
        //console.log(err);
      });
    }
  }


  insertAreaParentList(AreaParentListData) {
    if (AreaParentListData.length) {
      db1.transaction((tx) => {
        var len = AreaParentListData.length;
        var count = 0;
        for (var item of AreaParentListData) {
          tx.executeSql(
            `insert into AreaParentList(Areaid , Area ,AreaParentId )
                                                                  VALUES (?,?,?)`,
            [
              item.Areaid, item.Area, item.AreaParentId
            ],
            (tx, results) => {

            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {

      }).catch((err) => {
        //console.log(err);
      });
    }
  }


  insertPItem(PItemData) {
    if (PItemData.length) {
      db1.transaction((tx) => {
        var len = PItemData.length;
        var count = 0;

        for (var item of PItemData) {
          tx.executeSql(
            `insert into PItem(ItemId , Item , ItemAlias , BPC , BPC1 , BPC2 ,ErpCode , Volume , ReportingQuantity , 
              MRP , PTR , BRANDID , BRAND , BRANDALIAS , DIVISIONID , DIVISION , DIVISIONALIAS , FLAVOURID , FLAVOUR , 
              FLAVOURALIAS ,ITEMCLASSID , ITEMCLASS , ITEMCLASSALIAS , ITEMGROUPID , ITEMGROUP , ITEMGROUPALIAS ,
               ITEMSIZEID  , ITEMSIZE , ITEMSIZEALIAS , ITEMSUBGROUPID , ITEMSUBGROUP , ITEMSUBGROUPALIAS ,
               ITEMTYPEID, ITEMTYPE , ITEMTYPEALIAS , SIZESEQUENCE , ITEMSIZESEQUENCE  ,
                ITEMSIZEALIASSEQUENCE,ITEMSEQUENCE , ITEMALIASSEQUENCE 
              , BRANDSEQUENCE , BRANDALIASSEQUENCE ,Focus ,IsSelectedBrand ,IsSelectedBrandProduct,bottleQut )
                                                                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
              item.ItemId, item.Item, item.ItemAlias, item.BPC, item.BPC1, item.BPC2, item.ErpCode, item.Volume,
              item.ReportingQuantity,
              item.MRP, item.PTR, item.BRANDID, item.BRAND, item.BRANDALIAS, item.DIVISIONID, item.DIVISION, item.DIVISIONALIAS,
              item.FLAVOURID, item.FLAVOUR,
              item.FLAVOURALIAS, item.ITEMCLASSID, item.ITEMCLASS, item.ITEMCLASSALIAS, item.ITEMGROUPID, item.ITEMGROUP,
              item.ITEMGROUPALIAS,
              item.ITEMSIZEID, item.ITEMSIZE, item.ITEMSIZEALIAS, item.ITEMSUBGROUPID, item.ITEMSUBGROUP, item.ITEMSUBGROUPALIAS,
              item.ITEMTYPEID, item.ITEMTYPE, item.ITEMTYPEALIAS, item.SIZESEQUENCE, item.ITEMSIZESEQUENCE,
              item.ITEMSIZEALIASSEQUENCE, item.ITEMSEQUENCE, item.ITEMALIASSEQUENCE
              , item.BRANDSEQUENCE, item.BRANDALIASSEQUENCE, item.ISFOCUS,'','','0'
            ],
            (tx, results) => {

            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {
        //
      }).catch((err) => {
        //console.log(err);
      });
    }
  }

  insertSIPREPORT(SIPREPORTData) {

    if (SIPREPORTData.length) {
      db1.transaction((tx) => {
        var len = SIPREPORTData.length;
        var count = 0;

        for (var item of SIPREPORTData) {
          tx.executeSql(
            `insert into SIPREPORT(UserId ,ReportMonth ,SrNo ,AEID ,AMID ,AM ,Executive ,FromDate ,ToDate ,
              TargetPoints ,TotalPoints ,TargetAcheived ,TeamAcheived ,TeamAcheivementQuantity ,TeamTargetQuantity ,
              IsManager ,Percentage ,Bucket   )
                                                                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
              item.UserId, item.ReportMonth, item.SrNo, item.AEID, item.AMID, item.AM, item.Executive, item.FromDate
              , item.ToDate,
              item.TargetPoints, item.TotalPoints, item.TargetAcheived, item.TeamAcheived, item.TeamAcheivementQuantity
              , item.TeamTargetQuantity,
              item.IsManager, item.Percentage, item.Bucket
            ],
            (tx, results) => {

            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {

      }).catch((err) => {
        //console.log(err);
      });
    }
  }
  insertAdvanceReports(AdvanceReportsData) {
    if (AdvanceReportsData.length) {
      db1.transaction((tx) => {
        var len = AdvanceReportsData.length;
        var count = 0;

        for (var item of AdvanceReportsData) {
          tx.executeSql(
            `insert into AdvanceReports(AID ,ReportTitle,ReportType ,ReferenceType ,IsActive )
                                                                  VALUES (?,?,?,?,?)`,
            [
              item.ID, item.ReportTitle, item.ReportType, item.ReferenceType, item.IsActive
            ],
            (tx, results) => {

            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });
    }
  }

  insertTABLE_TEMP_OrderMaster(id, Current_date_time, entity_type, entity_id, latitude,
    longitude, total_amount, collection_type, user_id, selected_flag) {
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(
          `insert into TABLE_TEMP_OrderMaster(id,Current_date_time,entity_type,entity_id,latitude,
              longitude ,total_amount ,collection_type ,user_id,selected_flag   )
                                                                  VALUES (?,?,?,?,?,?,?,?,?,?)`,
          [
            id, Current_date_time, entity_type, entity_id, latitude,
            longitude, total_amount, collection_type, user_id, selected_flag
          ],
          (tx, results) => {
            resolve(results)

          },
          (err) => { console.error("error=", err); }
        );

      }).then((result) => {
        //  
      }).catch((err) => {
        //console.log(err);
      });
    }).catch((err) => {
      //console.log(err);
    });
  }



  insertTABLE_DISCOUNT(OrderID, DiscountType, DiscountAmount, discountadd, discountless,
    RNP, OnAmount, OnAmountSmallUnit, Rate, BookCode, OrderedItemID, BrandCode, ItemCode, syncFlag) {
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(
          `insert into TABLE_DISCOUNT(OrderID, DiscountType, DiscountAmount, discountadd , discountless , 
              RNP ,OnAmount ,OnAmountSmallUnit ,Rate ,BookCode ,OrderedItemID ,BrandCode ,ItemCode,syncFlag   )
                                                                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            OrderID, DiscountType, DiscountAmount, discountadd, discountless,
            RNP, OnAmount, OnAmountSmallUnit, Rate, BookCode, OrderedItemID, BrandCode, ItemCode, syncFlag
          ],
          (tx, results) => {
            resolve(results)

          },
          (err) => { console.error("error=", err); }
        );

      }).then((result) => {
        //  
      }).catch((err) => {
        //console.log(err);
      });
    }).catch((err) => {
      //console.log(err);
    });
  }

  updateTABLE_DISCOUNT(OrderID, DiscountType, DiscountAmount, discountadd, discountless,
    RNP, OnAmount, OnAmountSmallUnit, Rate, BookCode, OrderedItemID, BrandCode, ItemCode) {
    return new Promise((resolve) => {
      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql('UPDATE TABLE_DISCOUNT SET  DiscountType = ?,DiscountAmount = ? ,discountadd = ?,discountless = ?,RNP = ?,OnAmount = ?, OnAmountSmallUnit=?,Rate =?,BookCode=? ,BrandCode=? ,ItemCode= ? where OrderID = ? and OrderedItemID = ? ', [DiscountType, DiscountAmount, discountadd, discountless,
          RNP, OnAmount, OnAmountSmallUnit, Rate, BookCode, BrandCode, ItemCode, OrderID, OrderedItemID]).then(([tx, results]) => {
            resolve(results.length);
          });
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });
      // }).catch((err) => {
      //   //console.log(err);
      // });
    });
  }



  insertTABLE_TEMP_ImagesDetails(TABLE_TEMP_ImagesDetailsData) {

    db1.transaction((tx) => {
      var len = TABLE_TEMP_ImagesDetailsData.length;
      var count = 0;

      for (var item of TABLE_TEMP_ImagesDetailsData) {
        tx.executeSql(
          `insert into  TABLE_TEMP_ImagesDetails(outlet_id ,latitude ,longitude ,image_date_time ,image_name ,user_id )
                                                                  VALUES (?,?,?,?,?,?)`,
          [
            item.outlet_id, item.latitude, item.longitude, item.image_date_time, item.image_name, item.user_id
          ],
          (tx, results) => {

          },
          (err) => { console.error("error=", err); }
        );
      }
    }).then((result) => {
      //
    }).catch((err) => {
      //console.log(err);
    });

  }

  updateMasterMain(Current_date_time, entity_type, entity_id, latitude, longitude, total_amount, from_date, to_date, order_id, collection_type) {
    return new Promise((resolve) => {
      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql('UPDATE OrderMaster SET  Current_date_time = ?,entity_type = ? ,entity_id = ?,latitude = ?,longitude = ?,total_amount = ?, from_date=?,to_date = ? where id = ? and collection_type = ? ', [Current_date_time, entity_type, entity_id, latitude, longitude, total_amount, from_date, to_date, order_id, collection_type]).then(([tx, results]) => {
          resolve(results.length);
        });
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });
      // }).catch((err) => {
      //   //console.log(err);
      // });
    });
  }


  insertOrderDetails(order_id, item_id, item_Name, quantity_one, quantity_two, small_Unit
    , large_Unit, rate, Amount, selected_flag, sync_flag) {
    // alert("detail inserted to main")


    db1.transaction((tx) => {

      tx.executeSql(
        `insert into  OrderDetails(order_id,item_id,item_Name,quantity_one,quantity_two,small_Unit
                 ,large_Unit,rate ,Amount,selected_flag,sync_flag  )
                                                                  VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [
          order_id, item_id, item_Name, quantity_one, quantity_two, small_Unit
          , large_Unit, rate, Amount, selected_flag, sync_flag
        ],
        (tx, results) => {
        },
        (err) => { console.error("error=", err); }
      );

    }).then((result) => {
      // 
    }).catch((err) => {
      //console.log(err);
    });
    // }).catch((err) => {
    //   //console.log(err);
    // });
  }

  updateDetailMain(quantity_one, quantity_two, small_Unit, large_Unit, rate, Amount, order_id, item_id) {
    return new Promise((resolve) => {
      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql('UPDATE OrderDetails SET quantity_one = ?, quantity_two = ?, small_Unit = ?, large_Unit = ?,rate = ?, Amount = ? WHERE order_id = ? and item_id = ? ', [quantity_one, quantity_two, small_Unit, large_Unit, rate, Amount, order_id, item_id]).then(([tx, results]) => {
          resolve(results.length);
        });
      }).then((result) => {
        //  
      }).catch((err) => {
        //console.log(err);
      });

    });
  }




  insertuses_log(uses_logData) {
    //   this.initDB().then((db) => {
    db1.transaction((tx) => {
      var len = uses_logData.length;
      var count = 0;

      for (var item of uses_logData) {
        tx.executeSql(
          `insert into  uses_log(menu_keys,uses_datetime ,is_sync  )
                                                                  VALUES (?,?,?)`,
          [
            item.menu_keys, item.uses_datetime, item.is_sync
          ],
          (tx, results) => {

          },
          (err) => { console.error("error=", err); }
        );
      }
    }).then((result) => {
      //  
    }).catch((err) => {
      //console.log(err);
    });
  }
  insertImagesDetails(order_id, image_date_time, image_name, Path, is_sync) {

    //this.initDB().then((db) => {
    db1.transaction((tx) => {

      //  for (var item of ImagesDetailsData) {
      tx.executeSql(
        `insert into  ImagesDetails(order_id ,image_date_time ,image_name,Path,is_sync )
                                                                  VALUES (?,?,?,?,?)`,
        [
          order_id, image_date_time, image_name, Path, is_sync
        ],
        (tx, results) => {

        },
        (err) => { console.error("error=", err); }
      );

    }).then((result) => {
      //  
    }).catch((err) => {
      //console.log(err);
    });
  }
  insertTABLE_TEMP_ORDER_DETAILS(order_id, item_id, item_Name, quantity_one, quantity_two, small_Unit, large_Unit, from_date, to_date, rate, bpc, Amount, selected_flag, bottleQty) {
    alert("Order Inserted")
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(
          `insert into  TABLE_TEMP_ORDER_DETAILS(order_id,item_id,item_Name,quantity_one ,quantity_two ,
              small_Unit ,large_Unit,from_date,
              to_date ,rate  ,bpc  ,Amount ,selected_flag,bottleQty )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            order_id, item_id, item_Name, quantity_one, quantity_two, small_Unit, large_Unit, from_date, to_date, rate, bpc, Amount, selected_flag, bottleQty
          ]).then(([tx, results]) => {
            resolve(results);
          });
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });

    });
  }
  insertnewpartyoutlet(newpartyoutletData) {
    //  this.initDB().then((db) => {
    db1.transaction((tx) => {
      var len = newpartyoutletData.length;
      var count = 0;

      for (var item of newpartyoutletData) {

        tx.executeSql(
          `insert into  newpartyoutlet( OrderID,BitID,OutletName,ContactNo,OwnersName,OutletAddress,Remark,Latitude,Longitude,AddedDate)
                                                                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            item.id, item.bitid, item.outletName, item.contactNumber, item.ownersName, item.outletAddress, item.remark,
            item.Latitude, item.Longitude, item.addedon
          ],
          (tx, results) => {

          },
          (err) => { console.error("error=", err); }
        );
      }
    }).then((result) => {
      //
    }).catch((err) => {
      //console.log(err);
    });
  }
  insertnewpartyImageoutlet(newpartyImageoutletData) {
    // this.initDB().then((db) => {
    db1.transaction((tx) => {
      var len = newpartyImageoutletData.length;
      var count = 0;

      for (var item of newpartyImageoutletData) {
        tx.executeSql(
          `insert into  newpartyImageoutlet(OrderID,Is_Sync,ImageName  )
                                                                  VALUES (?,?,?)`,
          [
            item.OrderID, item.Is_Sync, item.ImageName
          ],
          (tx, results) => {

          },
          (err) => { console.error("error=", err); }
        );
      }
    }).then((result) => {

    }).catch((err) => {
      //console.log(err);
    });

  }
  insertuommaster(uommasterData) {
    if (uommasterData.length) {
      db1.transaction((tx) => {
        var len = uommasterData.length;
        var count = 0;

        for (var item of uommasterData) {
          tx.executeSql(
            `insert into  uommaster(UOMDescription, ConvToBase , Formula , UOMKey , IsQuantity,
              ConversionFormula ,ConversionUomFormula  )
              VALUES (?,?,?,?,?,?,?)`,
            [
              item.UOMDescription, item.ConvToBase, item.Formula, item.UOMKey, item.IsQuantity,
              item.ConversionFormula, item.ConversionUomFormula
            ],
            (tx, results) => {

            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {
        //
      }).catch((err) => {
        //console.log(err);
      });
    }
  }


  insertoutletAssetInformation(outletAssetInformationData) {
    if (outletAssetInformationData.length) {
      db1.transaction((tx) => {
        var len = outletAssetInformationData.length;
        var count = 0;

        for (var item of outletAssetInformationData) {
          tx.executeSql(
            `insert into outletAssetInformation( CustomerID , AssetID , AssetQRcode ,AssetInformation,ScanFlag)
                                                                    VALUES (?,?,?,?,?)`,
            [
              item.CustomerID, item.AssetID, item.AssetQRcode, item.AssetInformation, ""
            ],
            (tx, results) => {
            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });
    }
  }


  insertSurveyMaster(SurveyMaster) {
    if (SurveyMaster.length) {
      db1.transaction((tx) => {
        var len = SurveyMaster.length;
        var count = 0;

        for (var item of SurveyMaster) {
          // "ID": 2,
          // "SurveyName": "Outlet Survey - IMFL",
          // "CompanyName": "SAPL",
          // "CustomerID": null,
          // "PublishedDate": "2020-05-01T00:00:00",
          // "TimeRequired": 10,
          // "SurveyURL": "https://zylem.in/cpa/OutletSurveyDetails.aspx/EvaluationMasterID=1?userid=&password=&lat=&lon=",
          // "SurveyDoneDate": null
          tx.executeSql(
            `insert into SurveyMaster( ID,SurveyName,CompanyName,CustomerID,PublishedDate,TimeRequired,SurveyURL,SurveyDoneDate)
                                                                     VALUES (?,?,?,?,?,?,?,?)`,
            [
              item.ID, item.SurveyName, item.CompanyName, item.CustomerID, item.PublishedDate, item.TimeRequired, item.SurveyURL, item.SurveyDoneDate
            ],
            (tx, results) => {

            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });
    }
  }


  insertoutletAssetTypeClassificationList(outletAssetTypeClassificationList) {
    if (outletAssetTypeClassificationList.data) {
      db1.transaction((tx) => {
        var len = outletAssetTypeClassificationList.length;
        var count = 0;

        for (var item of outletAssetTypeClassificationList) {

          tx.executeSql(
            `insert into  assetTypeClassificationList( AssetTypeID , AssetName , ClassificationList)
                                                                  VALUES (?,?,?)`,
            [
              item.AssetTypeID, item.AssetName, item.ClassificationList
            ],
            (tx, results) => {
              ////console.log("rjlen1",results.rows.length)
            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {
        //  
      }).catch((err) => {
        //console.log(err);
      });
    }
  }
  //insertresources

  insertresources(Resources) {
    if (Resources.length > 0) {
      //this.initDB().then((db) => {
      db1.transaction((tx) => {
        var len = Resources.length;
        var count = 0;

        for (var item of Resources) {

          tx.executeSql(
            `insert into  Resources( ID ,ResourceName , ParentResourceID ,URL ,Descreption ,FileName , SequenceNo ,IsDownloadable , ResourceType ,CreatedDate ,LastUpdatedDate )
                                                                VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [
              item.ID, item.ResourceName, item.ParentResourceID, item.URL, item.Descreption, item.FileName, item.SequenceNo, item.IsDownloadable, item.ResourceType, item.CreatedDate, item.LastUpdatedDate
            ],
            (tx, results) => {

            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });

    }
  }


  insertUsersCustomers(UsersCustomers) {
    if (UsersCustomers.length > 0) {
      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        var len = UsersCustomers.length;
        var count = 0;

        for (var item of UsersCustomers) {

          tx.executeSql(
            `insert into UsersCustomers( UserID ,CustomerID )
                                                                VALUES (?,?)`,
            [
              // "UserID": 52362,
              // "CustomerID": 26754
              item.UserID, item.CustomerID
            ],
            (tx, results) => {

            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });
      // }).catch((err) => {
      //   //console.log(err);
      // });
    }
  }


  insertCollectionType(CollectionType) {
    if (CollectionType.length) {
      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        var len = CollectionType.length;
        var count = 0;

        for (var item of CollectionType) {

          tx.executeSql(
            `insert into CollectionTypes(Id,Type )
                                                                VALUES (?,?)`,
            [
              item.Id, item.Type
            ],
            (tx, results) => {
              // //console.log("rjlen",results.length)
            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });
      // }).catch((err) => {
      //   //console.log(err);
      // });
    }
  }


  insertDiscount(CollectionType) {

    // this.initDB().then((db) => {
    db1.transaction((tx) => {
      var len = CollectionType.length;
      var count = 0;
      for (var item of CollectionType) {
        tx.executeSql(
          `insert into Discounts(ID,OrderID, DiscountType, DiscountAmount, discountadd ,discountless,RNP ,OnAmount ,OnAmountSmallUnit ,Rate ,BookCode ,OrderedItemID,BrandCode,ItemCode )
                                                                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            // "ID": 1,
            // "OrderID": 1,
            // "DiscountType": "p",
            // "DiscountAmount": 10.00,
            // "DiscountAdd": 0.5,
            // "DiscountLess": 0.0,
            // "RNP": "",
            // "OnAmount": 100.00,
            // "OnAmountSmallUnit": 15.00,
            // "Rate": 15.00,
            // "BookCode": "bookcode",
            // "OrderedItemID": 8,
            // "BrandCode": "Brand1",
            // "ItemCode": "Item1"

            item.ID, item.OrderID, item.DiscountType, item.DiscountAmount, item.DiscountAdd, item.DiscountLess,
            item.RNP, item.OnAmount, item.OnAmountSmallUnit, item.Rate, item.BookCode, item.OrderedItemID,
            item.BrandCode, item.ItemCode
          ],
          (tx, results) => {
            ////console.log("rjlen",results.length)
          },
          (err) => { console.error("error=", err); }
        );
      }
    }).then((result) => {

    }).catch((err) => {
      //console.log(err);
    });
  }

  insertUsersItems(UsersItems) {
    if (UsersItems.length) {
      //this.initDB().then((db) => {
      db1.transaction((tx) => {
        var len = UsersItems.length;
        var count = 0;

        for (var item of UsersItems) {

          tx.executeSql(
            `insert into  UsersItems( UserID,ItemID)
                                                                VALUES (?,?)`,
            [
              // "UserID": 52362,
              // "ItemID": 464
              item.UserID, item.ItemID
            ],
            (tx, results) => {
              // //console.log("rjlen",results.length)

            },
            (err) => { console.error("error=", err); }
          );
        }
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });
      // }).catch((err) => {
      //   //console.log(err);
      // });
    }
  }

//mjp insert data
insertMJPMaster(MJPMaster_data){
  if (MJPMaster_data.length) {
    //this.initDB().then((db) => {
    db1.transaction((tx) => {
      var len = MJPMaster_data.length;
      var count = 0;

      for (var item of MJPMaster_data) {

        tx.executeSql(
          `insert into  MJPMaster( ID, ExecutiveId, MonthYear)
                                                              VALUES (?,?,?)`,
          [
            // "UserID": 52362,
            // "ItemID": 464
            item.ID, item.ExecutiveId,item.MonthYear
          ],
          (tx, results) => {
            // //console.log("rjlen",results.length)

          },
          (err) => { console.error("error=", err); }
        );
      }
    }).then((result) => {
      // 
    }).catch((err) => {
      //console.log(err);
    });
    // }).catch((err) => {
    //   //console.log(err);
    // });
  }
}


insertMJPMasterDetails(MJPMasterDetails_data){
  if (MJPMasterDetails_data.length) {
    //this.initDB().then((db) => {
    db1.transaction((tx) => {
      var len = MJPMasterDetails_data.length;
      var count = 0;

      for (var item of MJPMasterDetails_data) {

        tx.executeSql(
          `insert into  MJPMasterDetails( Id, MJPMasterID, PlannedDate,EntityType,EntityTypeID,ActivityTitle,IsActivityDone)
                                                              VALUES (?,?,?,?,?,?,?)`,
          [
            // "UserID": 52362,
            // "ItemID": 464
            item.Id, item.MJPMasterID,item.PlannedDate,item.EntityType,item.EntityTypeID,item.ActivityTitle,item.IsActivityDone
          ],
          (tx, results) => {
            // //console.log("rjlen",results.length)

          },
          (err) => { console.error("error=", err); }
        );
      }
    }).then((result) => {
      // 
    }).catch((err) => {
      //console.log(err);
    });
    // }).catch((err) => {
    //   //console.log(err);
    // });
  }
}


insertSubGroupMaster(SubGroupMaster_data){
  if (SubGroupMaster_data.length) {
    //this.initDB().then((db) => {
    db1.transaction((tx) => {
      var len = SubGroupMaster_data.length;
      var count = 0;

      for (var item of SubGroupMaster_data) {

        tx.executeSql(
          `insert into  SubGroupMaster( Id, GroupId, Name)
                                                              VALUES (?,?,?)`,
          [
            // "UserID": 52362,
            // "ItemID": 464
            item.Id, item.GroupId,item.Name
          ],
          (tx, results) => {
            // //console.log("rjlen",results.length)

          },
          (err) => { console.error("error=", err); }
        );
      }
    }).then((result) => {
      // 
    }).catch((err) => {
      //console.log(err);
    });
    // }).catch((err) => {
    //   //console.log(err);
    // });
  }
}




  getAllData() {
    const products = [];
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql('SELECT * FROM Sales', [], (tx, results) => {
          //  var temp;
          //  temp=results.rows
          var temp = [];
          for (let i = 0; i < results.rows.length; i++) {
            temp.push(results.rows.item(i));

          }
          // //console.log("getAllDatalen==", temp.length);
          // //console.log("getAllDatatemp==", JSON.stringify(temp));
          resolve(temp);

        });
      })
        .then((result) => {
          //   
        }).catch((err) => {
          //console.log(err);
        });
    }).catch((err) => {
      //console.log(err);
    });

  }


  //////////////////////////////////////////////////////getDataFunctions//////////////////////////

  getUserData() {
<<<<<<< Updated upstream
    var query = 'SELECT * FROM user'
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempuser = [];
          for (let i = 0; i < results.rows.length; i++) {
            tempuser.push(results.rows.item(i));
          }

          resolve(tempuser);
        });
      })
        .then((result) => {
          // 
=======
    var query = 'SELECT Username,Password FROM user';
    return new Promise(resolve => {
      db1
        .transaction(tx => {
          tx.executeSql(query, [], (tx, results) => {
            var tempuser = [];
            for (let i = 0; i < results.rows.length; i++) {
              tempuser.push(results.rows.item(i));
            }

            resolve(tempuser);
          });
        })
        .then(result => {
          //
>>>>>>> Stashed changes
        })
        .catch((err) => {
          //console.log(err);
        });
    }).catch((err) => {
      //console.log(err);
    });
  }


  getBeatData() {
    return new Promise((resolve) => {
      const products = [];
      var query = 'Select distinct RouteID,RouteName from Pcustomer order by RouteName asc'
      //  this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempBeat = [];
          for (let i = 0; i < results.rows.length; i++) {
            tempBeat.push(results.rows.item(i));
          }

          resolve(tempBeat);
        });
      })
        .then((result) => {
          //   
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }
  getDistributorData() {
    return new Promise((resolve) => {
      const products = [];
      var query = 'Select distinct DistributorID,Distributor from PDistributor Order by Distributor asc'

      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempDistributor = [];
          for (let i = 0; i < results.rows.length; i++) {
            tempDistributor.push(results.rows.item(i));
          }

          resolve(tempDistributor);
        });
      })
        .then((result) => {
          //  
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }


  getRouteId(name) {
    return new Promise((resolve) => {
      const products = [];
      var query = "Select distinct RouteID from Pcustomer where RouteName='" + name + "'"
      //   this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempRouteId = [];
          for (let i = 0; i < results.rows.length; i++) {
            tempRouteId.push(results.rows.item(i));
          }
          var tempRoute = [];
          tempRoute = JSON.stringify(tempRouteId)
          resolve(tempRoute);
        });
      })
        .then((result) => {
          //  
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }



  getOutletArray(id) {
    const products = [];
    //  'select * from TABLE_SUBCATEGORY where id = (select id from TABLE_SUBCATEGORY where subname=?)', [title], (tx, results) => {
    var query = "select distinct CustomerId as id ,Party as party from Pcustomer where RouteID='" + id + "' union select  distinct OrderID as id ,OutletName as party from newpartyoutlet where BitID ='" + id + "' order by Party asc"
    return new Promise((resolve) => {
      //   this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempOutletArray = [];
          for (let i = 0; i < results.rows.length; i++) {
            tempOutletArray.push(results.rows.item(i));
          }
          resolve(tempOutletArray);
        });
      })
        .then((result) => {
          // 
        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }



  getOutletArrayRoute(id) {
    const products = [];
    //  'select * from TABLE_SUBCATEGORY where id = (select id from TABLE_SUBCATEGORY where subname=?)', [title], (tx, results) => {
    var query = "select distinct CustomerId as id ,Party as party,Outlet_Info as Outlet_Info from Pcustomer where RouteID='" + id + "' union select  distinct OrderID as id ,OutletName as party ,OutletAddress as Outlet_Info from newpartyoutlet where BitID ='" + id + "' order by Party asc"

    return new Promise((resolve) => {

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempOutletArray = [];
          for (let i = 0; i < results.rows.length; i++) {
            tempOutletArray.push(results.rows.item(i));
          }

          resolve(tempOutletArray);
        });
      })
        .then((result) => {
          //   
        })
        .catch((err) => {
          //console.log(err);
        });

    });


  }



  getNewArray(name) {
    return new Promise((resolve) => {
      const products = [];
      //   var query="Select distinct RouteID from Pcustomer where RouteName='"+name+"'"
      //      var query="select distinct CustomerId as id ,Party as party from Pcustomer where RouteID='"+id+"' union select  distinct OrderID as id ,OutletName as party from newpartyoutlet where BitID ='"+id+"' order by Party asc"

      var query = "select distinct CustomerId as id ,Party as party from Pcustomer where RouteID IN(Select distinct RouteID from Pcustomer where RouteName='" + name + "') union select distinct OrderID as id ,OutletName as party from newpartyoutlet where BitID IN(Select distinct RouteID from Pcustomer where RouteName='" + name + "') order by Party asc"
      // var query="select distinct CustomerId as id ,Party as party from Pcustomer where RouteID=('Select distinct RouteID from Pcustomer where RouteName='"+name+"'')union select  distinct OrderID as id ,OutletName as party from newpartyoutlet where BitID =('Select distinct RouteID from Pcustomer where RouteName='"+name+"'') order by Party asc"


      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempOutletArray = [];
          for (let i = 0; i < results.rows.length; i++) {
            tempOutletArray.push(results.rows.item(i));
          }

          resolve(tempOutletArray);
        });
      })
        .then((result) => {
          //  
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }


  getOutletInfo(id) {

    return new Promise((resolve) => {
      const products = [];
      //   var query = "select distinct CustomerId as id ,Party as Party,Outlet_Info as Outlet_Info from Pcustomer where CustomerId='" + id + "' union select  distinct OrderID as id ,OutletName as Party ,OutletAddress as Outlet_Info from newpartyoutlet where OrderID ='" + id + "' order by Party asc"
      var query = "select distinct CustomerId as id ,Party as Party,Outlet_Info as Outlet_Info , Null as Latitude,Null as Longitude,Null as RegisteredOn,Null as MobileNo,Null as Owner,Null as ShopType,Null as RegistrationNo,Null as ShopId,Null as ContactPerson,Null as ShopArea from Pcustomer where CustomerId='" + id + "' union select  distinct   OrderID as id ,OutletName as Party ,OutletAddress as Outlet_Info,Latitude as Latitude,Longitude as Longitude,AddedDate as RegisteredOn,ContactNo as MobileNo,OwnersName as Owner,ShopType as ShopType,RegistrationNo as RegistrationNo,ShopId as ShopId,ContactPerson as ContactPerson,ShopArea as ShopArea from newpartyoutlet where OrderID ='" + id + "' order by Party asc"

      //  this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOutletInfo = [];

          for (let i = 0; i < results.rows.length; i++) {
            getOutletInfo.push(results.rows.item(i));
          }

          resolve(getOutletInfo);
        });
      })
        .then((result) => {
          //
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }

  ///ShopMeetInfo
  getShopMeetInfo(id){

    return new Promise((resolve) => {
      const products = [];
      //   var query = "select distinct CustomerId as id ,Party as Party,Outlet_Info as Outlet_Info from Pcustomer where CustomerId='" + id + "' union select  distinct OrderID as id ,OutletName as Party ,OutletAddress as Outlet_Info from newpartyoutlet where OrderID ='" + id + "' order by Party asc"
      var query = "select * from Pcustomer where CustomerId='" + id + "'"

      //  this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOutletInfo = [];

          for (let i = 0; i < results.rows.length; i++) {
            getOutletInfo.push(results.rows.item(i));
          }

          resolve(getOutletInfo);
        });
      })
        .then((result) => {
          //
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }

  ///getShopCardInfo///
  getShopCardInfo(id){

    return new Promise((resolve) => {
      const products = [];
      //   var query = "select distinct CustomerId as id ,Party as Party,Outlet_Info as Outlet_Info from Pcustomer where CustomerId='" + id + "' union select  distinct OrderID as id ,OutletName as Party ,OutletAddress as Outlet_Info from newpartyoutlet where OrderID ='" + id + "' order by Party asc"
      var query = "select * from MJPMasterDetails where EntityTypeId='" + id + "'"
console.log("getShopCardInfo",query);
      //  this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOutletInfo = [];

          for (let i = 0; i < results.rows.length; i++) {
            getOutletInfo.push(results.rows.item(i));
          }

          resolve(getOutletInfo);
        });
      })
        .then((result) => {
          //
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }


  GetMJPMasterDetails(){

    return new Promise((resolve) => {
      const products = [];
      //   var query = "select distinct CustomerId as id ,Party as Party,Outlet_Info as Outlet_Info from Pcustomer where CustomerId='" + id + "' union select  distinct OrderID as id ,OutletName as Party ,OutletAddress as Outlet_Info from newpartyoutlet where OrderID ='" + id + "' order by Party asc"
      var query = "select * from MJPMasterDetails"
console.log("getShopCardInfo",query);
      //  this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOutletInfo = [];

          for (let i = 0; i < results.rows.length; i++) {
            getOutletInfo.push(results.rows.item(i));
          }

          resolve(getOutletInfo);
        });
      })
        .then((result) => {
          //
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }
  SelectDistForMeet(id){

    return new Promise((resolve) => {
      const products = [];
      //   var query = "select distinct CustomerId as id ,Party as Party,Outlet_Info as Outlet_Info from Pcustomer where CustomerId='" + id + "' union select  distinct OrderID as id ,OutletName as Party ,OutletAddress as Outlet_Info from newpartyoutlet where OrderID ='" + id + "' order by Party asc"
      var query = "select Distributor as Shop_name,AREA as location from PDistributor where DistributorID='" + id + "'"
console.log("getShopCardInfo",query);
      //  this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOutletInfo = [];

          for (let i = 0; i < results.rows.length; i++) {
            getOutletInfo.push(results.rows.item(i));
          }

          resolve(getOutletInfo);
        });
      })
        .then((result) => {
          //
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }


  SelectCustForMeet(id){

    return new Promise((resolve) => {
      const products = [];
      //   var query = "select distinct CustomerId as id ,Party as Party,Outlet_Info as Outlet_Info from Pcustomer where CustomerId='" + id + "' union select  distinct OrderID as id ,OutletName as Party ,OutletAddress as Outlet_Info from newpartyoutlet where OrderID ='" + id + "' order by Party asc"
      var query = "select Party as Shop_name,RouteName as location from Pcustomer where CustomerId='" + id + "'"
console.log("getShopCardInfo",query);
      //  this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOutletInfo = [];

          for (let i = 0; i < results.rows.length; i++) {
            getOutletInfo.push(results.rows.item(i));
          }

          resolve(getOutletInfo);
        });
      })
        .then((result) => {
          //
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }


  
  SelectSubForMeet(id){

    return new Promise((resolve) => {
      const products = [];
      //   var query = "select distinct CustomerId as id ,Party as Party,Outlet_Info as Outlet_Info from Pcustomer where CustomerId='" + id + "' union select  distinct OrderID as id ,OutletName as Party ,OutletAddress as Outlet_Info from newpartyoutlet where OrderID ='" + id + "' order by Party asc"
      var query = "select Party as Shop_name,RouteName as location from Pcustomer where CustomerId='" + id + "'"
console.log("getShopCardInfo",query);
      //  this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOutletInfo = [];

          for (let i = 0; i < results.rows.length; i++) {
            getOutletInfo.push(results.rows.item(i));
          }

          resolve(getOutletInfo);
        });
      })
        .then((result) => {
          //
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }

  InsertMeet(ID,Meeting_Id,Shop_Id,Shop_name,PlannedDate,Time,location,Remarks,IsActivityDone,Type_sync,collection_type)
{
  db1.transaction((tx) => {
     tx.executeSql(
        `insert into  MeetReport(ID,Meeting_Id,Shop_Id,Shop_name,PlannedDate,Time,location,Remarks,IsActivityDone,Type_sync,collection_type)
          VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [
          ID,Meeting_Id,Shop_Id,Shop_name,PlannedDate,Time,location,Remarks,IsActivityDone,Type_sync,collection_type
        ],
        (tx, results) => {

        },
        (err) => { console.error("error=", err); }
      );
    
  }).then((result) => {
    //
  }).catch((err) => {
    //console.log(err);
  });

}

MeetDraftDetails()
{
  var query = "select * from MeetReport"
  return new Promise((resolve) => {
    db1.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        var MeetReport = []
        for (let i = 0; i < results.rows.length; i++) {
          MeetReport.push(results.rows.item(i));
        }
        //return OrderMaster
        resolve(MeetReport);
      });
    })
      .then((result) => {

      })
      .catch((err) => {
        //console.log(err);
      });
  });  
}


UpdateDraft(Remarks,Meeting_Id) {
  return new Promise((resolve) => {
    // this.initDB().then((db) => {
    db1.transaction((tx) => {
      tx.executeSql('UPDATE MeetReport SET  Remarks = ? where Meeting_Id = ? ', [Remarks,Meeting_Id]).then(([tx, results]) => {
          resolve(results.length);
        });
    }).then((result) => {
      // 
    }).catch((err) => {
      //console.log(err);
    });
    // }).catch((err) => {
    //   //console.log(err);
    // });
  });
}


getMeetForSync() {
  //id,Current_date_time ,entity_type,entity_id ,latitude ,longitude ,total_amount ,from_date ,to_date ,collection_type ,user_id ,remark,selected_flag ,sync_flag ,check_date,DefaultDistributorId,ExpectedDeliveryDate
  var query = "select ID as ID,Type_sync as EntityType,Shop_Id as EntityID,PlannedDate as FromDate,PlannedDate as ToDate,Remarks || ' ' || location as Remark,collection_type as CollectionType from MeetReport where IsActivityDone ='0'"
  return new Promise((resolve) => {
    db1.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        var MeetReport = []
        for (let i = 0; i < results.rows.length; i++) {
          MeetReport.push(results.rows.item(i));
        }
        //return OrderMaster
        resolve(MeetReport);
      });
    })
      .then((result) => {

      })
      .catch((err) => {
        //console.log(err);
      });
  });

}


updateMeetReportSyncFlag(Meeting_id) {
  db1.transaction((tx) => {
    tx.executeSql(
      'UPDATE MeetReport  SET IsActivityDone = ? WHERE Meeting_Id = ?',
      ['1', Meeting_id],
      (tx, results) => {
        //console.log('Results', results.rowsAffected);

      });
  });
 
}
  

  getRemarks(id){

    return new Promise((resolve) => {
      const products = [];
      //   var query = "select distinct CustomerId as id ,Party as Party,Outlet_Info as Outlet_Info from Pcustomer where CustomerId='" + id + "' union select  distinct OrderID as id ,OutletName as Party ,OutletAddress as Outlet_Info from newpartyoutlet where OrderID ='" + id + "' order by Party asc"
      var query = "select Remarks as Remarks from MeetReport where Meeting_Id='"+id+"'"
console.log("getShopCardInfo",query);
      //  this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOutletInfo = [];

          for (let i = 0; i < results.rows.length; i++) {
            getOutletInfo.push(results.rows.item(i));
          }

          resolve(getOutletInfo);
        });
      })
        .then((result) => {
          //
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }

  getSearchProdect() {
    const products = [];
    var query = "select Value from Settings where Key='PRODUCTSKUSEARCHFILTER'"
    return new Promise((resolve) => {
      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempSearchProdect = [];
          for (let i = 0; i < results.rows.length; i++) {
            tempSearchProdect.push(results.rows.item(i));
          }
          //  alert(tempSearchProdect)
          //console.log("tempSearchProdect=", tempSearchProdect)
          resolve(tempSearchProdect);
        });
      })
        .then((result) => {
          // 
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }




  getPrevOrdersDayNo() {
    const products = [];
    var query = "select Value from Settings where Key='PREVIOUSDAYORDERDAYS'"
    return new Promise((resolve) => {
      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempSearchProdect = [];
          for (let i = 0; i < results.rows.length; i++) {
            tempSearchProdect.push(results.rows.item(i));
          }
          //  alert(tempSearchProdect)
          //console.log("tempSearchProdect=", tempSearchProdect)
          resolve(tempSearchProdect);
        });
      })
        .then((result) => {
          // 
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }




  getBrandSearchData(searchkey, list1, joinString) {

    //// SELECT distinct BRAND , BRANDID FROM PItem where (%@ LIKE '%%%@%%') order by %@,BRAND",joinedString,search_text,search_product
    var query = 'select distinct BRANDID,BRAND from PItem where BRAND  like "%' + searchkey + '%" order by "' + searchkey + '","' + list1 + '",' + joinString
    return new Promise((resolve) => {
      // this.initDB().then((db) => {
      //console.log("in getFilterData 3");
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempfilter = [];
          for (let i = 0; i < results.rows.length; i++) {
            tempfilter.push(results.rows.item(i));

          }
          //console.log("te=", tempfilter)
          resolve(tempfilter);

        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }


  //  SELECT distinct ITEMSEQUENCE , ItemId ,PTR , BPC  FROM PItem where BRAND LIKE '%TE%' and BRANDID = '2996' order by "T","DIVISION",DIVISION

  getSubBrandSearchData(BrandId, searchkey, list1, joinString, outlet_id) {

    const products = [];
    var query = 'select distinct ITEMSEQUENCE ,Item,bottleQut, ItemId ,PTR , BPC  ,IsSelectedBrand, IsSelectedBrandProduct from PItem where BRAND like "%' + searchkey + '%" and BRANDID = "' + BrandId + '" order by "' + searchkey + '","' + list1 + '",' + joinString

    return new Promise((resolve) => {

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempfilter = [];
          for (let i = 0; i < results.rows.length; i++) {
            tempfilter.push(results.rows.item(i));
          }
          resolve(tempfilter);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });


  }



  getOrderDataForAddEdit(outlet_id, collection_type, item_id) {


    const products = [];
    var query = ' SELECT TABLE_TEMP_ORDER_DETAILS.id,TABLE_TEMP_ORDER_DETAILS.item_id, TABLE_TEMP_ORDER_DETAILS.rate,TABLE_TEMP_ORDER_DETAILS.Amount, TABLE_TEMP_ORDER_DETAILS.quantity_one,TABLE_TEMP_ORDER_DETAILS.quantity_two,TABLE_TEMP_ORDER_DETAILS.bottleQty FROM TABLE_TEMP_ORDER_DETAILS ,TABLE_TEMP_OrderMaster where TABLE_TEMP_ORDER_DETAILS.order_id = TABLE_TEMP_OrderMaster.id and TABLE_TEMP_OrderMaster.entity_id="' + outlet_id + '" and TABLE_TEMP_OrderMaster.collection_type="' + collection_type + '" and TABLE_TEMP_ORDER_DETAILS.item_id = "' + item_id + '"'
    //console.log("query==", query)

    return new Promise((resolve) => {

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempfilter = [];
          for (let i = 0; i < results.rows.length; i++) {
            tempfilter.push(results.rows.item(i));
          }

          resolve(tempfilter);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }


  getOrderDataForAddEdit1(outlet_id, collection_type) {

    return new Promise((resolve) => {
      const products = [];
      var query = ' SELECT TABLE_TEMP_ORDER_DETAILS.id,TABLE_TEMP_ORDER_DETAILS.item_id, TABLE_TEMP_ORDER_DETAILS.rate,TABLE_TEMP_ORDER_DETAILS.Amount, TABLE_TEMP_ORDER_DETAILS.quantity_one,TABLE_TEMP_ORDER_DETAILS.quantity_two,TABLE_TEMP_ORDER_DETAILS.bottleQty FROM TABLE_TEMP_ORDER_DETAILS ,TABLE_TEMP_OrderMaster where TABLE_TEMP_ORDER_DETAILS.order_id = TABLE_TEMP_OrderMaster.id and TABLE_TEMP_OrderMaster.entity_id="' + outlet_id + '" and TABLE_TEMP_OrderMaster.collection_type="' + collection_type + '"'
      //console.log("query==", query)
      // this.initDB().then((db) => {
      // if(isOpen == 'false'){
      //   this.initDB()
      // }
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempfilter = [];
          for (let i = 0; i < results.rows.length; i++) {
            tempfilter.push(results.rows.item(i));
          }

          resolve(tempfilter);
        });
      })
        .then((result) => {
          // 
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }
  getUOMLable() {
    return new Promise((resolve) => {
      const products = [];
      var query = "select Value from Settings where Key='ORDBOOKUOMLABEL'"

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var geteditRateFlag = [];
          for (let i = 0; i < results.rows.length; i++) {
            geteditRateFlag.push(results.rows.item(i));
          }

          resolve(geteditRateFlag);
        });
      })
        .then((result) => {
          //   
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }
  geteditRateFlag() {
    return new Promise((resolve) => {
      const products = [];
      var query = "select Value from Settings where Key='EDITRATEBLANK'"

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var geteditRateFlag = [];
          for (let i = 0; i < results.rows.length; i++) {
            geteditRateFlag.push(results.rows.item(i));
          }

          resolve(geteditRateFlag);
        });
      })
        .then((result) => {
          //   
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }


  //is entityid necessary here

  //init db changed/////////
  checkIsOrderIdInDb(entity_id, collection_type, user_id) {

    const products = [];
    var query = 'SELECT id,Current_date_time,entity_type,entity_id,latitude,longitude,total_amount,collection_type,user_id FROM TABLE_TEMP_OrderMaster where entity_id = "' + entity_id + '" and collection_type  = "' + collection_type + '" and user_id = "' + user_id + '"'

    return new Promise((resolve) => {

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var len = results.rows.length;
          var checkorder = []
          for (let i = 0; i < results.rows.length; i++) {
            checkorder.push(results.rows.item(i));
          }
          // checkorder=results.rows.length
          //console.log("qcheckorder=", checkorder)
          resolve(checkorder);
        });
      })
        .then((result) => {
          //    
        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }


  getInsertedTableTempOrderMasterId(entity_id, collection_type, user_id) {


    var query = 'SELECT id  FROM TABLE_TEMP_OrderMaster where entity_id = "' + entity_id + '" and collection_type =  "' + collection_type + '"  and user_id = "' + user_id + '" '

    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getorderId = []
          for (let i = 0; i < results.rows.length; i++) {
            getorderId.push(results.rows.item(i));
          }
          resolve(getorderId);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });
    }).catch((err) => {
      //console.log(err);
    });


  }

  checkIsRowExistInTempMasterTable(order_id, collection_type) {
    //console.log("saar", order_id)
    return new Promise((resolve) => {
      const products = [];
      var query = 'SELECT id FROM TABLE_TEMP_OrderMaster where id="' + order_id + '" and collection_type="' + collection_type + '"'
      // if(isOpen == 'false'){
      //   this.initDB()
      // }
      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var checkorder = []
          for (let i = 0; i < results.rows.length; i++) {
            checkorder.push(results.rows.item(i));
          }
          //  checkorder=results.rows.length

          resolve(checkorder);
        });
      })
        .then((result) => {
          // 
        })
        .catch((err) => {
          //console.log(err);
        });
      // }).catch((err) => {
      //   //console.log(err);
      // });
    });
  }
  selectTempMasterDetailId(itemId, appOrderId) {
    const products = [];
    var query = 'SELECT * FROM TABLE_TEMP_ORDER_DETAILS where item_id="' + itemId + '" and order_id="' + appOrderId + '"'

    return new Promise((resolve) => {

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getData = []
          for (let i = 0; i < results.rows.length; i++) {
            getData.push(results.rows.item(i));
          }

          resolve(getData);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });
    }).catch((err) => {
      //console.log(err);
    });


  }

  checkDiscountAlreadyInDb(itemId, appOrderId) {
    const products = [];
    var query = 'SELECT * FROM TABLE_DISCOUNT where OrderedItemID="' + itemId + '" and OrderID="' + appOrderId + '"'
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getData = []
          for (let i = 0; i < results.rows.length; i++) {
            getData.push(results.rows.item(i));
          }

          resolve(getData);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });
    }).catch((err) => {
      //console.log(err);
    });


  }

  updateTABLE_TEMP_ORDER_DETAILS(qty_1,qty_2,small_Unit,large_Unit,from_date,to_date,amt, rate, bottleQty, order_id, item_id) {
    alert("order updated")
    return new Promise((resolve) => {
      // this.initDB().then((db) => {
      // if(isOpen == 'false'){
      //   this.initDB()
      // }
      db1.transaction((tx) => {
        //              update TABLE_TEMP_ORDER_DETAILS set quantity_one = '%@',quantity_two = '%@',,from_date = '%@',to_date = '%@', Amount = '%@',rate = '%@' where order_id = '%@' and item_id = '%@'"
        tx.executeSql('UPDATE TABLE_TEMP_ORDER_DETAILS SET quantity_one = ?, quantity_two = ?, small_Unit = ?, large_Unit = ?, from_date = ?, to_date = ?, Amount = ?, rate = ? ,bottleQty = ? WHERE order_id = ? and item_id = ? ', [qty_1, qty_2, small_Unit, large_Unit, from_date, to_date, amt, rate, bottleQty, order_id, item_id]).then(([tx, results]) => {
          resolve(results.length);

        });
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });
      // }).catch((err) => {
      //   //console.log(err);
      // });
    });
  }
  deleteOrder(id) {
    return new Promise((resolve) => {
      alert("order Deleted")
      //  this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql('DELETE FROM Product WHERE prodId = ?', [id]).then(([tx, results]) => {
          //console.log(results);
          resolve(results);
        });
      }).then((result) => {
        //   
      }).catch((err) => {
        //console.log(err);
      });

    });
  }

  getOrdersFromDbIfPresent(entity_id, collection_type, item_id) {

    // var query='SELECT distinct ,TABLE_TEMP_ORDER_DETAILS.order_id,  TABLE_TEMP_ORDER_DETAILS.item_Name,  TABLE_TEMP_ORDER_DETAILS.quantity_one, TABLE_TEMP_ORDER_DETAILS.rate,  TABLE_TEMP_ORDER_DETAILS.Amount,TABLE_TEMP_ORDER_DETAILS.quantity_two,TABLE_TEMP_ORDER_DETAILS.small_Unit,TABLE_TEMP_ORDER_DETAILS.large_Unit,TABLE_TEMP_ORDER_DETAILS.from_date, TABLE_TEMP_ORDER_DETAILS.to_date, TABLE_TEMP_ORDER_DETAILS.bpc FROM TABLE_TEMP_ORDER_DETAILS INNER JOIN PItem ON TABLE_TEMP_ORDER_DETAILS.item_id = ItemId WHERE TABLE_TEMP_ORDER_DETAILS.order_id  = "'+app_order_id+'"'

    var query = 'SELECT TABLE_TEMP_ORDER_DETAILS.id,TABLE_TEMP_ORDER_DETAILS.item_id,TABLE_TEMP_ORDER_DETAILS.rate,TABLE_TEMP_ORDER_DETAILS.bpc,TABLE_TEMP_ORDER_DETAILS.Amount,TABLE_TEMP_ORDER_DETAILS.quantity_one,TABLE_TEMP_ORDER_DETAILS.quantity_two,TABLE_TEMP_ORDER_DETAILS.small_Unit,TABLE_TEMP_ORDER_DETAILS.large_Unit,TABLE_TEMP_ORDER_DETAILS.from_date, TABLE_TEMP_ORDER_DETAILS.to_date,TABLE_TEMP_ORDER_DETAILS.selected_flag,TABLE_TEMP_ORDER_DETAILS.order_id FROM TABLE_TEMP_ORDER_DETAILS , TABLE_TEMP_OrderMaster where TABLE_TEMP_ORDER_DETAILS.order_id = TABLE_TEMP_OrderMaster.id and TABLE_TEMP_OrderMaster.entity_id="' + entity_id + '" and TABLE_TEMP_OrderMaster.collection_type="' + collection_type + '" and TABLE_TEMP_ORDER_DETAILS.item_id = "' + item_id + '"'

    return new Promise((resolve) => {

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }
          //console.log("saraDataDb=", getOrdersFromDb)

          resolve(getOrdersFromDb);
        });
      })
        .then((result) => {
          // 
        })
        .catch((err) => {
          //console.log(err);
        });

    });


    // this.initDB().then((db) => {

  }


  getOrdersFromDbIfPresentPreview(item_id) {
    return new Promise((resolve) => {
      // var query='SELECT distinct ,TABLE_TEMP_ORDER_DETAILS.order_id,  TABLE_TEMP_ORDER_DETAILS.item_Name,  TABLE_TEMP_ORDER_DETAILS.quantity_one, TABLE_TEMP_ORDER_DETAILS.rate,  TABLE_TEMP_ORDER_DETAILS.Amount,TABLE_TEMP_ORDER_DETAILS.quantity_two,TABLE_TEMP_ORDER_DETAILS.small_Unit,TABLE_TEMP_ORDER_DETAILS.large_Unit,TABLE_TEMP_ORDER_DETAILS.from_date, TABLE_TEMP_ORDER_DETAILS.to_date, TABLE_TEMP_ORDER_DETAILS.bpc FROM TABLE_TEMP_ORDER_DETAILS INNER JOIN PItem ON TABLE_TEMP_ORDER_DETAILS.item_id = ItemId WHERE TABLE_TEMP_ORDER_DETAILS.order_id  = "'+app_order_id+'"'
      var query = 'SELECT TABLE_TEMP_ORDER_DETAILS.id,TABLE_TEMP_ORDER_DETAILS.item_id,TABLE_TEMP_ORDER_DETAILS.rate,TABLE_TEMP_ORDER_DETAILS.bpc,TABLE_TEMP_ORDER_DETAILS.Amount,TABLE_TEMP_ORDER_DETAILS.quantity_one,TABLE_TEMP_ORDER_DETAILS.quantity_two,TABLE_TEMP_ORDER_DETAILS.small_Unit,TABLE_TEMP_ORDER_DETAILS.large_Unit,TABLE_TEMP_ORDER_DETAILS.from_date, TABLE_TEMP_ORDER_DETAILS.to_date,TABLE_TEMP_ORDER_DETAILS.selected_flag FROM TABLE_TEMP_ORDER_DETAILS , TABLE_TEMP_OrderMaster where TABLE_TEMP_ORDER_DETAILS.order_id = TABLE_TEMP_OrderMaster.id and  TABLE_TEMP_ORDER_DETAILS.item_id = "' + item_id + '"'
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }
          //console.log("saraDataDb=", getOrdersFromDb)

          resolve(getOrdersFromDb);
        });
      })
        .then((result) => {
          //  
        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }
  updateTotalAmountTempOrderMaster(order_id, Total_amount) {
    return new Promise((resolve) => {

      db1.transaction((tx) => {
        //              update TABLE_TEMP_ORDER_DETAILS set quantity_one = '%@',quantity_two = '%@',,from_date = '%@',to_date = '%@', Amount = '%@',rate = '%@' where order_id = '%@' and item_id = '%@'"
        tx.executeSql('UPDATE TABLE_TEMP_OrderMaster  SET total_amount = ? WHERE id = ? ', [Total_amount, order_id]).then(([tx, results]) => {
          resolve(results);
        });
      }).then((result) => {
        //  
      }).catch((err) => {
        //console.log(err);
      });

    });
  }


  getInsertedsTempOrder(app_order_id) {
    return new Promise((resolve) => {
      //SELECT distinct TABLE_TEMP_ORDER_DETAILS.id, TABLE_TEMP_ORDER_DETAILS.item_id, TABLE_TEMP_ORDER_DETAILS.item_Name,  TABLE_TEMP_ORDER_DETAILS.quantity_one, TABLE_TEMP_ORDER_DETAILS.rate,  TABLE_TEMP_ORDER_DETAILS.Amount,TABLE_TEMP_ORDER_DETAILS.quantity_two,TABLE_TEMP_ORDER_DETAILS.small_Unit,TABLE_TEMP_ORDER_DETAILS.large_Unit,TABLE_TEMP_ORDER_DETAILS.from_date, TABLE_TEMP_ORDER_DETAILS.to_date, TABLE_TEMP_ORDER_DETAILS.bpc FROM TABLE_TEMP_ORDER_DETAILS INNER JOIN PItem ON TABLE_TEMP_ORDER_DETAILS.item_id = ItemId WHERE TABLE_TEMP_ORDER_DETAILS.order_id  = '%@'",order_id

      var query = 'SELECT distinct TABLE_TEMP_ORDER_DETAILS.id,TABLE_TEMP_ORDER_DETAILS.order_id, TABLE_TEMP_ORDER_DETAILS.item_id, TABLE_TEMP_ORDER_DETAILS.item_Name,  TABLE_TEMP_ORDER_DETAILS.quantity_one, TABLE_TEMP_ORDER_DETAILS.rate,  TABLE_TEMP_ORDER_DETAILS.Amount,TABLE_TEMP_ORDER_DETAILS.quantity_two,TABLE_TEMP_ORDER_DETAILS.small_Unit,TABLE_TEMP_ORDER_DETAILS.large_Unit,TABLE_TEMP_ORDER_DETAILS.from_date, TABLE_TEMP_ORDER_DETAILS.to_date, TABLE_TEMP_ORDER_DETAILS.bpc FROM TABLE_TEMP_ORDER_DETAILS INNER JOIN PItem ON TABLE_TEMP_ORDER_DETAILS.item_id = ItemId WHERE TABLE_TEMP_ORDER_DETAILS.order_id  = "' + app_order_id + '"'

      //   this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getInsertedsTempOrder = []
          for (let i = 0; i < results.rows.length; i++) {
            getInsertedsTempOrder.push(results.rows.item(i));
           
          }
          console.log("sonali database",getInsertedsTempOrder);
          resolve(getInsertedsTempOrder);
        });
      })
        .then((result) => {
          // 
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }

  getOrderPreviewData(itemId, orderId) {
    return new Promise((resolve) => {
      var query = 'SELECT distinct TABLE_TEMP_ORDER_DETAILS.item_id, TABLE_TEMP_ORDER_DETAILS.id, TABLE_TEMP_ORDER_DETAILS.item_Name,  TABLE_TEMP_ORDER_DETAILS.quantity_one, TABLE_TEMP_ORDER_DETAILS.rate,  TABLE_TEMP_ORDER_DETAILS.Amount,TABLE_TEMP_ORDER_DETAILS.quantity_two,TABLE_TEMP_ORDER_DETAILS.small_Unit,TABLE_TEMP_ORDER_DETAILS.large_Unit,TABLE_TEMP_ORDER_DETAILS.from_date, TABLE_TEMP_ORDER_DETAILS.to_date, TABLE_TEMP_ORDER_DETAILS.bpc FROM TABLE_TEMP_ORDER_DETAILS INNER JOIN PItem ON TABLE_TEMP_ORDER_DETAILS.item_id = "' + itemId + '" WHERE TABLE_TEMP_ORDER_DETAILS.order_id  = "' + app_order_id + '"'

      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrderPreviewData = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrderPreviewData.push(results.rows.item(i));
          }
          ///checkorder=results.rows.length

          resolve(getOrderPreviewData);
        });
      })
        .then((result) => {
          // 
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }

  getItemDiscountFromDbMainMaster(entity_id, order_id, item_id) {
    return new Promise((resolve) => {
      ///SELECT TABLE_TEMP_ORDER_DETAILS.item_id,TABLE_TEMP_ORDER_DETAILS.order_id FROM TABLE_TEMP_ORDER_DETAILS , TABLE_TEMP_OrderMaster where TABLE_TEMP_ORDER_DETAILS.order_id = TABLE_TEMP_OrderMaster.id and TABLE_TEMP_OrderMaster.entity_id="'+entity_id+'" and TABLE_TEMP_ORDER_DETAILS.item_id = "'+item_id+'"'
      //SELECT * FROM TABLE_DISCOUNT ,TABLE_TEMP_OrderMaster where TABLE_DISCOUNT.OrderID = TABLE_TEMP_OrderMaster.id and TABLE_TEMP_OrderMaster.entity_id="'+entity_id+'" and TABLE_DISCOUNT.OrderedItemID = "'+item_id+'"'
      // var query='SELECT * from TABLE_DISCOUNT where  OrderID = "'+order_id+'" and OrderedItemID = "'+item_id+'"'
      var query = 'SELECT * FROM TABLE_DISCOUNT ,OrderMaster where TABLE_DISCOUNT.OrderID = OrderMaster.id and OrderMaster.entity_id="' + entity_id + '" and TABLE_DISCOUNT.OrderedItemID = "' + item_id + '"'

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getItemDiscountFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getItemDiscountFromDb.push(results.rows.item(i));
          }
          //console.log("getItemDiscountFromDb=", getItemDiscountFromDb)
          resolve(getItemDiscountFromDb);
        });
      })
        .then((result) => {
          //  
        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }




  getItemDiscountFromDb(entity_id, order_id, item_id) {
    return new Promise((resolve) => {
      ///SELECT TABLE_TEMP_ORDER_DETAILS.item_id,TABLE_TEMP_ORDER_DETAILS.order_id FROM TABLE_TEMP_ORDER_DETAILS , TABLE_TEMP_OrderMaster where TABLE_TEMP_ORDER_DETAILS.order_id = TABLE_TEMP_OrderMaster.id and TABLE_TEMP_OrderMaster.entity_id="'+entity_id+'" and TABLE_TEMP_ORDER_DETAILS.item_id = "'+item_id+'"'
      //SELECT * FROM TABLE_DISCOUNT ,TABLE_TEMP_OrderMaster where TABLE_DISCOUNT.OrderID = TABLE_TEMP_OrderMaster.id and TABLE_TEMP_OrderMaster.entity_id="'+entity_id+'" and TABLE_DISCOUNT.OrderedItemID = "'+item_id+'"'
      // var query='SELECT * from TABLE_DISCOUNT where  OrderID = "'+order_id+'" and OrderedItemID = "'+item_id+'"'
      var query = 'SELECT * FROM TABLE_DISCOUNT ,TABLE_TEMP_OrderMaster where TABLE_DISCOUNT.OrderID = TABLE_TEMP_OrderMaster.id and TABLE_TEMP_OrderMaster.entity_id="' + entity_id + '" and TABLE_DISCOUNT.OrderedItemID = "' + item_id + '"'

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getItemDiscountFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getItemDiscountFromDb.push(results.rows.item(i));
          }
          //console.log("getItemDiscountFromDb=", getItemDiscountFromDb)
          resolve(getItemDiscountFromDb);
        });
      })
        .then((result) => {
          //  
        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }






  updateTABLE_PITEM_ADDEDITBRAND(item_id, Brand, Subbrand) {
    return new Promise((resolve) => {
      var query = 'UPDATE PItem SET IsSelectedBrand ="' + Brand + '" , IsSelectedBrandProduct = "' + Subbrand + '" WHERE ItemId="' + item_id + '"'

      db1.transaction((tx) => {
        //
        tx.executeSql(query, [], (tx, results) => {
          resolve(results);
        });
      }).then((result) => {
        //
      }).catch((err) => {
        //console.log(err);
      });

    });
  }

  updateTABLE_PITEM_btleQty(item_id, bottleQty) {
    return new Promise((resolve) => {
      var query = 'UPDATE PItem SET bottleQut ="' + bottleQty + '"  WHERE ItemId="' + item_id + '"'
      //  this.initDB().then((db) => {
      db1.transaction((tx) => {
        //
        tx.executeSql(query, [], (tx, results) => {
          resolve(results);
        });
      }).then((result) => {
        //  
      }).catch((err) => {
        //console.log(err);
      });

    });
  }

  deleteRowItem(order_id, item_id) {
    return new Promise((resolve) => {

      var query = 'DELETE FROM TABLE_TEMP_ORDER_DETAILS where TABLE_TEMP_ORDER_DETAILS.item_id = "' + item_id + '" and order_id="' + order_id + '" '
      //console.log("query==",query)
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          resolve(results)
        });
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });

    });
  }


  deleteDiscount(order_id, item_id) {
    return new Promise((resolve) => {

      db1.transaction((tx) => {
        //select OrderID as OrderID, DiscountType as DiscountType, DiscountAmount as DiscountAmount, discountadd as DiscountAdd, discountless as DiscountLess ,RNP as RNP ,OnAmount as OnAmount ,OnAmountSmallUnit as OnAmountSmallUnit ,Rate as Rate ,BookCode as BookCode ,OrderedItemID as OrderedItemID ,BrandCode as BrandCode ,ItemCode as ItemCode from TABLE_DISCOUNT'

        tx.executeSql('DELETE FROM TABLE_DISCOUNT WHERE OrderedItemID = ? ', [item_id]).then(([tx, results]) => {

          resolve(results);
        });
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });

    });
  }



  selectBottleQuantityOfItem(item_id) {
    return new Promise((resolve) => {
      const products = [];
      var query = 'select bottleQty from TABLE_TEMP_ORDER_DETAILS where item_id="' + item_id + '"'
      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var selectBottleQuantityOfItem = [];
          for (let i = 0; i < results.rows.length; i++) {
            selectBottleQuantityOfItem.push(results.rows.item(i));
          }

          resolve(selectBottleQuantityOfItem);
        });
      })
        .then((result) => {
          //  
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }


  discardOrders(order_id) {
    return new Promise((resolve) => {
      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql('DELETE FROM TABLE_TEMP_ORDER_DETAILS WHERE TABLE_TEMP_ORDER_DETAILS.order_id = ? ', [order_id]).then(([tx, results]) => {

          resolve(results);
        });
      }).then((result) => {
        //
      }).catch((err) => {
        //console.log(err);
      });

    });
  }

  discardOrdersMaster(order_id) {
    return new Promise((resolve) => {
      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        //'UPDATE TABLE_TEMP_OrderMaster  SET total_amount = ? WHERE id = ? ', [Total_amount,order_id]).then(([tx, results]) => {
        tx.executeSql('DELETE FROM TABLE_TEMP_OrderMaster WHERE TABLE_TEMP_OrderMaster.id = ? ', [order_id]).then(([tx, results]) => {
          resolve(results);
        });
      }).then((result) => {
        //  
      }).catch((err) => {
        //console.log(err);
      });

    });
  }

  getOrderDataFromTempOrderDetails(order_id) {

    return new Promise((resolve) => {
      const products = [];
      var query = 'SELECT id,order_id,item_id,item_Name,quantity_one,quantity_two,small_Unit,large_Unit,from_date,to_date,rate,Amount FROM TABLE_TEMP_ORDER_DETAILS WHERE order_id ="' + order_id + '" '

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var orderData = [];
          for (let i = 0; i < results.rows.length; i++) {
            orderData.push(results.rows.item(i));
          }

          resolve(orderData);
        });
      })
        .then((result) => {
          //   
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }
  checkOrderInOrderDetailsMain(item_id, order_id) {
    return new Promise((resolve) => {
      const products = [];
      var query = 'SELECT id,order_id,item_id,item_Name,quantity_one,quantity_two,small_Unit,large_Unit,from_date,to_date,rate,Amount FROM TABLE_TEMP_ORDER_DETAILS WHERE item_id = "' + item_id + '" and order_id ="' + order_id + '" '


      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var orderData = [];
          for (let i = 0; i < results.rows.length; i++) {
            orderData.push(results.rows.item(i));
          }
          resolve(orderData);
        });
      })
        .then((result) => {
          // 
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }



  checkOrderInOrderDetailsMain1(item_id, order_id) {
    return new Promise((resolve) => {
      const products = [];
      var query = 'SELECT * FROM OrderDetails WHERE item_id = "' + item_id + '" and order_id ="' + order_id + '" '

      //this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var orderData = [];
          for (let i = 0; i < results.rows.length; i++) {
            orderData.push(results.rows.item(i));
          }
          resolve(orderData);
        });
      })
        .then((result) => {
          //  
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }


  // SELECT id,Current_date_time,entity_type,entity_id,latitude,longitude,total_amount,from_date,to_date,collection_type,user_id FROM OrderMaster WHERE id = '%@' and collection_type ='%@'",item_id,collection_type


  getOrderDataFromTempOrderMaster(order_id, CollectionType) {
    return new Promise((resolve) => {
      const products = [];
      // SELECT id,Current_date_time,entity_type,entity_id,latitude,longitude,total_amount,from_date,to_date,collection_type,user_id FROM OrderMaster WHERE id = '%@' and collection_type ='%@'",item_id,collection_type
      //alert("temp master")
      var query = 'SELECT id,Current_date_time,entity_type,entity_id,latitude,longitude,total_amount,collection_type,user_id FROM TABLE_TEMP_OrderMaster where id="' + order_id + '" and collection_type="' + CollectionType + '" '

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var orderData = [];
          for (let i = 0; i < results.rows.length; i++) {
            orderData.push(results.rows.item(i));
          }

          resolve(orderData);
        });
      })
        .then((result) => {
          // 
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }




  checkOrderInTempOrderMasterMain(id, CollectionType) {

    return new Promise((resolve) => {
      const products = [];
      //SELECT id,Current_date_time,entity_type,entity_id,latitude,longitude,total_amount,from_date,to_date,collection_type,user_id FROM OrderMaster WHERE id = '%@' and collection_type ='%@'",item_id,collection_type

      var query = 'SELECT id,Current_date_time,entity_type,entity_id,latitude,longitude,total_amount,from_date,to_date,collection_type,user_id FROM OrderMaster WHERE id = "' + id + '" and collection_type ="' + CollectionType + '" '

      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var orderData = [];
          for (let i = 0; i < results.rows.length; i++) {
            orderData.push(results.rows.item(i));
          }

          resolve(orderData);
        });
      })
        .then((result) => {
          // 
        })
        .catch((err) => {
          //console.log(err);
        });


    });
  }

  selectOrdersDetail(order_id) {
    return new Promise((resolve) => {
      const products = [];
      var query = 'SELECT id,order_id,item_id,item_Name,quantity_one,quantity_two,small_Unit,large_Unit,from_date,to_date,rate,Amount FROM TABLE_TEMP_ORDER_DETAILS WHERE order_id ="' + order_id + '" '

      //  this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var orderData = [];
          for (let i = 0; i < results.rows.length; i++) {
            orderData.push(results.rows.item(i));
          }

          resolve(orderData);
        });
      })
        .then((result) => {
          //  
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }
  checkOrderIdInDb(outlet_id, collection_type) {
    return new Promise((resolve) => {
      const products = [];
      //SELECT * FROM TABLE_TEMP_ORDER_DETAILS ,TABLE_TEMP_OrderMaster where TABLE_TEMP_ORDER_DETAILS.order_id = TABLE_TEMP_OrderMaster.id and TABLE_TEMP_OrderMaster.entity_id="'+outlet_id+'" and TABLE_TEMP_OrderMaster.collection_type="'+collection_type+'"'

      var query = 'SELECT * FROM TABLE_TEMP_ORDER_DETAILS ,TABLE_TEMP_OrderMaster where TABLE_TEMP_ORDER_DETAILS.order_id = TABLE_TEMP_OrderMaster.id and TABLE_TEMP_OrderMaster.entity_id="' + outlet_id + '" and TABLE_TEMP_OrderMaster.collection_type="' + collection_type + '"'


      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {

          resolve(results.rows.length);
        });
      })
        .then((result) => {
          //  
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }


  insertOrderMastersss(id, Current_date_time, entity_type, entity_id, latitude, longitude, total_amount, from_date, to_date, collection_type, user_id, remark, selected_flag, sync_flag, check_date, DefaultDistributorId, ExpectedDeliveryDate) {
    //   this.initDB().then((db) => {
    db1.transaction((tx) => {
      tx.executeSql(
        `insert into OrderMaster(id,Current_date_time ,entity_type,entity_id ,latitude ,longitude ,total_amount ,from_date ,to_date ,collection_type ,user_id ,remark,selected_flag ,sync_flag ,check_date,DefaultDistributorId,ExpectedDeliveryDate )
                                                                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          id, Current_date_time, entity_type, entity_id, latitude, longitude, total_amount, from_date, to_date, collection_type, user_id, remark, selected_flag, sync_flag, check_date, DefaultDistributorId, ExpectedDeliveryDate

        ],
        (tx, results) => {

        },
        (err) => { console.error("error=", err); }
      );

    }).then((result) => {
      //  
    }).catch((err) => {
      //console.log(err);
    });

  }

  deleteTempOrderDetails(entity_id, collection_type) {
    return new Promise((resolve) => {
      var query = 'delete from TABLE_TEMP_ORDER_DETAILS where order_id IN (select id from TABLE_TEMP_OrderMaster where entity_id = "' + entity_id + '" and collection_type ="' + collection_type + '")'

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {

          resolve(results);
        });
      }).then((result) => {
        //   
      }).catch((err) => {
        //console.log(err);
      });

    });

  }
  deleteTempOrderMater(entity_id, collection_type) {
    return new Promise((resolve) => {
      var query = 'DELETE FROM TABLE_TEMP_OrderMaster where entity_id="' + entity_id + '" and collection_type="' + collection_type + '" '
      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        //'UPDATE TABLE_TEMP_OrderMaster  SET total_amount = ? WHERE id = ? ', [Total_amount,order_id]).then(([tx, results]) => {
        tx.executeSql(query, [], (tx, results) => {
          resolve(results)
        });
      }).then((result) => {
        //  
      }).catch((err) => {
        //console.log(err);
      });

    });
  }

  getPreviewOrders(order_id) {

    return new Promise((resolve) => {
      var query = 'SELECT distinct ,TABLE_TEMP_ORDER_DETAILS.order_id,  TABLE_TEMP_ORDER_DETAILS.item_Name,  TABLE_TEMP_ORDER_DETAILS.quantity_one, TABLE_TEMP_ORDER_DETAILS.rate,  TABLE_TEMP_ORDER_DETAILS.Amount,TABLE_TEMP_ORDER_DETAILS.quantity_two,TABLE_TEMP_ORDER_DETAILS.small_Unit,TABLE_TEMP_ORDER_DETAILS.large_Unit,TABLE_TEMP_ORDER_DETAILS.from_date, TABLE_TEMP_ORDER_DETAILS.to_date, TABLE_TEMP_ORDER_DETAILS.bpc FROM TABLE_TEMP_ORDER_DETAILS INNER JOIN PItem ON TABLE_TEMP_ORDER_DETAILS.item_id = ItemId WHERE TABLE_TEMP_ORDER_DETAILS.order_id  = "' + order_id + '"'

      //  var query='SELECT distinct TABLE_TEMP_ORDER_DETAILS.id, TABLE_TEMP_ORDER_DETAILS.item_id, TABLE_TEMP_ORDER_DETAILS.item_Name,  TABLE_TEMP_ORDER_DETAILS.quantity_one, TABLE_TEMP_ORDER_DETAILS.rate,  TABLE_TEMP_ORDER_DETAILS.Amount,TABLE_TEMP_ORDER_DETAILS.quantity_two,TABLE_TEMP_ORDER_DETAILS.small_Unit,TABLE_TEMP_ORDER_DETAILS.large_Unit,TABLE_TEMP_ORDER_DETAILS.from_date, TABLE_TEMP_ORDER_DETAILS.to_date, TABLE_TEMP_ORDER_DETAILS.bpc FROM TABLE_TEMP_ORDER_DETAILS INNER JOIN PItem ON TABLE_TEMP_ORDER_DETAILS.item_id = ItemId WHERE TABLE_TEMP_ORDER_DETAILS.order_id  = "'+order_id+'" '

      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }
          //console.log("previewDatas=", getOrdersFromDb)

          resolve(getOrdersFromDb);
        });
      })
        .then((result) => {
          // 
        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }

  getTotalOrderValue(entity_id, collection_type) {
    // alert(entity_id)
    return new Promise((resolve) => {
      var query = 'SELECT distinct TABLE_TEMP_ORDER_DETAILS.item_id, TABLE_TEMP_ORDER_DETAILS.item_Name FROM TABLE_TEMP_OrderMaster INNER JOIN TABLE_TEMP_ORDER_DETAILS where TABLE_TEMP_ORDER_DETAILS.order_id =(SELECT id  FROM TABLE_TEMP_OrderMaster  WHERE TABLE_TEMP_OrderMaster.entity_id="' + entity_id + '" and TABLE_TEMP_OrderMaster.collection_type="' + collection_type + '")'
      //console.log("getTotalOrderValue", query)

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {

          //console.log("getTotalOrderValuelen=", results.rows.length)
          resolve(results.rows.length);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }

  ///////////////////////////////////////////////////////shop Module  starts from  heree/////////////////////
  getRouteData() {
    return new Promise((resolve) => {
      const products = [];
      var query = 'Select distinct RouteID,RouteName from Pcustomer order by RouteName asc'

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempBeat = [];
          for (let i = 0; i < results.rows.length; i++) {
            tempBeat.push(results.rows.item(i));
          }

          resolve(tempBeat);
        });
      })
        .then((result) => {
          //
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }

  CheckTodaysRecordForShopCheckIn(check_date, entity_id, collection_type) {
    const products = [];
    var query = 'SELECT * FROM OrderMaster where entity_id = "' + entity_id + '" and collection_type  = "' + collection_type + '" and check_date = "' + check_date + '"'
    //console.log("checkIsOrderIdInDb=", query)
    return new Promise((resolve) => {
      // this.initDB().then((db) => {    
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var len = results.rows.length;
          var checkorder = []
          for (let i = 0; i < results.rows.length; i++) {
            checkorder.push(results.rows.item(i));
          }
          // checkorder=results.rows.length
          //console.log("qcheckorder=", checkorder)
          resolve(checkorder);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });
      // }).catch((err) => {
      //   //console.log(err);
      // });

    });

  }

  CheckTodaysRecordForShopCheckInforColor(check_date, entity_id) {
    const products = [];
    var query = 'SELECT * FROM OrderMaster where entity_id = "' + entity_id + '" and check_date = "' + check_date + '"'
    //console.log("checkIsOrderIdInDb=", query)
    return new Promise((resolve) => {
      // this.initDB().then((db) => {    
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var len = results.rows.length;
          var checkorder = []
          for (let i = 0; i < results.rows.length; i++) {
            checkorder.push(results.rows.item(i));
          }
          // checkorder=results.rows.length
          //console.log("qcheckorder=", checkorder)
          resolve(checkorder);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });
      // }).catch((err) => {
      //   //console.log(err);
      // });

    });

  }


  insertRecordInOrderMasterForShopCheckIn(id, Current_date_time, entity_type, entity_id, latitude, longitude,
    total_amount, from_date, to_date, collection_type, user_id, selected_flag, sync_flag,
    remark, check_date, DefaultDistributorId, ExpectedDeliveryDate) {
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        alert("CheckedIn Successfully!")
        tx.executeSql(
          `insert into OrderMaster(id,Current_date_time,entity_type,entity_id,latitude,
            longitude ,total_amount ,from_date,to_date,collection_type ,user_id,selected_flag,sync_flag,remark,check_date,DefaultDistributorId,ExpectedDeliveryDate   )
                                                                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            id, Current_date_time, entity_type, entity_id, latitude, longitude,
            total_amount, from_date, to_date, collection_type, user_id, selected_flag, sync_flag,
            remark, check_date, DefaultDistributorId, ExpectedDeliveryDate
          ],
          (tx, results) => {
            resolve(results)

          },
          (err) => { console.error("error=", err); }
        );

      }).then((result) => {
        //  
      }).catch((err) => {
        //console.log(err);
      });

    }).catch((err) => {
      //console.log(err);
    });

  }

  getCustomerId(route_id) {
    var query = 'SELECT distinct CustomerId  from pcustomer where  RouteID = "' + route_id + '" '
    //console.log("checkIsOrderIdInDb=", query)
    return new Promise((resolve) => {
      //  this.initDB().then((db) => {    
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var len = results.rows.length;
          var checkorder = []
          for (let i = 0; i < results.rows.length; i++) {
            checkorder.push(results.rows.item(i));
          }

          //console.log("qcheckorder=", checkorder)
          //   alert(JSON.stringify(checkorder))
          resolve(checkorder);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });
      // }).catch((err) => {
      //   //console.log(err);
      // });
    });

  }

  getTotalVisitedCount(check_date, entity_id) {
    var query = 'SELECT distinct entity_id FROM OrderMaster where entity_id  = "' + entity_id + '" and check_date = "' + check_date + '" '
    //console.log("checkIsOrderIdInDb=", query)
    return new Promise((resolve) => {
      //  this.initDB().then((db) => {    
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var len = results.rows.length;
          var checkorder = []
          for (let i = 0; i < results.rows.length; i++) {
            checkorder.push(results.rows.item(i));
          }
          //alert(JSON.stringify(checkorder))
          // //console.log("sarassssssssssssssssssssssssssssssssss=",checkorder)
          resolve(checkorder);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });
      // }).catch((err) => {
      //   //console.log(err);
      // });
    });
  }
  getTotalOrderFromDB(collection_type, entity_id) {
    var query = 'SELECT * FROM OrderMaster where collection_type  = "' + collection_type + '" and entity_id = "' + entity_id + '" order by check_date asc'
    //console.log("getTotalOrderFromDB=", query)
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getTotalOrderFromDB = []
          for (let i = 0; i < results.rows.length; i++) {
            getTotalOrderFromDB.push(results.rows.item(i));
          }
          //console.log("getTotalOrderFromDB=", getTotalOrderFromDB)
          resolve(getTotalOrderFromDB);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });


  }
  getInProcessOrderFromDB(collection_type, sync_flag, entity_id) {
    var query = 'SELECT * FROM OrderMaster where collection_type  = "' + collection_type + '" and sync_flag = "' + sync_flag + '" and entity_id = "' + entity_id + '" order by check_date asc'
    //console.log("checkIsOrderIdInDb=", query)
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var len = results.rows.length;
          var checkorder = []
          for (let i = 0; i < results.rows.length; i++) {
            checkorder.push(results.rows.item(i));
          }

          //console.log("qcheckorder=", checkorder)
          resolve(checkorder);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });


  }
  getDeleveredOrderFromDB(collection_type, sync_flag, entity_id) {
    var query = 'SELECT * FROM OrderMaster where collection_type  = "' + collection_type + '" and sync_flag = "' + sync_flag + '" and entity_id = "' + entity_id + '" order by check_date asc'
    //console.log("checkIsOrderIdInDb=", query)
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var len = results.rows.length;
          var checkorder = []
          for (let i = 0; i < results.rows.length; i++) {
            checkorder.push(results.rows.item(i));
          }

          //console.log("qcheckorder=", checkorder)
          resolve(checkorder);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }


  //sideorderfunction
  getAllOrders() {
    var query = 'SELECT * FROM OrderMaster'
    //console.log("checkIsOrderIdInDb=", query)
    return new Promise((resolve) => {
      //  this.initDB().then((db) => {    
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var len = results.rows.length;
          var checkorder = []
          for (let i = 0; i < results.rows.length; i++) {
            checkorder.push(results.rows.item(i));
          }
          //alert(JSON.stringify(checkorder))
          // //console.log("sarassssssssssssssssssssssssssssssssss=",checkorder)
          resolve(checkorder);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });
      // }).catch((err) => {
      //   //console.log(err);
      // });
    });
  }

  getCustomerShopName(entity_id) {
    var query = 'select * from Pcustomer,OrderMaster where CustomerId = "' + entity_id + '" and entity_id = "' + entity_id + '"'
    //console.log("checkIsOrderIdInDb=", query)
    return new Promise((resolve) => {
      //  this.initDB().then((db) => {    
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var len = results.rows.length;
          var checkorder = []
          for (let i = 0; i < results.rows.length; i++) {
            checkorder.push(results.rows.item(i));
          }
          //alert(JSON.stringify(checkorder))
          // //console.log("sarassssssssssssssssssssssssssssssssss=",checkorder)
          resolve(checkorder);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });
      // }).catch((err) => {
      //   //console.log(err);
      // });
    });
  }

  
  getDetailsItem(id) {
    var query = 'select * from OrderDetails where order_id="' + id + '" '
    //console.log("checkIsOrderIdInDb=", query)
    return new Promise((resolve) => {
      //  this.initDB().then((db) => {    
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var len = results.rows.length;
          var checkorder = []
          for (let i = 0; i < results.rows.length; i++) {
            checkorder.push(results.rows.item(i));
          }
          //alert(JSON.stringify(checkorder))
          // //console.log("sarassssssssssssssssssssssssssssssssss=",checkorder)
          resolve(checkorder);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });
      // }).catch((err) => {
      //   //console.log(err);
      // });
    });
  }

  SyncOrderDetails() {
    var query = 'select id as ID, order_id as OrderID,is_sync as sync_data  from ImagesDetails where is_sync= "N"'
    //console.log("q---", query)
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var SyncOrderDetails = []
          for (let i = 0; i < results.rows.length; i++) {
            SyncOrderDetails.push(results.rows.item(i));
          }

          resolve(SyncOrderDetails);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }


  GetRequiredData(id) {
    var query = 'select * from PItem where ItemId= "' + id + '" '
    //console.log("q---", query)
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var SyncOrderDetails = []
          for (let i = 0; i < results.rows.length; i++) {
            SyncOrderDetails.push(results.rows.item(i));
          }

          resolve(SyncOrderDetails);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }

  // deleteSideOrderDetails(id) {
  //   var query = 'delete from OrderMaster where id  = "' + id + '" '
  //   //console.log("q---", query)
  //   return new Promise((resolve) => {
  //     db1.transaction((tx) => {
  //       tx.executeSql(query, [], (tx, results) => {
  //         var SyncOrderDetails = []
  //         for (let i = 0; i < results.rows.length; i++) {
  //           SyncOrderDetails.push(results.rows.item(i));
  //         }

  //         resolve(SyncOrderDetails);
  //       });
  //     })
  //       .then((result) => {

  //       })
  //       .catch((err) => {
  //         //console.log(err);
  //       });

  //   });

  // }

  UpdateSideOrderDetails(quantity_one,quantity_two,small_Unit,large_Unit,rate,Amount,id,order_id) {
    db1.transaction((tx) => {
      tx.executeSql(
        'UPDATE OrderDetails  SET quantity_one = ?,quantity_two=?,small_Unit=?,large_Unit=?,rate=?,Amount=? WHERE item_id = ? and order_id = ?',
        [quantity_one,quantity_two,small_Unit,large_Unit,rate,Amount,id,order_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);

        });
    });
  }

  getOrderDataForFinal(order_id) {

    return new Promise((resolve) => {
      const products = [];
      var query = 'SELECT id,order_id,item_id,item_Name,quantity_one,quantity_two,small_Unit,large_Unit,rate,Amount FROM OrderDetails WHERE order_id ="' + order_id + '" '

      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var orderData = [];
          for (let i = 0; i < results.rows.length; i++) {
            orderData.push(results.rows.item(i));
          }

          resolve(orderData);
        });
      })
        .then((result) => {
          //   
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }

  totalcreate(id){
    var query = 'select Amount from OrderDetails where order_id= "' + id + '" '
 
    //console.log("q---", query)
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var SyncOrderDetails = []
          for (let i = 0; i < results.rows.length; i++) {
            SyncOrderDetails.push(results.rows.item(i));
          }

          resolve(SyncOrderDetails);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }
 
  updateAfterMaster(amount,id) {
    db1.transaction((tx) => {
      tx.executeSql(
        'UPDATE OrderMaster SET total_amount=? WHERE id = ?',
        [amount,id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);

        });
    });
  }
  

  getBrandSearchEdit(searchkey) {

    //// SELECT distinct BRAND , BRANDID FROM PItem where (%@ LIKE '%%%@%%') order by %@,BRAND",joinedString,search_text,search_product
    var query = 'select distinct BRANDID,BRAND as item_Name from PItem where BRAND  like "%' + searchkey + '%" order by "' + searchkey + '"'
    return new Promise((resolve) => {
      // this.initDB().then((db) => {
      //console.log("in getFilterData 3");
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempfilter = [];
          for (let i = 0; i < results.rows.length; i++) {
            tempfilter.push(results.rows.item(i));

          }
          //console.log("te=", tempfilter)
          resolve(tempfilter);

        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }


  AllOrderDetails(){
    var query = 'select item_id from OrderDetails'
 
    //console.log("q---", query)
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var SyncOrderDetails = []
          for (let i = 0; i < results.rows.length; i++) {
            SyncOrderDetails.push(results.rows.item(i));
          }

          resolve(SyncOrderDetails);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }

  

  InsertNewOrder(qty_1,qty_2,unit_small,unit_large,rate,amount,id,item_Name,selected_flag,sync_flag,orderidvar) {
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(
          `insert into OrderDetails(order_id, item_id, item_Name, quantity_one, quantity_two, small_Unit
            , large_Unit, rate, Amount, selected_flag, sync_flag) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
          [
            orderidvar,id,item_Name,qty_1,qty_2,unit_small,unit_large,rate,amount,selected_flag,sync_flag
          ],
          (tx, results) => {
            resolve(results)
            //console.log("images inserted Successfully!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          },
          (err) => { console.error("error=", err); }
        );

      }).then((result) => {
        //  
      }).catch((err) => {
        //console.log(err);
      });
    }).catch((err) => {
      //console.log(err);
    });
  }


/////---////
  getUserName(userId) {
    var query = 'SELECT UserName FROM user where UserId  = "' + userId + '"'

    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var len = results.rows.length;
          var checkorder = []
          for (let i = 0; i < results.rows.length; i++) {
            checkorder.push(results.rows.item(i));
          }

          //console.log("qcheckorder=", checkorder)
          resolve(checkorder);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }

  newsidePreview(Id) {
    var query = 'SELECT item_name,Amount FROM OrderDetails where order_id  = "' + Id + '"'
  
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var len = results.rows.length;
          var checkorder = []
          for (let i = 0; i < results.rows.length; i++) {
            checkorder.push(results.rows.item(i));
          }

          //console.log("qcheckorder=", checkorder)
          resolve(checkorder);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }


  insertNewShopnewpartyoutlet(app_order_id, BeatID, outletNAme, contact, OwnerName, address, remark, userLatitude, userLongitude, Is_Sync, curentDatetime, ShopType, RegistrationNo, ShopId, ContactPerson, ShopArea) {
    return new Promise((resolve) => {
      db1.transaction((tx) => {

        tx.executeSql(
          //                         OrderID TEXT,BitID TEXT,OutletName TEXT,ContactNo TEXT,OwnersName TEXT,OutletAddress TEXT,Remark TEXT,Latitude TEXT ,
          //Longitude TEXT ,Is_Sync TEXT,AddedDate TEXT);');

          `insert into newpartyoutlet(OrderID,BitID,OutletName,ContactNo,OwnersName,OutletAddress,Remark,Latitude,
               Longitude,Is_Sync,AddedDate,ShopType,RegistrationNo,ShopId ,ContactPerson ,ShopArea) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            app_order_id, BeatID, outletNAme, contact, OwnerName, address, remark, userLatitude, userLongitude, Is_Sync, curentDatetime, ShopType, RegistrationNo, ShopId, ContactPerson, ShopArea
          ],
          (tx, results) => {
            alert("shop added successfully!")
            //console.log("Shop inserted Successfully!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            resolve(results)

          },
          (err) => { console.error("error=", err); }
        );

      }).then((result) => {

      }).catch((err) => {

      });
    }).catch((err) => {

    });
  }



  insertNewPartyImages(app_order_id, Is_Sync, image) {
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(
          `insert into newpartyImageoutlet(OrderID,Is_Sync,ImageName) VALUES (?,?,?)`,
          [
            app_order_id, Is_Sync, image
          ],
          (tx, results) => {
            resolve(results)
            //console.log("images inserted Successfully!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          },
          (err) => { console.error("error=", err); }
        );

      }).then((result) => {
        //  
      }).catch((err) => {
        //console.log(err);
      });
    }).catch((err) => {
      //console.log(err);
    });
  }


  getTotalOrderDetails(id) {
    var query = 'SELECT * FROM OrderDetails where order_id  = "' + id + '"'
    //console.log("getTotalOrderFromDB=", query)
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getTotalOrderFromDB = []
          for (let i = 0; i < results.rows.length; i++) {
            getTotalOrderFromDB.push(results.rows.item(i));
          }
          //console.log("getTotalOrderFromDB=", getTotalOrderFromDB)
          resolve(getTotalOrderFromDB);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }

  getTotalOrderDetailsInfo(id, item_id) {
    var query = 'SELECT * FROM OrderDetails where order_id  = "' + id + '" and item_id = "' + item_id + '" '
    //console.log("getTotalOrderFromDB=", query)
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getTotalOrderFromDB = []
          for (let i = 0; i < results.rows.length; i++) {
            getTotalOrderFromDB.push(results.rows.item(i));
          }
          //console.log("getTotalOrderFromDB=", getTotalOrderFromDB)
          resolve(getTotalOrderFromDB);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }
  //distinct need here
  getOrderIdForAssetList(collection_type, entityid) {
    //prevquryyyyyyyyyyyyy
    //var query = 'select Pcustomer.customerid as id,Pcustomer.Party as party,OrderMaster.sync_flag,OrderMaster.id from Pcustomer,OrderMaster where  Pcustomer.customerid = OrderMaster.entity_id AND OrderMaster.collection_type = "' + collection_type + '" '

    var query = 'select Pcustomer.customerid as id,Pcustomer.Party as party,OrderMaster.sync_flag,OrderMaster.id from Pcustomer,OrderMaster where  Pcustomer.customerid = OrderMaster.entity_id AND OrderMaster.collection_type = "' + collection_type + '" '
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrderIdForAssetList = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrderIdForAssetList.push(results.rows.item(i));
          }
          console.log(JSON.stringify(getOrderIdForAssetList));
          resolve(getOrderIdForAssetList);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }


  getAseetListInfo(order_id) {
    var query = 'Select distinct tab1.AssetID, tab1.AssetQRcode, tab1.id, tab1.CustomerID, tab1.AssetInformation, tab1.ScanFlag, tab2.Remark ,tab2.Condition,tab2.AuditDate from OutletAssetInformation as tab1' +
      ' LEFT JOIN AssetPlacementVerification as tab2 ON tab1.AssetQRcode =tab2.QRCode ' +
      ' where tab2.OrderID="' + order_id + '"'

    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrderIdForAssetList = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrderIdForAssetList.push(results.rows.item(i));
          }
          //console.log("getOrderIdForAssetList=", getOrderIdForAssetList)
          resolve(getOrderIdForAssetList);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }

  /////////////////////////servey module/////////////////
  getAvailableServey() {
    var query = 'SELECT * FROM SurveyMaster WHERE SurveyDoneDate IS NULL '
    //console.log("getAvailableServey=", query)
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getAvailableServey = []
          for (let i = 0; i < results.rows.length; i++) {
            getAvailableServey.push(results.rows.item(i));
          }
          //console.log("getAvailableServey=", getAvailableServey)
          resolve(getAvailableServey);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }



  getAvailableServey1() {
    var query = 'SELECT * FROM SurveyMaster WHERE SurveyDoneDate NOT NULL '
    //console.log("getAvailableServey=", query)
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getAvailableServey = []
          for (let i = 0; i < results.rows.length; i++) {
            getAvailableServey.push(results.rows.item(i));
          }
          //console.log("getAvailableServey=", getAvailableServey)
          resolve(getAvailableServey);
        });
      })
        .then((result) => {

        })
        .catch((err) => {

        });

    });

  }


  //////////////////////////////////////////////////////////AssetModule///////////////////////////////////////
  //
  checkQrCodeDataInDb(qrcodeString) {
    var query = 'Select * from outletAssetInformation where AssetQRcode = "' + qrcodeString + '" '
    //console.log("checkQrCodeDataInDb=", query)
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var checkQrCodeDataInDb = []
          for (let i = 0; i < results.rows.length; i++) {
            checkQrCodeDataInDb.push(results.rows.item(i));
          }
          //console.log("checkQrCodeDataInDb=", checkQrCodeDataInDb)
          resolve(checkQrCodeDataInDb);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });
    });
  }


  getCustomerName(CustomerID) {
    var query = 'select Party from Pcustomer where CustomerID = "' + CustomerID + '" '
    //console.log("getCustomerName=", query)
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getCustomerName = []
          for (let i = 0; i < results.rows.length; i++) {
            getCustomerName.push(results.rows.item(i));
          }
          //console.log("getCustomerName=", getCustomerName)
          resolve(getCustomerName);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }


  insertAssetData(OrderID, AssetID, QRCode, ScanStatus, AssetInformation, Remark, Condition, AuditDate) {
    return new Promise((resolve) => {
      db1.transaction((tx) => {

        tx.executeSql(
          `insert into AssetPlacementVerification(OrderID,AssetID,QRCode,ScanStatus,AssetInformation,Remark,Condition,AuditDate) VALUES (?,?,?,?,?,?,?,?)`,
          [
            OrderID, AssetID, QRCode, ScanStatus, AssetInformation, Remark, Condition, AuditDate
          ],
          (tx, results) => {
            resolve(results)
            alert("Asset inserted Successfully!")
          },
          (err) => { console.error("error=", err); }
        );

      }).then((result) => {
        //  
      }).catch((err) => {
        //console.log(err);
      });
    }).catch((err) => {
      //console.log(err);
    });
  }


  inserOrderMasterEntryForAsset(id, Current_date_time, entity_type, entity_id, latitude, longitude, total_amount, from_date, to_date, collection_type, user_id, remark, selected_flag, sync_flag, check_date, DefaultDistributorId, ExpectedDeliveryDate) {
    //   this.initDB().then((db) => {
    db1.transaction((tx) => {
      tx.executeSql(
        `insert into OrderMaster(id,Current_date_time ,entity_type,entity_id ,latitude ,longitude ,total_amount ,from_date ,to_date ,collection_type ,user_id ,remark,selected_flag ,sync_flag ,check_date,DefaultDistributorId,ExpectedDeliveryDate )
                                                                  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          id, Current_date_time, entity_type, entity_id, latitude, longitude, total_amount, from_date, to_date, collection_type, user_id, remark, selected_flag, sync_flag, check_date, DefaultDistributorId, ExpectedDeliveryDate

        ],
        (tx, results) => {

        },
        (err) => { console.error("error=", err); }
      );

    }).then((result) => {

    }).catch((err) => {
      //console.log(err);
    });

  }

  /////////////////////////////////////////sync Function Data////////////////////////////

  getOrderMasterSyncData1(sync_flag) {
    //id,Current_date_time ,entity_type,entity_id ,latitude ,longitude ,total_amount ,from_date ,to_date ,collection_type ,user_id ,remark,selected_flag ,sync_flag ,check_date,DefaultDistributorId,ExpectedDeliveryDate
    var query = 'select id as ID,entity_type as EntityType,entity_id as EntityID ,latitude as Latitude ,longitude as Longitude ,total_amount as TotalAmount ,from_date as FromDate ,to_date as ToDate ,collection_type as CollectionType ,user_id as UserID ,remark as Remark,Current_date_time as CurrentDatetime,DefaultDistributorId as DefaultDistributorId,ExpectedDeliveryDate as ExpectedDeliveryDate from OrderMaster where sync_flag  = "N" '
    //return new Promise((resolve) => {
    db1.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        var OrderMaster = []
        for (let i = 0; i < results.rows.length; i++) {
          OrderMaster.push(results.rows.item(i));
        }
        //return OrderMaster
        // resolve(OrderMaster);
      });
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        //console.log(err);
      });

  }

  getOrderMasterSyncData(sync_flag) {
    //id,Current_date_time ,entity_type,entity_id ,latitude ,longitude ,total_amount ,from_date ,to_date ,collection_type ,user_id ,remark,selected_flag ,sync_flag ,check_date,DefaultDistributorId,ExpectedDeliveryDate
    var query = "select id as ID,entity_type as EntityType,entity_id as EntityID ,latitude as Latitude ,longitude as Longitude ,total_amount as TotalAmount ,from_date as FromDate ,to_date as ToDate ,collection_type as CollectionType ,user_id as UserID ,remark as Remark,Current_date_time as CurrentDatetime,DefaultDistributorId as DefaultDistributorId,ExpectedDeliveryDate as ExpectedDeliveryDate from OrderMaster where sync_flag ='N'"
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql('select id as ID,entity_type as EntityType,entity_id as EntityID ,latitude as Latitude ,longitude as Longitude ,total_amount as TotalAmount ,from_date as FromDate ,to_date as ToDate ,collection_type as CollectionType ,user_id as UserID ,remark as Remark,Current_date_time as CurrentDatetime,DefaultDistributorId as DefaultDistributorId,ExpectedDeliveryDate as ExpectedDeliveryDate from OrderMaster where sync_flag = ?', [sync_flag], (tx, results) => {
          var OrderMaster = []
          for (let i = 0; i < results.rows.length; i++) {
            OrderMaster.push(results.rows.item(i));
          }
          //return OrderMaster
          resolve(OrderMaster);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });
    });

  }
  getOrderDetailsSyncData() {
    //order_id,item_id,item_Name,quantity_one,quantity_two,small_Unit,large_Unit,rate ,Amount,selected_flag,sync_flag 
    var query = "select id as ID,order_id as OrderID,item_id as ItemID,quantity_one as LargeUnit,quantity_two as SmallUnit,small_Unit as FreeLargeUnit,large_Unit as FreeSmallUnit,rate as Rate ,Amount as Amount from OrderDetails where sync_flag= 'N'"
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var OrderDetails = []
          for (let i = 0; i < results.rows.length; i++) {
            OrderDetails.push(results.rows.item(i));
          }

          resolve(OrderDetails);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }
  getDiscountSyncData() {
    var query = "select OrderID as OrderID, DiscountType as DiscountType, DiscountAmount as DiscountAmount, discountadd as DiscountAdd, discountless as DiscountLess ,RNP as RNP ,OnAmount as OnAmount ,OnAmountSmallUnit as OnAmountSmallUnit ,Rate as Rate ,BookCode as BookCode ,OrderedItemID as OrderedItemID ,BrandCode as BrandCode ,ItemCode as ItemCode from TABLE_DISCOUNT where syncFlag= 'N'"
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var DISCOUNT = []
          for (let i = 0; i < results.rows.length; i++) {
            DISCOUNT.push(results.rows.item(i));
          }

          resolve(DISCOUNT);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }

  getImageDetailsyncData() {
    var query = 'select id as ID, order_id as OrderID,image_date_time as ImageDateTime ,image_name as ImageName,Path as ImageBytes,is_sync as sync_data  from ImagesDetails where is_sync= "N"'
    //console.log("q---", query)
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var ImageDetails = []
          for (let i = 0; i < results.rows.length; i++) {
            ImageDetails.push(results.rows.item(i));
          }

          resolve(ImageDetails);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }


  getAssetDetailData() {
    var query = 'select id as ID, OrderID as OrderID,AssetID as AssetID,QRCode as QRCode,ScanStatus as ScanStatus,AssetInformation as AssetInformation,Remark as Remark from AssetPlacementVerification'
    //console.log("q---", query)
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var ImageDetails = []
          for (let i = 0; i < results.rows.length; i++) {
            ImageDetails.push(results.rows.item(i));
          }

          resolve(ImageDetails);
        });
      })
        .then((result) => {

        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }


  updateOrderMasterSyncFlag(order_id) {
    db1.transaction((tx) => {
      tx.executeSql(
        'UPDATE OrderMaster  SET sync_flag = ? WHERE id = ?',
        ['Y', order_id],
        (tx, results) => {
          //console.log('Results', results.rowsAffected);

        });
    });
    // return new Promise((resolve) => {
    //   db1.transaction((tx) => {
    //     tx.executeSql('UPDATE OrderMaster  SET sync_flag = ? WHERE id = ? ', ['Y', order_id]).then(([tx, results]) => {
    //       resolve(results);
    //     });
    //   }).then((result) => {
    //     //console.log("updateOrderMasterSyncFlagresulr////////",result)   
    //   }).catch((err) => {
    //     //console.log(err);
    //   });
    // });
  }


  updateOrderDetailSyncFlag(order_id) {
    // return new Promise((resolve) => {
    db1.transaction((tx) => {
      tx.executeSql(
        'UPDATE OrderDetails  SET sync_flag = ? WHERE order_id = ?',
        ['Y', order_id],
        (tx, results) => {
          //console.log('Results', results.rowsAffected);

        });
    });
  }

  // db1.transaction((tx) => {

  //   // tx.executeSql(
  //   //   'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?', [userName, userContact, userAddress, inputUserId],
  //   //   (tx, results) => {
  //   tx.executeSql('UPDATE OrderDetails  SET sync_flag = ? WHERE order_id = ? ', ['Y', order_id](tx, results) => {
  //     resolve(results);
  //   };

  // }).catch((err) => {
  //   //console.log(err);
  // });

  //});


  updateDiscountSyncFlag(order_id) {
    // return new Promise((resolve) => {
    //   db1.transaction((tx) => {
    //     tx.executeSql('UPDATE TABLE_DISCOUNT SET syncFlag = ? WHERE OrderID = ? ', ['Y', order_id]).then(([tx, results]) => {
    //       resolve(results);
    //       //console.log("updatediscountSyncFlag//////////////////",results)  
    //     });
    //   }).then((result) => {

    //   }).catch((err) => {
    //     //console.log(err);
    //   });

    // });
    db1.transaction((tx) => {
      tx.executeSql(
        'UPDATE TABLE_DISCOUNT SET syncFlag = ? WHERE OrderID = ?',
        ['Y', order_id],
        (tx, results) => {
          //console.log('Results', results.rowsAffected);

        });
    })
  }

  updateimageDetailSyncFlag(order_id) {
    // return new Promise((resolve) => {
    //   db1.transaction((tx) => {
    //     tx.executeSql('UPDATE ImagesDetails  SET is_sync = ? WHERE order_id = ? ', ['Y', order_id]).then(([tx, results]) => {
    //       resolve(results);
    //     });
    //   }).then((result) => {
    //     //console.log("updateimageDetailSyncFlag//////////////////")  
    //   }).catch((err) => {
    //     //console.log(err);
    //   });

    // });
    db1.transaction((tx) => {
      tx.executeSql(
        'UPDATE ImagesDetails  SET is_sync = ? WHERE order_id = ?',
        ['Y', order_id],
        (tx, results) => {
          //console.log('Results', results.rowsAffected);

        });
    })
  }

  // deleteNewpartyImages(order_id) {
  //   return new Promise((resolve) => {
  //     // this.initDB().then((db) => {
  //     db1.transaction((tx) => {
  //       //'UPDATE TABLE_TEMP_OrderMaster  SET total_amount = ? WHERE id = ? ', [Total_amount,order_id]).then(([tx, results]) => {
  //       tx.executeSql('DELETE FROM TABLE_TEMP_OrderMaster WHERE TABLE_TEMP_OrderMaster.id = ? ', [order_id]).then(([tx, results]) => {
  //         resolve(results);
  //       });
  //     }).then((result) => {
  //       //  
  //     }).catch((err) => {
  //       //console.log(err);
  //     });

  //   });
  // }


  /////////////////////////////////////////////Data collectionModule///////////////

  getOrdersFromDbIfPresentPreviewDC(item_id, CollectionType) {
    return new Promise((resolve) => {
      // var query='SELECT distinct ,TABLE_TEMP_ORDER_DETAILS.order_id,  TABLE_TEMP_ORDER_DETAILS.item_Name,  TABLE_TEMP_ORDER_DETAILS.quantity_one, TABLE_TEMP_ORDER_DETAILS.rate,  TABLE_TEMP_ORDER_DETAILS.Amount,TABLE_TEMP_ORDER_DETAILS.quantity_two,TABLE_TEMP_ORDER_DETAILS.small_Unit,TABLE_TEMP_ORDER_DETAILS.large_Unit,TABLE_TEMP_ORDER_DETAILS.from_date, TABLE_TEMP_ORDER_DETAILS.to_date, TABLE_TEMP_ORDER_DETAILS.bpc FROM TABLE_TEMP_ORDER_DETAILS INNER JOIN PItem ON TABLE_TEMP_ORDER_DETAILS.item_id = ItemId WHERE TABLE_TEMP_ORDER_DETAILS.order_id  = "'+app_order_id+'"'
      var query = 'SELECT TABLE_TEMP_ORDER_DETAILS.id,TABLE_TEMP_ORDER_DETAILS.item_id,TABLE_TEMP_ORDER_DETAILS.rate,TABLE_TEMP_ORDER_DETAILS.bpc,TABLE_TEMP_ORDER_DETAILS.Amount,TABLE_TEMP_ORDER_DETAILS.quantity_one,TABLE_TEMP_ORDER_DETAILS.quantity_two,TABLE_TEMP_ORDER_DETAILS.small_Unit,TABLE_TEMP_ORDER_DETAILS.large_Unit,TABLE_TEMP_ORDER_DETAILS.from_date, TABLE_TEMP_ORDER_DETAILS.to_date,TABLE_TEMP_ORDER_DETAILS.selected_flag FROM TABLE_TEMP_ORDER_DETAILS , TABLE_TEMP_OrderMaster where TABLE_TEMP_ORDER_DETAILS.order_id = TABLE_TEMP_OrderMaster.id and TABLE_TEMP_OrderMaster.collection_type= "' + CollectionType + '"  and TABLE_TEMP_ORDER_DETAILS.item_id = "' + item_id + '"'
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }
          //console.log("saraDataDb=", getOrdersFromDb)

          resolve(getOrdersFromDb);
        });
      })
        .then((result) => {
          //  
        })
        .catch((err) => {
          //console.log(err);
        });

    });

  }


  getInsertedsTempOrderDC(app_order_id) {
    return new Promise((resolve) => {
      //SELECT distinct TABLE_TEMP_ORDER_DETAILS.id, TABLE_TEMP_ORDER_DETAILS.item_id, TABLE_TEMP_ORDER_DETAILS.item_Name,  TABLE_TEMP_ORDER_DETAILS.quantity_one, TABLE_TEMP_ORDER_DETAILS.rate,  TABLE_TEMP_ORDER_DETAILS.Amount,TABLE_TEMP_ORDER_DETAILS.quantity_two,TABLE_TEMP_ORDER_DETAILS.small_Unit,TABLE_TEMP_ORDER_DETAILS.large_Unit,TABLE_TEMP_ORDER_DETAILS.from_date, TABLE_TEMP_ORDER_DETAILS.to_date, TABLE_TEMP_ORDER_DETAILS.bpc FROM TABLE_TEMP_ORDER_DETAILS INNER JOIN PItem ON TABLE_TEMP_ORDER_DETAILS.item_id = ItemId WHERE TABLE_TEMP_ORDER_DETAILS.order_id  = '%@'",order_id

      var query = 'SELECT distinct TABLE_TEMP_ORDER_DETAILS.id,TABLE_TEMP_ORDER_DETAILS.order_id, TABLE_TEMP_ORDER_DETAILS.item_id, TABLE_TEMP_ORDER_DETAILS.item_Name,  TABLE_TEMP_ORDER_DETAILS.quantity_one, TABLE_TEMP_ORDER_DETAILS.rate,  TABLE_TEMP_ORDER_DETAILS.Amount,TABLE_TEMP_ORDER_DETAILS.quantity_two,TABLE_TEMP_ORDER_DETAILS.small_Unit,TABLE_TEMP_ORDER_DETAILS.large_Unit,TABLE_TEMP_ORDER_DETAILS.from_date, TABLE_TEMP_ORDER_DETAILS.to_date, TABLE_TEMP_ORDER_DETAILS.bpc FROM TABLE_TEMP_ORDER_DETAILS INNER JOIN PItem ON TABLE_TEMP_ORDER_DETAILS.item_id = ItemId WHERE TABLE_TEMP_ORDER_DETAILS.order_id  = "' + app_order_id + '"'

      //   this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getInsertedsTempOrder = []
          for (let i = 0; i < results.rows.length; i++) {
            getInsertedsTempOrder.push(results.rows.item(i));
          }
          resolve(getInsertedsTempOrder);
        });
      })
        .then((result) => {
          // 
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }

  insertTABLE_TEMP_ORDER_DETAILSDC(order_id, item_id, item_Name, quantity_one, quantity_two, small_Unit, large_Unit, from_date, to_date, rate, bpc, Amount, selected_flag, bottleQty) {
    alert("Data inserted")
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(
          `insert into  TABLE_TEMP_ORDER_DETAILS(order_id,item_id,item_Name,quantity_one ,quantity_two ,
              small_Unit ,large_Unit,from_date,
              to_date ,rate  ,bpc  ,Amount ,selected_flag,bottleQty )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            order_id, item_id, item_Name, quantity_one, quantity_two, small_Unit, large_Unit, from_date, to_date, rate, bpc, Amount, selected_flag, bottleQty
          ]).then(([tx, results]) => {
            resolve(results);
          });
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });

    });
  }



  updateTABLE_TEMP_ORDER_DETAILSDC(qty_1, qty_2, small_Unit, large_Unit, from_date, to_date, amt, rate, bottleQty, order_id, item_id) {
    alert("Data updated")
    return new Promise((resolve) => {
      // this.initDB().then((db) => {
      // if(isOpen == 'false'){
      //   this.initDB()
      // }
      db1.transaction((tx) => {
        //              update TABLE_TEMP_ORDER_DETAILS set quantity_one = '%@',quantity_two = '%@',,from_date = '%@',to_date = '%@', Amount = '%@',rate = '%@' where order_id = '%@' and item_id = '%@'"
        tx.executeSql('UPDATE TABLE_TEMP_ORDER_DETAILS SET quantity_one = ?, quantity_two = ?, small_Unit = ?, large_Unit = ?, from_date = ?, to_date = ?, Amount = ?, rate = ? ,bottleQty = ? WHERE order_id = ? and item_id = ? ', [qty_1, qty_2, small_Unit, large_Unit, from_date, to_date, amt, rate, bottleQty, order_id, item_id]).then(([tx, results]) => {
          resolve(results.length);

        });
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });
      // }).catch((err) => {
      //   //console.log(err);
      // });
    });
  }

  deleteRowItemDC(order_id, item_id, CollectionType) {
    return new Promise((resolve) => {
      var query = 'DELETE FROM TABLE_TEMP_ORDER_DETAILS where TABLE_TEMP_ORDER_DETAILS.item_id = "' + item_id + '" and order_id="' + order_id + '" '
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          resolve(results)
          // db1.transaction((tx) => {
          //   tx.executeSql('DELETE FROM TABLE_TEMP_ORDER_DETAILS WHERE TABLE_TEMP_ORDER_DETAILS.item_id = ? ', [item_id]).then(([tx, results]) => {

          //     resolve(results);
        });
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });

    });
  }
  /////////////////////////////////////////////////Reports/////////////////////////////
  getClassificationfromDBReport1() {
    return new Promise((resolve) => {
      var query = 'Select * from Report where MenuKey ="Report1" '
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(0));
          }
          //  console.log("data1"+JSON.stringify(getOrdersFromDb))

          resolve(getOrdersFromDb);
        });
      }).then((result) => {
        // 
      }).catch((err) => {
        //console.log(err);
      });

    })
  }
  getClassificationfromDBReport2() {
    return new Promise((resolve) => {
      var query = 'Select * from Report where MenuKey ="Report2" '
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(0));
          }
          //  console.log("data2"+JSON.stringify(getOrdersFromDb))
          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {
        //console.log(err);
      });

    })
  }

  getClassificationfromDBReport3() {
    return new Promise((resolve) => {
      var query = 'Select * from Report where MenuKey ="Report3" '
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(0));
          }
          //console.log("data3"+JSON.stringify(getOrdersFromDb))
          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });

    })
  }

  GetAllDistributors() {
    return new Promise((resolve) => {
      var query = 'Select distinct DistributorID,Distributor from PDistributor Order by Distributor asc'
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(0));
          }
          //console.log("data3"+JSON.stringify(getOrdersFromDb))
          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });

    })
  }

  getControlId(key) {
    return new Promise((resolve) => {
      var query = '  Select ControlId from ReportControlMaster where ReferenceColumn = "' + key + '" '
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempDistributor = '';
          for (let i = 0; i < results.rows.length; i++) {
            tempDistributor = results.rows.item(i);
          }

          resolve(tempDistributor);
        });
      })
        .then((result) => {
          //  
        })
        .catch((err) => {

        });

    });
  }
  getAllBrandList(ControlId) {
    return new Promise((resolve) => {
      //   var query = 'Select "'+ControlId+'" FROM PItem order by "'+ControlId+'" '
      var query = 'Select distinct "' + ControlId + '","' + ControlId + 'ID", IsSelectedBrand , IsSelectedBrandProduct FROM PItem order by "' + ControlId + '" '
      console.log(query)
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }

          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });

    })
  }


  getDefaultUOM() {
    const products = [];
    var query = "select Value from Settings where Key='DefaultUOM'"
    return new Promise((resolve) => {
      // this.initDB().then((db) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempSearchProdect = '';
          for (let i = 0; i < results.rows.length; i++) {
            tempSearchProdect = results.rows.item(i)
          }

          //console.log("tempSearchProdect=", tempSearchProdect)
          resolve(tempSearchProdect);
        });
      })
        .then((result) => {
          // 
        })
        .catch((err) => {
          //console.log(err);
        });

    });
  }

  getUOMList() {
    const products = [];
    var query = "select Value from Settings where Key='UOMKey'"
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempSearchProdect = '';
          for (let i = 0; i < results.rows.length; i++) {
            tempSearchProdect = results.rows.item(i)
          }

          resolve(tempSearchProdect);
        });
      })
        .then((result) => {

        })
        .catch((err) => {

        });

    });
  }

  ConversionUOMFormula(default_uom) {
    // alert(default_uom)
    // UOMDescription TEXT, ConvToBase TEXT, Formula TEXT, UOMKey TEXT, IsQuantity TEXT, ConversionFormula TEXT,ConversionUomFormula TEXT);');

    var query = 'Select ConversionUomFormula FROM uommaster where UOMDescription="' + default_uom + '" '
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempSearchProdect = '';
          for (let i = 0; i < results.rows.length; i++) {
            tempSearchProdect = results.rows.item(i)
          }

          resolve(tempSearchProdect);
        });
      })
        .then((result) => {

        })
        .catch((err) => {

        });

    });
  }


  getDataforcurrMonth(brandId, month, ConversionUOMFormula) {
    // alert(brandId)
    return new Promise((resolve) => {
      //   var query = 'Select "'+ControlId+'" FROM PItem order by "'+ControlId+'" '
      var query = 'SELECT ' + ConversionUOMFormula + ' AS qty FROM Sales,PItem where Sales.ItemID=PItem.ItemId and PItem.BRANDID="' + brandId + '" and Month="' + month + '" '
      //   console.log("my queryyyyyyyyyyyy=",query)
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }

          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });

    })

  }
  // SELECT distinct(PItem.%@ID), PItem.%@ as Item FROM PItem where PItem.Focus = '%@'",clm1,clm1,@"Yes"
  // Print value = SELECT distinct(PItem.BRANDID), PItem.BRAND as Item FROM PItem where PItem.Focus = 'Yes'


  getAllBrandList1(controlId, yes) {
   
    return new Promise((resolve) => {
      //   var query = 'Select "'+ControlId+'" FROM PItem order by "'+ControlId+'"  '
      //where PItem.Focus = 'YES' and 
     // SELECT distinct(PItem.BRANDID), PItem.BRAND as Item FROM PItem where PItem.Focus = 'Yes'
      var query = ' SELECT distinct (PItem.' + controlId + 'ID), PItem.'+ controlId +' as BRAND FROM PItem where PItem.Focus= 1  order by ' + controlId + '  '
      //   console.log("my queryyyyyyyyyyyy=",query)
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }

          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });
    })

  }
  //SELECT distinct(PItem.%@ID),PItem.%@ as Item FROM SalesYTD,PItem where PItem.Focus = '%@' and SalesYTD.DistributorID in('%@') Union SELECT distinct(PItem.%@ID),PItem.%@ as Item FROM Sales,PItem where PItem.Focus = '%@' and Sales.DistributorID in('%@') ",clm1,clm1,@"Yes",dis_id,clm1,clm1,@"Yes",dis_id
  //Print value =SELECT distinct(PItem.BRANDID),PItem.BRAND as Item FROM SalesYTD,PItem where PItem.Focus = 'Yes' and SalesYTD.DistributorID in('151') Union SELECT distinct(PItem.BRANDID),PItem.BRAND as Item FROM Sales,PItem where PItem.Focus = 'Yes' and Sales.DistributorID in('151')
  getAllBrandList2(controlId, yes, distributor_id) {
    return new Promise((resolve) => {
      //    var query = 'SELECT distinct(PItem.' + controlId + 'ID),PItem.' + controlId + ' as Item FROM SalesYTD,PItem where PItem.Focus = "' + yes + '" and SalesYTD.DistributorID in(' + distributor_id + ') Union SELECT distinct(PItem.' + controlId + 'ID),PItem.%@ as Item FROM Sales,PItem where PItem.Focus = ' + yes + ' and Sales.DistributorID in(' + distributor_id + ')  '
      var query = 'SELECT distinct(PItem.' + controlId + 'ID),PItem.' + controlId + ' as  BRAND FROM SalesYTD,PItem where PItem.Focus = "' + yes + '" and SalesYTD.DistributorID in("' + distributor_id + '") Union SELECT distinct(PItem.' + controlId + 'ID),PItem.%@ as Item FROM Sales,PItem where Sales.DistributorID in("' + distributor_id + '")  '
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }

          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });

    })

  }

  //SELECT distinct(PItem.%@ID),PItem.%@ as Item FROM PItem where PItem.%@  in('%@') ",clm1,clm1,clm1,selected_brand.
  //Print value =SELECT distinct(PItem.BRANDID),PItem.BRAND as Item FROM PItem where PItem.BRAND  in('ARDMORE')
  getAllBrandList3(controlId, selectedbrand) {
    return new Promise((resolve) => {
      //   var query = 'Select "'+ControlId+'" FROM PItem order by "'+ControlId+'" '
      var query = 'SELECT distinct(PItem.' + controlId + 'ID),PItem.' + controlId + ' as  BRAND  FROM PItem where PItem.' + controlId + '  in("' + selectedbrand + '") '
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }

          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });

    })

  }
  //SELECT distinct(PItem.%@ID),PItem.%@ as Item FROM PItem ",clm1,clm1
  //Print value =SELECT distinct(PItem.BRANDID),PItem.BRAND as Item FROM PItem 
  getAllBrandList4(controlId) {
    return new Promise((resolve) => {
      //   var query = 'Select "'+ControlId+'" FROM PItem order by "'+ControlId+'" '
      var query = 'SELECT distinct(PItem.' + controlId + 'ID),PItem.' + controlId + ' as  BRAND  FROM PItem '
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }

          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });

    })

  }
  getDataforytd(brandId, month, ConversionUOMFormula){
    return new Promise((resolve, reject) => {
      // return new Promise((resolve) => {
      //   var query = SELECT %@ AS qty FROM SalesYTD,PItem where SalesYTD.ItemID=PItem.ItemId and PItem.BRANDID='%@'",formula2,iid
      var query = 'SELECT ' + ConversionUOMFormula + ' AS qty FROM SalesYTD,PItem where SalesYTD.ItemID=PItem.ItemId and PItem.BRANDID="' + brandId + '" '
    console.log("brand query",query);
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = ''
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb=results.rows.item(i);
          }
          console.log("getOrdersFromDb35435", getOrdersFromDb)

          resolve(getOrdersFromDb); 
     
      // return (getOrdersFromDb) 
        });
    
     
    

      });

    })

  }


  //SELECT %@ AS qty FROM SalesYTD,PItem where SalesYTD.ItemID=PItem.ItemId and PItem.BRANDID in ('%@') and SalesYTD.DistributorID in ('%@')",formula2,selected brand, selected ditributor]
  getDataforytd1(brandId, selectedbarand, selecteddist, ConversionUOMFormula) {
    return new Promise((resolve, reject) => {
      var query = 'SELECT ' + ConversionUOMFormula + ' AS qty FROM SalesYTD,PItem where SalesYTD.ItemID=PItem.ItemId and PItem.BRANDID in ("' + selectedbarand + '") and SalesYTD.DistributorID in ("' + selecteddist + '")'
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = ''
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb=results.rows.item(i);
          }         
          resolve(getOrdersFromDb);
        });
      }).then((result) => {
        //return (getOrdersFromDb)
      }).catch((err) => {

      });

    })

  }
  // // SELECT %@ AS qty FROM Sales,PItem where Sales.ItemID=PItem.ItemId and PItem.BRANDID='%@' and Month='%@'",formula2,br_id,mon
  getDataforytd2(brandId, month, ConversionFormula) {
    return new Promise((resolve, reject) => {
      var query = 'SELECT ' + ConversionFormula + ' AS qty FROM Sales,PItem where Sales.ItemID=PItem.ItemId and PItem.BRANDID="' + brandId + '" and Month="' + month + '" '
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = ''
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb=results.rows.item(i);
          }   
        
    
          resolve(getOrdersFromDb);
        });
      }).then((result) => {
        //return (getOrdersFromDb)
      }).catch((err) => {

      });

    })

  }

 
  // // SELECT %@ AS qty FROM Sales,PItem where Sales.ItemID=PItem.ItemId and PItem.BRANDID in ('%@') and Month='%@'and Sales.DistributorID in ('%@')",formula,selected brand,mon,selected distributor]
  getDataforytd3(brandId, ConversionFormula, month, selectedbrand, selecteddist) {
   
    return new Promise((resolve, reject) => {
     console.log("month in db",month);
      var query = 'SELECT '+ConversionFormula+' AS qty FROM Sales,PItem where Sales.ItemID=PItem.ItemId and PItem.BRANDID in ("'+selectedbrand+'") and Month='+ month +' '
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = ''
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb=results.rows.item(i);
          }         
          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });

    })

  }
  getAchieved(BRANDID, month, ConversionFormula2, focus) {
    var query = 'SELECT ' + ConversionFormula2 + ' as achi,PItem.BRANDID,PItem.BRANDSEQUENCE FROM Sales,PItem,Target where Sales.ItemID=PItem.ItemId and Target.ClassificationID =  PItem.BrandID and PItem.Focus ="' + Yes + '" and Sales.Month ="' + month + '" group by PItem.BRANDID order by BRANDSEQUENCE '
    return new Promise((resolve) => {
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var tempSearchProdect = '';
          for (let i = 0; i < results.rows.length; i++) {
            tempSearchProdect = results.rows.item(i)
          }
          resolve(tempSearchProdect);
        });
      })
        .then((result) => {

        })
        .catch((err) => {

        });

    });
  }

  //achievefd= var query = 'SELECT ' + ConversionUOMFormula + ' as achi,PItem.BRANDID,PItem.BRANDSEQUENCE FROM Sales,PItem,Target where Sales.ItemID=PItem.ItemId and Target.ClassificationID =  PItem.BrandID and PItem.Focus ="'+Yes+'" and Sales.Month ="'+month+'" group by PItem.BRANDID order by BRANDSEQUENCE '


  getAllBrandListTVSAC(ControlId, classification, ConversionUOMFormula, Yes) {
    return new Promise((resolve) => {
      //  var query = 'Select distinct "' + ControlId + '","' + ControlId + 'ID", IsSelectedBrand , IsSelectedBrandProduct FROM PItem order by "' + ControlId + '" '
      //SELECT %@ as achi,PItem.%@ID,PItem.%@ FROM SalesYTD,PItem,Target where SalesYTD.ItemID = PItem.ItemId and Target.ClassificationID =  PItem.BrandID and PItem.Focus = '%@' group by PItem.%@ID order by %@",formula,clm2,clm,@"Yes",clm2,clm
      var query = 'SELECT ' + ConversionUOMFormula + ' as achi,PItem.' + ControlId + 'ID,PItem.' + classification + ' FROM SalesYTD,PItem,Target where SalesYTD.ItemID=PItem.ItemId and Target.ClassificationID =  PItem.BrandID and PItem.Focus ="' + Yes + '" group by PItem.' + ControlId + 'ID order by ' + classification + ' '
      console.log('query===', query)
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }
          console.log("hgjgjgg=", getOrdersFromDb)
          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });

    })
  }

   //"SELECT %@ as achi,PItem.%@ID,PItem.%@ FROM SalesYTD,PItem,Target where SalesYTD.ItemID =PItem.ItemId and Target.ClassificationID =  PItem.BrandID and PItem.%@ in ('%@') group by PItem.%@ID order by %@",formula,clm2,clm,clm2,selected_Brand,clm2,clm];
  getAllBrandListTVSAC1(ControlId, classification, ConversionUOMFormula, Yes,selectedbrand) {
    return new Promise((resolve) => {     
      var query = 'SELECT ' + ConversionUOMFormula + ' as achi,PItem.' + ControlId + 'ID,PItem.' + classification + ' FROM SalesYTD,PItem,Target where SalesYTD.ItemID=PItem.ItemId and Target.ClassificationID =  PItem.BrandID and PItem.'+ControlId+' in ("'+selectedbrand+'") group by PItem.'+ControlId+'ID order by '+classification+' '
      console.log('query===', query)
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }
          console.log("hgjgjgg1=", getOrdersFromDb)
          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });

    })
  }

  //  //"SELECT %@ as achi,PItem.%@ID,PItem.%@ FROM SalesYTD,PItem,Target where SalesYTD.ItemID = PItem.ItemId and Target.ClassificationID =  PItem.BrandID group by PItem.%@ID order by %@",formula,clm2,clm,clm2,clm];
  getAllBrandListTVSAC2(controllId,classification,conversionFormula2){
    return new Promise((resolve) => {     
      var query = 'SELECT ' + ConversionUOMFormula + ' as achi,PItem.' + ControlId + 'ID,PItem.' + classification + ' FROM SalesYTD,PItem,Target where SalesYTD.ItemID=PItem.ItemId and Target.ClassificationID =  PItem.BrandID group by PItem.'+controllId+'ID order by '+classification+' '
      console.log('query===', query)
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }
         
          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });

    })
  }

   //"SELECT %@ as achi,PItem.%@ID,PItem.%@ FROM SalesYTD,PItem,Target where SalesYTD.ItemID = PItem.ItemId and Target.ClassificationID =  PItem.BrandID and PItem.Focus = '%@' group by PItem.%@ID order by %@",formula,clm2,clm,@"Yes",clm2,clm];
  getAllBrandListTVSAC3(ControlId, classification, ConversionUOMFormula, Yes,selectedbrand) {
    return new Promise((resolve) => {     
      var query = 'SELECT ' + ConversionUOMFormula + ' as achi,PItem.' + ControlId +'ID,PItem.' + classification + ' FROM SalesYTD,PItem,Target where SalesYTD.ItemID=PItem.ItemId and Target.ClassificationID =  PItem.BrandID and PItem.Focus = "'+Yes+'" group by PItem.'+ControlId+'ID order by '+classification+' '
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }
      
          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });

    })
  }

 //"SELECT %@ as achi,PItem.%@ID,PItem.%@ FROM SalesYTD,PItem where SalesYTD.ItemID = PItem.ItemId and SalesYTD.%@ID = %@ group by PItem .%@ID order by %@",formula,clm2,clm,clm2,br_id,clm2,clm];

  getAllBrandListTVSAC4(ControlId, classification, ConversionUOMFormula, Yes,selectedbrand) {
    return new Promise((resolve) => {    
      ///              "SELECT %@ as achi,PItem.%@ID,PItem.%@                                                      FROM SalesYTD,PItem where SalesYTD.ItemID = PItem.ItemId and SalesYTD.%@ID = %@ group by PItem .%@ID order by %@",formula,clm2,clm,clm2,br_id,clm2,clm]; 
      var query = 'SELECT ' + ConversionUOMFormula + ' as achi,PItem.' + ControlId +'ID,PItem.' + classification + ' FROM SalesYTD,PItem,Target where SalesYTD.ItemID=PItem.ItemId and SalesYTD.'+ControlId+'ID = '+selectedbrand+' group by PItem .'+ControlId+'ID order by '+classification+' '
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }
         
          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });

    })
  }

      //"SELECT %@ as achi,PItem.%@ID,PItem.%@ FROM Sales,PItem,Target where Sales.ItemID = PItem.ItemId and Target.ClassificationID =  PItem.BrandID and PItem.%@ in ('%@') and Sales.Month = %@ group by PItem.%@ID order by %@",formula,clm2,clm,clm2,selected_Brand,month,clm2,clm];

      getAllBrandListTVSAC5(ControlId, classification, ConversionUOMFormula, Yes,selectedbrand,month) {
        return new Promise((resolve) => {    
        //"SELECT %@ as achi,PItem.%@ID,PItem.%@                                                                        FROM Sales,PItem,Target where Sales.ItemID = PItem.ItemId and Target.ClassificationID =  PItem.BrandID and PItem.%@ in ('%@') and Sales.Month = %@ group by PItem.%@ID order by %@",formula,clm2,clm,clm2,selected_Brand,month,clm2,clm];
          var query = 'SELECT ' + ConversionUOMFormula + ' as achi,PItem.' + ControlId +'ID,PItem.' + classification + ' FROM Sales,PItem,Target where Sales.ItemID = PItem.ItemId and Target.ClassificationID =  PItem.BrandID and PItem.'+ControlId+' in ("'+selectedbrand+'") and Sales.Month = '+month+' group by PItem.'+ControlId+'ID order by '+classification+' '
          db1.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {
              var getOrdersFromDb = []
              for (let i = 0; i < results.rows.length; i++) {
                getOrdersFromDb.push(results.rows.item(i));
              }
           
              resolve(getOrdersFromDb);
            });
          }).then((result) => {
    
          }).catch((err) => {
    
          });
    
        })
      }

  //  “SELECT %@ as achi,PItem.%@ID,PItem.%@ FROM Sales,PItem,Target where Sales.ItemID=PItem.ItemId and Target.ClassificationID =  PItem.BrandID and Sales.Month= %@ group by PItem.%@ID order by %@",formula,clm2,clm,cl_month,clm2,clm];
  getAllBrandListTVSAC6(ControlId, classification, ConversionUOMFormula, Yes,selectedbrand,month) {
    return new Promise((resolve) => {    
    //"SELECT %@ as achi,PItem.%@ID,PItem.%@                                                                        FROM Sales,PItem,Target where Sales.ItemID=PItem.ItemId and Target.ClassificationID =  PItem.BrandID and Sales.Month= %@ group by PItem.%@ID order by %@",formula,clm2,clm,cl_month,clm2,clm];
      var query = 'SELECT '+ ConversionUOMFormula + ' as achi,PItem.' + ControlId +'ID,PItem.' + classification + ' FROM Sales,PItem,Target where Sales.ItemID = PItem.ItemId and Target.ClassificationID =  PItem.BrandID  and Sales.Month= '+month+' group by PItem.'+ControlId+'ID order by '+classification+' '
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }
        
          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });

    })
  }
   // SELECT %@ as achi,PItem.%@ID,PItem.%@ FROM Sales,PItem,Target where Sales.ItemID=PItem.ItemId and Target.ClassificationID =  PItem.BrandID and PItem.Focus ='%@' and Sales.Month ='%@' group by PItem.%@ID order by %@",formula,clm2,clm,@"Yes",cl_month,clm2,clm];
  getAllBrandListTVSAC7(ControlId, classification, ConversionUOMFormula, Yes,selectedbrand,month) {
   // alert(ConversionUOMFormula)
    return new Promise((resolve) => {    
    //(original quruyyy)  var query = 'SELECT '+ ConversionUOMFormula + ' as achi,PItem.' + ControlId +'ID,PItem.' + classification + ' FROM Sales,PItem,Target where Sales.ItemID = PItem.ItemId and Target.ClassificationID = PItem.BrandID and  PItem.Focus ="'+Yes+'" and Sales.Month ='+month+' group by PItem.'+ControlId+'ID order by '+classification+' '
   // var   ConversionUOMFormula = 'Quantity/PItem.BPC';
   
   var query = 'SELECT '+ ConversionUOMFormula + ' as achi,PItem.' + ControlId +'ID,PItem.' + classification + ' FROM Sales,PItem,Target where Sales.ItemID = PItem.ItemId and Target.ClassificationID = PItem.BRANDID and Sales.Month ='+month+' group by PItem.'+ControlId+'ID order by '+classification+' '
    console.log("target query",query); 
      
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }
      console.log("targetvsachi data",getOrdersFromDb);
          resolve(getOrdersFromDb);
        });
      }).then((result) => {
      
      }).catch((err) => {

      });

    })
  }

    //   SELECT %@ as achi,PItem.%@ID,PItem.%@ FROM Sales,PItem where Sales.ItemID = PItem.ItemId and Sales.%@ID= %@ and Sales.Month = %@ group by PItem.%@ID order by %@",formula,clm2,clm,clm2,br_id,month,clm2,clm];

  getAllBrandListTVSAC8(ControlId, classification, ConversionUOMFormula, Yes,selectedbrand,month) {
    return new Promise((resolve) => {    
    //"SELECT %@ as achi,PItem.%@ID,PItem.%@                                                                        FROM Sales,PItem where Sales.ItemID = PItem.ItemId and Sales.%@ID= %@ and Sales.Month = %@ group by PItem.%@ID order by %@",formula,clm2,clm,clm2,br_id,month,clm2,clm];
      var query = 'SELECT '+ ConversionUOMFormula + ' as achi,PItem.' + ControlId +'ID,PItem.' + classification + ' FROM Sales,PItem,Target where Sales.ItemID = PItem.ItemId Sales.'+classification+'ID= '+selectedbrand+' and Sales.Month = '+month+' group by PItem.'+ControlId+'ID order by '+classification+' '
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }
        
          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });

    })
  }

/////////////////////////target data function////////////////
//  //item=Select ItemId from PItem where BRANDID='%@'",bid]
getItemIdArray(brandId){
  return new Promise((resolve) => {
    var query = 'Select ItemId from PItem where BRANDID='+brandId+' '
    console.log('query===', query)
    db1.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        var getOrdersFromDb = []
        for (let i = 0; i < results.rows.length; i++) {
          getOrdersFromDb.push(results.rows.item(i));
        }      
        resolve(getOrdersFromDb);
      });
    }).then((result) => {

    }).catch((err) => {

    });
  });
}
 //  "SELECT SUM(Quantity) FROM SalesYTD where ItemID=‘%@‘”,sku_id];
getTargetDataif(itemid){
  return new Promise((resolve) => {
    var query = 'SELECT SUM(Quantity) FROM SalesYTD where ItemID="'+itemid+'" '
    console.log('query===', query)
    db1.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        var getOrdersFromDb =''
        for (let i = 0; i < results.rows.length; i++) {
          getOrdersFromDb=results.rows.item(i)
        }      
        resolve(getOrdersFromDb);
      });
    }).then((result) => {

    }).catch((err) => {

    });
  });
}
  //  "SELECT SUM(Quantity) FROM Sales where ItemID='%@' and Month=‘%@‘”,sku_id,mon];
getTargetDataelse(itemId,month){
  return new Promise((resolve) => {
    var query = 'SELECT SUM(Quantity) FROM Sales where ItemID="'+itemId+'" and Month="'+month+'" '
    console.log('query===', query)
    db1.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        var getOrdersFromDb =''
        for (let i = 0; i < results.rows.length; i++) {
          getOrdersFromDb=results.rows.item(i)
        }      
        resolve(getOrdersFromDb);
      });
    }).then((result) => {

    }).catch((err) => {

    });
  });
}


////////////////////////////per//////////////////
  // target_data =  select %@ as Target from Target where ClassificationID='%@'",target1,DIVISIONID];
getTargetData(brandId,target1){
  return new Promise((resolve) => {
    var query = 'select '+target1+' as Target from Target where ClassificationID='+brandId+'  '
    console.log('query===', query)
    db1.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        var getOrdersFromDb = ''
        for (let i = 0; i < results.rows.length; i++) {
          getOrdersFromDb=results.rows.item(i);
        }
        console.log("hgjgjggfilter=", getOrdersFromDb)
        resolve(getOrdersFromDb);
      });
    }).then((result) => {

    }).catch((err) => {

    });
  });
}
// /select %@ as Target from Target where ClassificationID='%@' and TDate='%@'",target1,DIVISIONID,cl_month]
getTargetDatabymonth(brandId,target1,month){
  return new Promise((resolve) => {
    var query = 'select '+target1+' as Target from Target where ClassificationID="'+brandId+'" and TDate="'+month+'"  '
    console.log('query===', query)
    db1.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        var getOrdersFromDb = []
        for (let i = 0; i < results.rows.length; i++) {
          getOrdersFromDb.push(results.rows.item(i));
        }
        console.log("hgjgjggfilter=", getOrdersFromDb)
        resolve(getOrdersFromDb);
      });
    }).then((result) => {

    }).catch((err) => {

    });
  });
}




  //Select distinct %@ , %@ID , IsSelectedBrand , IsSelectedBrandProduct FROM PItem order by %@",controllerid,controllerid,controllerid
  getAllBrandForFilters(ControlId) {  
    return new Promise((resolve) => {
      var query = 'Select distinct  '+ControlId +' , '+ ControlId + 'ID , IsSelectedBrand , IsSelectedBrandProduct FROM PItem order by '+ControlId +' '
      console.log('query===', query)
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }
          console.log("hgjgjggfilter=", getOrdersFromDb)
          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });
    });

  }

  
  getAllOutlets() {
    return new Promise((resolve) => {
      var query = 'SELECT Party from Pcustomer'
      console.log('query===', query)
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }
          console.log("hgjgjgg=", getOrdersFromDb)
          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });
    });

  }

 // SELECT PDistributor.Distributor,PDistributor.DistributorID,DistributorDataStatus.Branch,DistributorDataStatus.Area,DistributorDataStatus.Day7,
  // DistributorDataStatus.Day6,DistributorDataStatus.Day5,DistributorDataStatus.Day4,DistributorDataStatus.Day3,DistributorDataStatus.Day2,DistributorDataStatus.Day1,DistributorDataStatus.LastUploadDate,DistributorDataStatus.LastInvoiceDate FROM DistributorDataStatus,PDistributor where DistributorDataStatus.DistributorID = PDistributor.DistributorID and PDistributor.AREAID
  getDistributorDataStatus(){
    return new Promise((resolve) => {
      var query = 'SELECT PDistributor.Distributor,PDistributor.DistributorID,DistributorDataStatus.Branch,DistributorDataStatus.Area,DistributorDataStatus.Day7,DistributorDataStatus.Day6,DistributorDataStatus.Day5,DistributorDataStatus.Day4,DistributorDataStatus.Day3,DistributorDataStatus.Day2,DistributorDataStatus.Day1,DistributorDataStatus.LastUploadDate,DistributorDataStatus.LastInvoiceDate FROM DistributorDataStatus,PDistributor where DistributorDataStatus.DistributorID = PDistributor.DistributorID and PDistributor.AREAID'
      console.log('query===', query)
      db1.transaction((tx) => {
        tx.executeSql(query, [], (tx, results) => {
          var getOrdersFromDb = []
          for (let i = 0; i < results.rows.length; i++) {
            getOrdersFromDb.push(results.rows.item(i));
          }
          console.log("hgjgjgg=", getOrdersFromDb)
          resolve(getOrdersFromDb);
        });
      }).then((result) => {

      }).catch((err) => {

      });
    });

  }



}




