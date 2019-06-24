# presentation-maps

Augmented.js Presentation Maps Module

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [HeatMapView](#heatmapview)
    -   [Parameters](#parameters)
    -   [Examples](#examples)
    -   [geocode](#geocode)
        -   [Parameters](#parameters-1)
    -   [render](#render)
-   [MapView](#mapview)
    -   [Parameters](#parameters-2)
    -   [Examples](#examples-1)
    -   [geocode](#geocode-1)
        -   [Parameters](#parameters-3)
    -   [render](#render-1)

## HeatMapView

**Extends DirectiveView**

HeatMapView - A Google Maps Heatmap View

### Parameters

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options to pass
    Requires the following options passed for meaningful results:

### Examples

```javascript
class MapView extends HeatMapView {
constructor() {
  super({
      "el": MOUNT_POINT,
      "template": `any template you want`,
      "name": "mapview",
      "style": "view",
      "lat": 37.775,
      "long": -122.434,
      "zoom": 13,
      "apikey": MAP_API_KEY,
      "data": [{ "lat": 37, "long": -122 }, ... ]
    });
  };
};
```

### geocode

geocode a location and update the map with a pin

#### Parameters

-   `location` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The location as a string
-   `callback` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** Opional callback once the call is complete and 'results' are passed

### render

Renders the Map

Returns **View** returns 'this'

## MapView

**Extends DirectiveView**

MapView - A Google Map View

### Parameters

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options to pass
    Requires the following options passed for meaningful results:

### Examples

```javascript
class MyMapView extends MapView {
constructor() {
  super({
      "el": MOUNT_POINT,
      "template": `any template you want`,
      "name": "mapview",
      "style": "view",
      "lat": 37.775,
      "long": -122.434,
      "zoom": 13,
      "apikey": MAP_API_KEY,
      "data": [{ "lat": 37, "long": -122 }, ... ]
    });
  };
};
```

### geocode

geocode a location and update the map with a pin

#### Parameters

-   `location` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The location as a string
-   `callback` **[function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** Opional callback once the call is complete and 'results' are passed

### render

Renders the Map

Returns **View** returns 'this'
