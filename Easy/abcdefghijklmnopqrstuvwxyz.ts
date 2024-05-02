interface INode {
    x: number;
    y: number;
    char: string;
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

const dfs = (start: INode): Array<INode> => {
    let queue: Array<INode> = [start];
    let visited: Array<INode> = [start];

    while (queue.length > 0) {
        const currentNode: INode = queue.pop();

        if (currentNode.char === 'z') return visited;

        adjacencyList.find(e => e.node.x === currentNode.x && e.node.y === currentNode.y).neighbors.forEach(n => {
            if(!visited.includes(n) && n.char.charCodeAt(0) === currentNode.char.charCodeAt(0) + 1) {
                visited.push(n);
                queue.push(n);
            }
        })
    }
}

const n: number = parseInt(readline());
for (let y = 0; y < n; y++) {
    const m: string = readline();

    m.split('').forEach((e, x) => {
        const newNode: INode = {x, y, char: e};
        addNode(newNode);
    })
}

//Add neighbors for each adjacency list's node
adjacencyList.forEach(e => {
    const neighbors: Array<IAdjacency> = adjacencyList.filter(a =>  (a.node.x === e.node.x && (a.node.y === e.node.y+1 || a.node.y === e.node.y-1)) || 
                                                                    (a.node.y === e.node.y && (a.node.x === e.node.x+1 || a.node.x === e.node.x-1)) );
    (neighbors.length > 0) && neighbors.forEach(n => addEdge(n.node, e.node));
})

adjacencyList.filter(e => e.node.char === 'a').forEach(e => {
    let list = dfs(e.node);

    if (list) {
        for (let y = 0; y < n; y++) {
            let line = '';
            for (let x = 0; x < n; x++) {
                let node = list.find(e => e.x === x && e.y === y);
                line = line + (node ? node.char : '-');
            }
            console.log(line)
        }
    }
})
