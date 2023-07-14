export const airQualityIndexStyles = {
  1: {
    backgroundColor: "#a8e05f",
    color: "#607631",
  },
  2: {
    backgroundColor: "#fdd64b",
    color: "#8c6c1d",
  },
  3: {
    backgroundColor: "#ff9b57",
    color: "#974a20",
  },
  4: {
    backgroundColor: "#fe6a69",
    color: "#942431",
  },
  5: {
    backgroundColor: "#a87383",
    color: "#573344",
  },
};

export const airQualityIndexReference = {
  so2: {
    minGood: 0,
    minFair: 20,
    minModerate: 80,
    minPoor: 250,
    minVeryPoor: 350,
    Title: () => (
      <>
        SO<sub>2</sub>
      </>
    ),
  },
  no: {
    minGood: 0,
    minFair: 40,
    minModerate: 70,
    minPoor: 150,
    minVeryPoor: 200,
    Title: () => (
      <>
        NO<sub>2</sub>
      </>
    ),
  },
  pm10: {
    minGood: 0,
    minFair: 20,
    minModerate: 50,
    minPoor: 100,
    minVeryPoor: 200,
    Title: () => (
      <>
        PM<sub>10</sub>
      </>
    ),
  },
  pm2_5: {
    minGood: 0,
    minFair: 10,
    minModerate: 25,
    minPoor: 50,
    minVeryPoor: 75,
    Title: () => (
      <>
        PM<sub>2.5</sub>
      </>
    ),
  },
  o3: {
    minGood: 0,
    minFair: 60,
    minModerate: 100,
    minPoor: 140,
    minVeryPoor: 180,
    Title: () => (
      <>
        O<sub>3</sub>
      </>
    ),
  },
  co: {
    minGood: 0,
    minFair: 4400,
    minModerate: 9400,
    minPoor: 12400,
    minVeryPoor: 15400,
    Title: () => <>CO</>,
  },
};
