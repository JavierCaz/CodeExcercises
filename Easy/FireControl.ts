interface IUnit {
    x: number;
    y: number;
    state: string;
}

let forest: Array<IUnit> = [];

for (let i = 0; i < 6; i++) {
    const text: string = readline();
    for (let j = 0; j < 6; j++) {
        const newUnit: IUnit = {
            x: j+1,
            y: i+1,
            state: text[j]
        }

        forest.push(newUnit);
    }
}

const onFireTrees: Array<IUnit> = forest.filter(e => e.state === '*');

let count: number = 0;
const diagonalOffSet: number = 2;
onFireTrees.forEach(f => {
    forest.forEach(t => {
        if (((t.x >= f.x && t.x < f.x + 3) && (t.y >= f.y && t.y < f.y + 3)) || //BR
            ((t.x <= f.x && t.x > f.x - 3) && (t.y <= f.y && t.y > f.y - 3)) || //UL
            ((t.x <= f.x && t.x > f.x - 3) && (t.y >= f.y && t.y < f.y + 3)) || //BL
            ((t.x >= f.x && t.x < f.x + 3) && (t.y <= f.y && t.y > f.y - 3)) || //UR
            (t.x === f.x + diagonalOffSet && t.y === f.y + diagonalOffSet) || //BR Corner
            (t.x === f.x - diagonalOffSet && t.y === f.y + diagonalOffSet) || //BL Corner
            (t.x === f.x + diagonalOffSet && t.y === f.y - diagonalOffSet) || //UR Corner
            (t.x === f.x - diagonalOffSet && t.y === f.y - diagonalOffSet)) { //UL Corner
            if (t.state === '#') {
                t.state = '-';
                count ++;
            } 
        }
    })
})

console.error("----FOREST MAP-----");
let row = ''
forest.forEach((e, i, f) => {
    if ((i % 6 === 0 && i > 0) || i === f.length - 1) {
        if ( i === f.length - 1) row = row + e.state
        console.error(row)
        row = ''
    } 
    row = row + e.state
})
console.error("----FOREST MAP-----");

if (onFireTrees.length === 0) console.log('RELAX')
else if (!forest.find(e => e.state === '#')) console.log('JUST RUN')
else console.log(count);
