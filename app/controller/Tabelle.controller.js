sap.ui.define([
    "rapportini/controller/BaseController",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/comp/smartvariants/PersonalizableInfo",
],

    function (BaseController, Sorter, Filter, FilterOperator, PersonalizableInfo) {
        return BaseController.extend("rapportini.controller.Tabelle", {
            // ORDINAMENTO //

            onSort: function (oEvent) {
                if (typeof this.sortOrder == "undefined") {
                    this.sortOrder = false;
                }
                this.sortOrder = !this.sortOrder; //true = discendente, false = ascendente
                const sortKey = this.getView().byId("select-sort").getSelectedKey();
                this.oTable.getBinding("rows").sort((this.sortOrder == true ? "desc" : "asc") && new Sorter(sortKey, this.sortOrder));
            },

            clearSortings: function () {
                this.oTable.getBinding("rows").sort(undefined && new Sorter(sortKey, this.sortOrder));
            },

            // FILTRI //

            setupFilterBar: function () {
                this.oFilterBar = this.getView().byId("filterbar");
                this.oTable = this.getView().byId("tabella");

                this.oFilterBar.registerFetchData(this.fetchData.bind(this));
                this.oFilterBar.registerApplyData(this.applyData.bind(this));
                this.oFilterBar.registerGetFiltersWithValues(this.getFiltersWithValues.bind(this));
            },

            // COMPORTAMENTO FILTERBAR //

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
                this.oFilterBar.fireFilterChange(oEvent);
            },

            // RIMOZIONE DUPLICATI DALLE MULTI-COMBOBOX //

            keepUnique: function (items, key) {
                let uniqueTexts = [];
                return items.filter(x => {
                    if (uniqueTexts.includes(x[key])) {
                        return false;
                    }
                    uniqueTexts.push(x[key]);
                    return true;
                });
            },

            filterMultiComboBoxes: function (parameters, objects) {
                parameters.forEach((parameter) => {
                    var oMultiComboBox = this.getView().byId(
                        "FilterComboBox-" + parameter
                    );
                    oMultiComboBox?.removeAllItems();
                    const keys = parameter.split("_");

                    //Se il parametro appartiene alla tabella (es. titolo)

                    let items = objects
                        .map(x => {
                            return {
                                key: x[keys[0]], text: x[keys[0]]
                            }
                        })
                        .filter(x => x["key"] != null && x["text"] != null);

                    //Se il parametro si riferisce a una tabella esterna (es. IDCliente_descrizione)
                    if (keys[1] != null) {
                        //le x saranno per forza oggetti e non parametri semplici
                        items = items.map(x => {
                            return {
                                key: x["text"]["ID"], text: x["text"][keys[1]]
                            };
                        });
                    }

                    const uniqueItems = this.keepUnique(items, "key");

                    for (const item of uniqueItems) {
                        oMultiComboBox?.addItem(
                            new sap.ui.core.Item({
                                key: item.key,
                                text: item.text,
                            })
                        );
                    }
                });
            },

            // FILTRAGGIO //

            onSearch: function () {
                var aTableFilters = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
                    var oControl = oFilterGroupItem.getControl(),
                        aSelectedKeys = oControl.getSelectedKeys(),
                        aFilters = aSelectedKeys.map(function (sSelectedKey) {
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

            onExit: function () {
                this.oModel = null;
                this.oFilterBar = null;
                this.oTable = null;
                this._oTPC.destroy();
            },

        })
    }
)