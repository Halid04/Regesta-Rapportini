sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
  ],

  function (UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("rapportini.Component", {
      metadata: {
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
        manifest: "json",
      },

      init: async function () {
        UIComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize();

        var oData = {
          myUsername: "marco.sarnico",
          today: new Date().toISOString().slice(0, 10),
          monteore: 0.0,
          usernameSuffix: "marco.sarnico (tu)",
          logoImagePath: "logoBianco.png",
          themeIcon: "light-mode",
        };

        var oModel = this.getModel();
        var oBinding = await oModel.bindList("/Rapportini");
        var contexts = await oBinding.requestContexts();
        var allRapportini = contexts.map((x) => x.getObject());

        for (var i = 0; i < allRapportini.length; i++) {
          if (
            allRapportini[i].utente.localeCompare(oData.myUsername) == 0 &&
            allRapportini[i].giorno.slice(0, 10).localeCompare(oData.today) == 0
          ) {
            console.log(allRapportini[i]);
            oData.monteore += parseFloat(allRapportini[i].ore);
            // console.log(monteoreUser);
          }
        }

        this.setModel(new JSONModel(oData), "globalData");
      },
    });
  }
);
