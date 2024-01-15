sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
  ],
  function (Controller, History, UIComponent) {
    "use strict";
    let modalitaScura = true;

    return Controller.extend("rapportini.controller.BaseController", {
      getRouter: function () {
        return UIComponent.getRouterFor(this);
      },

      onNavBack: function () {
        var oHistory, sPreviousHash;

        oHistory = History.getInstance();
        sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          this.getRouter().navTo("tabellaRapportini", {}, true);
        }
      },

      onDisplayNotFound: function () {
        this.getRouter().getTargets().display("notFound", {
          fromTarget: "Tabella",
        });
      },

      onNavToTable: function () {
        this.getRouter().navTo("tabellaRapportini");
      },

      onNavToTicketsTable: function () {
        this.getRouter().navTo("tickets");
      },

      onSwitchTheme: function () {
        modalitaScura = !modalitaScura;
        const globalData = this.getView().getModel("globalData");
        if (modalitaScura) {
          sap.ui.getCore().applyTheme("sap_horizon_dark");
          globalData.setProperty("/logoImagePath", "logoBianco.png");
          globalData.setProperty("/themeIcon", "light-mode");
        } else {
          sap.ui.getCore().applyTheme("sap_horizon");
          globalData.setProperty("/logoImagePath", "logoNero.png");
          globalData.setProperty("/themeIcon", "dark-mode");
        }
      },
    });
  }
);
