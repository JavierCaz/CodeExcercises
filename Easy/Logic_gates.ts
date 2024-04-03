interface InputSignalObject {
    name: string;
    signal: Array<string>;
}

interface OutputRequestObject {
    name: string;
    gateType: string;
    firstInput: string;
    secondInput: string;
}

const n: number = parseInt(readline());
const m: number = parseInt(readline());
let inputSignalObjects: Array<InputSignalObject> = [];
let outputRequestObjects: Array<OutputRequestObject> = [];

//Iterate over input signals and wrap them into an array of objects
for (let i = 0; i < n; i++) {
    var inputs: string[] = readline().split(' ');
    const inputName: string = inputs[0];
    const inputSignal: string = inputs[1];

    const inputObject: InputSignalObject = {
        name: inputName,
        signal: inputSignal.split('')
    }

    inputSignalObjects.push(inputObject);
}

//Iterate over output requests and wrap them into an array of objects
for (let i = 0; i < m; i++) {
    var inputs: string[] = readline().split(' ');
    const outputName: string = inputs[0];
    const type: string = inputs[1];
    const inputName1: string = inputs[2];
    const inputName2: string = inputs[3];

    const outputRequestObject: OutputRequestObject = {
        name: outputName,
        gateType: type,
        firstInput: inputName1,
        secondInput: inputName2
    }

    outputRequestObjects.push(outputRequestObject);
}

//Iterate over each output request and build its result
for (let i = 0; i < m; i++) {
    const currentRequest: OutputRequestObject = outputRequestObjects[i];
    const firstSignal: Array<string> = inputSignalObjects.find(e => e.name === currentRequest.firstInput).signal;
    const secondSignal: Array<string> = inputSignalObjects.find(e => e.name === currentRequest.secondInput).signal;
    let result: string = currentRequest.name + ' ';

    //Iterate over each pair of signals and compare them
    firstSignal.forEach((s1: string, i: number) => {
        const s2: string = secondSignal[i];
        const boolS1: boolean = s1 === '-';
        const boolS2: boolean = s2 === '-';
        let boolResult: boolean = false;
        let signalResult: string = '';

        //Do the logical operation according to current request's gate type
        switch(currentRequest.gateType){
            case 'AND':
                boolResult = (boolS1 && boolS2);
                break;
            case 'OR':
                boolResult = (boolS1 || boolS2);
                break;
            case 'XOR':
                boolResult = (boolS1 !== boolS2);
                break;
            case 'NAND':
                boolResult = !(boolS1 && boolS2);
                break;
            case 'NOR':
                boolResult = !(boolS1 || boolS2);
                break;
            case 'NXOR':
                boolResult = (boolS1 === boolS2);
                break;
        }

        //Translate result from boolean to string
        signalResult = boolResult ? '-' : '_';
        
        result = result + signalResult;
    })

    console.log(result);
}
