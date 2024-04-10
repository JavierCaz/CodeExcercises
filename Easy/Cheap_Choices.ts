interface IItem {
    category: string;
    size: string;
    price: number;
}

let inventory: Array<IItem> = [];

const c: number = parseInt(readline());
const p: number = parseInt(readline());

//Push all items inside our db;
for (let i = 0; i < c; i++) {
    const item: string = readline();
    const itemElements: Array<string> = item.split(' ');

    const newItem: IItem = {
        category: itemElements[0],
        size: itemElements[1],
        price: Number(itemElements[2])
    }

    inventory.push(newItem);
}

//Sort our inventory by price asc.
inventory = inventory.sort((a, b) => a.price - b.price);

for (let i = 0; i < p; i++) {
    const order: string = readline();
    const orderElements: Array<string> = order.split(' ');

    const itemIndex: number = inventory.findIndex(e => e.category === orderElements[0] && e.size === orderElements[1]);
    const itemFound: boolean = itemIndex !== -1;

    console.log(itemFound  ? inventory[itemIndex].price : 'NONE');

    //If item exists, remove it from our invntory.
    itemFound && inventory.splice(itemIndex, 1);
}
