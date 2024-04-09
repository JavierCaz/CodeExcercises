const calculateGCD = (a: number, b: number) => {
    const q: number = Math.floor(a/b);
    const r: number = a - (b*q);

    console.log(`${a}=${b}*${q}+${r}`)
    
    if (r === 0) {
        return b;
    } else {
        return calculateGCD(b, r);
    }
}

var inputs: string[] = readline().split(' ');
const a: number = parseInt(inputs[0]);
const b: number = parseInt(inputs[1]);

const gcd: number = calculateGCD(a, b);
console.log(`GCD(${a},${b})=${gcd}`);
