sap.ui.define(['sap/ui/core/Renderer', 'sap/m/ListItemBaseRenderer', 'sap/m/HBox', 'sap/m/Label', 'sap/m/LabelDesign', 'sap/ui/core/TextAlign', 'sap/m/Panel', 'sap/m/BackgroundDesign', 'sap/m/FlexItemData'],
	function (Renderer, ListItemBaseRenderer, HBox, Label, LabelDesign, TextAlign, Panel, BackgroundDesign, FlexItemData) {
		'use strict';

		var ShoppingCartListItemRenderer = Renderer.extend(ListItemBaseRenderer);

		ShoppingCartListItemRenderer.renderLIAttributes = function (rm, control) {
			rm.addClass('appControlsSCLI');
		};

		ShoppingCartListItemRenderer.renderLIContent = function (rm, control) {
			rm.renderControl(new HBox({
				items: [
					new Label({
						text: control.getProperty('count'),
						textAlign: TextAlign.Right,
						width: control.getProperty('countWidth'),
						layoutData: new FlexItemData({
							growFactor: 0
						})
					}).addStyleClass('sapUiSmallMarginEnd'),
					new Panel({
						backgroundDesign: BackgroundDesign.Transparent,
						content: new Label({
							text: control.getProperty('title'),
							design: LabelDesign.Bold,
							layoutData: new FlexItemData({
								growFactor: 1
							})
						})
					}).addStyleClass('sapUiNoContentPadding fixFlexOverflow'),
					new Label({
						text: control.getProperty('price') + ' EUR',
						textAlign: TextAlign.Right,
						width: control.getProperty('priceWidth'),
						layoutData: new FlexItemData({
							growFactor: 0
						})
					})
				]
			}));
		};

		return ShoppingCartListItemRenderer;

	}, true);
