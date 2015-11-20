sap.ui.define([
	'sap/m/Dialog', 'sap/m/DialogRenderer', 'sap/ui/core/EnabledPropagator', 'sap/m/BackgroundDesign', 'sap/m/Button', 'sap/m/ButtonType', 'sap/ui/model/json/JSONModel', 'sap/ui/layout/form/SimpleForm', 'sap/m/Label', 'sap/m/Input', 'sap/m/InputType'
], function (Dialog, DialogRenderer, EnabledPropagator, BackgroundDesign, Button, ButtonType, JSONModel, SimpleForm, Label, Input, InputType) {
	'use strict';

	var AddItemDialog = Dialog.extend('app.controls.AddItemDialog', {
		metadata: {
			properties: {
				modal: { type: 'boolean', group: 'Misc', defaultValue: true }
			},
			events: {
				submit: {},
				cancel: {}
			}
		},
		renderer: function (rm, control) {
			DialogRenderer.render.apply(this, arguments);
		}
	});

	EnabledPropagator.apply(AddItemDialog.prototype, [
		true
	]);

	AddItemDialog.prototype.init = function (event) {
		Dialog.prototype.init.apply(this, arguments);
		this._createDialog();
	};

	AddItemDialog.prototype._createDialog = function () {

		this.setTitle('Add a new item');

		var model = new JSONModel({
			quantity: null,
			name: null,
			price: null,
			deleted: false
		});

		var form = new SimpleForm({
			backgroundDesign: BackgroundDesign.Transparent,
			maxContainerCols: 2,
			editable: true,
			content: [
				new Label({
					text: 'Quantity'
				}),
				new Input({
					type: InputType.Number,
					value: {
						path: '/quantity',
						type: new sap.ui.model.type.Integer()
					}
				}),
				new Label({
					text: 'Name'
				}),
				new Input({
					type: InputType.Text,
					value: '{/name}'
				}),
				new Label({
					text: 'Price'
				}),
				new Input({
					type: InputType.Number,
					value: {
						path: '/price',
						type: new sap.ui.model.type.Float()
					}
				}),
			]
		});

		form.setModel(model);

		this.addButton(new Button({
			text: 'Cancel',
			press: function () {
				this.fireCancel({});
			}.bind(this)
		}));

		this.addButton(new Button({
			text: 'Add',
			type: ButtonType.Emphasized,
			press: function (view) {
				this.fireSubmit({
					dataSet: model.getData()
				});
			}.bind(this)
		}));

		this.addContent(form);
	};

	AddItemDialog.prototype.onAfterRendering = function () {
		Dialog.prototype.onAfterRendering.apply(this, arguments);
	};

	AddItemDialog.prototype.exit = function () {
		Dialog.prototype.exit.apply(this, arguments);
	};

	return AddItemDialog;

}, true);