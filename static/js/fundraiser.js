(function () {
	var scriptURL = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

	var modalProduct = {
		"contents": {
			"img": true,
			"imgWithCarousel": false,
			"variantTitle": false,
			"buttonWithQuantity": true,
			"button": false,
			"quantity": false
		},
		"styles": {
			"product": {
				"@media (min-width: 601px)": {
					"max-width": "100%",
					"margin-left": "0px",
					"margin-bottom": "0px"
				}
			},
			"button": {
				"background-color": "#1d3f6d",
				":hover": {
					"background-color": "#1a3962"
				},
				":focus": {
					"background-color": "#1a3962"
				}
			}
		}
	};

	var cart = {
		"contents": {
			"button": true
		},
		"styles": {
			"button": {
				"background-color": "#1d3f6d",
				":hover": {
					"background-color": "#1a3962"
				},
				":focus": {
					"background-color": "#1a3962"
				}
			},
			"footer": {
				"background-color": "#ffffff"
			}
		}
	};

	var toggle = {
		"styles": {
			"toggle": {
				"background-color": "#1d3f6d",
				":hover": {
					"background-color": "#1a3962"
				},
				":focus": {
					"background-color": "#1a3962"
				}
			}
		}
	};

	var productSet = {
		"styles": {
			"products": {
				"@media (min-width: 601px)": {
					"margin-left": "-20px"
				}
			}
		}
	};

	var level1 = {
		id: [3964823961688],
		node: document.getElementById("product-component-96aa7b318c7"),
		moneyFormat: "%24%7B%7Bamount%7D%7D",
		options: {
			"product": {
				"layout": "horizontal",
				"variantId": "all",
				"width": "100%",
				"contents": {
					"img": true,
					"imgWithCarousel": false,
					"variantTitle": false,
					"description": true,
					"buttonWithQuantity": false,
					"quantity": false
				},
				"text": {
					"button": "Donate at This Level"
				},
				"styles": {
					"img": {
						"width": "260px",
					},
					"product": {
						"text-align": "left",
						"@media (min-width: 601px)": {
							"max-width": "100%",
							"margin-left": "0",
							"margin-bottom": "50px"
						}
					},
					"button": {
						"background-color": "#1d3f6d",
						":hover": {
							"background-color": "#1a3962"
						},
						":focus": {
							"background-color": "#1a3962"
						}
					},
					"title": {
						"font-size": "26px"
					},
					"price": {
						"font-size": "18px"
					},
					"compareAt": {
						"font-size": "15px"
					}
				}
			},
			"cart": cart,
			"modalProduct": modalProduct,
			"toggle": toggle,
			"productSet": productSet
		}
	};

	var level2 = {
		id: [3964823240792],
		node: document.getElementById("product-component-eeee57f66cf"),
		moneyFormat: "%24%7B%7Bamount%7D%7D",
		options: {
			"product": {
				"layout": "horizontal",
				"variantId": "all",
				"width": "100%",
				"contents": {
					"img": true,
					"imgWithCarousel": false,
					"variantTitle": false,
					"description": true,
					"buttonWithQuantity": false,
					"quantity": false
				},
				"text": {
					"button": "Donate at This Level"
				},
				"styles": {
					"product": {
						"img": {
							"width": "260px",
						},
						"text-align": "left",
						"@media (min-width: 601px)": {
							"max-width": "100%",
							"margin-left": "0",
							"margin-bottom": "50px"
						}
					},
					"button": {
						"background-color": "#1d3f6d",
						":hover": {
							"background-color": "#1a3962"
						},
						":focus": {
							"background-color": "#1a3962"
						}
					},
					"title": {
						"font-size": "26px"
					},
					"price": {
						"font-size": "18px"
					},
					"compareAt": {
						"font-size": "15px"
					}
				}
			},
			"cart": cart,
			"modalProduct": modalProduct,
			"toggle": toggle,
			"productSet": productSet
		}
	};

	var level3 = {
		id: [3964820815960],
		node: document.getElementById("product-component-aecb0be48a8"),
		moneyFormat: "%24%7B%7Bamount%7D%7D",
		options: {
			"product": {
				"layout": "horizontal",
				"variantId": "all",
				"width": "100%",
				"contents": {
					"img": true,
					"imgWithCarousel": false,
					"variantTitle": false,
					"description": true,
					"buttonWithQuantity": false,
					"quantity": false
				},
				"text": {
					"button": "Donate at This Level"
				},
				"styles": {
					"product": {
						"img": {
							"width": "260px",
						},
						"text-align": "left",
						"@media (min-width: 601px)": {
							"max-width": "100%",
							"margin-left": "0",
							"margin-bottom": "50px"
						}
					},
					"button": {
						"background-color": "#1d3f6d",
						":hover": {
							"background-color": "#1a3962"
						},
						":focus": {
							"background-color": "#1a3962"
						}
					},
					"title": {
						"font-size": "26px"
					},
					"price": {
						"font-size": "18px"
					},
					"compareAt": {
						"font-size": "15px"
					}
				}
			},
			"cart": cart,
			"modalProduct": modalProduct,
			"toggle": toggle,
			"productSet": productSet
		}
	};

	var level4 = {
		id: [3964819243096],
		node: document.getElementById("product-component-ddb801c5fb7"),
		moneyFormat: "%24%7B%7Bamount%7D%7D",
		options: {
			"product": {
				"layout": "horizontal",
				"variantId": "all",
				"width": "100%",
				"contents": {
					"img": true,
					"imgWithCarousel": false,
					"variantTitle": false,
					"description": true,
					"buttonWithQuantity": false,
					"quantity": false
				},
				"text": {
					"button": "Donate at This Level"
				},
				"styles": {
					"product": {
						"img": {
							"width": "260px",
						},
						"text-align": "left",
						"@media (min-width: 601px)": {
							"max-width": "100%",
							"margin-left": "0",
							"margin-bottom": "50px"
						}
					},
					"button": {
						"background-color": "#1d3f6d",
						":hover": {
							"background-color": "#1a3962"
						},
						":focus": {
							"background-color": "#1a3962"
						}
					},
					"title": {
						"font-size": "26px"
					},
					"price": {
						"font-size": "18px"
					},
					"compareAt": {
						"font-size": "15px"
					}
				}
			},
			"cart": cart,
			"modalProduct": modalProduct,
			"toggle": toggle,
			"productSet": productSet
		}
	};

	var level5 = {
		id: [3880736850008],
		node: document.getElementById("product-component-97d68344251"),
		moneyFormat: "%24%7B%7Bamount%7D%7D",
		options: {
			"product": {
				"layout": "horizontal",
				"variantId": "all",
				"width": "100%",
				"contents": {
					"img": true,
					"imgWithCarousel": false,
					"variantTitle": false,
					"description": true,
					"buttonWithQuantity": false,
					"quantity": false
				},
				"text": {
					"button": "Donate at This Level"
				},
				"styles": {
					"img": {
						"width": "260px",
					},
					"product": {
						"text-align": "left",
						"@media (min-width: 601px)": {
							"max-width": "100%",
							"margin-left": "0",
							"margin-bottom": "50px"
						}
					},
					"button": {
						"background-color": "#1d3f6d",
						":hover": {
							"background-color": "#1a3962"
						},
						":focus": {
							"background-color": "#1a3962"
						}
					},
					"title": {
						"font-size": "26px"
					},
					"price": {
						"font-size": "18px"
					},
					"compareAt": {
						"font-size": "15px"
					}
				}
			},
			"cart": cart,
			"modalProduct": modalProduct,
			"toggle": toggle,
			"productSet": productSet
		}
	};


	if (window.ShopifyBuy) {
		if (window.ShopifyBuy.UI) {
			ShopifyBuyInit();
		} else {
			loadScript();
		}
	} else {
		loadScript();
	}

	function loadScript() {
		var script = document.createElement("script");
		script.async = true;
		script.src = scriptURL;
		(document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(script);
		script.onload = ShopifyBuyInit;
	}

	/* global ShopifyBuy */

	function ShopifyBuyInit() {
		var client = ShopifyBuy.buildClient({
			domain: "letsencrypt-merch.myshopify.com",
			storefrontAccessToken: "58276c139640b99342eff971114ea2a4",
		});

		ShopifyBuy.UI.onReady(client).then(function (ui) {
			ui.createComponent("product", level1);
			ui.createComponent("product", level2);
			ui.createComponent("product", level3);
			ui.createComponent("product", level4);
			ui.createComponent("product", level5);
		});
	}

})();
