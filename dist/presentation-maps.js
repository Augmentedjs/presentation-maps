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

/***/ "./src/abstractMapView.js":
/*!********************************!*\
  !*** ./src/abstractMapView.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _presentationDecorator = __webpack_require__(/*! presentation-decorator */ "presentation-decorator");

var _loadGoogleMapsApi = __webpack_require__(/*! load-google-maps-api */ "load-google-maps-api");

var _loadGoogleMapsApi2 = _interopRequireDefault(_loadGoogleMapsApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MAP_EL = "map";
/**
 * AbstractMapView - An abstract class
 * @param {Object} options Options to pass
 * @private
 * @extends DirectiveView
 */

class AbstractMapView extends _presentationDecorator.DirectiveView {
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

    if (options.geocode) {
      this._supportGeocoder = true;
    } else {
      this._supportGeocoder = false;
    }

    if (options.type) {
      this._type = options.type;
    } else {
      this._type = "satellite";
    }

    this._map_el = `${this.name}_${MAP_EL}`;
    this.template += `
      <div id="${this._map_el}" class="map"></div>
    `;
    this._markers = [];
  }

  _loadGeocoder() {
    if (this._supportGeocoder) {
      this._geocoder = new this._google.Geocoder();
    }

    return this._geocoder;
  }

  _produceMap() {
    const mapEl = document.getElementById(this._map_el);

    if (mapEl) {
      this.map = new this._google.Map(mapEl, {
        "zoom": this._zoom,
        "center": {
          "lat": this._lat,
          "lng": this._long
        },
        "mapTypeId": this._type
      });
    } else {
      throw new Error("No map el");
    }

    return this.map;
  }

  setMarker(icon, lat, long) {
    this._markers.push(new this._google.Marker({
      position: new this._google.LatLng(lat, long),
      icon: icon,
      map: this.map
    }));

    console.debug(this._markers);
  }

  clearMarkers() {
    if (this._marker) {
      this._marker.setMap(null);

      this._marker = null;
    }

    if (this._markers) {
      let i = 0;
      const l = this._markers.length;

      for (i; i < l; i++) {
        this._markers[i].setMap(null);
      }
    }

    return true;
  }

  /**
   * geocode a location and update the map with a pin
   * @param {string} location The location as a string
   * @param {function} callback Opional callback once the call is complete and 'results' are passed
   */
  async geocode(location, callback) {
    return await this._geocodeAddress(this._geocoder, this.map, location, callback);
  }

  async _geocodeAddress(geocoder, resultsMap, location, callback) {
    return await geocoder.geocode({
      "address": location
    }, async (results, status) => {
      if (status === "OK") {
        await resultsMap.setCenter(results[0].geometry.location);

        if (this._marker) {
          await this._marker.setMap(null);
          this._marker = null;
        }

        this._marker = new this._google.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });

        if (callback) {
          callback(results);
        }
      } else {
        console.error(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  }

  /**
   * Add a marker popup window
   * @param {string} markup Markup content for the popup
   */
  addMarkerPopup(markup) {
    if (this._google) {
      const infowindow = new this._google.InfoWindow({
        content: markup
      });

      if (this._marker) {
        this._removePopup();

        this._marker.addListener("click", () => {
          infowindow.open(this.map, this._marker);
        });
      }
    } else {
      console.warn("Could not get the maps api instance to add marker details.");
    }

    return true;
  }

  /**
   * Return the marker (if one exists)
   * @property marker
   * @returns {Google.Maps.Marker} The map marker class
   */
  get marker() {
    return this._marker;
  }

  /**
   * Return the Google Map API instance (if one exists)
   * @property google
   * @returns {Google.Maps} The map api class
   */
  get google() {
    return this._google;
  }

  /**
   * Return the Google Map Geocoder instance (if one exists)
   * @property geocoder
   * @returns {Google.Maps.Geocoder} The geocoder class
   */
  get geocoder() {
    return this._geocoder;
  }

  _removePopup() {
    if (this._marker) {
      this._google.event.clearListeners(this._marker, "click");
    }

    return true;
  }

  async remove() {
    await this._removePopup();
    return super.remove();
  }

}

;
exports.default = AbstractMapView;

/***/ }),

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

  if (!google) {
    console.error("No Google API.");
  } else if (data && Array.isArray(data) && data.length > 0) {
    let i = 0;
    const l = data.length;

    for (i; i < l; i++) {
      if (data[i].lat && data[i].long) {
        const latlong = new google.maps.LatLng(data[i].lat, data[i].long);

        if (data[i].weight) {
          points.push({
            location: latlong,
            weight: data[i].weight
          });
        } else {
          points.push(latlong);
        }
      }
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

var _abstractMapView = __webpack_require__(/*! ./abstractMapView.js */ "./src/abstractMapView.js");

var _abstractMapView2 = _interopRequireDefault(_abstractMapView);

var _producePoints = __webpack_require__(/*! ./functions/producePoints.js */ "./src/functions/producePoints.js");

var _producePoints2 = _interopRequireDefault(_producePoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * HeatMapView - A Google Maps Heatmap View
 * @param {Object} options Options to pass
 * Requires the following options passed for meaningful results:
 * @example
 * class MyMapView extends HeatMapView {
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
 *       "data": [{ "lat": 37, "long": -122, "weight": 1 }, ... ]
 *     });
 *   };
 * };
 * @extends DirectiveView
 */
