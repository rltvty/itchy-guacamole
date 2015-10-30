/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!****************************!*\
  !*** ./components/App.jsx ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict'
	var Creator = __webpack_require__(/*! ./creator/Creator */ 1);
	var styles = __webpack_require__(/*! ../styles/base.scss */ 9);
	
	var App = React.createClass({displayName: "App",
	
	  hanldeBuildClick: function() {
	    this.refs.creator.buildDeck();
	  },
	
	  render: function() {
	    return (
	      React.createElement("div", null, 
	        React.createElement("div", {id: "nav"}, 
	          React.createElement("div", {id: "nav-inner"}, 
	            React.createElement("img", {src: "/static/images/shield.png", alt: "Dom Bot Shield", title: "Dom Bot Shield"}), 
	            React.createElement("h1", null, "Dom Bot"), 
	            React.createElement("button", {id: "build-deck", className: "btn btn-lg btn-primary", onClick: this.hanldeBuildClick}, "Build Deck")
	          )
	        ), 
	        React.createElement(Creator, {ref: "creator"})
	      )
	    );
	  }
	});
	
	ReactDOM.render((React.createElement(App, null)), document.getElementById('content'));


/***/ },
/* 1 */
/*!****************************************!*\
  !*** ./components/creator/Creator.jsx ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict'
	var Form = __webpack_require__(/*! ./Form */ 2);
	var Deck = __webpack_require__(/*! ./Deck */ 4);
	var Loading = __webpack_require__(/*! ../Loading */ 7);
	var Error = __webpack_require__(/*! ../Error */ 8);
	
	module.exports = React.createClass({
	  displayName: 'Creator',
	
	  componentDidMount: function() {
	    this.buildDeck();
	  },
	
	  getInitialState: function() {
	    return {
	      deck: { cards: [] },
	      loading: false,
	      error: false
	     };
	  },
	
	  getParams: function() {
	    return { sets: this.refs.form.state.selectedSets };
	  },
	
	  buildDeck: function() {
	    this.setState({loading: true});
	    console.log(this.getParams())
	    var selectedSets = JSON.stringify(this.getParams());
	    $.post('/deck', selectedSets, function(data) {
	      data = JSON.parse(data);
	      this.setState({
	        deck: data,
	        loading: false,
	        error: false
	      });
	    }.bind(this))
	    .fail(function(err) {
	      console.error(err);
	      this.setState({
	        deck: { cards: [] },
	        loading: false,
	        error: true
	      });
	    }.bind(this));
	  },
	
	  render: function() {
	    return(
	      React.createElement("div", null, 
	        React.createElement(Form, {ref: "form"}), 
	         this.state.loading ? React.createElement(Loading, null) :React.createElement(Deck, {deck: this.state.deck}), 
	         this.state.error ? React.createElement(Error, null) : null
	      )
	    );
	  }
	})


