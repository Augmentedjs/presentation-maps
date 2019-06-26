import { DirectiveView } from "presentation-decorator";
import loadGoogleMapsApi from "load-google-maps-api";

const MAP_EL = "map";

/**
 * AbstractMapView - An abstract class
 * @param {Object} options Options to pass
 * @private
 * @extends DirectiveView
 */
class AbstractMapView extends DirectiveView {
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
        const marker = new this._google.Marker({
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

  async remove() {
    return super.remove();
  };
};

export default AbstractMapView;
