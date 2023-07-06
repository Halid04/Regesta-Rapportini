sap.ui.define(
  [
    "rapportini/controller/BaseController",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
  ],

  function (BaseController, MessageToast, MessageBox) {
    "use strict";

    return BaseController.extend("rapportini.controller.Cestino", {
      onInit: function () {
        var oRouter = this.getRouter();
        oRouter
          .getRoute("cestino")
          .attachPatternMatched(this.onPatternMatched, this);
      },

      onPatternMatched: function () {
        this.onRefresh();
      },

      onRefresh: function () {
        /*var oTable = this.getView().byId("tableRapportiniCestinatiID");
        var oBinding = oTable.getBinding("items");
        oBinding.refresh();*/
        this.getOwnerComponent().getModel().refresh();
      },

      onRestoreRapportino: async function (elementID) {
        var oModel = await this.getView().getModel();
        var contexts = await oModel
          .bindList("/RapportiniCestinati")
          .requestContexts();
        var rapportini = contexts.map((x) => x.getObject());

        let value = rapportini.find((element) => {
          return element.ID === elementID;
        });
        let index = rapportini.indexOf(value);

        var oBindingCestino = await oModel.bindList("/Rapportini");
        oBindingCestino.create(rapportini[index]);
        oModel.submitBatch("myAppUpdateGroup");

        oModel.delete("/RapportiniCestinati(" + elementID + ")", "$auto");
        MessageToast.show("Elemento ripristinato");
      },

      onDeleteRapportino: async function (elementID) {
        var oModel = await this.getView().getModel();
        MessageBox.confirm("Eliminare definitivamente?", {
          title: "Confirm", // default
          onClose: function (oAction) {
            if (oAction == "OK") {
              {
                oModel.delete(
                  "/RapportiniCestinati(" + elementID + ")",
                  "$auto"
                );
                MessageToast.show("Elemento cancellato definitivamente");
              }
            }
          }, // default
          styleClass: "", // default
          actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL], // default
          emphasizedAction: sap.m.MessageBox.Action.OK, // default
          initialFocus: null, // default
          textDirection: sap.ui.core.TextDirection.Inherit,
        });
      },

      onDeleteAll: async function () {
        var oModel = await this.getView().getModel();
        var contexts = await oModel
          .bindList("/RapportiniCestinati")
          .requestContexts();
        var rapportini = contexts.map((x) => x.getObject());

        MessageBox.confirm("Eliminare definitivamente?", {
          title: "Confirm", // default
          onClose: function (oAction) {
            if (oAction == "OK") {
              {
                for (let index = 0; index < rapportini.length; index++) {
                  const element = rapportini[index].ID;
                  oModel.delete(
                    "/RapportiniCestinati(" + element + ")",
                    "$auto"
                  );
                }

                MessageToast.show("Elementi cancellato definitivamente");
              }
            }
          }, // default
          styleClass: "", // default
          actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL], // default
          emphasizedAction: sap.m.MessageBox.Action.OK, // default
          initialFocus: null, // default
          textDirection: sap.ui.core.TextDirection.Inherit,
        });
      },

      onRestoreAll: async function () {
        var oModel = await this.getView().getModel();
        var contexts = await oModel
          .bindList("/RapportiniCestinati")
          .requestContexts();
        var rapportini = contexts.map((x) => x.getObject());

        var oBindingCestino = await oModel.bindList("/Rapportini");

        MessageBox.confirm("Ripristinare tutto?", {
          title: "Confirm", // default
          onClose: function (oAction) {
            if (oAction == "OK") {
              {
                for (let index = 0; index < rapportini.length; index++) {
                  oBindingCestino.create(rapportini[index]);
                  const element = rapportini[index].ID;
                  oModel.delete(
                    "/RapportiniCestinati(" + element + ")",
                    "$auto"
                  );
                }
                oModel.submitBatch("myAppUpdateGroup");
                MessageToast.show("Elementi ripristinati");
              }
            }
          }, // default
          styleClass: "", // default
          actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL], // default
          emphasizedAction: sap.m.MessageBox.Action.OK, // default
          initialFocus: null, // default
          textDirection: sap.ui.core.TextDirection.Inherit,
        });
      },
    });
  }
);
