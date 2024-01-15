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
            utente: "",
            areaFunzionale: "",
            titolo: "",
            testo: "",
            assegnatoA: "",
            criticita: "",
            dataConsegnaRichiesta: null,
            status: 0,
            dataConsegnaSchedulata: null,
            allegato: "",
            flagVisibileCliente: false,
            flagBugFix: false,
            ultimaModifica: null,
          },
        };
      },
      creaModelloEsistente: function (ticket) {
        return {
          modelloTicket: {
            utente: ticket.utente,
            areaFunzionale: ticket.areaFunzionale,
            titolo: ticket.titolo,
            testo: ticket.testo,
            assegnatoA: ticket.assegnatoA,
            criticita: ticket.criticita,
            dataConsegnaRichiesta: new Date(ticket.dataConsegnaRichiesta),
            status: ticket.status,
            dataConsegnaSchedulata: new Date(ticket.dataConsegnaSchedulata),
            allegato: ticket.allegato,
            flagVisibileCliente: ticket.flagVisibileCliente,
            flagBugFix: ticket.flagBugFix,
            ultimaModifica: ticket.ultimaModifica,
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
              console.log(tickets[index]);
              oData = this.creaModelloEsistente(tickets[index]);
            }

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "JSONModel");
          }, this);
      },
      saveTicket: function (ticket, binding, oDataModel, myRouter) {
        if (op == "nuovo" || op == "copia") {
          binding.create(ticket);
          console.log("ticket creato / copiato con successo 👍");
        } else {
          var path = "/Tickets(" + IDCurrent + ")";

          const properties = [
            "utente",
            "areaFunzionale",
            "titolo",
            "testo",
            "assegnatoA",
            "criticita",
            "dataConsegnaRichiesta",
            "status",
            "dataConsegnaSchedulata",
            "allegato",
            "flagVisibileCliente",
            "flagBugFix",
            "ultimaModifica",
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

      onSave: async function () {
        function dateFormater(date) {
          if (date) {
            return (
              date.getFullYear() +
              "-" +
              String(date.getMonth() + 1).padStart(2, "0") +
              "-" +
              String(date.getDate()).padStart(2, "0")
            );
          }
        }

        var modelloTicket = this.getView()
          .getModel("JSONModel")
          .getProperty("/modelloTicket");
        const currentDate = new Date();

        let newTicket = {
          ID: this.onCheckIDTickets(),
          insertDate: dateFormater(currentDate),
          utente: modelloTicket.utente,
          IDCliente: null,
          IDCommessa: null,
          areaFunzionale: modelloTicket.areaFunzionale,
          titolo: modelloTicket.titolo,
          testo: modelloTicket.testo,
          propostoA: "",
          giorniStima: 0.0,
          dataConsegnaRichiesta: dateFormater(
            modelloTicket.dataConsegnaRichiesta
          ),
          assegnatoA: modelloTicket.assegnatoA,
          giorniCons: 0.0,
          dataConsegnaSchedulata: dateFormater(
            modelloTicket.dataConsegnaSchedulata
          ),
          status: parseInt(modelloTicket.status),
          dataChiusura: null,
          ordinamento: 0,
          allegato: modelloTicket.allegato,
          statusPrev: 0,
          externalID: null,
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
          giorniStimaDev: 0.0,
          giorniStimaFunz: 0.0,
          giorniConsFunz: 0.0,
          dataSviluppi: null,
          flagDev: false,
          flagFunz: false,
          criticita: modelloTicket.criticita,
          flagPadre: false,
          flagFiglio: false,
          nRilavorazioni: 0,
          supportoFunzionale: "",
          flagNeedDev: false,
          flagNeedFunz: false,
          flagIngegnerizzabile: false,
          nAllegati: 0,
          ordineSap: "",
          ultimaModifica: dateFormater(currentDate),
          ultimaModificaUtente: null,
          ultimaModificaCliente: null,
          ultimaModificaUtenteCliente: null,
          flagAms: false,
          IDTipologia: null,
          inoltraA: "",
          messageID: "",
        };
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

        this.saveTicket(newTicket, bindingFinal, oDataModel, myRouter);
      },
    });
  }
);
