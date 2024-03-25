sap.ui.define(
  [
    "rapportini/controller/Tabelle.controller",
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    "sap/m/TablePersoController",
    "./PersoService",
    "sap/m/library",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/comp/smartvariants/PersonalizableInfo",
    "sap/ui/model/Sorter",
  ],
  function (
    TabelleController,
    MessageToast,
    Controller,
    TablePersoController,
    PersoService,
    mlibrary,
    Filter,
    FilterOperator,
    PersonalizableInfo,
    Sorter
  ) {
    "use strict";
    var ResetAllMode = mlibrary.ResetAllMode;

    return TabelleController.extend("rapportini.controller.Tickets", {
      onInit: async function () {
        this.getRouter()
          .getRoute("tickets")
          .attachPatternMatched(this._onObjectMatched, this);
        this._oTPC = new TablePersoController({
          table: this.byId("ticketsTable"),
          componentName: "regestaTickets",
          resetAllMode: ResetAllMode.ServiceReset,
          persoService: PersoService,
        }).activate();

        this.setupFilterBar();

        // Rimozione duplicati
        const model = this.getOwnerComponent().getModel();

        const contextTickets = await model
          .bindList("/Tickets", undefined, undefined, undefined, {
            $expand: "IDCliente,IDCommessa,IDTipologia",
          })
          .requestContexts();
        const parametersTickets = [
          "utente",
          "IDCliente_descrizione",
          "IDCommessa_descrizione",
          "IDTipologia_tipologia",
          "areaFunzionale",
          "criticita",
          "insertDate",
        ];
        const tickets = contextTickets.map((x) => x.getObject());
        this.filterMultiComboBoxes(parametersTickets, tickets);
      },

      _onObjectMatched: function (oEvent) {
        this.getOwnerComponent().getModel().refresh();
      },

      onEditColumn: function (oEvent) {
        this._oTPC.openDialog();
      },

      onTableRefresh: function () {
        this.getOwnerComponent().getModel().refresh();
      },

      onNavToTrashcanTickets: function () {
        this.getRouter().navTo("cestinoTickets");
      },

      onCreateTicket: function () {
        this.getRouter().navTo("creaTickets", {
          operationID: "nuovo",
        });
      },
      openEditTicket: function (elementID) {
        this.getRouter().navTo("creaTickets", {
          operationID: "modifica",
          IDTicket: elementID,
        });
      },
      onCopyTicket: function (elementID) {
        this.getRouter().navTo("creaTickets", {
          operationID: "copia",
          IDTicket: elementID,
        });
      },
      onDeleteTicket: async function (elementID) {
        var oModel = await this.getView().getModel();
        var contexts = await oModel.bindList("/Tickets").requestContexts();
        var tickets = contexts.map((x) => x.getObject());

        let value = tickets.find((element) => {
          return element.ID === elementID;
        });
        let index = tickets.indexOf(value);

        var oBindingCestino = await oModel.bindList("/TicketsCestinati");
        oBindingCestino.create(tickets[index]);
        oModel.submitBatch("myAppUpdateGroup");

        oModel.delete("/Tickets(" + elementID + ")", "$auto");
        MessageToast.show("Elemento spostato nel cestino");
      },
      onDeleteSelectedTicket: async function () {
        var oTable = this.getView().byId("tabella");
        var indeces = oTable.getSelectedIndices();

        var oModel = await this.getView().getModel();
        var contexts = await oModel.bindList("/Tickets").requestContexts();
        var tickets = contexts.map((x) => x.getObject());

        var oBindingCestino = await oModel.bindList("/TicketsCestinati");

        for (let i = 0; i < indeces.length; i++) {
          const element = tickets[indeces[i]].ID;
          oBindingCestino.create(tickets[indeces[i]]);
          oModel.delete("/Tickets(" + element + ")", "$auto");
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
