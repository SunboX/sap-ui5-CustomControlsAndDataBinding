$.sap.require('sap.m.MessageBox');

sap.ui.controller('app.controller.Main', {

    onInit: function () {
        var viewModel = new sap.ui.model.json.JSONModel({
            items: [{
                quantity: 2,
                name: 'Primitivo Red Wine',
                price: 16,
                deleted: false
            }, {
                quantity: 1,
                name: 'Oven Baked Potato Chips',
                price: 7.99,
                deleted: false
            }, {
                quantity: 1,
                name: 'Death Wish Ground Coffee',
                price: 19.99,
                deleted: false
            }, {
                quantity: 4,
                name: 'Croissants',
                price: 6,
                deleted: false
            }, {
                quantity: 1,
                name: 'Tempo Tissues 30 Pack',
                price: 4.95,
                deleted: true
            }],
            totalPrice: 49.98
        });
        this.getView().setModel(viewModel, 'viewModel');
    },

    checkout: function () {
        sap.m.MessageBox.show('You have to pay ' + this.getView().getModel('viewModel').getProperty('/totalPrice') + ' EUR at the checkout.', {
            icon: sap.m.MessageBox.Icon.INFORMATION,
            title: 'Checkout'
        });
    },

    addItem: function () {

    }
});
