$.sap.require('sap.ui.core.format.NumberFormat');
$.sap.require('sap.m.MessageBox');
$.sap.require('sap.m.Dialog');
$.sap.require('sap.ui.model.FilterOperator');

$.sap.require('app.controls.ShoppingCartListItem');
$.sap.require('app.controls.ShoppingCartFooter');

sap.ui.jsview('app.view.Main', {

    getControllerName: function () {
        return 'app.controller.Main';
    },

    createContent: function (controller) {
        var view = this;
        
        var numberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
            minFractionDigits: 2,
            maxFractionDigits: 2,
            groupingEnabled: true,
            groupingSeparator: '.',
            decimalSeparator: ','
        });
        
        var list = new sap.m.List(this.createId('shopping-cart-list'), {
            noDataText: 'Please add an item to your shopping cart.',
            items: {
                path: 'viewModel>/items',
                mode: sap.ui.model.BindingMode.OneWay,
                template: new app.controls.ShoppingCartListItem({
                    count: '{viewModel>quantity}',
                    title: '{viewModel>name}',
                    price: {
                        path: 'viewModel>price',
                        formatter: function (price) {
                            return numberFormat.format(price);
                        }
                    }
                }),
                filters: [
                    new sap.ui.model.Filter('deleted', sap.ui.model.FilterOperator.EQ, false)
                ]
            }
        }).addStyleClass('noDataTextMultilineCenter');

        var footer = new app.controls.ShoppingCartFooter({
            totalPrice: {
                path: 'viewModel>/totalPrice',
                formatter: function (totalPrice) {
                    if (!totalPrice) {
                        return '0,00';
                    }
                    return numberFormat.format(totalPrice);
                }
            }
        });

        var page = new sap.m.Page('main-page', {
            title: 'Shopping Cart Demo',
            showNavButton: false,
            showHeader: true,
            headerContent: new sap.m.Button({
                icon: 'sap-icon://cart-full',
                text: {
                    path: 'viewModel>/totalPrice',
                    formatter: function (price) {
                        return numberFormat.format(price);
                    }
                },
                press: function () {
                    controller.checkout();
                }
            }),
            content:  new sap.ui.layout.FixFlex({
                    fixFirst: false,
                    fixContentSize: '5rem',
                    flexContent: new sap.m.ScrollContainer({
                        vertical: true,
                        horizontal: false,
                        height: '100%',
                        content: list
                    }),
                    fixContent: footer
                }),
            footer: new sap.m.Bar({
                contentMiddle: new sap.m.Button({
                        text: 'Add item',
                        width: '100%',
                        type: sap.m.ButtonType.Emphasized,
                        press: function (view, e) {
                            
                            var model = new sap.ui.model.json.JSONModel({
                                quantity: null,
                                name: null,
                                price: null,
                                deleted: false
                            });
                            
                            var form = new sap.ui.layout.form.SimpleForm({
                                maxContainerCols: 2,
                                editable: true,
                                content: [
                                    new sap.m.Label({
                                        text: 'Quantity'
                                    }),
                                    new sap.m.Input({
                                        type: sap.m.InputType.Number,
                                        value: {
                                            path: '/quantity',
                                            //type: sap.ui.model.type.Integer
                                        }
                                    }),
                                    new sap.m.Label({
                                        text: 'Name'
                                    }),
                                    new sap.m.Input({
                                        type: sap.m.InputType.Text,
                                        value: '{/name}'
                                    }),
                                    new sap.m.Label({
                                        text: 'Price'
                                    }),
                                    new sap.m.Input({
                                        type: sap.m.InputType.Number,
                                        value: {
                                            path: '/price',
                                            //type: sap.ui.model.type.Float
                                        }
                                    }),
                                ]
                            });
                            
                            form.setModel(model);
                            
                            var dialog = new sap.m.Dialog({
                                modal: true,
                                title: 'Add a new item',
                                buttons: [
                                    new sap.m.Button({
                                        text : 'Cancel',
                                        press : function() {
                                            dialog.close();
                                        }
                                    }),
                                    new sap.m.Button({
                                        text : 'Add',
                                        type: sap.m.ButtonType.Emphasized,
                                        press : function(view) {
                                            var viewModel = view.getModel('viewModel');
                                            var items = viewModel.getProperty('/items');
                                            items.push(model.getData());
                                            viewModel.setProperty('/items', items)
                                            dialog.close();
                                        }.bind(null, view)
                                    })
                                ],
                                content: form
                            });
                            dialog.open();
                        }.bind(null, view)
                    }),
            })
        });
        return page;
    }

});
