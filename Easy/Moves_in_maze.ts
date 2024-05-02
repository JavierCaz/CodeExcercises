interface INode {
    x: number;
    y: number;
    state: string;
    distance: number;
}

interface IAdjacency {
    node: INode;
    neighbors: Array<INode>;
}

const adjacencyList: Array<IAdjacency> = [];

const addNode = (node: INode) => {
    adjacencyList.push({node, neighbors:[]} as IAdjacency);
}

const addEdge = (node: INode, edge: INode) => {
    adjacencyList.find(e => e.node.x === node.x && e.node.y === node.y).neighbors.push(edge);
}

const bfs = (start: INode) => {
    let queue: Array<INode> = [start];
    let visited: Set<INode> = new Set();
    visited.add(start);
    adjacencyList.find(e => e.node.x === start.x && e.node.y === start.y).node.distance = 0;

    while (queue.length > 0) {
        const currentNode: INode = queue.shift();
        let distance: number = currentNode.distance;

        adjacencyList.find(e => e.node.x === currentNode.x && e.node.y === currentNode.y).neighbors.forEach(n => {
            if(!visited.has(n) && n.state !== '#') {
                visited.add(n);
                queue.push(n);
                adjacencyList.find(e => e.node.x === n.x && e.node.y === n.y).node.distance = distance + 1;
            }
        })
    }
}

var inputs: string[] = readline().split(' ');
const w: number = parseInt(inputs[0]);
const h: number = parseInt(inputs[1]);

//Fulfill adjacency list with nodes only
for (let y = 0; y < h; y++) {
    const ROW: string = readline();
    ROW.split('').forEach((e, x) => {
        const newNode: INode = {x, y, state: e, distance: null};
        addNode(newNode)
    })
}

//Add neighbors for each adjacency list's node
adjacencyList.forEach(e => {
    const neighbors: Array<IAdjacency> = adjacencyList.filter(a =>  (a.node.x === e.node.x && (a.node.y === e.node.y+1 || a.node.y === e.node.y-1)) || 
                                                                    (a.node.y === e.node.y && (a.node.x === e.node.x+1 || a.node.x === e.node.x-1)) ||
                                                                    (a.node.y === e.node.y && e.node.x === w-1 && a.node.x === 0) ||//Periodic cases
                                                                    (a.node.y === e.node.y && e.node.x === 0 && a.node.x === w-1) ||
                                                                    (a.node.x === e.node.x && e.node.y === h-1 && a.node.y === 0) ||
                                                                    (a.node.x === e.node.x && e.node.y === 0 && a.node.y === h-1)
                                                                    );
    (neighbors.length > 0) && neighbors.forEach(n => addEdge(n.node, e.node));
})

bfs(adjacencyList.find(e => e.node.state === 'S').node);

let line = '';
for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
        let node = adjacencyList.find(e => e.node.x === x && e.node.y === y).node;
        let res = node.distance !== null 
                                        ? node.distance > 9 
                                                            ? String.fromCharCode(65 + node.distance - 10) 
                                                            : node.distance 
                                        : node.state;

        line = line + res;
    }
    console.log(line);
    line = ''
}
