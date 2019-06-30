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

    this._markers = [];
  };

  _loadGeocoder() {
    if (this._supportGeocoder) {
      this._geocoder = new this._google.Geocoder();
    }
    return this._geocoder;
  };

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
  };

  setMarker(icon, lat, long) {
    this._markers.push(new this._google.Marker({
      position: new this._google.LatLng(lat, long),
      icon: icon,
      map: this.map
    }));
    console.debug(this._markers);
  };

  clearMarkers() {
    if (this._marker) {
      this._marker.setMap(null);
      this._marker = null;
    }
    if (this._markers) {
      let i = 0;
      const l = this._markers.length;
      for(i; i < l; i++) {
        this._markers[i].setMap(null);
      }
    }
    return true;
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
    return await geocoder.geocode({ "address": location }, async (results, status) => {
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
  };

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
  };

  /**
   * Return the marker (if one exists)
   * @property marker
   * @returns {Google.Maps.Marker} The map marker class
   */
  get marker() {
    return this._marker;
  };

  /**
   * Return the Google Map API instance (if one exists)
   * @property google
   * @returns {Google.Maps} The map api class
   */
  get google() {
    return this._google;
  };

  /**
   * Return the Google Map Geocoder instance (if one exists)
   * @property geocoder
   * @returns {Google.Maps.Geocoder} The geocoder class
   */
  get geocoder() {
    return this._geocoder;
  };

  _removePopup() {
    if (this._marker) {
      this._google.event.clearListeners(this._marker, "click");
    }
    return true;
  };

  async remove() {
    await this._removePopup();
    return super.remove();
  };
};

export default AbstractMapView;
