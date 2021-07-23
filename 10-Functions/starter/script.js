///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

let results = [0,2,3,0,0,3]


function registerNewAnser(lang){

 
    let validateValue = () =>{
        if(lang >3 || lang < 0){
            alert(`O valor digitado não é válido, ${lang}`)
        }else{
            if(lang!==null){
                addValue()
            }
        }
    }

    let addValue = () =>{
        const numbOption = parseInt(lang)
        console.log(numbOption)
        results.push(numbOption)
        displayResults()
    }

    let displayResults = () =>{
        
        let Javascript = 0
        let Python = 0
        let Rust = 0 
        let CPlusPlus = 0 

        results.forEach(_Nlangs =>{
            switch(true){
                case _Nlangs ==0:
                    Javascript++
                    break
                case _Nlangs ==1:
                    Python++
                    break
                case _Nlangs ==2:
                    Rust++
                    break
                case _Nlangs ==3:
                    CPlusPlus++
                    break
            }
        })

        console.clear()
        makePercent("Javascipt",Javascript)
        makePercent("Python",Python)
        makePercent("Rust",Rust)
        makePercent("C++",CPlusPlus)
        /*      
        console.log(`Javascript: ${Javascript}`)
        console.log(`Python: ${Python}`)
        console.log(`Rust: ${Rust}`)
        console.log(`C++ ${CPlusPlus}`)
         */    
}
    let makePercent = (tagname,value) =>{
        
        let Percent = Math.ceil((value * 100)/ results.length)
        console.log(`${tagname}: ${Percent}%`)
        
    }
    validateValue()
}

document.body.addEventListener("click",()=>{

    let language = prompt(`Qual a sua linguágem de programação favorita?
    0 - Javascript
    1 - Python
    2 - Rust
    3 - C++
    Obs: Escreva o número da opção abaixo: `)

    registerNewAnser(language)
})

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

const header = document.querySelector('h1');
header.style.color = 'red';

document.querySelector('body').addEventListener('click',
  function () {
    header.style.color = 'blue';
  });
