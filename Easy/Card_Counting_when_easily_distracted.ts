interface CardObject {
    key: string;
    value: number;
    number: number;
}

const containsOnlyAllowedChars = (input: string) => {
    const allowedChars: Array<string> = ['2', '3', '4', '5', '6', '7', '8', '9', 'A', 'T', 'J', 'Q', 'K'];
    let response: boolean = true;

    input.split('').forEach(e => !allowedChars.includes(e) && (response = false));

    return response;
}

const calculateRemainingCardsValuesLessThanTreshhold = (cardsDeck: Array<CardObject>, bustThreshold: number): number => {
    let count: number = 0;

    cardsDeck.forEach(e => {
        if(e.value < bustThreshold) count += (4-e.number);
    })

    return count;
}

const cardValues = {
    'K': 10,
    'Q': 10,
    'J': 10,
    'T': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
    'A': 1
}

const streamOfConsciousness: string = readline();
const bustThreshold: number = parseInt(readline());

const thoughtsList: Array<string> = streamOfConsciousness.split('.');
let cardsDeck: Array<CardObject> = Object.keys(cardValues).map(e => {
    const card: CardObject = {
        key: e,
        value: cardValues[e],
        number: 0
    }

    return card;
} );

//Build deck in base of the cards that we have already seen
thoughtsList.forEach(thought => {
    containsOnlyAllowedChars(thought) && 
        thought.split('').forEach(e => cardsDeck.find(c => c.key === e).number++)
})

const cardsValuesLessThanTreshhold: number = calculateRemainingCardsValuesLessThanTreshhold(cardsDeck, bustThreshold);
const deckLenght: number = cardsDeck.reduce((accumulator, currentValue) => accumulator + currentValue.number, 0);
const percentageChance: number = cardsValuesLessThanTreshhold / (52 - deckLenght);


console.log(Math.round(percentageChance*100)+'%');
