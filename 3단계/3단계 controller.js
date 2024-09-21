===========================================================================================================================
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
],
function (Controller, JSONModel, Filter, Fragment, MessageBox) {
    "use strict";

    return Controller.extend("sync5.zux2030ex.controller.View1", {
        onInit: function () {
            let oModel = new JSONModel();
            oModel.loadData("../model/data_ex.json");
            this.getView().setModel( oModel );
            let sModel = this.getView().getModel();
            // console.log( sModel );

            let oData = [
                {   Carrid : "AA",
                    Airline : "American Airlines",
                    ConnId : "0017" },
                {   Carrid: "LH",
                    Airline: "Lufthansa",
                    ConnId : "0400" }];

            let oModel2 = new JSONModel();
            oModel2.setData( oData );
            this.getView().setModel( oModel2, "secondModel" );
        },
        onSearch: function(){                                               //버튼을 누르면 if에 따라 필터링을 해준다.
            let comboBoxId = this.getView().byId(                           
                Fragment.createId( "conditionFragmentId" , "comboId"));     
            let comboKey = comboBoxId.getSelectedKey();                    //AA
            // console.log(comboKey);                                                
            let oFilter = new Filter('Carrid', 'EQ', comboKey );            //콤보박스에서 선택한 값과 같은값을 필터링하는 필터
            let flightData = this.getView().byId(
                Fragment.createId( "conditionFragmentId" , "flightId"));
            // flightData.getBinding("items").filter( oFilter );

            let inputNumber = this.getView().byId(
                Fragment.createId( "conditionFragmentId" , "inpId" ));
            // console.log(inputNumber);                          //0017
            let inputText = inputNumber.getValue();
            // console.log(inputText);
            let oFilter2 = new Filter('ConnId', 'EQ', inputText );          //input에서 넣어준 값과 같은값을 필터링하는 필터
            // flightData.getBinding("items").filter( oFilter2 );
            // flightData.getBinding("items").filter([ oFilter, oFilter2 ]);

                        
            if ( !comboKey || !inputText ){                                 //만약 combobox값이나 input값이 비어있다면
                // MessageBox.show( "조건을 모두 선택 또는 입력하세요" ,            //MessageBox가 가운데에 팝업처럼 뜸
                // {title: "Condition Error",
                //  onClose: function(){
                //     let sFilter = new Filter( 'ConnId', 'NE', "asdfasdfasdf" );
                //     flightData.getBinding("items").filter( sFilter );
                //  }});
                // sap.m.MessageToast.show( "조건을 모두 선택 또는 입력하세요" ,       //message창이 아래에 작게 올라옴
                // {title: "Condition Error",
                //  onClose: function(){
                //     let sFilter = new Filter( 'ConnId', 'NE', "asdfasdfasdf" );
                //     flightData.getBinding("items").filter( sFilter );
                //  }});
                MessageBox.information( "조건을 모두 선택 또는 입력하세요" ,         
                    //information은 간단한 정보를 담을때, show는 복잡한 정보를 담을때 사용 show는 버튼과 아이콘 사용자화 가능??
                    {   title: "Condition Error",                   /메시지박스의 타이틀
                        actions: ["YES", "NO"],                     /버튼 2개를 배열로 설정
                        onClose: function( oAction ){               /메시지박스가 닫힐 때 실행할 함수
                            if ( oAction == "YES" ){                /Yes를 눌렀을때
                                let ifFilter = new Filter( 'ConnId', 'NE', "asdfasdfasdf" );        //connid값에 상관없이 출력되는 필터
                                flightData.getBinding("items").filter( ifFilter );
                            } else {
                                let elseFilter = new Filter( 'ConnId', 'EQ', "adsfsadf" );          //connid값에 상관없이 출력되지 않는 필터
                                flightData.getBinding("items").filter( elseFilter ); 
                            }
                        }
                    }
                );
            } else {
                flightData.getBinding("items").filter([ oFilter, oFilter2 ]);          //입력된 값에 해당하는 값만 출력되는 필터를 필터링
            }

            let oPanel = this.getView().byId(
                Fragment.createId("flightListFragmentId", "panelId"));              
            oPanel.setExpanded( false );            //search버튼을 누르면 패널을 닫아준다.

        },
        pressPanel: function(){         //패널을 누르면 패널의 데이터가 초기화 되도록 설정
            let oPanel = this.getView().byId(
                Fragment.createId( "flightListFragmentId", "panelId" ));        //이상한 경로 넣어주기
            oPanel.bindElement("{/data}");              
        },
        onPress: function( oEvent ){
            let oContext = oEvent.getSource().getBindingContext();              
            // console.log(a);
            let oPath = oContext.getPath();
            let oPanel = this.getView().byId(
                Fragment.createId( "flightListFragmentId" , "panelId" ));
            oPanel.bindElement( oPath );
            oPanel.setExpanded( true );                     //테이블을 누르면 패널을 열어준다.

        },
        onAfterRendering: function(){
            let comboBoxId = this.getView().byId(
                Fragment.createId( "conditionFragmentId" , "comboId"));
            let getKey = comboBoxId.getSelectedKey();                    //AA
            // console.log(getKey);                                                
            let oFilter = new Filter('Carrid', 'EQ', getKey );
            let flightData = this.getView().byId(
                Fragment.createId( "conditionFragmentId" , "flightId"));
            // flightData.getBinding("items").filter( oFilter );

            let inputNumber = this.getView().byId(
                Fragment.createId( "conditionFragmentId" , "inpId" ));
            // console.log(inputNumber);                          //0017
            let a = inputNumber.getLastValue();
            // console.log(a);
            let oFilter2 = new Filter('ConnId', 'EQ', a );
            // flightData.getBinding("items").filter( oFilter2 );
            flightData.getBinding("items").filter([ oFilter, oFilter2 ]);
        }
    });
});
