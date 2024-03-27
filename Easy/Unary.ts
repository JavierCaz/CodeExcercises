/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const MESSAGE: string = readline();

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

let binaryMessage: string = '';

//Transform string message into binary value message
MESSAGE.split('').forEach(char => {
    let binaryCode: string = char.charCodeAt(0).toString(2);

    //Format binary result to be 7 chars long
    if (binaryCode.length < 7) {
        for(let i=0; i < (7 - binaryCode.length); i++){
            binaryCode = '0' + binaryCode;
        }
    } 

    binaryMessage = binaryMessage + binaryCode;
})

let encodedMessage = '';
let digitMemory = '';
let counter = 0;

binaryMessage.split('').forEach((digit, i, array) => {
    const isFirstItem = i === 0;
    const isLastItem = (i === array.length - 1);
    const digitType = (digit === '1') ? '0' : '00';;
    const isDigitChange = digitType !== digitMemory;
    let blockOfBits = '';
    
    if ((isDigitChange && !isFirstItem) || isLastItem) {
        (isLastItem && !isDigitChange) && counter++;

        //Counts the sequence of same digits until change
        for (i = 0; i < counter; i++) {
            blockOfBits = blockOfBits + '0';
        }

        !isLastItem && (counter = 0);

        encodedMessage = encodedMessage + digitMemory + ' ' + blockOfBits + (isLastItem ? '' : ' ');

        //Last case when we have one remaining symbol and its different from the previous one.
        if (isLastItem && isDigitChange) {
            encodedMessage = encodedMessage + ' ' + digitType + ' 0';
        }
    }
    
    if (!isLastItem) {
        counter++;
        isDigitChange && (digitMemory = digitType);
    }
})

console.log(encodedMessage);
