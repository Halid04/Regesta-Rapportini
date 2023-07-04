sap.ui.define(
  ["rapportini/controller/BaseController", "sap/ui/model/json/JSONModel"],

  function (BaseController, JSONModel) {
    "use strict";
    let op;
    let IDCurrent;
    return BaseController.extend("rapportini.controller.CreazioneRapportini", {
      creaModelloVuoto: function () {
        return {
          modelloRapportino: {
            utente: "",
            giorno: new Date().toISOString().slice(0, 10),
            ore: 0.0,
            orarioNotturno: false,
            ticket: "",
            cliente: "",
            commessa: "",
            descrizione: "",
            sede: "",
            destinazione: "",
            km: 0,
            kmEuro: 0.0,
            pedaggio: 0.0,
            noleggio: 0.0,
            trasporti: 0.0,
            alloggio: 0.0,
            forfait: 0.0,
            vitto: 0.0,
            varie: 0.0,
            riservato: "",
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
            giorno: rapportino.giorno.slice(0, 10),
            ore: rapportino.ore,
            orarioNotturno: false,
            ticket: "",
            cliente: "",
            commessa: "",
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
            riservato: "",
            plus: rapportino.plus,
            fatturabile: rapportino.fatturabile,
            docente: rapportino.docente,
            corso: rapportino.corso,
          },
        };
      },

      onInit: function () {
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
              console.log(rapportini[IDCurrent - 1]);
              oData = this.creaModelloEsistente(rapportini[IDCurrent - 1]);
            }

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "JSONModel");
          }, this);
      },

      onSave: async function () {
        var modelloRapportino = this.getView()
          .getModel("JSONModel")
          .getProperty("/modelloRapportino");

        var contexts = await this.getView()
          .getModel()
          .bindList("/Rapportini")
          .requestContexts();
        var rapportini = contexts.map((x) => x.getObject());

        var newID = rapportini[rapportini.length - 1].ID + 1;

        let newRapportino = {
          ID: newID,
          IDUtente: 0,
          utente: modelloRapportino.utente,
          IDCliente: null,
          IDCommessa: null,
          IDClienteSede: null,
          IDProgetto: 0,
          IDProgettoAttivita: 0,
          IDToDoList: null,
          codice: "---",
          descrizione: modelloRapportino.descrizione,
          attivita: "---",
          sede: modelloRapportino.sede,
          destinazione: modelloRapportino.destinazione,
          giorno: new Date(modelloRapportino.giorno),
          ore: modelloRapportino.ore,
          oreLavorate: modelloRapportino.ore,
          km: parseFloat(modelloRapportino.km),
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
          IDToDoList2: null,
          ore2: modelloRapportino.ore,
          descrizione2: modelloRapportino.descrizione,
          ruolo: "---",
          bloccatoAdmin: false,
          IDCorso: 0,
          amsh24: false,
        };

        // console.log("Nuovo Rapportino creato", newRapportino);
        var oModel = this.getView().getModel();
        var oBinding = await oModel.bindList("/Rapportini");
        if (op == "nuovo" || op == "copia") {
          oBinding.create(newRapportino);
        } else {
          var contexts = await oBinding.requestContexts();
          var toEdit = contexts[IDCurrent - 1];
          var path = "/Rapportini(" + IDCurrent + ")";

          toEdit.setProperty(path + "/utente", newRapportino.utente);
          toEdit.setProperty(path + "/descrizione", newRapportino.descrizione);
          toEdit.setProperty(path + "/sede", newRapportino.sede);
          toEdit.setProperty(
            path + "/destinazione",
            newRapportino.destinazione
          );
          toEdit.setProperty(
            path + "/giorno",
            newRapportino.giorno.toISOString()
          );
          toEdit.setProperty(path + "/ore", newRapportino.ore);
          toEdit.setProperty(path + "/km", newRapportino.km);
          toEdit.setProperty(path + "/kmEuro", newRapportino.kmEuro);
          toEdit.setProperty(path + "/pedaggio", newRapportino.pedaggio);
          toEdit.setProperty(path + "/forfait", newRapportino.forfait);
          toEdit.setProperty(path + "/vitto", newRapportino.vitto);
          toEdit.setProperty(path + "/alloggio", newRapportino.alloggio);
          toEdit.setProperty(path + "/noleggio", newRapportino.noleggio);
          toEdit.setProperty(path + "/trasporti", newRapportino.trasporti);
          toEdit.setProperty(path + "/varie", newRapportino.varie);
          toEdit.setProperty(path + "/plus", newRapportino.plus);
          toEdit.setProperty(path + "/fatturabile", newRapportino.fatturabile);
          toEdit.setProperty(path + "/docente", newRapportino.docente);
        }

        oModel.submitBatch("myAppUpdateGroup");
        this.getRouter().navTo("tabellaRapportini");
      },
    });
  }
);
