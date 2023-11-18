const path = require('path');
const fs = require('fs')

const filePath = path.resolve(__dirname + '/data.txt');
const data = fs.readFileSync(filePath, { encoding: 'utf8' })
console.log(data.slice(0, 10))
const rounds = data.split('\n');
console.log(rounds.slice(0, 5), ' rounds')
const elfHandds = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
}
const yourHands = {
    Y: 'paper',
    X: 'rock',
    Z: 'scissors'
}
const combinations = [
    ['rock', 'paper'],
    ['paper', 'scissors'],
    ['scissors', 'rock']
]

const pointsForHand = {
    rock: 1,
    paper: 2,
    scissors: 3,
}
let myTotalPoints = 0;

function whoWon(round) {
    round = round.split(' ');
    const myHand = round[1]
    if (!myHand) {
        return
    }
    const hisHand = round[0]
    const myPoints = pointsForHand[yourHands[myHand]];
    let pointsForResult = 0;
    for (const comb of combinations){
        if (elfHandds[hisHand] == yourHands[myHand]) {
            pointsForResult = 3;
            console.log('draw', pointsForResult)
            break
        } else if (comb.includes(elfHandds[hisHand]) && comb.includes(yourHands[myHand])) {
            pointsForResult = comb[1] == yourHands[myHand] ? 6 : 0;
            console.log(pointsForResult, ' points result')
            break
        }
    }

    myTotalPoints += +myPoints + +pointsForResult;
}
rounds.forEach(round => whoWon(round))
const arr = [12983, 10244, 16215, 8384];
