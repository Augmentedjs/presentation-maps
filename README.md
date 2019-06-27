# presentation-maps

Augmented.js Presentation Maps Module

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [HeatMapView](#heatmapview)
    -   [Parameters](#parameters)
    -   [Examples](#examples)
    -   [render](#render)
        -   [Properties](#properties)
    -   [render](#render-1)
    -   [produceHeatmap](#produceheatmap)
        -   [Parameters](#parameters-1)
        -   [Examples](#examples-1)
-   [MapView](#mapview)
    -   [Parameters](#parameters-2)
    -   [Examples](#examples-2)
    -   [render](#render-2)

## HeatMapView

**Extends DirectiveView**

HeatMapView - A Google Maps Heatmap View

### Parameters

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options to pass
    Requires the following options passed for meaningful results:

### Examples

```javascript
class MyMapView extends HeatMapView {
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
      "data": [{ "lat": 37, "long": -122, "weight": 1 }, ... ]
    });
  };
};
```

### render

#### Properties

-   `heatmap` **Google.Maps.Heatmap** The heatmap

### render

Renders the Map

Returns **View** returns 'this'

### produceHeatmap

Produces the heatmap from point data

#### Parameters

-   `data` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** The data as an array of points in Lat/Long

#### Examples

```javascript
produceHeatmap([{ "lat": 37.7749, "long": -122.4194, "weight": 1 }, ... ]);
```

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

### render

Renders the Map

Returns **View** returns 'this'
