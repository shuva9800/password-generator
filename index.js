const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copybutton=document.querySelector("[data-copy]");
const inputSlider=document.querySelector("[data-lengthSlider]");
const copypassword=document.querySelector("[data-copyMsg]");
const passlength=document.querySelector(".password-length");
const uppercasecheck=document.querySelector("#uppercase");
const lowercasecheck=document.querySelector("#lowercase");
const numbercheck=document.querySelector("#numbers");
const symbolcheck=document.querySelector("#symbol");
const StrengthIndicator=document.querySelector("[data-indicator");
const passwordBtn=document.querySelector(".generateButton");
const allCheckbox=document.querySelectorAll("input[type=checkbox]");
const symbols = ['~`!@#$%^&*()_-+={[}]|:;"<,>.?/'];

let password="";
let passwordLength=10;
let checkCount=0;
handelSlider();
function handelSlider(){
    inputSlider.value=passwordLength;
    passlength.innerText=passwordLength;
    //baki ha//
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}
function setIndicator(color) {
    StrengthIndicator.style.backgroundColor = color;
    StrengthIndicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRandInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function getrandomNumber(){
    return getRandInteger(0,9);
}
function getRandomUppercase() {
    return String.fromCharCode(getRandInteger(65,91));
}
function getRandonLowercase(){
     return String.fromCharCode(getRandInteger(97,123));

}
function getRandomSymbol(){
    let index=getRandInteger(0,symbols.length);
    return symbols[index];
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercasecheck.checked) hasUpper = true;
    if (lowercasecheck.checked) hasLower = true;
    if (numbercheck.checked) hasNum = true;
    if (symbolcheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}
function handelCheckBoxChange(){
    checkCount=0;
    for(let i=0;i<allCheckbox.length;i++){
        if(allCheckbox[i].checked){
            checkCount++;
        }
    };

    if(checkCount > passwordLength)
    {
        passwordLength=checkCount;
        handelSlider();
    }
}


// allCheckbox.forEach((checkbox)=>{
//     checkbox.addEventListener('change', handleCheckBoxChange());
// })
inputSlider.addEventListener('input', (e)=>{
    passwordLength=e.target.value;
    handelSlider();
})
function shufflePassword(array){
    for(let i=0;i<array.length;i++)
    {
        let index=getRandInteger(0,array.length-1);
        const temp=array[index];
        array[index]=array[i];
        array[i]=temp;
    }
    let str="";
    for(let i=0;i<array.length;i++)
    {
        str+=array[i];
    }
    return str;
}
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copypassword.innerText="Copied";
    }
    catch(e){
        copypassword.innerText="Error";
    }
    copypassword.classList.add("active");
    setTimeout(()=>{
        copypassword.classList.remove("active");
    },2000);
}

copybutton.addEventListener('click',()=>{
    
    if(passwordDisplay.value)
    {
        copyContent();
    }

})
console.log("hello guys");
passwordBtn.addEventListener('click',()=>{
    if(checkCount==0)
    return;
    
    if(passwordLength < checkCount)
    {
        passwordLength=checkCount;
        handelSlider();
    }
    console.log("password");
    password="";
    let funcArr=[];
    if(uppercasecheck.checked)
    funcArr.push(getRandomUppercase);
    
    if(lowercasecheck.checked)
    funcArr.push(getRandonLowercase);

    if(numbercheck.checked)
    funcArr.push(getrandomNumber);

    if(symbolcheck.checked)    
    funcArr.push(getRandomSymbol);

    for(let i=0;i<funcArr.length;i++)
    {
        password+=funcArr[i]();
    }

    for(let i=0;i<passwordLength - funcArr.length;i++)
    {
        let randomIndex=getRandInteger(0 , funcArr.length);
        password+=funcArr[randomIndex]();

    }
    password=shufflePassword(Array.from(password));
    passwordDisplay.value=password;
    calcStrength();
})
