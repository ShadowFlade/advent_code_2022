const fs = require('fs');
let data = fs.readFileSync('./data.txt',{encoding: 'utf8',flag:'r'});
let maxSum = 0;
data = data.split(' ');
console.log(Array.isArray(data),' is');
let indexOfElf;
data.forEach((elf,index) => {
    let caloriesSum = 0;

    elf.split('\n').forEach((calories) => {
        caloriesSum+=+calories
    }); 
    if(caloriesSum > maxSum){
        maxSum = caloriesSum
        indexOfElf = index;
    }
})
console.log(indexOfElf,' last index of elf');
return indexOfElf;

