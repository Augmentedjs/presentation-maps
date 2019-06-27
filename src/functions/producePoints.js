const producePoints = (google, data) => {
  const points = [];
  if (!google) {
    console.error("No Google API.");
  } else if (data && Array.isArray(data) && data.length > 0) {
    let i = 0;
    const l = data.length;
    for (i; i < l; i++) {
      if (data[i].lat && data[i].long) {
        const latlong = new google.maps.LatLng(data[i].lat, data[i].long);
        if (data[i].weight) {
          points.push({ location: latlong, weight: data[i].weight });
        } else {
          points.push(latlong);
        }
      }
    }
  }
  return points;
};

export default producePoints;
