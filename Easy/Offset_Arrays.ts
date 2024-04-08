interface ArrayObject {
    name: string;
    startValue: number;
    endValue: number;
    arrayValues: Array<number>;
}

//Handy functions
const getArrayName = (arrayDef: string): string => {
    const firstBracketIndex: number = arrayDef.indexOf('[');

    return arrayDef.slice(0, firstBracketIndex);
}

const getArrayIndex = (arrayDef: string): string => {
    const firstBracketIndex: number = arrayDef.indexOf('[');
    const lastBracketIndex: number = arrayDef.lastIndexOf(']');

    return arrayDef.slice(firstBracketIndex + 1, lastBracketIndex);
}
//End of handy functions

/*
Recursive function
arrayList: Global dictionary of all arrays.
arrayName: Name of the array to work.
indexValue: Index value to evaluate. This value can be a number or another arrayIndex.
*/
const findIndexVaue = (arrayList: Array<ArrayObject>, arrayName: string, indexValue: string) => {
    //Retrieve 
    const currentArray: ArrayObject = arrayList.find(e => e.name === arrayName);
    const isNumeric: boolean = !isNaN(Number(indexValue));

    //If our indexValue isn't numeric, we need to find its numeric value calling this function recursively
    if (!isNumeric) {
        indexValue = findIndexVaue(arrayList, getArrayName(indexValue), getArrayIndex(indexValue)).toString();
    }

    //Calculate, '0' based, real index to get the required value of its array
    const realIndex: number = Number(indexValue) - currentArray.startValue;

    return currentArray.arrayValues[realIndex];
}

//Dictionary to store all arrays.
let arraysList: Array<ArrayObject> = [];

const n: number = parseInt(readline());
for (let i = 0; i < n; i++) {
    const assignment: string = readline();

    //Getting indexes of key characters to propertly read and map useful data into our dictionary.
    const firstPeriod: number = assignment.indexOf('.');
    const lastPeriod: number = assignment.lastIndexOf('.');
    const openBracket: number = assignment.indexOf('[');
    const closeBracket: number = assignment.indexOf(']');
    const equalsSymbol: number = assignment.indexOf('=');

    const newArray: ArrayObject = {
        name: getArrayName(assignment),
        startValue: Number(assignment.slice(openBracket+1, firstPeriod)),
        endValue: Number(assignment.slice(lastPeriod+1, closeBracket)),
        arrayValues: assignment.slice(equalsSymbol+2, assignment.length).split(' ').map(e => Number(e))
    }

    arraysList.push(newArray);
}

const x: string = readline();

console.log(findIndexVaue(arraysList, getArrayName(x), getArrayIndex(x)));
