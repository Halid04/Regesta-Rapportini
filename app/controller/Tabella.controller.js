sap.ui.define(
  ["rapportini/controller/BaseController", "sap/m/MessageToast"],

  function (BaseController, MessageToast) {
    "use strict";

    return BaseController.extend("rapportini.controller.Tabella", {
      onInit: function () {
        var oRouter = this.getRouter();
        oRouter
          .getRoute("tabellaRapportini")
          .attachPatternMatched(this.onPatternMatched, this);
      },

      onNavToCreate: function () {
        this.getRouter().navTo("creaRapportino", {
          operationID: "nuovo",
        });
      },

      onNavToTrashcan: function () {
        this.getRouter().navTo("cestino");
      },

      onEditRapportino: function (elementID) {
        this.getRouter().navTo("creaRapportino", {
          operationID: "modifica",
          IDRapportino: elementID,
        });
      },

      onTrashRapportino: async function (elementID) {
        var oModel = await this.getView().getModel();
        var contexts = await oModel.bindList("/Rapportini").requestContexts();
        var rapportini = contexts.map((x) => x.getObject());

        let value = rapportini.find(element => { return element.ID === elementID; } );
        let index=rapportini.indexOf(value)


        var oBindingCestino = await oModel.bindList("/RapportiniCestinati");
        oBindingCestino.create(rapportini[index]);
        oModel.submitBatch("myAppUpdateGroup");

        oModel.delete("/Rapportini(" + elementID + ")", "$auto");
        MessageToast.show("Elemento spostato nel cestino");
      },

      onCopyRapportino: function (elementID) {
        this.getRouter().navTo("creaRapportino", {
          operationID: "copia",
          IDRapportino: elementID,
        });
      },

      onPatternMatched: function () {
        this.onRefresh();
      },

      onRefresh: function () {
        var oTable = this.getView().byId("tableRapportiniID");
        var oBinding = oTable.getBinding("items");
        oBinding.refresh();
      },
    });
  }
);
