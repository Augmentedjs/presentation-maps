const producePoints = (google, data) => {
  const points = [];
  console.debug(google);
  if (google && data && Array.isArray(data) && data.length > 0) {
    let i = 0;
    const l = data.length;
    for (i; i < l; i++) {
      points.push(new google.maps.LatLng(data[i].lat, data[i].long));
    }
  } else {
    if (!google) {
      console.error("No Google API.");
    }
    console.warn("Could not produce points.");
  }
  return points;
};

export default producePoints;
