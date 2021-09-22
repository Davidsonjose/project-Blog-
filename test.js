const fs = require('fs');
const { resolve } = require('path');
const path = require('path');


let fileOne= path.join(__dirname, 'files/one.txt')
let  fileTwo=path.join(__dirname, 'files/two.txt')
let file3= path.join(__dirname, 'files/three.txt')
let fileFour= path.join(__dirname, 'files/four.txt')
let dataFive= path.join(__dirname, 'files/')

// const dataOne=fs.readFileSync(fileOne, 'utf-8');
// const dataTwo =fs.writeFileSync(fileTwo, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad excepturi incidunt eos non officia maiores autem magnam minima, ullam odio.')
// const contentTwo = fs.readFileSync(fileTwo, 'utf-8');
// console.log(contentTwo);



//asynchronous task
// fs.readFile(fileOne, 'utf-8', (err, dataOne) => {
//     if (err) {
//         throw err;
//     }
//     fs.writeFile('files/async.text', dataOne), (err) =>{
//         if (err) {
//             throw err;
//         }
//     fs.readFile('files/async.text', 'utf-8'), (err, dataTwo) => {
//         if (err){
//             throw err;
//         }
//         console.log(dataTwo);


//     fs.readdir('files', 'utf-8'), (err, files) => {
//         if (err){
//             throw err;
//         }
//         console.log(files);
//     }

//     }}
// }); 




// console.log('number one');
// console.log('number Two');
// console.log(' number three');

// setTimeout(() => {
//     console.log('number 4');
// }, 6000);
// console.log('number five');

// const readFilePromise= (file) => {
//      return new Promise();
//  }
const readFilePromise= (file) =>
 new Promise ((resolve, reject) => {
    return fs.readFile(file, 'utf-8', (err, data)=>{
        if (err) reject(err); {
            resolve(data);
        }
    });
});

const writeFilePromise= (fileToWrite, dataToWrite) => new Promise((resolve, reject)=>{
    return fs.writeFile( fileToWrite, dataToWrite, (err)=>{
        if (err) reject(err); {
            resolve('write file is successful');
        }
    });
});
// readFilePromise(fileOne)
// .then((result1)=> writeFilePromise(fileTwo, `coding no dey easy o at all... if you no sabi${result1}`))
// .then((result2)=> console.log(result2))
// // 
// readFilePromise(fileTwo) 
// .then((result2)=> console.log(result2));

// readFilePromise(file3)
// .then((result2)=> console.log(result2));

// readFilePromise(fileFour)
// .then((result1)=> writeFilePromise(fileFour, `i just edited this fourth text`))
// .then((result2)=> console.log(result2));


//using asyn in a function
//async function fileName (){};

//using async function in arrow fuction 
//const fileName = async()=>{}


// async function fileName(){};

const fileProcess= async()=>{
    try {
        let f1= await readFilePromise(fileOne);
        console.log(f1);
    } catch (error) {
     console.log(error);   
    }
};
fileProcess();


const fileStyle = async()=>{
    try {
        let f2 =await readFilePromise(fileTwo)
        console.log(f2);
    } catch (error) {
        console.log(error);
    }
}
 fileStyle();



 const fileBaby = async()=>{
     try {
         let f3= await readFilePromise(file3)
         console.log(f3);
     } catch (error) {
         console.log(error);
     }
 } 
fileBaby();


const fileNumber= async()=>{
    try {
        let f4= await readFilePromise(fileFour)
        console.log(f4);
    } catch (error) {
        console.log(error);
    }
}
fileNumber();


const fileWrite = async ()=>{
     try {
         let f5= await readFilePromise(fileFive)
         let f6= await writeFilePromise('files/four.txt', f5);
         let fread = await readFilePromise('files/four.txt')
         console.log(fread);
     } catch (error) {
         console.log(error);
     }
}
fileWrite();



 
