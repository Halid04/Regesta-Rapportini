sap.ui.define(
  [
    "rapportini/controller/Tabelle.controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/comp/smartvariants/PersonalizableInfo",
    "sap/ui/model/Sorter",
  ],

  function (
    TabelleController,
    MessageToast,
    Filter,
    FilterOperator,
    PersonalizableInfo,
    Sorter
  ) {
    "use strict";

    return TabelleController.extend("rapportini.controller.Rapportini", {
      onInit: async function () {
        var oRouter = this.getRouter();
        oRouter
          .getRoute("tabellaRapportini")
          .attachPatternMatched(this.onPatternMatched, this);

        this.setupFilterBar();
        this.oTable = this.byId("tabella")

        const model = this.getOwnerComponent().getModel();
        const contextRapportini = await model
          .bindList("/Rapportini", undefined, undefined, undefined, {
            $expand: "IDCliente,IDCommessa,IDClienteSede,IDTicket",
          })
          .requestContexts();
        const parametersRapportini = [
          "utente",
          "IDCliente_descrizione",
          "IDCommessa_descrizione",
          "IDTicket_titolo",
          "sede",
          "giorno",
          "ore",
        ];
        const rapportini = contextRapportini.map((x) => x.getObject());
        this.filterMultiComboBoxes(parametersRapportini, rapportini);
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

        let value = rapportini.find((element) => {
          return element.ID === elementID;
        });
        let index = rapportini.indexOf(value);

        //Abbassa monteore giornaliero

        const globalData = this.getView().getModel("globalData");
        if (
          rapportini[index].utente === globalData.getProperty("/myUsername") &&
          rapportini[index].giorno.slice(0, 10) ===
          globalData.getProperty("/today")
        ) {
          globalData.setProperty(
            "/monteore",
            globalData.getProperty("/monteore") - rapportini[index].ore
          );
        }

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
        /*var oTable = this.getView().byId("tableRapportiniID");
        var oBinding = oTable.getBinding("items");
        oBinding.refresh();*/
        this.getOwnerComponent().getModel().refresh();
      },

      getSpesaTotale: function (elementID) {
        var contexts = this.getView()
          .getModel()
          .bindList("/Rapportini")
          .requestContexts();
        var allRapportini = contexts.map((x) => x.getObject());
        var value = allRapportini.find((element) => {
          return element.ID === elementID;
        });
        var index = allRapportini.indexOf(value);
        var target = allRapportini[index];

        return (
          target.pedaggio +
          target.forfait +
          target.vitto +
          target.alloggio +
          target.noleggio +
          target.trasporti +
          target.varie +
          target.speseVarie
        );
      },

      onDeleteSelectedRapportino: async function () {
        var oTable = this.getView().byId("tabella");
        var indeces = oTable.getSelectedIndices();

        var oModel = await this.getView().getModel();
        var contexts = await oModel.bindList("/Rapportini").requestContexts();
        var rapportini = contexts.map((x) => x.getObject());

        var oBindingCestino = await oModel.bindList("/RapportiniCestinati");

        for (let i = 0; i < indeces.length; i++) {
          const element = rapportini[indeces[i]].ID;
          oBindingCestino.create(rapportini[indeces[i]]);
          oModel.delete("/Rapportini(" + element + ")", "$auto");
        }
        oModel.submitBatch("myAppUpdateGroup");

        MessageToast.show("Elementi spostati nel cestino");
      },
      onBindingChange: function (oEvent) {
        this.getView()
          .byId("tabella")
          .setVisibleRowCount(oEvent.getSource().getLength());
      },
      onColumnResize: function (oEvent) {
        var oColumn = oEvent.getParameter("column");

        if (this.byId("toolColumn") == oColumn) {
          oEvent.preventDefault();
        }
      },
    });
  }
);
