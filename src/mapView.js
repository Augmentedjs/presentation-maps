import { DirectiveView } from "presentation-decorator";
import AbstractMapView from "./abstractMapView.js";
import loadGoogleMapsApi from "load-google-maps-api";

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
class MapView extends AbstractMapView {
  constructor(options) {
    super(options);
  };

  /**
   * Renders the Map
   * @returns {View} returns 'this'
   */
   async render() {
     await super.render();

     await loadGoogleMapsApi({
       "key": this._apikey
     })
     .then( (google) => {
       if (!google) {
         throw new Error("Could not load Google Maps API!");
       }
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
           "mapTypeId": this._type
         });
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
};

export default MapView;
