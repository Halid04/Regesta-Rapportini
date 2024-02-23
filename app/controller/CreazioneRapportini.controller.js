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
    let IDUtentiCreati = [];
    let ticketID;
    let clienteID;
    let commessaID;
    return BaseController.extend("rapportini.controller.CreazioneRapportini", {
      generateIDUtente: function () {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
        );
      },

      onCheckIDUtente: function () {
        let UUID = this.generateIDUtente();
        let alreadyCreated = IDUtentiCreati.includes(UUID);

        if (!alreadyCreated) {
          IDUtentiCreati.push(UUID);
          return UUID;
        } else {
          this.onCheckIDUtente();
        }
      },

      creaModelloVuoto: function () {
        return {
          modelloRapportino: {
            utente: this.getView()
              .getModel("globalData")
              .getProperty("/myUsername"),
            giorno: new Date(),
            ore: 0.5,
            orarioNotturno: false,
            ticket: "",
            cliente: "",
            commessa: "",
            descrizione: "",
            sede: "Ufficio",
            destinazione: "Nessuna",
            km: 0,
            kmEuro: 0.0,
            pedaggio: 0.0,
            noleggio: 0.0,
            trasporti: 0.0,
            alloggio: 0.0,
            forfait: 0.0,
            vitto: 0.0,
            varie: 0.0,
            riservato: 0.0,
            plus: false,
            fatturabile: false,
            docente: "",
            corso: "",
          },
        };
      },

      creaModelloEsistente: function (rapportino) {
        return {
          modelloRapportino: {
            utente: rapportino.utente,
            giorno: new Date(rapportino.giorno),
            ore: rapportino.ore,
            orarioNotturno: false,
            ticket: rapportino.IDTicket_ID,
            cliente: rapportino.IDCliente_ID,
            commessa: rapportino.IDCommessa_ID,
            descrizione: rapportino.descrizione,
            sede: rapportino.sede,
            destinazione: rapportino.destinazione,
            km: rapportino.km,
            kmEuro: rapportino.kmEuro,
            pedaggio: rapportino.pedaggio,
            noleggio: rapportino.noleggio,
            trasporti: rapportino.trasporti,
            alloggio: rapportino.alloggio,
            forfait: rapportino.forfait,
            vitto: rapportino.vitto,
            varie: rapportino.varie,
            riservato: 0.0,
            plus: rapportino.plus,
            fatturabile: rapportino.fatturabile,
            docente: rapportino.docente,
            corso: rapportino.corso,
          },
        };
      },

      findMonteore: function (allRapportini, utente, giorno) {
        var monteoreUser = 0.0;
        for (var i = 0; i < allRapportini.length; i++) {
          console.log(allRapportini[i].giorno);
          if (
            allRapportini[i].utente.localeCompare(utente) == 0 &&
            allRapportini[i].giorno.slice(0, 10).localeCompare(giorno) == 0
          ) {
            console.log(allRapportini[i]);
            monteoreUser += parseFloat(allRapportini[i].ore);
            console.log(monteoreUser);
          }
        }
        return monteoreUser;
      },

      onInit: async function () {
        var oRouter = this.getRouter();
        oRouter
          .getRoute("creaRapportino")
          .attachPatternMatched(async function (oEvent) {
            op = window.decodeURIComponent(
              oEvent.getParameter("arguments").operationID
            );
            IDCurrent = window.decodeURIComponent(
              oEvent.getParameter("arguments").IDRapportino
            );

            var oData = this.creaModelloVuoto();
            if (op != "nuovo") {
              var contexts = await this.getView()
                .getModel()
                .bindList("/Rapportini")
                .requestContexts();
              var rapportini = contexts.map((x) => x.getObject());

              let value = rapportini.find((element) => {
                return element.ID === IDCurrent;
              });
              let index = rapportini.indexOf(value);
              oData = this.creaModelloEsistente(rapportini[index]);
            }

            var ticketContexts = await this.getView()
              .getModel()
              .bindList("/Tickets")
              .requestContexts();
            var ticket = ticketContexts.map((x) => x.getObject());
            console.log(ticket);
            console.log("onInit");
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "JSONModel");
          }, this);
        console.log(this.getView().getModel("JSONModel"));
      },
      handleSelectionChangeTicket: async function (oEvent) {
        let selectedKeys = oEvent.getSource().getSelectedKey();
        ticketID = selectedKeys;

        var contexts = await this.getView()
          .getModel()
          .bindList("/Tickets")
          .requestContexts();
        var tickets = contexts.map((x) => x.getObject());
        var ticket = tickets.find((element) => {
          return element.ID === ticketID;
        });
        clienteID = ticket.IDCliente_ID;
        commessaID = ticket.IDCommessa_ID;

        this.getView().byId("comboClienti").setSelectedKey(clienteID);
        this.getView().byId("comboCommesse").setSelectedKey(commessaID);
      },
      saveRapportino: function (
        rapportino,
        binding,
        monteore,
        globalData,
        oDataModel,
        myRouter
      ) {
        //Salva / copia rapportino

        if (op == "nuovo" || op == "copia") {
          binding.create(rapportino);
          console.log("Rapportino creato / copiato con successo 👍");
        } else {
          //Edita rapportino esistente

          var path = "/Rapportini(" + IDCurrent + ")";
          const properties = [
            "utente",
            "IDTicket_ID",
            "IDCliente_ID",
            "IDCommessa_ID",
            "descrizione",
            "sede",
            "destinazione",
            "giorno",
            "ore",
            "km",
            "kmEuro",
            "pedaggio",
            "forfait",
            "vitto",
            "alloggio",
            "noleggio",
            "trasporti",
            "varie",
            "plus",
            "fatturabile",
            "docente",
          ];

          //rapportino.giorno = rapportino.giorno.toISOString();
          for (var i = 0; i < properties.length; i++) {
            binding.setProperty(
              path + "/" + properties[i],
              rapportino[properties[i]]
            );
          }

          console.log("Rapportino modificato con successo 👍");
        }

        //Assegna il monteore giornaliero dell'utente

        if (
          rapportino.utente === globalData.getProperty("/myUsername") &&
          globalData.getProperty("/today") === rapportino.giorno.slice(0, 10)
        ) {
          // console.log("sovrascrivi monteore");
          globalData.setProperty("/monteore", monteore);
        }

        //Operazioni finali

        oDataModel.submitBatch("myAppUpdateGroup");
        myRouter.navTo("tabellaRapportini");
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
        var modelloRapportino = this.getView()
          .getModel("JSONModel")
          .getProperty("/modelloRapportino");

        const campiObbligatori = ["utente", "giorno", "ticket", "descrizione"];

        for (var i = 0; i < campiObbligatori.length; i++) {
          if (
            modelloRapportino[campiObbligatori[i]] == "" ||
            modelloRapportino[campiObbligatori[i]] == null
          ) {
            MessageToast.show("Per favore, compila tutti i campi obbligatori");
            return;
          }
        }

        let newRapportino = {
          ID: this.onCheckIDUtente(),
          IDUtente: 0,
          utente: modelloRapportino.utente,
          IDCliente_ID: parseInt(clienteID),
          IDCommessa_ID: parseInt(commessaID),
          IDClienteSede: null,
          IDProgetto: 0,
          IDProgettoAttivita: 0,
          IDTicket_ID: ticketID,
          codice: "---",
          descrizione: modelloRapportino.descrizione,
          attivita: "---",
          sede: modelloRapportino.sede,
          destinazione: modelloRapportino.destinazione,
          giorno: this.dateFormater(modelloRapportino.giorno),
          ore: modelloRapportino.ore,
          oreLavorate: modelloRapportino.ore,
          km: parseInt(modelloRapportino.km),
          kmEuro: modelloRapportino.kmEuro,
          pedaggio: modelloRapportino.pedaggio,
          forfait: modelloRapportino.forfait,
          vitto: modelloRapportino.vitto,
          alloggio: modelloRapportino.alloggio,
          noleggio: modelloRapportino.noleggio,
          trasporti: modelloRapportino.trasporti,
          varie: modelloRapportino.varie,
          plus: modelloRapportino.plus,
          fatturabile: modelloRapportino.fatturabile,
          bloccato: false,
          speseVarie: 0.0,
          docente: modelloRapportino.docente,
          IDCommessa2: null,
          IDTicket2: null,
          ore2: modelloRapportino.ore,
          descrizione2: modelloRapportino.descrizione,
          ruolo: "---",
          bloccatoAdmin: false,
          IDCorso: 0,
          amsh24: modelloRapportino.orarioNotturno,
        };

        //Calcola monteore giornaliero dell'utente, considerando anche il nuovo rapportino o le nuove modifiche

        var oDataModel = this.getView().getModel();
        var oBinding = await oDataModel.bindList("/Rapportini");
        var contexts = await oBinding.requestContexts();
        var allRapportini = contexts.map((x) => x.getObject());
        if (op == "nuovo" || op == "copia") allRapportini.push(newRapportino);
        else {
          for (var i = 0; i < allRapportini.length; i++) {
            if (allRapportini[i].ID == IDCurrent)
              allRapportini[i].ore = newRapportino.ore;
          }
        }

        var monteoreUser = this.findMonteore(
          allRapportini,
          newRapportino.utente,
          newRapportino.giorno.slice(0, 10)
        );

        var bindingFinal = oBinding;
        if (op == "modifica") {
          let value = contexts.find((element) => {
            return element.getObject().ID === IDCurrent;
          });
          let index = contexts.indexOf(value);
          bindingFinal = contexts[index];
        }

        var globalData = this.getView().getModel("globalData");
        var myRouter = this.getRouter();

        if (monteoreUser > 15) {
          MessageToast.show(
            "Il monteore giornaliero non può essere più grande di 15h!"
          );
          return;
        } else if (monteoreUser <= 8) {
          this.saveRapportino(
            newRapportino,
            bindingFinal,
            monteoreUser,
            globalData,
            oDataModel,
            myRouter
          );
        } else {
          MessageBox.confirm(
            "Il tuo monteore giornaliero supera le 8h. Vuoi comunque aggiungere il rapportino?",
            {
              title: "Confirm", // default
              saveRapportino: this.saveRapportino,
              onClose: function (oAction) {
                if (oAction == "OK") {
                  {
                    this.saveRapportino(
                      newRapportino,
                      bindingFinal,
                      monteoreUser,
                      globalData,
                      oDataModel,
                      myRouter
                    );
                  }
                }
              }, // default
              styleClass: "", // default
              actions: [
                sap.m.MessageBox.Action.OK,
                sap.m.MessageBox.Action.CANCEL,
              ], // default
              emphasizedAction: sap.m.MessageBox.Action.OK, // default
              initialFocus: null, // default
              textDirection: sap.ui.core.TextDirection.Inherit,
            }
          );
        }
      },
    });
  }
);
