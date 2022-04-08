import './assets/css/style.css';
import words from './modules/words';
import getDayWord from './modules/monthWords';
import {msg, throwError, victory} from './modules/victoryLoseError';


document.addEventListener('DOMContentLoaded', () => {

    createSquares();

    let guessedWords = [[]]
    let availableSpace = 1;
    
    let word = getDayWord();
    console.log('A PALAVRA ATUAL É: ' + word);
    var keyboardContainer = document.querySelector('#keyboard-container');
    let guessWordCount = 0;

    const keys = document.querySelectorAll('.keyboard-row button');

    function getCurrentWordArr(){
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords -1];
    }

    function updateGuesseWords(letter){
        const currentWordArr = getCurrentWordArr();

        if(currentWordArr && currentWordArr.length < 5){
            currentWordArr.push(letter);
            
            const availableSpaceEl = document.getElementById(String(availableSpace));

            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }
    }

    function getTileColor(letter, index){
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter){
            return 'rgb(58, 58, 60)';
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if (isCorrectPosition){
            return 'rgb(83, 141, 78)';
        }

        return 'rgb(181, 159, 59)';
    }

    function handleSubmitWord(){
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5){
            throwError(3);
            return;
        }


        const currentWord = currentWordArr.join('').toUpperCase();

        if(wordsIsValid(words, currentWord.toUpperCase())){
            const firstLetterId = guessWordCount * 5 + 1;
            const interval = 200;
            currentWordArr.forEach((letter, index) => {
                setTimeout(() => {
                    const tileColor = getTileColor(letter, index);

                    const letterId = firstLetterId + index;
                    const letterEl = document.getElementById(letterId);

                    letterEl.classList.add('animate__flipInY');
                    letterEl.style = `background-color:${tileColor}; border-color:${tileColor}`;

                }, interval * index);

            });

            guessWordCount += 1;
            

            if(currentWord === word.toUpperCase()){
                victory();
                return;
            }

            if (guessedWords.length === 6){
                lose();
                return;
            }

            guessedWords.push([]);
            }

            else{
                throwError(2);
                return;
            }
    }

    function createSquares(){
        const gameBoard = document.getElementById('board');

        for (let index = 0; index < 30; index++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.classList.add('animate__animated');
            square.setAttribute('id', index + 1);
            gameBoard.appendChild(square);
        }
    }

    function handleDeleteLetter(){
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();

        guessedWords[guessedWords.length -1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(availableSpace - 1));
        lastLetterEl.textContent = '';
        availableSpace = availableSpace -1;
        console.log(availableSpace);
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({target}) => {
            const letter = target.getAttribute('data-key');

            if(letter === 'enter') {
                handleSubmitWord();
                return;
            }
            if(letter === 'del'){
                handleDeleteLetter();
                return;
            }

            updateGuesseWords(letter);
        }
    }

    function wordsIsValid(words, word){
        for(let i of words){
            if(i == word) {
                return true;
            }
        }
        return false;
    }

    const msg = document.querySelector('.msg');

    function lose(){
        msg.innerText = 'VOCÊ PERDEU! A PALAVRA ERA: ' + word;
        keyboardContainer.style.cssText = "display: none; visibility: hidden";
    }

    function throwError(type){
        if(type == 2) msg.innerText = 'ESSA PALAVRA NÃO FOI ENCONTRADA!';
        if(type == 3) msg.innerText = 'VOCE PRECISA COLOCAR 5 LETRAS';
                
        setTimeout(() => {
            msg.innerText = '';
        }, 3000);
    }

    function victory(){
        msg.style.cssText = "color: green;"
        msg.innerText = 'VOCÊ GANHOU!';

        keyboardContainer.style.cssText = "display: none; visibility: hidden";
    }


});