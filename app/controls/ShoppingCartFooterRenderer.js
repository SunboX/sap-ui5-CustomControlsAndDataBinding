sap.ui.define(['sap/ui/core/Renderer', 'sap/m/PanelRenderer', 'sap/m/HBox', 'sap/m/VBox', 'sap/m/Label', 'sap/m/LabelDesign', 'sap/ui/core/TextAlign', 'sap/m/FlexJustifyContent', 'sap/m/FlexAlignItems', 'sap/m/FlexItemData'],
	function (Renderer, PanelRenderer, HBox, VBox, Label, LabelDesign, TextAlign, FlexJustifyContent, FlexAlignItems, FlexItemData) {
		'use strict';

		var ShoppingCartFooterRenderer = Renderer.extend(PanelRenderer);

		ShoppingCartFooterRenderer.startPanel = function (rm, control) {
			rm.addClass('appControlsSCF');
			PanelRenderer.startPanel(rm, control);
		};

		ShoppingCartFooterRenderer.renderContent = function (rm, control) {
			this.startContent(rm, control);

			rm.renderControl(new VBox({
				items: [
					new HBox({
						items: [
							new Label({
								text: 'Total',
								textAlign: TextAlign.Left,
								layoutData: new FlexItemData({
									growFactor: 0
								})
							}).addStyleClass('coloredText'),
							new Label({
								width: '100%',
								text: control.getProperty('totalPrice'),
								textAlign: TextAlign.Right,
								design: LabelDesign.Bold,
								layoutData: new FlexItemData({
									growFactor: 1
								})
							}).addStyleClass('largeText coloredText')
						]
					}),
					new Label({
						width: '100%',
						text: 'EUR',
						textAlign: TextAlign.Right
					})
				]
			}));

			this.endContent(rm);
		};

		return ShoppingCartFooterRenderer;

	}, true);
