const producePoints = (google, data) => {
  const points = [];
  if (data && Array.isArray(data) && data.length > 0) {
    let i = 0;
    const l = data.length;
    for (i; i < l; i++) {
      points.push(new google.LatLng(data[i].lat, data[i].long));
    }
  }
  return points;
};

export default producePoints;
