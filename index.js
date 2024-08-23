const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay= document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copyBtn]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck  = document.querySelector("#lowercase");
const numbercaseCheck  = document.querySelector("#number");
const symbolcaseCheck  = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector("[data-generatebtn]");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols='`~!@#$%^&*()_-+={[}]\|;:"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator('#ccc');
// set passwordLength
function handleSlider(){
    inputSlider.value =passwordLength;
    lengthDisplay.innerText = passwordLength;


}



function setIndicator(color){
    indicator.style.backgroundColor= color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;

}

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min))+ min;

}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(67,91));
}

function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper =uppercaseCheck.checked ;
    let hasLower  = lowercaseCheck.checked;
    let hasNum = numbercaseCheck.checked;
    let hasSym = symbolcaseCheck.checked ;


    if (hasUpper && hasLower &&(hasNum || hasSym)&& passwordLength>=8){
        setIndicator("#0f0"); //Green for strong
    
    }
    else if(
        (hasLower||hasUpper)&&
        (hasNum||hasSym)&&
        passwordLength>=6
    )
     { setIndicator('#0ff'); // Cyan for medium

    } else {
          setIndicator('#ff0'); // Yellow for weak
   }
}

async function copycontent() {
    try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText ="copied";
    }
catch(e){
    copyMsg.innerText ="Failed";
}

copyMsg.classList.add("active");

setTimeout(()=>{
    copyMsg.classList.remove("active");
},2000);
}


function shufflePassword(Array){
  //Fisher Yates Method
  for(let i=Array.length - 1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    const temp = Array[i];
    Array[i]= Array[j];
    Array[j]= temp;
  }
  let str="";
  Array.forEach((el)=> (str+=el));
  return str;
}
inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
}
    
)

copybtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copycontent();
})

function handleCheckBoxChange(){
    checkCount = 0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
        
    });
    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();

    }
}
allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);

}
)
generateBtn.addEventListener('click',()=>{

    if(checkCount===0) {
        return;

    }


    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
     

    password="";
    // if(uppercaseCheck.checked){
    //     password +=generateUpperCase();
    // }
    //  if(lowercaseCheck.checked){ 
    //     password+=generateLowerCase();

    //  }
       
     
    //  if(numbercaseCheck.checked){
    //     password+=generateRandomNumber();
    //  }
       
    //  if(symbolcaseCheck.checked){
    //     password+=generateSymbol();
    //  }
       
     
     

     let funcArr =[];
      if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);
      if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);
      if(numbercaseCheck.checked)
        funcArr.push(generateRandomNumber);
      if(symbolcaseCheck.checked)
        funcArr.push(generateSymbol);
     for(let i=0; i<funcArr.length; i++){
        password+= funcArr[i]();
     }
     while(password.length< passwordLength) {
        let randomIndex = getRndInteger(0,funcArr.length);
        password+=funcArr[randomIndex]();
     }

     password=shufflePassword(Array.from(password));
     passwordDisplay.value=password;
     calcStrength();


    }) ;  
      
