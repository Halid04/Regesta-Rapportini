sap.ui.define(['sap/ui/thirdparty/jquery'],
	function(jQuery) {
	"use strict";
	var PersoService = {
		oData : {
			_persoSchemaVersion: "1.0",
			aColumns : [
				{
					id: "regestaTickets-ticketsTable-IDCol",
					order: 0,
					text: "ID",
					visible: true
				},
				{
					id: "regestaTickets-ticketsTable-UtenteCol",
					order: 1,
					text: "Utente",
					visible: true
				},
				{
					id: "regestaTickets-ticketsTable-ClienteCol",
					order: 2,
					text: "Cliente",
					visible: true
				},
				{
					id: "regestaTickets-ticketsTable-TitoloCol",
					order: 3,
					text: "Titolo",
					visible: true
				},
				{
					id: "regestaTickets-ticketsTable-StatoCol",
					order: 4,
					text: "Stato",
					visible: true
				},
				{
					id: "regestaTickets-ticketsTable-DataInseritaCol",
					order: 5,
					text: "Data Inserita",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-DataRichiestaCol",
					order: 6,
					text: "Data Richiesta",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-AssegnatoACol",
					order: 7,
					text: "Assegnato A",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-CommessaCol",
					order: 8,
					text: "Commessa",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-GiorniStimaCol",
					order: 9,
					text: "Giorni Stimati",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-DataConfermataCol",
					order: 10,
					text: "Data Confermata",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-GiorniConsultativiCol",
					order: 11,
					text: "Giorni Cons",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-AlertDevCol",
					order: 12,
					text: "Alert Dev",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-AlertFunzCol",
					order: 13,
					text: "Alert Funz",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-AllegatiCol",
					order: 14,
					text: "Allegati",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-AmsCol",
					order: 15,
					text: "Ams",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-AreaCol",
					order: 16,
					text: "Area",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-AssegnabileACol",
					order: 17,
					text: "Assegnabile A",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-BugFixingCol",
					order: 18,
					text: "Bug Fixing",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-ChangeRequestCol",
					order: 19,
					text: "Change Request",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-ChatClienteCol",
					order: 20,
					text: "Chat Cliente",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-ChiusuraCol",
					order: 21,
					text: "Chiusura",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-DataChiusuraCol",
					order: 22,
					text: "DataChiusura",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-DataFineSviluppiCol",
					order: 23,
					text: "Data fine sviluppi",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-DataProduzioneCol",
					order: 24,
					text: "Data Produzione",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-DevCol",
					order: 25,
					text: "Dev?",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-FunzCol",
					order: 26,
					text: "Funz?",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-EsecuzioneCol",
					order: 27,
					text: "Esecuzione",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-ExternalIDCol",
					order: 28,
					text: "External ID",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-FileCol",
					order: 29,
					text: "File",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-GGConsClienteCol",
					order: 30,
					text: "GG Cons Cliente",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-GGConsDevCol",
					order: 31,
					text: "GG Cons Dev",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-GGPrevDevCol",
					order: 32,
					text: "GG Prev Dev",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-GGPrevFunzCol",
					order: 33,
					text: "GG Prev Funz",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-IDParentCol",
					order: 34,
					text: "ID Parent",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-InfoInterneCol",
					order: 35,
					text: "Info Interne",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-OrdineSapCol",
					order: 36,
					text: "Ordine Sap",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-PrioritaCol",
					order: 37,
					text: "Priorità",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-RichiestaCol",
					order: 38,
					text: "Richiesta",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-RilavorazioniCol",
					order: 39,
					text: "Rilavorazioni",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-SupportoFunzionaleCol",
					order: 40,
					text: "Supporto Funzionale",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-TestoCol",
					order: 41,
					text: "Testo",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-TipologiaCol",
					order: 42,
					text: "Tipologia",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-UrgenzaCol",
					order: 43,
					text: "Urgenza",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-VisibileClienteCol",
					order: 44,
					text: "Visibile Cliente",
					visible: false,
				}
			]
		},
		oResetData : {
			_persoSchemaVersion: "1.0",
			aColumns : [
				{
					id: "regestaTickets-ticketsTable-IDCol",
					order: 0,
					text: "ID",
					visible: true
				},
				{
					id: "regestaTickets-ticketsTable-UtenteCol",
					order: 0,
					text: "Utente",
					visible: true
				},
				{
					id: "regestaTickets-ticketsTable-ClienteCol",
					order: 0,
					text: "Cliente",
					visible: true
				},
				{
					id: "regestaTickets-ticketsTable-TitoloCol",
					order: 0,
					text: "Titolo",
					visible: true
				},
				{
					id: "regestaTickets-ticketsTable-StatoCol",
					order: 0,
					text: "Stato",
					visible: true
				},
				{
					id: "regestaTickets-ticketsTable-DataInseritaCol",
					order: 0,
					text: "Data Inserita",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-DataRichiestaCol",
					order: 0,
					text: "Data Richiesta",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-AssegnatoACol",
					order: 0,
					text: "Assegnato A",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-CommessaCol",
					order: 0,
					text: "Commessa",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-GiorniStimaCol",
					order: 0,
					text: "Giorni Stimati",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-DataConfermataCol",
					order: 0,
					text: "Data Confermata",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-GiorniConsultativiCol",
					order: 0,
					text: "Giorni Cons",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-AlertDevCol",
					order: 0,
					text: "Alert Dev",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-AlertFunzCol",
					order: 0,
					text: "Alert Funz",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-AllegatiCol",
					order: 0,
					text: "Allegati",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-AmsCol",
					order: 0,
					text: "Ams",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-AreaCol",
					order: 0,
					text: "Area",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-AssegnabileACol",
					order: 0,
					text: "Assegnabile A",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-BugFixingCol",
					order: 0,
					text: "Bug Fixing",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-ChangeRequestCol",
					order: 0,
					text: "Change Request",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-ChatClienteCol",
					order: 0,
					text: "Chat Cliente",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-ChiusuraCol",
					order: 0,
					text: "Chiusura",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-DataChiusuraCol",
					order: 0,
					text: "DataChiusura",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-DataFineSviluppiCol",
					order: 0,
					text: "Data fine sviluppi",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-DataProduzioneCol",
					order: 0,
					text: "Data Produzione",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-DevCol",
					order: 0,
					text: "Dev?",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-FunzCol",
					order: 0,
					text: "Funz?",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-EsecuzioneCol",
					order: 0,
					text: "Esecuzione",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-ExternalIDCol",
					order: 0,
					text: "External ID",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-FileCol",
					order: 0,
					text: "File",
					visible: false
				},
				{
					id: "regestaTickets-ticketsTable-GGConsClienteCol",
					order: 0,
					text: "GG Cons Cliente",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-GGConsDevCol",
					order: 0,
					text: "GG Cons Dev",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-GGPrevDevCol",
					order: 0,
					text: "GG Prev Dev",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-GGPrevFunzCol",
					order: 0,
					text: "GG Prev Funz",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-IDParentCol",
					order: 0,
					text: "ID Parent",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-InfoInterneCol",
					order: 0,
					text: "Info Interne",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-OrdineSapCol",
					order: 0,
					text: "Ordine Sap",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-PrioritaCol",
					order: 0,
					text: "Priorità",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-RichiestaCol",
					order: 0,
					text: "Richiesta",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-RilavorazioniCol",
					order: 0,
					text: "Rilavorazioni",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-SupportoFunzionaleCol",
					order: 0,
					text: "Supporto Funzionale",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-TestoCol",
					order: 0,
					text: "Testo",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-TipologiaCol",
					order: 0,
					text: "Tipologia",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-UrgenzaCol",
					order: 0,
					text: "Urgenza",
					visible: false,
				},
				{
					id: "regestaTickets-ticketsTable-VisibileClienteCol",
					order: 0,
					text: "Visibile Cliente",
					visible: false,
				}
			]
		},

		getPersData : function () {
			var oDeferred = new jQuery.Deferred();
			if (!this._oBundle) {
				this._oBundle = this.oData;
			}
			oDeferred.resolve(this._oBundle);
			return oDeferred.promise();
		},

		setPersData : function (oBundle) {
			var oDeferred = new jQuery.Deferred();
			this._oBundle = oBundle;
			oDeferred.resolve();
			return oDeferred.promise();
		},

		getResetPersData : function () {
			var oDeferred = new jQuery.Deferred();
			setTimeout(function() {
				oDeferred.resolve(this.oResetData);
			}.bind(this), 2000);

			return oDeferred.promise();
		},

		resetPersData : function () {
			var oDeferred = new jQuery.Deferred();
			this._oBundle = this.oResetData;
			oDeferred.resolve();
			
			return oDeferred.promise();
		}
	};

	return PersoService;

});