class HeatMapView extends _abstractMapView2.default {
  constructor(options) {
    if (!options) {
      options = {};
    }

    super(options);

    if (options.dissipating) {
      this._dissipating = options.dissipating;
    } else {
      this._dissipating = false;
    }

    if (options.radius) {
      this._radius = options.radius;
    } else {
      this._radius = 20;
    }
  }

  /**
   * @property {Google.Maps.Heatmap} heatmap The heatmap
   */

  /**
   * Renders the Map
   * @returns {View} returns 'this'
   */
  async render() {
    await super.render();
    await (0, _loadGoogleMapsApi2.default)({
      "key": this._apikey,
      "libraries": ["visualization"]
    }).then(google => {
      if (!google) {
        throw new Error("Could not load Google Maps API!");
      }

      this._google = google;

      this._loadGeocoder();

      return Promise.resolve(google);
    }).then(google => {
      this._produceMap();

      return Promise.resolve(google);
    }).then(google => {
      this.produceHeatmap();
      return Promise.resolve(google);
    }).catch(error => {
      console.error(error);
    });
    return this;
  }

  /**
   * Produces the heatmap from point data
   * @param {Array} data The data as an array of points in Lat/Long
   * @example
   * produceHeatmap([{ "lat": 37.7749, "long": -122.4194, "weight": 1 }, ... ]);
   */
  produceHeatmap(data) {
    if (!this._google.visualization) {
      console.warn("Google Visualization could not load!");
      return false;
    }

    if (this._google.visualization && (data || this._data)) {
      if (this.heatmap) {
        this.heatmap.setMap(null);
      }

      const points = (0, _producePoints2.default)(google, data ? data : this._data);

      if (points) {
        this.heatmap = new this._google.visualization.HeatmapLayer({
          "data": points,
          "map": this.map,
          "dissipating": this._dissipating,
          "radius": this._radius
        });

        if (!this._data && data) {
          this._data = data;
        }
      } else {
        console.warn("Could not produce points for heatmap.");
      }
    } else {
      return false;
    }

    return true;
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

var _mapView = __webpack_require__(/*! ./mapView.js */ "./src/mapView.js");

var _mapView2 = _interopRequireDefault(_mapView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.HeatMapView = _heatMapView2.default;
module.exports.MapView = _mapView2.default;

/***/ }),

/***/ "./src/mapView.js":
/*!************************!*\
  !*** ./src/mapView.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _presentationDecorator = __webpack_require__(/*! presentation-decorator */ "presentation-decorator");

var _abstractMapView = __webpack_require__(/*! ./abstractMapView.js */ "./src/abstractMapView.js");

var _abstractMapView2 = _interopRequireDefault(_abstractMapView);

var _loadGoogleMapsApi = __webpack_require__(/*! load-google-maps-api */ "load-google-maps-api");

var _loadGoogleMapsApi2 = _interopRequireDefault(_loadGoogleMapsApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * MapView - A Google Map View
 * @param {Object} options Options to pass
 * Requires the following options passed for meaningful results:
 * @example
 * class MyMapView extends MapView {
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
class MapView extends _abstractMapView2.default {
  constructor(options) {
    super(options);
  }

  /**
   * Renders the Map
   * @returns {View} returns 'this'
   */
  async render() {
    await super.render();
    await (0, _loadGoogleMapsApi2.default)({
      "key": this._apikey
    }).then(google => {
      if (!google) {
        throw new Error("Could not load Google Maps API!");
      }

      this._google = google;

      this._loadGeocoder();

      return Promise.resolve(google);
    }).then(google => {
      this._produceMap();

      return Promise.resolve(google);
    }).catch(error => {
      console.error(error);
    });
    return this;
  }

}

;
exports.default = MapView;

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