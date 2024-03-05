sap.ui.define([
    "rapportini/controller/BaseController",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/comp/smartvariants/PersonalizableInfo",
],

    function (BaseController, Sorter, Filter, FilterOperator, PersonalizableInfo) {
        return BaseController.extend("rapportini.controller.Tabelle", {
            onSort: function (oEvent) {
                if (typeof this.sortOrder == "undefined") {
                    this.sortOrder = false;
                }
                this.sortOrder = !this.sortOrder; //true = discendente, false = ascendente
                const sortKey = this.getView().byId("select-sort").getSelectedKey();
                this.oTable.getBinding("rows").sort((this.sortOrder == true ? "desc" : "asc") && new Sorter(sortKey, this.sortOrder));
            },
            filterMultiComboBox: function (parameters, objects) {
                parameters.forEach((parameter) => {
                    var oMultiComboBox = this.getView().byId(
                        "idMultiComboBox-" + parameter
                    );
                    oMultiComboBox.removeAllItems();
                    parameter = parameter.split("_");
                    let uniqueItems = [];

                    if (parameter.length > 1) {
                        uniqueItems = [
                            new Set(objects.map((x) => x[parameter[0]][parameter[1]])),
                        ];
                    } else {
                        uniqueItems = [new Set(objects.map((x) => x[parameter[0]]))];
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

        })
    }
)