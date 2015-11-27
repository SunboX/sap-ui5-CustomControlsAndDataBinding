jQuery.sap.require('sap.ui.core.format.NumberFormat');
jQuery.sap.require('sap.ui.model.FilterOperator');

jQuery.sap.require('sap.m.MessageBox');

jQuery.sap.require('app.controls.AddItemDialog');
jQuery.sap.require('app.controls.ShoppingCartListItem');
jQuery.sap.require('app.controls.ShoppingCartFooter');

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
                    },
                    press: function (e) {
                        var model = e.getSource().getBindingContext('viewModel');
                        sap.m.MessageBox.show('You selected ' + model.getProperty('name'), {
                            icon: sap.m.MessageBox.Icon.INFORMATION,
                            title: 'Item selected'
                        });
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
            content: new sap.ui.layout.FixFlex({
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

                        var dialog = new app.controls.AddItemDialog({
                            cancel: function (view) {
                                dialog.close();
                            },
                            submit: function (view, e) {
                                var data = e.getParameter('dataSet');
                                if (data.name) {
                                    view.getModel('viewModel').appendToList('/items', data);
                                }
                                dialog.close();
                            }.bind(null, view)
                        })

                        dialog.open();

                    }.bind(null, view)
                }),
            })
        });
        return page;
    }
});
