import { DirectiveView } from "presentation-decorator";
import loadGoogleMapsApi from "load-google-maps-api";
import producePoints from "./functions/producePoints.js";

const MAP_EL = "map";

/**
 * HeatMapView - A Google Maps Heatmap View
 * @param {Object} options Options to pass
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
class HeatMapView extends DirectiveView {
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
  };

  /**
   * geocode a location and update the map with a pin
   * @param {string} location The location as a string
   * @param {function} callback Opional callback once the call is complete and 'results' are passed
   */
  async geocode(location, callback) {
    return await this._geocodeAddress(this._geocoder, this.map, location, callback);
  };

  async _geocodeAddress(geocoder, resultsMap, location, callback) {
    await geocoder.geocode({ "address": location }, (results, status) => {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
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
  };

  /**
   * Renders the Map
   * @returns {View} returns 'this'
   */
  async render() {
    await super.render();

    await loadGoogleMapsApi({
      "key": this._apikey,
      "libraries": ["visualization"]
    })
    .then( (google) => {
      this._google = google;
      if (this._supportGeocoder) {
        this._geocoder = new this._google.Geocoder();
      }
      const mapEl = document.getElementById(this._map_el);
      if (mapEl) {
        this.map = new this._google.Map(mapEl, {
          "zoom": this._zoom,
          "center": {
            lat: this._lat,
            lng: this._long
          },
          "mapTypeId": "satellite"
        });
        if (this._google.visualization) {
          this.heatmap = new this._google.visualization.HeatmapLayer({
            "data": producePoints(this._google, this._data),
            "map": this.map
          });
        } else {
          console.warn("Google Visualization could not load!");
        }
      } else {
        throw new Error("no map el");
      }
      return true;
    })
    .catch( (error) => {
      console.error(error);
    });
    return this;
  };

  produceHeatmap(data) {
    if (this._google.visualization && (data || this._data)) {
      this.heatmap = new this._google.visualization.HeatmapLayer({
        "data": producePoints(google, ((data) ? data : this._data)),
        "map": this.map
      });
    } else {
      console.warn("Google Visualization could not load!");
      console.debug("required", this._google.visualization, data, this._data);
    }
  };

  async remove() {
    return super.remove();
  };
};

export default HeatMapView;