/***/ },
/* 2 */
/*!*************************************!*\
  !*** ./components/creator/Form.jsx ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict'
	var CheckboxGroup = __webpack_require__(/*! ./CheckboxGroup */ 3);
	
	module.exports = React.createClass({
	  displayName: 'Form',
	
	  getInitialState: function() {
	    return {selectedSets: ['dominion']};
	  },
	
	  handleChange: function() {
	    var selectedSets = this.refs.setsGroup.getCheckedValues();
	    this.setState({selectedSets: selectedSets});
	  },
	
	  render: function() {
	    return(
	      React.createElement("div", {id: "form"}, 
	        React.createElement(CheckboxGroup, {name: "sets", value: this.state.selectedSets, ref: "setsGroup", onChange: this.handleChange}, 
	        React.createElement("div", {id: "labels"}, 
	          React.createElement("label", null, 
	            React.createElement("input", {type: "checkbox", value: "dominion"}), "dominion"
	          ), 
	          React.createElement("label", null, 
	            React.createElement("input", {type: "checkbox", value: "intrigue"}), "intrigue"
	          ), 
	          React.createElement("label", null, 
	            React.createElement("input", {type: "checkbox", value: "seaside"}), "seaside"
	          ), 
	          React.createElement("label", null, 
	            React.createElement("input", {type: "checkbox", value: "alchemy"}), "alchemy"
	          ), 
	          React.createElement("label", null, 
	            React.createElement("input", {type: "checkbox", value: "prosperity"}), "prosperity"
	          ), 
	          React.createElement("label", null, 
	            React.createElement("input", {type: "checkbox", value: "cornucopia"}), "cornucopia"
	          ), 
	          React.createElement("label", null, 
	            React.createElement("input", {type: "checkbox", value: "hinterlands"}), "hinterlands"
	          ), 
	          React.createElement("label", null, 
	            React.createElement("input", {type: "checkbox", value: "dark_ages"}), "dark ages"
	          ), 
	          React.createElement("label", null, 
	            React.createElement("input", {type: "checkbox", value: "guilds"}), "guilds"
	          ), 
	          React.createElement("label", null, 
	            React.createElement("input", {type: "checkbox", value: "adventures"}), "adventures"
	          ), 
	          React.createElement("label", null, 
	            React.createElement("input", {type: "checkbox", value: "governor"}), "governor"
	          ), 
	          React.createElement("label", null, 
	            React.createElement("input", {type: "checkbox", value: "prince"}), "prince"
	          ), 
	          React.createElement("label", null, 
	            React.createElement("input", {type: "checkbox", value: "summon"}), "summon"
	          )
	        )
	      )
	      )
	    );
	  }
	})


/***/ },
/* 3 */
/*!**********************************************!*\
  !*** ./components/creator/CheckboxGroup.jsx ***!
  \**********************************************/
/***/ function(module, exports) {

	/** @jsx React.DOM *//**
	* @jsx React.DOM
	*/
	'use strict'
	module.exports = React.createClass({
	  displayName: 'CheckboxGroup',
	  getInitialState: function() {
	    return {defaultValue: this.props.defaultValue || []};
	  },
	
	  componentDidMount: function() {
	    this.setCheckboxNames();
	    this.setCheckedBoxes();
	  },
	
	  componentDidUpdate: function() {
	    this.setCheckboxNames();
	    this.setCheckedBoxes();
	  },
	
	  render: function() {
	    let $__0=     this.props,name=$__0.name,value=$__0.value,defaultValue=$__0.defaultValue,otherProps=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{name:1,value:1,defaultValue:1});
	    return (
	      React.createElement("div", React.__spread({},  otherProps), 
	        this.props.children
	      )
	    );
	  },
	
	  setCheckboxNames: function() {
	    // stay DRY and don't put the same `name` on all checkboxes manually. Put it on
	    // the tag and it'll be done here
	    let $checkboxes = this.getCheckboxes();
	    for (let i = 0, length = $checkboxes.length; i < length; i++) {
	      $checkboxes[i].setAttribute('name', this.props.name);
	    }
	  },
	
	  getCheckboxes: function() {
	    return ReactDOM.findDOMNode(this).querySelectorAll('input[type="checkbox"]');
	  },
	
	  setCheckedBoxes: function() {
	    let $checkboxes = this.getCheckboxes();
	    // if `value` is passed from parent, always use that value. This is similar
	    // to React's controlled component. If `defaultValue` is used instead,
	    // subsequent updates to defaultValue are ignored. Note: when `defaultValue`
	    // and `value` are both passed, the latter takes precedence, just like in
	    // a controlled component
	    let destinationValue = this.props.value != null
	      ? this.props.value
	      : this.state.defaultValue;
	
	    for (let i = 0, length = $checkboxes.length; i < length; i++) {
	      let $checkbox = $checkboxes[i];
	
	      // intentionally use implicit conversion for those who accidentally used,
	      // say, `valueToChange` of 1 (integer) to compare it with `value` of "1"
	      // (auto conversion to valid html value from React)
	      if (destinationValue.indexOf($checkbox.value) >= 0) {
	        $checkbox.checked = true;
	      }
	    }
	  },
	
	  getCheckedValues: function() {
	    let $checkboxes = this.getCheckboxes();
	
	    let checked = [];
	    for (let i = 0, length = $checkboxes.length; i < length; i++) {
	      if ($checkboxes[i].checked) {
	        checked.push($checkboxes[i].value);
	      }
	    }
	
	    return checked;
	  }
	});


