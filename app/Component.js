sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
  ],


  //ciao :)
  function (UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("rapportini.Component", {
      metadata: {
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
        manifest: "json",
      },

      init: function () {
        UIComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize();
      },
    });
  }
);
