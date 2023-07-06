sap.ui.define(
  ["sap/ui/core/ComponentContainer"],

  function (ComponentContainer) {
    "use strict";

    new ComponentContainer({
      name: "rapportini",
      settings: {
        id: "main",
      },
      async: true,
    }).placeAt("content");
  }
);
