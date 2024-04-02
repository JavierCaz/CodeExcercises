const N: number = parseInt(readline());

let Memory: Array<number> = [];
let D: number = null;

//Store all values into an array
for (let i = 0; i < N; i++) {
    const pi: number = parseInt(readline());
    Memory.push(pi);
}

//Sort values in ascending order
Memory.sort((a, b) => a - b);

let lastElem: number = null;
//Calculate the difference between two consecutive values and store that difference
//if its lower than the previous one.
Memory.forEach((e, i) => {
    if (i != 0) {
        const newD: number = e - lastElem;
        D = (D === null || newD < D) ? newD : D;
    }

    lastElem = e;
})

console.log(D);
