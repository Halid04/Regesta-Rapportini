sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
  ],
  function (Controller, MessageToast, JSONModel) {
    "use strict";
    let c = 0;
    return Controller.extend("rapportini.controller.App", {
      onInit: function () {
        axios
          .get("http://localhost:4004/App/TblRapportini")
          .then(function (response) {
            let index = response.data.value.length;
            index--;
            c = response.data.value[index].IDRapportino;

            console.log(c);
          });

        // set data model on view
        var oData = {
          rapportini: {
            utente: "",
            giorno: new Date(),
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
          rapportini: [],
        };
        var oModel = new JSONModel(oData);
        this.getView().setModel(oModel);
      },
      onPostRapportini: function () {
        c++;

        const IDRapportino = c;

        const IDUtente = 109;

        const utente = this.getView()
          .getModel()
          .getProperty("/rapportini/utente");

        const IDClienteSede = 22;

        const IDProgetto = 321;

        const IDProgettoAttivita = 585;

        const IDTodoList = 987;

        const codice = "codeiceBoh";

        const descrizione = this.getView()
          .getModel()
          .getProperty("/rapportini/descrizione");

        const attivita = "attivitaBoh";

        const sede = this.getView().getModel().getProperty("/rapportini/sede");

        const destinazione = this.getView()
          .getModel()
          .getProperty("/rapportini/destinazione");

        const giorno = this.getView()
          .getModel()
          .getProperty("/rapportini/giorno");

        const ore = this.getView().getModel().getProperty("/rapportini/ore");

        const oreLavorate = 15;

        const km = this.getView().getModel().getProperty("/rapportini/km");

        const kmEuro = this.getView()
          .getModel()
          .getProperty("/rapportini/kmEuro");

        const pedaggio = this.getView()
          .getModel()
          .getProperty("/rapportini/pedaggio");

        const forfait = this.getView()
          .getModel()
          .getProperty("/rapportini/forfait");

        const vitto = this.getView()
          .getModel()
          .getProperty("/rapportini/vitto");

        const alloggio = this.getView()
          .getModel()
          .getProperty("/rapportini/alloggio");

        const noleggio = this.getView()
          .getModel()
          .getProperty("/rapportini/noleggio");

        const trasporti = this.getView()
          .getModel()
          .getProperty("/rapportini/trasporti");

        const varie = this.getView()
          .getModel()
          .getProperty("/rapportini/varie");

        const plus = this.getView().getModel().getProperty("/rapportini/plus");

        const fatturabile = this.getView()
          .getModel()
          .getProperty("/rapportini/fatturabile");

        const bloccato = false;

        const speseVarie = 812.2;

        const docente = this.getView()
          .getModel()
          .getProperty("/rapportini/docente");

        const IDCommessa2 = 1987;

        const IDTodoList2 = 1221;

        const ore2 = 23.9;

        const descrizione2 = "descrizioneBoh";

        const ruolo = "ruoloBoh";

        const bloccatoAdmin = false;

        const IDCorso = 432;

        const amsh24 = false;

        axios
          .post("http://localhost:4004/App/TblRapportini", {
            IDRapportino: IDRapportino,
            IDUtente: IDUtente,
            utente: utente,
            IDClienteSede: IDClienteSede,
            IDProgetto: IDProgetto,
            IDProgettoAttivita: IDProgettoAttivita,
            IDTodoList: IDTodoList,
            codice: codice,
            descrizione: descrizione,
            attivita: attivita,
            sede: sede,
            destinazione: destinazione,
            giorno: new Date(giorno),
            ore: ore,
            oreLavorate: oreLavorate,
            km: parseInt(km),
            kmEuro: kmEuro,
            pedaggio: pedaggio,
            forfait: forfait,
            vitto: vitto,
            alloggio: alloggio,
            noleggio: noleggio,
            trasporti: trasporti,
            varie: varie,
            plus: plus,
            fatturabile: fatturabile,
            bloccato: bloccato,
            speseVarie: speseVarie,
            docente: docente,
            IDCommessa2: IDCommessa2,
            IDTodoList2: IDTodoList2,
            ore2: ore2,
            descrizione2: descrizione2,
            ruolo: ruolo,
            bloccatoAdmin: bloccatoAdmin,
            IDCorso: IDCorso,
            amsh24: amsh24,
          })
          .then(function (resp) {
            console.log(resp.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    });
  }
);