/***/ },
/* 4 */
/*!*************************************!*\
  !*** ./components/creator/Deck.jsx ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict'
	var Card = __webpack_require__(/*! ./Card */ 5);
	var Meta = __webpack_require__(/*! ./Meta */ 6);
	
	module.exports = React.createClass({
	  displayName: 'Deck',
	
	  getCards: function() {
	    if(this.props.deck.cards && this.props.deck.cards.length > 0) {
	      this.props.deck.cards.sort(this.sortByCost);
	      return this.renderCards();
	    }
	  },
	
	  renderCards: function() {
	    return this.props.deck.cards.map(function(card, index) {
	      return (
	        React.createElement(Card, {key: index}, 
	          card
	        )
	      );
	    });
	  },
	
	  sortByCost: function(a, b) {
	    if(a.cost_treasure > b.cost_treasure){
	      return 1;
	    } else if (a.cost_treasure < b.cost_treasure) {
	      return -1;
	    } else {
	      return 0;
	    }
	  },
	
	  render: function() {
	    var cards = this.getCards();
	
	    return(
	      React.createElement("div", {id: "deck"}, 
	        React.createElement(Meta, {deck: this.props.deck}), 
	        React.createElement("div", {id: "cards"}, 
	          cards
	        )
	      )
	    );
	  }
	})


/***/ },
/* 5 */
/*!*************************************!*\
  !*** ./components/creator/Card.jsx ***!
  \*************************************/
/***/ function(module, exports) {

	/** @jsx React.DOM */'use strict'
	
	module.exports = React.createClass({
	  displayName: 'Card',
	  
	  render: function() {
	    var name = this.props.children.name.split(" ").join("_");
	    var cardImg = "/static/images/dominion-cards/" + name + ".jpg";
	    return(
	      React.createElement("div", {className: "card"}, 
	        React.createElement("img", {src: cardImg})
	      )
	    );
	  }
	})


/***/ },
/* 6 */
/*!*************************************!*\
  !*** ./components/creator/Meta.jsx ***!
  \*************************************/
/***/ function(module, exports) {

	/** @jsx React.DOM */'use strict'
	
	module.exports = React.createClass({
	  displayName: 'Meta',
	
	  getSetNames: function() {
	    var result = [];
	    $.each(this.props.deck.cards, function(i, e) {
	      if ($.inArray(e.set, result) == -1){
	        result.push(e.set);
	      }
	    });
	    return result.sort();
	  },
	
	  getHardwareNames: function() {
	    var result = [];
	    for (var key in this.props.deck.hardware) {
	      if(this.props.deck.hardware[key]) {
	        result.push(key.split("_").join(" "));
	      }
	    }
	    return result.sort();
	  },
	
	  getResourceNames: function() {
	    var result = [];
	    if(this.props.deck.potions) { result.push("Potions"); }
	    if(this.props.deck.ruins) { result.push("Ruins"); }
	    if(this.props.deck.shelters) { result.push("Shelters"); }
	    if(this.props.deck.spoils) { result.push("Spoils"); }
	    if(this.props.deck.colonies_and_platinums) { result.push("Colonies/Platinums"); }
	
	    return result.sort();
	  },
	
	  render: function() {
	
	    var sets = this.getSetNames().map(function(set, index) {
	      return (
	        React.createElement("li", {key: index}, 
	          set
	        )
	      );
	    });
	
	    var hardware = this.getHardwareNames().map(function(hardware, index) {
	      return (
	        React.createElement("li", {key: index}, 
	          hardware
	        )
	      );
	    });
	
	    var resources = this.getResourceNames().map(function(resource, index) {
	      return (
	        React.createElement("li", {key: index}, 
	          resource
	        )
	      );
	    });
	
	    return(
	      React.createElement("div", {id: "meta"}, 
	
	        React.createElement("div", {id: "getSetNames"}, 
	          React.createElement("h3", null, "Sets Needed"), 
	          React.createElement("ul", null, 
	            sets
	          )
	        ), 
	
	        React.createElement("div", {id: "resources"}, 
	          React.createElement("h3", null, "Resources"), 
	          React.createElement("ul", null, 
	            resources
	          )
	        ), 
	
	        React.createElement("div", {id: "hardware"}, 
	          React.createElement("h3", null, "Hardware"), 
	          React.createElement("ul", null, 
	            hardware
	          )
	        )
	
	      )
	    );
	  }
	})


/***/ },
/* 7 */
/*!********************************!*\
  !*** ./components/Loading.jsx ***!
  \********************************/
