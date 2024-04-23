/**
 * Save humans, destroy zombies!
 **/

interface IHuman {
    id: number;
    x: number;
    y: number;
    salvage?: boolean;
}

interface ITarget {
    human: IHuman;
    distance: number;
}

interface IZombie extends IHuman {
    nextX: number;
    nextY: number;
    target: ITarget;
}

const calculateDistanceBetween = (x1: number, y1: number, x2: number, y2: number): number => {
    const distanceX: number = Math.abs(x1 - x2);
    const distanceY: number = Math.abs(y1 - y2);

    return Math.sqrt( distanceX ** 2 + distanceY ** 2);
}

const calculateTurnsToReach = (speed: number, distance: number): number => {
    return distance / speed;
}

let ash: IHuman = {id: -1} as IHuman;
let humans: Array<IHuman> = [ash];
let zombies: Array<IZombie> = [];

let gameStart: boolean = true;

// game loop
while (true) {
    var inputs: string[] = readline().split(' ');

    const x: number = parseInt(inputs[0]);
    const y: number = parseInt(inputs[1]);

    ash.x = x;
    ash.y = y;

    const humanCount: number = parseInt(readline());

    for (let i = 0; i < humanCount; i++) {
        var inputs: string[] = readline().split(' ');
        const humanId: number = parseInt(inputs[0]);
        const humanX: number = parseInt(inputs[1]);
        const humanY: number = parseInt(inputs[2]);

        const human: IHuman = {
            id: humanId,
            x: humanX,
            y: humanY,
            salvage: true
        }

        gameStart && humans.push(human);
    }

    const zombieCount: number = parseInt(readline());
    zombies = [];
    for (let i = 0; i < zombieCount; i++) {
        var inputs: string[] = readline().split(' ');
        const zombieId: number = parseInt(inputs[0]);
        const zombieX: number = parseInt(inputs[1]);
        const zombieY: number = parseInt(inputs[2]);
        const zombieXNext: number = parseInt(inputs[3]);
        const zombieYNext: number = parseInt(inputs[4]);

        let humanTarget: ITarget;
        humans.forEach((human: IHuman, i: number) => {
            const currentDistance: number = calculateDistanceBetween(human.x, human.y, zombieX, zombieY);
            const currentAshDistance: number = calculateDistanceBetween(ash.x, ash.y, zombieX, zombieY);
            let targetHuman: IHuman;
            let targetDistance: number;
            
            //If zombie reaches human, remove it from humans array
            if (currentDistance < 400 && currentAshDistance < 2000) {
                humans.splice(i, 1);
            } else {
                if (i === 0) {
                    targetHuman = human;
                    targetDistance = currentDistance;
                } else {
                    const lastDistance: number = calculateDistanceBetween(humanTarget.human.x, humanTarget.human.y, zombieX, zombieY);
    
                    if (currentDistance < lastDistance) {
                        targetHuman = human;
                        targetDistance = currentDistance
                    } else {
                        targetHuman = humanTarget.human;
                        targetDistance = lastDistance
                    }
                }
                
                humanTarget = {human: targetHuman, distance: targetDistance};
            }
        })

        const zombie: IZombie = {
            id: zombieId,
            x: zombieX,
            y: zombieY,
            nextX: zombieXNext,
            nextY: zombieYNext,
            target: humanTarget
        }

        zombies.push(zombie);
    }

    const zombiesTargets: Array<ITarget> = [];
    zombies.forEach(e => !zombiesTargets.includes(e.target) && zombiesTargets.push(e.target));
    zombiesTargets.sort((a, b) => a.distance - b.distance)

    const higherDangerTarget: ITarget = zombiesTargets.find(e => e.human.salvage && e.human.id !== -1)
    if (higherDangerTarget) {
        const distanceAshTarget: number = calculateDistanceBetween(ash.x, ash.y, higherDangerTarget.human.x, higherDangerTarget.human.y);
        const shootingRangeAsh: number = 2000;
        const turnsToReachForZombie: number = calculateTurnsToReach(400, higherDangerTarget.distance);
        const turnsToReachForAsh: number = calculateTurnsToReach(1000, distanceAshTarget - shootingRangeAsh);
        if (turnsToReachForZombie < turnsToReachForAsh) {
            humans.find(e => e.id === higherDangerTarget.human.id).salvage = false;
        }
    
        ash.x = higherDangerTarget.human.x;
        ash.y = higherDangerTarget.human.y;
    }

    console.log(ash.x + ' ' + ash.y);     // Your destination coordinates
    gameStart = false;
}
