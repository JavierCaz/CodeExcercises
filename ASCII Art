const L: number = parseInt(readline());
const H: number = parseInt(readline());
const T: string = readline();

const alphabet: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ?".split('');

let asciiAlphabet: string[][] = alphabet.map(e => []);

for (let i = 0; i < H; i++) {
    const ROW: string = readline();

    let startIndex: number = 0;
    alphabet.forEach((e, index) => {
        let asciiSubstring = ROW.substring(startIndex, startIndex + L);
        asciiAlphabet[index].push(asciiSubstring);
        
        startIndex = startIndex + L;
    })
}

let asciiOutput: string = "";
for (var i = 0; i < H; i++) {
    let inputText = T;
    inputText = inputText.replace(/\s+/g, '?').toUpperCase();
    inputText.split('').forEach(e => {
        let charInex: number = alphabet.findIndex(e2 => e2 === e);
        charInex = charInex === -1 ? alphabet.length - 1 : charInex;
        asciiOutput = asciiOutput + asciiAlphabet[charInex][i];
    })
    console.log(asciiOutput)
    asciiOutput = "";
}
