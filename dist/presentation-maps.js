!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("presentation-decorator"),require("load-google-maps-api")):"function"==typeof define&&define.amd?define("presentation-maps",["presentation-decorator","load-google-maps-api"],t):"object"==typeof exports?exports["presentation-maps"]=t(require("presentation-decorator"),require("load-google-maps-api")):e["presentation-maps"]=t(e["presentation-decorator"],e["load-google-maps-api"])}(this,function(e,t){return function(e){var t={};function o(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,o),a.l=!0,a.exports}return o.m=e,o.c=t,o.d=function(e,t,i){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(i,a,function(t){return e[t]}.bind(null,a));return i},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/dist/",o(o.s=2)}([function(t,o){t.exports=e},function(e,o){e.exports=t},function(e,t,o){"use strict";var i=s(o(3)),a=s(o(5));function s(e){return e&&e.__esModule?e:{default:e}}e.exports.HeatMapView=i.default,e.exports.MapView=a.default},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o(0),a=r(o(1)),s=r(o(4));function r(e){return e&&e.__esModule?e:{default:e}}const n="map";t.default=class extends i.DirectiveView{constructor(e){e||(e={}),super(e),this.template||(this.template=""),e.data?this._data=e.data:this._data=[],e.apikey?this._apikey=e.apikey:this._apikey="",e.lat?this._lat=e.lat:this._lat=37.775,e.long?this._long=e.long:this._long=-122.434,e.zoom?this._zoom=e.zoom:this._zoom=13,e.geocode?this._supportGeocoder=!0:this._supportGeocoder=!1,e.dissipating?this._dissipating=e.dissipating:this._dissipating=!1,e.radius,this._radius=e.radius,this._map_el=`${this.name}_${n}`,this.template+=`\n      <div id="${this._map_el}" class="map"></div>\n    `}async geocode(e,t){return await this._geocodeAddress(this._geocoder,this.map,e,t)}async _geocodeAddress(e,t,o,i){await e.geocode({address:o},(e,o)=>{"OK"===o?(t.setCenter(e[0].geometry.location),new this._google.Marker({map:t,position:e[0].geometry.location}),i&&i(e)):console.error(`Geocode was not successful for the following reason: ${o}`)})}async render(){return await super.render(),await(0,a.default)({key:this._apikey,libraries:["visualization"]}).then(e=>{this._google=e,this._supportGeocoder&&(this._geocoder=new this._google.Geocoder);const t=document.getElementById(this._map_el);if(!t)throw new Error("no map el");return this.map=new this._google.Map(t,{zoom:this._zoom,center:{lat:this._lat,lng:this._long},mapTypeId:"satellite"}),this._google.visualization?(this.heatmap&&this.heatmap.setMap(null),this.heatmap=new this._google.visualization.HeatmapLayer({data:(0,s.default)(this._google,this._data),map:this.map,dissipating:this._dissipating,radius:this._radius})):console.warn("Google Visualization could not load!"),!0}).catch(e=>{console.error(e)}),this}produceHeatmap(e){return this._google.visualization&&(e||this._data)?(this.heatmap&&this.heatmap.setMap(null),this.heatmap=new this._google.visualization.HeatmapLayer({data:(0,s.default)(google,e||this._data),map:this.map,dissipating:this._dissipating,radius:this._radius})):console.warn("Google Visualization could not load!"),!0}async remove(){return super.remove()}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=(e,t)=>{const o=[];if(e&&t&&Array.isArray(t)&&t.length>0){let i=0;const a=t.length;for(;i<a;i++)if(t[i].lat&&t[i].long){const a=new e.maps.LatLng(t[i].lat,t[i].long);t[i].weight?o.push({location:a,weight:t[i].weight}):o.push(a)}}else e||console.error("No Google API."),console.warn("Could not produce points.");return o}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,a=o(0),s=o(1),r=(i=s)&&i.__esModule?i:{default:i};const n="map";t.default=class extends a.DirectiveView{constructor(e){e||(e={}),super(e),this.template||(this.template=""),e.data?this._data=e.data:this._data=[],e.apikey?this._apikey=e.apikey:this._apikey="",e.lat?this._lat=e.lat:this._lat=37.775,e.long?this._long=e.long:this._long=-122.434,e.zoom?this._zoom=e.zoom:this._zoom=13,this._map_el=`${this.name}_${n}`,this.template+=`\n      <div id="${this._map_el}" class="map"></div>\n    `,e.geocode?this._supportGeocoder=!0:this._supportGeocoder=!1}async geocode(e,t){return await this._geocodeAddress(this._geocoder,this.map,e,t)}async _geocodeAddress(e,t,o,i){await e.geocode({address:o},(e,o)=>{"OK"===o?(t.setCenter(e[0].geometry.location),new this._google.Marker({map:t,position:e[0].geometry.location}),i&&i(e)):console.error(`Geocode was not successful for the following reason: ${o}`)})}async render(){return await super.render(),await(0,r.default)({key:this._apikey}).then(e=>{this._google=e,this._supportGeocoder&&(this._geocoder=new this._google.Geocoder);const t=document.getElementById(this._map_el);if(!t)throw new Error("no map el");return this.map=new this._google.Map(t,{zoom:this._zoom,center:{lat:this._lat,lng:this._long},mapTypeId:"satellite"}),!0}).catch(e=>{console.error(e)}),this}async remove(){return super.remove()}}}])});
//# sourceMappingURL=presentation-maps.js.map