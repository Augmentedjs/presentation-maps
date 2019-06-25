!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("presentation-decorator"),require("load-google-maps-api")):"function"==typeof define&&define.amd?define("presentation-maps",["presentation-decorator","load-google-maps-api"],t):"object"==typeof exports?exports["presentation-maps"]=t(require("presentation-decorator"),require("load-google-maps-api")):e["presentation-maps"]=t(e["presentation-decorator"],e["load-google-maps-api"])}(this,function(e,t){return function(e){var t={};function o(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=e,o.c=t,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(a,i,function(t){return e[t]}.bind(null,i));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/dist/",o(o.s=2)}([function(t,o){t.exports=e},function(e,o){e.exports=t},function(e,t,o){"use strict";var a=s(o(3)),i=s(o(5));function s(e){return e&&e.__esModule?e:{default:e}}e.exports.HeatMapView=a.default,e.exports.MapView=i.default},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o(0),i=r(o(1)),s=r(o(4));function r(e){return e&&e.__esModule?e:{default:e}}const n="map";t.default=class extends a.DirectiveView{constructor(e){e||(e={}),super(e),this.template||(this.template=""),e.data?this._data=e.data:this._data=[],e.apikey?this._apikey=e.apikey:this._apikey="",e.lat?this._lat=e.lat:this._lat=37.775,e.long?this._long=e.long:this._long=-122.434,e.zoom?this._zoom=e.zoom:this._zoom=13,this._map_el=`${this.name}_${n}`,this.template+=`\n      <div id="${this._map_el}" class="map"></div>\n    `,e.geocode?this._supportGeocoder=!0:this._supportGeocoder=!1}async geocode(e,t){return await this._geocodeAddress(this._geocoder,this.map,e,t)}async _geocodeAddress(e,t,o,a){await e.geocode({address:o},(e,o)=>{"OK"===o?(t.setCenter(e[0].geometry.location),new this._google.Marker({map:t,position:e[0].geometry.location}),a&&a(e)):console.error(`Geocode was not successful for the following reason: ${o}`)})}async render(){return await super.render(),await(0,i.default)({key:this._apikey,libraries:["visualization"]}).then(e=>{this._google=e,this._supportGeocoder&&(this._geocoder=new this._google.Geocoder);const t=document.getElementById(this._map_el);if(!t)throw new Error("no map el");return this.map=new this._google.Map(t,{zoom:this._zoom,center:{lat:this._lat,lng:this._long},mapTypeId:"satellite"}),this._google.visualization?(this.heatmap&&this.heatmap.setMap(null),this.heatmap=new this._google.visualization.HeatmapLayer({data:(0,s.default)(this._google,this._data),map:this.map})):console.warn("Google Visualization could not load!"),!0}).catch(e=>{console.error(e)}),this}produceHeatmap(e){return this._google.visualization&&(e||this._data)?(this.heatmap&&this.heatmap.setMap(null),this.heatmap=new this._google.visualization.HeatmapLayer({data:(0,s.default)(google,e||this._data),map:this.map})):console.warn("Google Visualization could not load!"),!0}async remove(){return super.remove()}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=(e,t)=>{const o=[];if(e&&t&&Array.isArray(t)&&t.length>0){let a=0;const i=t.length;for(;a<i;a++)if(t[a].lat&&t[a].long){const i=new e.maps.LatLng(t[a].lat,t[a].long);t[a].weight?o.push({location:i,weight:t[a].weight}):o.push(i)}}else e||console.error("No Google API."),console.warn("Could not produce points.");return o}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,i=o(0),s=o(1),r=(a=s)&&a.__esModule?a:{default:a};const n="map";t.default=class extends i.DirectiveView{constructor(e){e||(e={}),super(e),this.template||(this.template=""),e.data?this._data=e.data:this._data=[],e.apikey?this._apikey=e.apikey:this._apikey="",e.lat?this._lat=e.lat:this._lat=37.775,e.long?this._long=e.long:this._long=-122.434,e.zoom?this._zoom=e.zoom:this._zoom=13,this._map_el=`${this.name}_${n}`,this.template+=`\n      <div id="${this._map_el}" class="map"></div>\n    `,e.geocode?this._supportGeocoder=!0:this._supportGeocoder=!1}async geocode(e,t){return await this._geocodeAddress(this._geocoder,this.map,e,t)}async _geocodeAddress(e,t,o,a){await e.geocode({address:o},(e,o)=>{"OK"===o?(t.setCenter(e[0].geometry.location),new this._google.Marker({map:t,position:e[0].geometry.location}),a&&a(e)):console.error(`Geocode was not successful for the following reason: ${o}`)})}async render(){return await super.render(),await(0,r.default)({key:this._apikey}).then(e=>{this._google=e,this._supportGeocoder&&(this._geocoder=new this._google.Geocoder);const t=document.getElementById(this._map_el);if(!t)throw new Error("no map el");return this.map=new this._google.Map(t,{zoom:this._zoom,center:{lat:this._lat,lng:this._long},mapTypeId:"satellite"}),!0}).catch(e=>{console.error(e)}),this}async remove(){return super.remove()}}}])});
//# sourceMappingURL=presentation-maps.js.map