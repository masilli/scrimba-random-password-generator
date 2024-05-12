const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

// return only the lowercase letters
const numbers = characters.filter((char) => {
  return char >= "0" && char <= "9";
});

// return only the lowercase letters
const lowerLetters = characters.filter((char) => {
  return char >= "a" && char <= "z";
});

// return only the capital letters
const upperLetters = characters.filter((char) => {
  return char >= "A" && char <= "Z";
});

// return only the special characters
const symbols = characters.filter((char) => {
  return !/[a-zA-Z0-9]/.test(char);
});

// declare input variables
let upperInput = document.getElementById("upper-letters-checkbox");
let lowerInput = document.getElementById("lower-letters-checkbox");
let numbersInput = document.getElementById("numbers-checkbox");
let symbolsInput = document.getElementById("symbols-checkbox");
let lengthInput = document.getElementById("length-input");

// declare other elements
let generateBtn = document.getElementById("generate-btn");
let pwdEl1 = document.getElementById("pwd1");
let infoEl = document.querySelector(".info");

generateBtn.addEventListener("click", function () {
  generatePassword();
});

function getRandomChar() {
  let randomChar = 0;
  let charArray = [];
  if (upperInput.checked) {
    charArray.push(...upperLetters);
  }
  if (lowerInput.checked) {
    charArray.push(...lowerLetters);
  }
  if (numbersInput.checked) {
    charArray.push(...numbers);
  }
  if (symbolsInput.checked) {
    charArray.push(...symbols);
  }

  randomChar = Math.floor(Math.random() * charArray.length);
  return charArray[randomChar];
}

function generatePassword() {
  pwdEl1.value = "";
  infoEl.textContent = "";

  let passwordLength = Number(lengthInput.value);

  if (
    !upperInput.checked &&
    !lowerInput.checked &&
    !numbersInput.checked &&
    !symbolsInput.checked
  ) {
    pwdEl1.value = "";
    infoEl.textContent =
        "Please check some boxes!"
  } else {
    if (passwordLength < 6) {
      infoEl.textContent =
        "Your password should have at least 6 characters, but you can make it longer for more security.";
    } else if (passwordLength > 24) {
      infoEl.textContent = "Your password doesn't need to be that long!";
    } else {
      for (let i = 0; i < passwordLength; i++) {
        pwdEl1.value += getRandomChar();
      }
    }
  }
}

// copy on click
const copyPwd = document.querySelector(".password");

copyPwd.onclick = function () {
    if (copyPwd.value === "") {
        infoEl.textContent = "Nothing to copy...";
    } else {
        const tempInput = document.createElement("input");
        tempInput.setAttribute("value", copyPwd.value);
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        infoEl.textContent = "Password copied, don't forget to save it!";
    }
};

copyPwd.addEventListener("copy", function (event) {
    event.preventDefault();
    if (event.clipboardData) {
        event.clipboardData.setData("text/plain", copyPwd.value);
        infoEl.textContent = "Password copied, don't forget to save it!";
    }
});