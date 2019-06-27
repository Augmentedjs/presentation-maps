import { DirectiveView } from "presentation-decorator";
import loadGoogleMapsApi from "load-google-maps-api";
import AbstractMapView from "./abstractMapView.js";
import producePoints from "./functions/producePoints.js";

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
class HeatMapView extends AbstractMapView {
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
  };

  /**
   * @property {Google.Maps.Heatmap} heatmap The heatmap
   */

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
      if (!google) {
        throw new Error("Could not load Google Maps API!");
      }
      this._google = google;
      this._loadGeocoder();
      return Promise.resolve(google);
    })
    .then( (google) => {
      this._produceMap();
      return Promise.resolve(google);
    })
    .then( (google) => {
      this.produceHeatmap();
      return Promise.resolve(google);
    })
    .catch( (error) => {
      console.error(error);
    });
    return this;
  };

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
      const points = producePoints(google, ((data) ? data : this._data));
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
  };
};

export default HeatMapView;
