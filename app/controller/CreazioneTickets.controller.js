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
    let clienteID = null;
    let commessaID = null;
    let tipologiaID = null;
    let statutsID = null;
    let areaFunzionaleID = null;
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
            // dataConsegnaSchedulata: null,
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
            status: ticket.Status_ID,
            // dataConsegnaSchedulata: new Date(ticket.dataConsegnaSchedulata),
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
              console.log("index", index);

              oData = this.creaModelloEsistente(tickets[index]);
            }

            var oModel = new JSONModel(oData);
            var jsonModel = this.getView().setModel(oModel, "JSONModel");
          }, this);
      },
      handleUploadComplete: function (oEvent) {
        var sResponse = oEvent.getParameter("response"),
          aRegexResult = /\d{4}/.exec(sResponse),
          iHttpStatusCode = aRegexResult && parseInt(aRegexResult[0]),
          sMessage;

        if (sResponse) {
          sMessage =
            iHttpStatusCode === 200
              ? sResponse + " (Upload Success)"
              : sResponse + " (Upload Error)";
          MessageToast.show(sMessage);
        }

        console.log("upload complete");
      },
      saveTicket: async function (
        ticket,
        binding,
        oDataModel,
        myRouter,
        oFileUploader
      ) {
        if (op == "nuovo" || op == "copia") {
          binding.create(ticket);
          console.log("ticket creato / copiato con successo 👍");
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
            "Status_ID",
            // "dataConsegnaSchedulata",
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

        // await oFileUploader.checkFileReadable();
        // oFileUploader.upload();

        oDataModel.submitBatch("myAppUpdateGroup");
        myRouter.navTo("tickets");
      },
      handleSelectionChangeCliente: async function (oEvent) {
        let selectedKeys = oEvent.getSource().getSelectedKey();
        clienteID = selectedKeys;

        if (commessaID != null) {
          commessaID = null;
          // MessageBox.show("Cliente cambiato, commessa resettata");
          this.getView().byId("comboCommesse").setSelectedKey(null);
        }

        if (tipologiaID != null) {
          tipologiaID = null;
          // MessageBox.show("Cliente cambiato, Tipologia resettata");
          this.getView().byId("comboTipologie").setSelectedKey(null);
        }

        var commesseContexts = await this.getView()
          .getModel()
          .bindList("/Commesse")
          .requestContexts()
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

        // console.log(commesseList);
        var commesseModel = new JSONModel(commesseList);
        this.getView().setModel(commesseModel, "Commesse");
        var tipologiaModel = new JSONModel(tipologiaList);
        this.getView().setModel(tipologiaModel, "Tipologia");
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
            // console.log(campiObbligatori[i]);
            // console.log(modelloTicket[campiObbligatori[i]]);
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
        console.log(clienteID);
        console.log("ticket da salvare", newTicket);
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
        var oFileUploader = this.byId("fileUploader");
        this.saveTicket(
          newTicket,
          bindingFinal,
          oDataModel,
          myRouter,
          oFileUploader
        );
      },
    });
  }
);
