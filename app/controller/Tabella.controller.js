sap.ui.define(
  [
    "rapportini/controller/BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/comp/smartvariants/PersonalizableInfo",
    "sap/ui/core/library",
  ],

  function (
    BaseController,
    MessageToast,
    Sorter,
    Filter,
    FilterOperator,
    PersonalizableInfo,
    CoreLibrary
  ) {
    "use strict";

    return BaseController.extend("rapportini.controller.Tabella", {
      onInit: async function () {
        var oRouter = this.getRouter();
        oRouter
          .getRoute("tabellaRapportini")
          .attachPatternMatched(this.onPatternMatched, this);

        this.applyData = this.applyData.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.getFiltersWithValues = this.getFiltersWithValues.bind(this);

        this.oSmartVariantManagement = this.getView().byId("svm");
        this.oExpandedLabel = this.getView().byId("expandedLabel");
        this.oSnappedLabel = this.getView().byId("snappedLabel");
        this.oFilterBar = this.getView().byId("filterbar");
        this.oTable = this.getView().byId("tabella");

        this.oFilterBar.registerFetchData(this.fetchData);
        this.oFilterBar.registerApplyData(this.applyData);
        this.oFilterBar.registerGetFiltersWithValues(this.getFiltersWithValues);

        /*var oPersInfo = new PersonalizableInfo({
          type: "filterBar",
          keyName: "persistencyKey",
          dataSource: "",
          control: this.oFilterBar,
        });
        this.oSmartVariantManagement.addPersonalizableControl(oPersInfo);
        this.oSmartVariantManagement.initialise(function () { },
          this.oFilterBar);*/

        var oDateColumn = this.getView().byId("giorno");
        this.getView().byId("tabella").sort(oDateColumn, CoreLibrary.SortOrder.Ascending);

        //STAVAMO LAVORANDO QUI
        /*const model = this.getOwnerComponent().getModel();

        const contextTickets = await model.bindList("/Tickets", undefined, undefined, undefined, {
          $expand: "IDCliente,IDCommessa,IDTipologia"
        }).requestContexts();
        const parametersTickets = ["utente", "IDCliente_descrizione", "titolo", "status", "assegnatoA", "IDCommessa_descrizione", "giorniStima", "giorniCons", "flagNeedDev", "flagNeedFunz", "allegato", "flagAms", "areaFunzionale", "flagBugFix", "flagCR", "chatPubblica", "flagDev", "flagFunz", "externalID", "giorniConsCliente", "giorniConsDev", "giorniStimaDev", "giorniStimaFunz", "IDParent", "ordineSap", "criticita", "nRilavorazioni", "supportoFunzionale", "testo", "IDTipologia_tipologia", "flagVisibileCliente"]
        const tickets = contextTickets.map(x => (x.getObject()));
        this.filterMultiComboBox(parametersTickets, tickets)*/
      },

      filterMultiComboBox: function (parameters, rapportini) {
        parameters.forEach((parameter) => {
          var oMultiComboBox = this.getView().byId(
            "idMultiComboBox-" + parameter
          );
          oMultiComboBox.removeAllItems();
          parameter = parameter.split("_");
          let uniqueItems = [];

          if (parameter.length > 1) {
            uniqueItems = [
              new Set(rapportini.map((x) => x[parameter[0]][parameter[1]])),
            ];
          } else {
            uniqueItems = [new Set(rapportini.map((x) => x[parameter[0]]))];
          }

          uniqueItems.forEach((item) => {
            oMultiComboBox.addItem(
              new sap.ui.core.Item({
                key: item,
                text: item,
              })
            );
          });
        });
      },

      onExit: function () {
        this.oModel = null;
        this.oSmartVariantManagement = null;
        this.oExpandedLabel = null;
        this.oSnappedLabel = null;
        this.oFilterBar = null;
        this.oTable = null;
        this._oTPC.destroy();
      },

      fetchData: function () {
        var aData = this.oFilterBar
          .getAllFilterItems()
          .reduce(function (aResult, oFilterItem) {
            aResult.push({
              groupName: oFilterItem.getGroupName(),
              fieldName: oFilterItem.getName(),
              fieldData: oFilterItem.getControl().getSelectedKeys(),
            });
            return aResult;
          }, []);
        return aData;
      },

      applyData: function (aData) {
        aData.forEach(function (oDataObject) {
          var oControl = this.oFilterBar.determineControlByName(
            oDataObject.fieldName,
            oDataObject.groupName
          );
          oControl.setSelectedKeys(oDataObject.fieldData);
        }, this);
      },

      getFiltersWithValues: function () {
        var aFiltersWithValue = this.oFilterBar
          .getFilterGroupItems()
          .reduce(function (aResult, oFilterGroupItem) {
            var oControl = oFilterGroupItem.getControl();

            if (
              oControl &&
              oControl.getSelectedKeys &&
              oControl.getSelectedKeys().length > 0
            ) {
              aResult.push(oFilterGroupItem);
            }

            return aResult;
          }, []);
        return aFiltersWithValue;
      },

      onSelectionChange: function (oEvent) {
        //this.oSmartVariantManagement.currentVariantSetModified(true);
        this.oFilterBar.fireFilterChange(oEvent);
      },

      onSearch: function () {
        var aTableFilters = this.oFilterBar
          .getFilterGroupItems()
          .reduce(function (aResult, oFilterGroupItem) {
            var oControl = oFilterGroupItem.getControl(),
              aSelectedKeys = oControl.getSelectedKeys(),
              aFilters = aSelectedKeys.map(function (sSelectedKey) {
                if (oFilterGroupItem.getName().substring(0, 2) == "ID") sSelectedKey = sSelectedKey.replace('.', '');
                if (oFilterGroupItem.getName() == "giorno") sSelectedKey = "29 giu 2023";
                return new Filter({
                  path: oFilterGroupItem.getName(),
                  operator: FilterOperator.EQ,
                  value1: sSelectedKey,
                });
              });

            if (aSelectedKeys.length > 0) {
              aResult.push(
                new Filter({
                  filters: aFilters,
                  and: false,
                })
              );
            }

            return aResult;
          }, []);

        this.oTable.getBinding("rows").filter(aTableFilters);
        this.oTable.setShowOverlay(false);
      },

      sortDate: function (oEvent) {
        var oView = this.getView();
        var oTable = oView.byId("tabella");
        var oDateColumn = oView.byId("giorno");

        console.log(CoreLibrary.SortOrder);
        oTable.sort(oDateColumn,);
        this._bSortColumnDescending = !this._bSortColumnDescending;
      },

      onFilterChange: function () {
        this._updateLabelsAndTable();
      },

      onAfterVariantLoad: function () {
        this._updateLabelsAndTable();
      },

      getFormattedSummaryText: function () {
        var aFiltersWithValues = this.oFilterBar.retrieveFiltersWithValues();

        if (aFiltersWithValues.length === 0) {
          return "No filters active";
        }

        if (aFiltersWithValues.length === 1) {
          return (
            aFiltersWithValues.length +
            " filter active: " +
            aFiltersWithValues.join(", ")
          );
        }

        return (
          aFiltersWithValues.length +
          " filters active: " +
          aFiltersWithValues.join(", ")
        );
      },

      getFormattedSummaryTextExpanded: function () {
        var aFiltersWithValues = this.oFilterBar.retrieveFiltersWithValues();

        if (aFiltersWithValues.length === 0) {
          return "No filters active";
        }

        var sText = aFiltersWithValues.length + " filters active",
          aNonVisibleFiltersWithValues =
            this.oFilterBar.retrieveNonVisibleFiltersWithValues();

        if (aFiltersWithValues.length === 1) {
          sText = aFiltersWithValues.length + " filter active";
        }

        if (
          aNonVisibleFiltersWithValues &&
          aNonVisibleFiltersWithValues.length > 0
        ) {
          sText += " (" + aNonVisibleFiltersWithValues.length + " hidden)";
        }

        return sText;
      },

      _updateLabelsAndTable: function () { },

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

      onDeleteAll: async function () {
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
    });
  }
);
