===========================================================================================================================
Controller code

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",                              //모델 경로 선언
    "sap/ui/model/Filter"                                       //필터 경로 선언
],
function (Controller, JSONModel, Filter) {                      //이름과 상관없이 위에서 선언해준 순서대로이기 때문에 순서 중요
    "use strict";

    return Controller.extend("sync5.zux2030ex.controller.View1", {
        onInit: function () {
            let oModel = new JSONModel();                               
            oModel.loadData("../model/data.json");                      //외부 데이터 불러오는 방법
            this.getView().setModel( oModel );
            let sModel = this.getView().getModel();                     
            // console.log( sModel );                           
        },                                                              //getProperty는 Model의 해당 경로에 있는 데이터를 불러온다.
        onSearch: function(){
            let comboBoxId = this.getView().byId("comboId");            //ComboBox의 아이디를 불러와서 (ComboBox를 불러옴)
            let getKey = comboBoxId.getSelectedKey();                   //콤보박스의 선택된 값을 불러온다.           
            // console.log(getKey);          =>AA                                        
            let oFilter = new Filter('carrId', 'EQ', getKey );          //carrid가 getKey의 값과 일치하는 것만 필터링해주는 필터만든다
            let flightData = this.getView().byId("flightId");           //정보를 넣어줘야하는 테이블을 id를 통해서 가져온다
            flightData.getBinding("items").filter( oFilter );           //해당 테이블에 정보를 넣어준다.

            let a = this.getView().byId( "inpId" ).getValue();          //input필드에 적은 값을 불러온다.
            // console.log(a);               =>0017
            let oFilter2 = new Filter('connId', 'EQ', a );              //불러온 값과 같은 connId만 필터링하는 필터를 만든다
            flightData.getBinding("items").filter([ oFilter, oFilter2 ]);  //필터를 두개 이상 쓸때에는 배열로 정의   
        }
    });
});