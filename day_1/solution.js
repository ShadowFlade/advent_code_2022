const { log } = require('console');
const fs = require('fs');
let data = fs.readFileSync('./data.txt',{encoding: 'utf8',flag:'r'});
let maxSum = 0;
data = data.split(/\r*\n/);
console.log(data.length,' is');
let indexOfElf;
data.forEach((elf,index) => {
    let caloriesSum = 0;

    elf.split('\n').forEach((calories) => {
        log(calories,' calories');
        caloriesSum+=+calories
    }); 
    console.log(caloriesSum,' maxSum');
    if(caloriesSum > maxSum){
        maxSum = caloriesSum
        indexOfElf = index;
    }
})
console.log(indexOfElf,' last index of elf');
return indexOfElf;

