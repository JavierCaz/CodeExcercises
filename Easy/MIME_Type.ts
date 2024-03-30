const N: number = parseInt(readline()); // Number of elements which make up the association table.
const Q: number = parseInt(readline()); // Number Q of file names to be analyzed.
let dictionary = [];

for (let i = 0; i < N; i++) {
    var inputs: string[] = readline().split(' ');
    dictionary.push(inputs);
}

for (let i = 0; i < Q; i++) {
    const FNAME: string = readline(); // One file name per line.
    if (FNAME.includes('.')){
        const fileType = FNAME.substring(FNAME.lastIndexOf('.') + 1, FNAME.length);
        const mimeType = dictionary.find(e => e[0].toLowerCase() === fileType.toLowerCase());
        
        console.log(mimeType ? mimeType[1] : 'UNKNOWN');
    } else {
        console.log('UNKNOWN')
    }
}