/***/ function(module, exports) {

	/** @jsx React.DOM */'use strict'
	
	module.exports = React.createClass({
	  displayName: 'Loading',
	
	  render: function() {
	    return (
	      React.createElement("div", {id: "loading"}, 
	        React.createElement("img", {src: "/static/images/shield.png", className: "fa fa-spin"})
	      )
	    );
	  }
	})


/***/ },
/* 8 */
/*!******************************!*\
  !*** ./components/Error.jsx ***!
  \******************************/
/***/ function(module, exports) {

	/** @jsx React.DOM */'use strict'
	
	module.exports = React.createClass({
	  displayName: 'Error',
	
	  render: function() {
	    return (
	      React.createElement("div", {id: "error"}, 
	        React.createElement("h2", {className: "text-danger text-center"}, "An error occured! Try again!")
	      )
	    );
	  }
	})


/***/ },
/* 9 */
/*!**************************!*\
  !*** ./styles/base.scss ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../~/css-loader!./../~/sass-loader!./base.scss */ 10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../~/style-loader/addStyles.js */ 12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./base.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./base.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/*!*********************************************************!*\
  !*** ./~/css-loader!./~/sass-loader!./styles/base.scss ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../~/css-loader/lib/css-base.js */ 11)();
	// imports
	
	
	// module
	exports.push([module.id, "#nav #nav-inner {\n  margin: 10px; }\n  #nav #nav-inner img {\n    height: 55px;\n    display: inline-block; }\n  #nav #nav-inner h1 {\n    display: inline-block;\n    margin-left: 10px;\n    vertical-align: middle;\n    text-transform: uppercase; }\n  #nav #nav-inner button {\n    float: right; }\n\n#suggest {\n  display: block;\n  margin: 25px auto 10px; }\n\n#deck {\n  text-align: center; }\n  #deck #meta {\n    overflow: auto;\n    text-align: center; }\n    #deck #meta div {\n      display: inline-block;\n      vertical-align: top;\n      margin: 10px 50px;\n      text-align: left; }\n  #deck p {\n    margin-bottom: 0; }\n  #deck #cards {\n    max-width: 1300px;\n    margin: 0 auto; }\n    #deck #cards .card {\n      display: inline-block;\n      border: none;\n      max-width: 225px;\n      margin: 10px; }\n      @media (max-width: 900px) {\n        #deck #cards .card {\n          max-width: 175px; } }\n      #deck #cards .card img {\n        max-width: 100%; }\n\n#form #labels {\n  text-align: center; }\n  #form #labels label {\n    text-transform: capitalize;\n    margin: 5px 10px; }\n    #form #labels label input {\n      margin-right: 5px; }\n\nhtml {\n  box-sizing: border-box; }\n\n*, *:before, *:after {\n  box-sizing: inherit; }\n\n#loading {\n  margin: 50px auto 50px;\n  text-align: center; }\n\n#error {\n  margin: 30px 0; }\n\n#content {\n  max-width: 1600px;\n  margin: 0 auto; }\n", ""]);
	
	// exports


/***/ },
/* 11 */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 12 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map