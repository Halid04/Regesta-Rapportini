sap.ui.define(
  [
    "rapportini/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
  ],

  function (BaseController, JSONModel, MessageToast, MessageBox) {
    "use strict";
    let op;
    let IDCurrent;
    let IDTicketsCreati = [];
    let clienteID;
    let commessaID;
    let tipologiaID;
    let statutsID;
    let areaFunzionaleID;
    return BaseController.extend("rapportini.controller.CreazioneTickets", {
      generateIDTickets: function () {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
        );
      },

      onCheckIDTickets: function () {
        let UUID = this.generateIDTickets();
        let alreadyCreated = IDTicketsCreati.includes(UUID);

        if (!alreadyCreated) {
          IDTicketsCreati.push(UUID);
          return UUID;
        } else {
          this.onCheckIDTickets();
        }
      },

      creaModelloVuoto: function () {
        return {
          modelloTicket: {
            insertDate: new Date(),
            utente: this.getView()
              .getModel("globalData")
              .getProperty("/myUsername"),
            areaFunzionale: null,
            titolo: "",
            testo: "",
            giorniStima: 0.0,
            cliente: null,
            commessa: null,
            assegnatoA: "",
            giorniStimaDev: 0.0,
            giorniStimaFunz: 0.0,
            criticita: "",
            supportoFunzionale: "",
            dataConsegnaRichiesta: null,
            status: null,
            allegato: "",
            externalID: "",
            flagVisibileCliente: false,
            flagBugFix: false,
            ultimaModifica: null,
            tipologia: null,
          },
        };
      },
      creaModelloEsistente: function (ticket) {
        return {
          modelloTicket: {
            insertDate: new Date(ticket.insertDate),
            utente: ticket.utente,
            areaFunzionale: ticket.areaFunzionale_ID,
            titolo: ticket.titolo,
            testo: ticket.testo,
            giorniStima: ticket.giorniStima,
            cliente: ticket.IDCliente_ID,
            commessa: ticket.IDCommessa_ID,
            assegnatoA: ticket.assegnatoA,
            giorniStimaDev: ticket.giorniStimaDev,
            giorniStimaFunz: ticket.giorniStimaFunz,
            criticita: ticket.criticita,
            supportoFunzionale: ticket.supportoFunzionale,
            dataConsegnaRichiesta: new Date(ticket.dataConsegnaRichiesta),
            status: ticket.status_ID,
            allegato: ticket.allegato,
            externalID: ticket.externalID,
            flagVisibileCliente: ticket.flagVisibileCliente,
            flagBugFix: ticket.flagBugFix,
            ultimaModifica: ticket.ultimaModifica,
            tipologia: ticket.IDTipologia_ID,
          },
        };
      },

      onInit: async function () {
        var oRouter = this.getRouter();
        oRouter
          .getRoute("creaTickets")
          .attachPatternMatched(async function (oEvent) {
            op = window.decodeURIComponent(
              oEvent.getParameter("arguments").operationID
            );

            IDCurrent = window.decodeURIComponent(
              oEvent.getParameter("arguments").IDTicket
            );

            if (op == "nuovo") {
              this.getView().byId("createPage").setTitle("Creazione Ticket");
            } else if (op == "copia") {
              this.getView().byId("createPage").setTitle("Duplica Ticket");
            } else if (op == "modifica") {
              this.getView().byId("createPage").setTitle("Modifica Ticket");
            }
            var oData = this.creaModelloVuoto();
            if (op != "nuovo") {
              var contexts = await this.getView()
                .getModel()
                .bindList("/Tickets")
                .requestContexts();
              var tickets = contexts.map((x) => x.getObject());

              let value = tickets.find((element) => {
                return element.ID === IDCurrent;
              });

              let index = tickets.indexOf(value);
              oData = this.creaModelloEsistente(tickets[index]);

              clienteID = oData.modelloTicket.cliente;
              commessaID = oData.modelloTicket.commessa;
              tipologiaID = oData.modelloTicket.tipologia;
              if (clienteID != null) {
                this.updateComboList();
                this.updateComboBox();
              }
              if (oData.modelloTicket.areaFunzionale != null) {
                areaFunzionaleID = oData.modelloTicket.areaFunzionale;
              }
              if (oData.modelloTicket.status != null) {
                statutsID = oData.modelloTicket.status;
              }
              if (oData.modelloTicket.commessa != null) {
                commessaID = oData.modelloTicket.commessa;
              }
              if (oData.modelloTicket.tipologia != null) {
                tipologiaID = oData.modelloTicket.tipologia;
              }
            }
            var oModel = new JSONModel(oData);
            var jsonModel = this.getView().setModel(oModel, "JSONModel");
          }, this);
      },
      saveTicket: async function (ticket, binding, oDataModel, myRouter) {
        if (op == "nuovo" || op == "copia") {
          binding.create(ticket);
        } else {
          var path = "/Tickets(" + IDCurrent + ")";

          const properties = [
            "insertDate",
            "utente",
            "areaFunzionale_ID",
            "titolo",
            "testo",
            "giorniStima",
            "IDCliente_ID",
            "IDCommessa_ID",
            "assegnatoA",
            "giorniStimaDev",
            "giorniStimaFunz",
            "criticita",
            "supportoFunzionale",
            "dataConsegnaRichiesta",
            "status_ID",
            "allegato",
            "externalID",
            "flagVisibileCliente",
            "flagBugFix",
            "ultimaModifica",
            "IDTipologia_ID",
          ];

          for (var i = 0; i < properties.length; i++) {
            binding.setProperty(
              path + "/" + properties[i],
              ticket[properties[i]]
            );
          }
        }

        oDataModel.submitBatch("myAppUpdateGroup");
        myRouter.navTo("tickets");
      },

      updateComboList: async function () {
        var commesseContexts = await this.getView()
          .getModel()
          .bindList("/Commesse")
          .requestContexts();
        var commesseList = [];
        var commesse = commesseContexts.map((x) => x.getObject());
        commesse.forEach((commessa) => {
          if (commessa.IDCliente_ID == clienteID) {
            commesseList.push({
              ID: commessa.ID,
              descrizione: commessa.descrizione,
            });
          }
        });
        var tipologiaContexts = await this.getView()
          .getModel()
          .bindList("/Tipologia")
          .requestContexts();
        var tipologiaList = [];
        var tipologia = tipologiaContexts.map((x) => x.getObject());
        tipologia.forEach((tipologia) => {
          if (tipologia.IDCliente_ID == clienteID) {
            tipologiaList.push({
              ID: tipologia.ID,
              tipologia: tipologia.tipologia,
            });
          }
         
        });
        var commesseModel = new JSONModel(commesseList);
        this.getView().setModel(commesseModel, "Commesse");
        var tipologiaModel = new JSONModel(tipologiaList);
        this.getView().setModel(tipologiaModel, "Tipologia");
        
      },
      updateComboBox: async function () {
        this.getView().byId("comboClienti").setSelectedKey(null);
        this.getView().byId("comboCommesse").setSelectedKey(null);
        this.getView().byId("comboTipologie").setSelectedKey(null);
      },
      handleSelectionChangeCliente: async function (oEvent) {
        let selectedKeys = oEvent.getSource().getSelectedKey();
        clienteID = selectedKeys;

        if (commessaID != null) {
          commessaID = null;
          this.getView().byId("comboCommesse").setSelectedKey(null);
        }

        if (tipologiaID != null) {
          tipologiaID = null;
          this.getView().byId("comboTipologie").setSelectedKey(null);
        }
        this.updateComboList();
      },
      handleSelectionChangeCommessa: async function (oEvent) {
        let selectedKeys = oEvent.getSource().getSelectedKey();
        commessaID = selectedKeys;
      },
      handleSelectionChangeTipologia: async function (oEvent) {
        let selectedKeys = oEvent.getSource().getSelectedKey();
        tipologiaID = selectedKeys;
      },
      handleSelectionChangeStatus: async function (oEvent) {
        let selectedKeys = oEvent.getSource().getSelectedKey();
        statutsID = selectedKeys;
      },
      handleSelectionChangeAreaFunzionale: async function (oEvent) {
        let selectedKeys = oEvent.getSource().getSelectedKey();
        areaFunzionaleID = selectedKeys;
      },
      dateFormater: function (date) {
        if (date) {
          return (
            date.getFullYear() +
            "-" +
            String(date.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(date.getDate()).padStart(2, "0")
          );
        }
      },
      onSave: async function () {
        var modelloTicket = this.getView()
          .getModel("JSONModel")
          .getProperty("/modelloTicket");

        const campiObbligatori = [
          "utente",
          "cliente",
          "commessa",
          "areaFunzionale",
          "titolo",
          "tipologia",
          "dataConsegnaRichiesta",
        ];

        for (var i = 0; i < campiObbligatori.length; i++) {
          if (
            modelloTicket[campiObbligatori[i]] == "" ||
            modelloTicket[campiObbligatori[i]] == null
          ) {
            MessageToast.show("Per favore, compila tutti i campi obbligatori");
            return;
          }
        }

        const currentDate = new Date();

        let newTicket = {
          ID: this.onCheckIDTickets(),
          insertDate: this.dateFormater(modelloTicket.insertDate),
          utente: modelloTicket.utente,
          IDCliente_ID: parseInt(clienteID),
          IDCommessa_ID: parseInt(commessaID),
          areaFunzionale_ID: parseInt(areaFunzionaleID),
          titolo: modelloTicket.titolo,
          testo: modelloTicket.testo,
          propostoA: "",
          giorniStima: modelloTicket.giorniStima,
          dataConsegnaRichiesta: this.dateFormater(
            modelloTicket.dataConsegnaRichiesta
          ),
          assegnatoA: modelloTicket.assegnatoA,
          giorniCons: 0.0,
          dataConsegnaSchedulata: null,
          status_ID: parseInt(statutsID),
          dataChiusura: null,
          ordinamento: 0,
          allegato: modelloTicket.allegato,
          statusPrev: 0,
          externalID: modelloTicket.externalID,
          flagVisibileCliente: modelloTicket.flagVisibileCliente,
          dataProduzione: null,
          flagBugFix: modelloTicket.flagBugFix,
          giorniConsCliente: 0.0,
          chatPubblica: "",
          assegnatoAPrev: "",
          flagCR: false,
          flagArxivar: false,
          IDParent: 0,
          chatPrivata: "",
          dataSpecifiche: null,
          giorniConsDev: 0.0,
          giorniStimaDev: modelloTicket.giorniStimaDev,
          giorniStimaFunz: modelloTicket.giorniStimaFunz,
          giorniConsFunz: 0.0,
          dataSviluppi: null,
          flagDev: false,
          flagFunz: false,
          criticita: modelloTicket.criticita,
          flagPadre: false,
          flagFiglio: false,
          nRilavorazioni: 0,
          supportoFunzionale: modelloTicket.supportoFunzionale,
          flagNeedDev: false,
          flagNeedFunz: false,
          flagIngegnerizzabile: false,
          nAllegati: 0,
          ordineSap: "",
          ultimaModifica: this.dateFormater(currentDate),
          ultimaModificaUtente: null,
          ultimaModificaCliente: null,
          ultimaModificaUtenteCliente: null,
          flagAms: false,
          IDTipologia_ID: parseInt(tipologiaID),
          inoltraA: "",
          messageID: "",
        };
        let oDataModel = this.getView().getModel();
        let oBinding = await oDataModel.bindList("/Tickets");
        let contexts = await oBinding.requestContexts();

        let bindingFinal = oBinding;
        if (op == "modifica") {
          let value = contexts.find((element) => {
            return element.getObject().ID === IDCurrent;
          });
          let index = contexts.indexOf(value);
          bindingFinal = contexts[index];
        }
        var myRouter = this.getRouter();
        this.saveTicket(newTicket, bindingFinal, oDataModel, myRouter);
      },
    });
  }
);
