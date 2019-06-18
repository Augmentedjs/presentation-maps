import { DirectiveView } from "presentation-decorator";
import loadGoogleMapsApi from "load-google-maps-api";
import producePoints from "./functions/producePoints.js";

const MAP_EL = "map";

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
      this._data = producePoints(options.data);
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
      <div id="${this._map_el}"></div>
    `;
  };

  async render() {
    await super.render();

    await loadGoogleMapsApi({
      "key": this._apikey,
      "libraries": ["visualization"]
    })
    .then( (google) => {
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
            "data": this._data,
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

  async remove() {
    return super.remove();
  };
};

export default HeatMapView;
