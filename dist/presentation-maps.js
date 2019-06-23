(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("load-google-maps-api"), require("presentation-decorator"));
	else if(typeof define === 'function' && define.amd)
		define("presentation-maps", ["load-google-maps-api", "presentation-decorator"], factory);
	else if(typeof exports === 'object')
		exports["presentation-maps"] = factory(require("load-google-maps-api"), require("presentation-decorator"));
	else
		root["presentation-maps"] = factory(root["load-google-maps-api"], root["presentation-decorator"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_load_google_maps_api__, __WEBPACK_EXTERNAL_MODULE_presentation_decorator__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/functions/producePoints.js":
/*!****************************************!*\
  !*** ./src/functions/producePoints.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const producePoints = (google, data) => {
  const points = [];

  if (data && Array.isArray(data) && data.length > 0) {
    let i = 0;
    const l = data.length;

    for (i; i < l; i++) {
      points.push(new google.LatLng(data[i].lat, data[i].long));
    }
  }

  return points;
};

exports.default = producePoints;

/***/ }),

/***/ "./src/heatMapView.js":
/*!****************************!*\
  !*** ./src/heatMapView.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _presentationDecorator = __webpack_require__(/*! presentation-decorator */ "presentation-decorator");

var _loadGoogleMapsApi = __webpack_require__(/*! load-google-maps-api */ "load-google-maps-api");

var _loadGoogleMapsApi2 = _interopRequireDefault(_loadGoogleMapsApi);

var _producePoints = __webpack_require__(/*! ./functions/producePoints.js */ "./src/functions/producePoints.js");

var _producePoints2 = _interopRequireDefault(_producePoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MAP_EL = "map";
/**
 * HeatMapView - A Google Maps Heatmap View
 * @param {Object} options Options tp pass
 * Requires the following options passed for meaningful results:
 * @example
 * class MapView extends HeatMapView {
 * constructor() {
 *   super({
 *       "el": MOUNT_POINT,
 *       "template": `any template you want`,
 *       "name": "mapview",
 *       "style": "view",
 *       "lat": 37.775,
 *       "long": -122.434,
 *       "zoom": 13,
 *       "apikey": MAP_API_KEY,
 *       "data": [{ "lat": 37, "long": -122 }, ... ]
 *     });
 *   };
 * };
 * @extends DirectiveView
 */

class HeatMapView extends _presentationDecorator.DirectiveView {
  constructor(options) {
    if (!options) {
      options = {};
    }

    super(options);

    if (!this.template) {
      this.template = "";
    }

    if (options.data) {
      this._data = options.data;
    } else {
      this._data = [];
    }

    if (options.apikey) {
      this._apikey = options.apikey;
    } else {
      this._apikey = "";
    }

    if (options.lat) {
      this._lat = options.lat;
    } else {
      this._lat = 37.775;
    }

    if (options.long) {
      this._long = options.long;
    } else {
      this._long = -122.434;
    }

    if (options.zoom) {
      this._zoom = options.zoom;
    } else {
      this._zoom = 13;
    }

    this._map_el = `${this.name}_${MAP_EL}`;
    this.template += `
      <div id="${this._map_el}" class="map"></div>
    `;

    if (options.geocode) {
      this._supportGeocoder = true;
    } else {
      this._supportGeocoder = false;
    }
  }

  async geocode(location) {
    return await this._geocodeAddress(this._geocoder, this.map, location);
  }

  async _geocodeAddress(geocoder, resultsMap, location) {
    await geocoder.geocode({
      "address": location
    }, (results, status) => {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        console.debug("results", results);
      } else {
        console.error(`Geocode was not successful for the following reason: ${status}`);
      }
    });
    console.debug("ret", ret);
  }

  async render() {
    await super.render();
    await (0, _loadGoogleMapsApi2.default)({
      "key": this._apikey,
      "libraries": ["visualization"]
    }).then(google => {
      if (this._supportGeocoder) {
        this._geocoder = new google.Geocoder();
      }

      const mapEl = document.getElementById(this._map_el);

      if (mapEl) {
        this.map = new google.Map(mapEl, {
          "zoom": this._zoom,
          "center": {
            lat: this._lat,
            lng: this._long
          },
          "mapTypeId": 'satellite'
        });

        if (google.visualization) {
          this.heatmap = new google.visualization.HeatmapLayer({
            "data": (0, _producePoints2.default)(google, this._data),
            "map": this.map
          });
        } else {
          console.warn("Google Visualization could not load!");
        }
      } else {
        throw new Error("no map el");
      }

      return true;
    }).catch(error => {
      console.error(error);
    });
    return this;
  }

  async remove() {
    return super.remove();
  }

}

;
exports.default = HeatMapView;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _heatMapView = __webpack_require__(/*! ./heatMapView.js */ "./src/heatMapView.js");

var _heatMapView2 = _interopRequireDefault(_heatMapView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.HeatMapView = _heatMapView2.default;

/***/ }),

/***/ "load-google-maps-api":
/*!**************************************************************************************************************************************************!*\
  !*** external {"commonjs":"load-google-maps-api","commonjs2":"load-google-maps-api","amd":"load-google-maps-api","root":"load-google-maps-api"} ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_load_google_maps_api__;

/***/ }),

/***/ "presentation-decorator":
/*!**********************************************************************************************************************************************************!*\
  !*** external {"commonjs":"presentation-decorator","commonjs2":"presentation-decorator","amd":"presentation-decorator","root":"presentation-decorator"} ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_presentation_decorator__;

/***/ })

/******/ });
});
//# sourceMappingURL=presentation-maps.js.map