const LON: string = readline();
const LAT: string = readline();
const N: number = parseInt(readline());

const degrees_to_radians = deg => (deg * Math.PI) / 180.0;

const ditanceBetweenTwoPoints = (dataA: Array<number>, dataB: Array<number>) => {
    //[0] Longitude
    //[1] Latitude
    const dataA_radians = dataA.map(e => degrees_to_radians(e));
    const dataB_radians = dataB.map(e => degrees_to_radians(e));
    
    const x = (dataB_radians[0] - dataA_radians[0]) * Math.cos((dataA_radians[1] + dataB_radians[1]) / 2);
    const y = dataB_radians[1] - dataA_radians[1];
    const d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) * 6371;

    return d;
}

const defibrillators = [];
const distances = [];
const userLon = Number(LON.replace(',', '.'));
const userLat = Number(LAT.replace(',', '.'));

for (let i = 0; i < N; i++) {
    const DEFIB: string = readline();
    const defibValues = DEFIB.split(';');
    const defibLON = Number(defibValues[4].replace(',', '.'));
    const defibLAT = Number(defibValues[5].replace(',', '.'));
    
    const distance = ditanceBetweenTwoPoints([userLon, userLat], [defibLON, defibLAT])
    
    defibrillators.push(defibValues);
    distances.push({id: defibValues[0], distance: distance});
}

distances.sort((a, b) => a.distance - b.distance);
const smallestValue = distances[0];
const smallestDistanceDefib = defibrillators.find(e => e[0] === smallestValue.id);

console.log(smallestDistanceDefib[1]);
