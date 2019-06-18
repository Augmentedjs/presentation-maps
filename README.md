# presentation-maps

Augmented.js Presentation Maps Module

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [HeatMapView](#heatmapview)
    -   [Parameters](#parameters)
    -   [Examples](#examples)

## HeatMapView

**Extends DirectiveView**

HeatMapView - A Google Maps Heatmap View

### Parameters

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options tp pass
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
