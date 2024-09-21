===================================================================================================================================
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/core/Fragment"
],
function (Controller, JSONModel, Filter, Fragment) {
    "use strict";

    return Controller.extend("sync5.zux2030ex.controller.View1", {
        onInit: function () {
            let oModel = new JSONModel();
            oModel.loadData("../model/data_ex.json");           //외부데이터를 경로를 통해 불러옴
            this.getView().setModel( oModel );
            let sModel = this.getView().getModel();
            // console.log( sModel );

            let oData = [                                       //새로운 데이터를 만들어서 새로운 모델로 만들어 세컨드모델로 선언
                {   Carrid : "AA",
                    Airline : "American Airlines",
                    ConnId : "0017" },
                {   Carrid: "LH",
                    Airline: "Lufthansa",
                    ConnId : "0400" }];     

            let oModel2 = new JSONModel();
            oModel2.setData( oData );
            this.getView().setModel( oModel2, "secondModel" );      //세컨드모델은 이름을 따로 선언해줘야한다. 호출할때 이름으로 선언
        },
        onSearch: function(){               //검색버튼을 눌렀을 때 ComboBox에서 선택한 값에 맞는 정보를 fligthId 테이블에 가져온다.
            let comboBoxId = this.getView().byId(       
                Fragment.createId( "conditionFragmentId" , "comboId"));     //Fragment 속의 ComboBox를 불러오는 방법
            let getKey = comboBoxId.getSelectedKey();      -> AA            //ComboBox에서 선택한 데이터를 불러옴
            // console.log(getKey);                                                
            let oFilter = new Filter('Carrid', 'EQ', getKey );              //Filter 만드는법. Carrid가 getKey값과 같은 것을 필터링
            let flightData = this.getView().byId(
                Fragment.createId( "conditionFragmentId" , "flightId"));    //정보를 넣어줄 테이블의 정보 가져오기
            // flightData.getBinding("items").filter( oFilter );            
                                /필터링 해주는법. 넣어줄 테이블.테이블에서 items에 있는 정보를 필터링해준다.

            let inputNumber = this.getView().byId(                          //input에 적어준 정보를 가져온다.
                Fragment.createId( "conditionFragmentId" , "inpId" ));
            console.log(inputNumber);       ->input element 자체를 가져온다. // 원하는 정보를 잘 가져왔는지 확인
            let a = inputNumber.getValue();                                 // 가져온 element의 값을 가져옴
            console.log(a);                 -> 0017
            let oFilter2 = new Filter('ConnId', 'EQ', a );
            // flightData.getBinding("items").filter( oFilter2 );
            flightData.getBinding("items").filter([ oFilter, oFilter2 ]);   //items에 있는 값을 두개의 필터대로 바인딩해서 테이블에 정보를 넣어준다.
        },
        onPress: function( oEvent ){            /테이블 정보를 누르면 세부사항이 패널에 뜨도록 
            let oContext = oEvent.getSource().getBindingContext();          //테이블이 눌렸을때의 소스를 가져와서 바인드된 정보를 가져옴
            // console.log(oContext);
            let oPath = oContext.getPath();                                 //정보의 경로를 가져옴
            let oPanel = this.getView().byId(                               //정보를 넣어줄 Fragment 속 패널의 정보를 가져옴
                Fragment.createId( "flightListFragmentId" , "panelId" ));   
            oPanel.bindElement( oPath );                         //가져온 정보의 경로를 패널에 넣어줌-> 경로를 타고 패널에 정보가 나옴
        },
        onAfterRendering: function(){       //onInit은 화면이 생성되기 전에 실행, onAfterRendering은 화면이 생성되고 실행되는 함수
                                            //화면이 생성되었을때 기본값을 넣어주기 위해서 함수를 사용, 그 값대로 필터링해주기
            let comboBoxId = this.getView().byId(
                Fragment.createId( "conditionFragmentId" , "comboId"));     
            let getKey = comboBoxId.getSelectedKey();        -> AA          //ComboBox에서 선택된 값을 가져옴
            // console.log(getKey);                                                
            let oFilter = new Filter('Carrid', 'EQ', getKey );              //선택된 값에 대한 필터링 해주기
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
                                //초기화면에서 초기값 combobox의 값과 input 값에 대해서 필터링해주기
        }
    });
});
