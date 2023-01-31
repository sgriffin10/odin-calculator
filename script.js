const container = document.querySelector(".numbers-container");
console.log(container);
let max = 500;
container.style.maxWidth = `${max}px`;
container.style.maxHeight = `${max}px`;
container.backgroundColor = 'blue';

// let gridSize = 25;
const topRow = ['C','+/-','%']
const operators = ['/','*','-','+','=']
const bottomRow = ['0','','.']
renderGrid();
// let size = 25;
function renderGrid (){
    container.style.gridTemplateColumns = `repeat(${4},${(max/4)}px)`;
    container.style.columnGap = '0px';
    // container.style.gridTemplateColumns = `repeat(${size},1)`;

    for (let i = 0; i < 5; i++){
        for (let j = 0; j < 4; j++){
            
            const div = document.createElement('div');
            div.classList.add('buttons');
            if (j === 3){
                div.textContent = `${operators[i]}`;
                div.classList.add('operator');
            }else if (i === 0){
                div.textContent = `${topRow[j]}`; 
                div.classList.add('top-row');
            } else if (i===4){
                div.textContent = `${bottomRow[j]}`;
                if (bottomRow[j] === '0'){
                    div.classList.add('number');
                }
            } else {
                div.textContent = `${((i-1)*3)+j+1}`;
                div.classList.add('number');
            }
            container.appendChild(div);
        }
        
    }
}


function operate(arr){
    // console.log(arr[0]);
    // total = Number(arr[0]);
    // let operation;
    for (let i = 0; i < arr.length; i+=2){
        let firstNum;
        console.log(`i: ${i} and arr: ${arr}`);
        if (i === 0 && typeof arr[0] === 'number'){ //if array value is number
            firstNum = arr[i];
        } else { //else, continue with current total (display number) as first number
            firstNum = total
            if (i===0) arr.unshift(total);
            
        }

        let operator = arr[i+1];
        //if there is no operator, make it equal to display value
        if (!arr[i+1]){
            total = firstNum;
            break;
        }
        let secondNum;
        //if no second value after operator, assign first number to second number
        if (!arr[i+2] && arr[i+2] !== 0){
            secondNum = firstNum;
        } else {
            secondNum = arr[i+2];
        }
        console.log(firstNum);
        console.log(operator);
        console.log(secondNum);

        switch (operator){
            case '+':
                total = firstNum + secondNum;
                break;
            case '-':
                total = firstNum - secondNum;
                break;
            case '*':
                total = firstNum * secondNum;
                break;
            case '/':
                console.log("dividing");
                if (secondNum === 0){
                    console.log("dividing by 0");
                    total = "You divided by 0, numpty!";
                    break;
                }
                total = firstNum / secondNum;
                break;
            case '+/-':
                total *= -1;
                break;
        }

    }
    resetArr();
    if (typeof total === 'number' && total.toString().length > 10){
        total = total.toFixed(10);
    }
    changeDisplay(total);
    if (typeof total !== 'number'){
        total = 0;
    }
    
}
let arr = [];
let periodFlag = false;
function storeLogic(button){

    console.log(button);
    const classList = button.classList;
    console.log(classList);
    let length = arr.length;

    if (periodFlag){
        arr[length-1] = Number(arr[length-1]+ button.textContent);
        changeDisplay(arr.slice(-1));
        periodFlag = false;
    } else if (classList.contains("number")){
        // console.log("contains number")
        length = arr.length;
        // console.log(`length ${length}`);
        if (length >= 0 && typeof arr[length-1] === 'number'){
            // console.log(arr[length-1]);
            arr[length-1] = Number(arr[length-1] + button.textContent);
        } else {
            arr.push(Number(button.textContent));
        }
        changeDisplay(arr.slice(-1));
        
    } else if (button.textContent === '+/-') {
        let length = arr.length;
        if (length > 0){
            arr[length-1] *= -1;
            changeDisplay(arr.slice(-1));
        } else {
            arr.push(total);
            arr.push('*');
            arr.push(-1);
            operate(arr);
        }
    } else if (button.textContent === '.') {
        let length = arr.length;
        if (length > 0){
            arr[length-1] = arr[length-1] + '.';
            
        } else {
            arr.push("0.");
        }
        changeDisplay(arr.slice(-1));
        periodFlag = true;
    } else if (button.textContent === '%') {
        arr.push("/");
        arr.push("100");
        operate(arr);
    } else {
        arr.push(button.textContent);
    }
    
}

function resetArr(){
    arr = [];
}

function changeDisplay(value){
    const display = document.querySelector('.display');
    display.textContent = value;
}

let total = 0;
const display = document.querySelector('.display');
display.textContent = total;
const buttons = document.querySelectorAll('.buttons');

buttons.forEach((button)=>{
    if (button.textContent === '='){
        button.addEventListener('click', ()=>{
            console.log(arr);
            operate(arr);
        });
    } else if (button.textContent === 'C'){
        button.addEventListener('click', ()=>{
            total = 0;
            resetArr();
            changeDisplay(total);
        });
    } else if (button.textContent === '+/-'){
            button.addEventListener('click', ()=>{
                storeLogic(button)
                // resetArr();
                // const display = document.querySelector('.display');
                // display.textContent *= -1;
            }); 
    } else {
        button.addEventListener('click', ()=>{
            storeLogic(button);
        });
    }

    // button.addEventListener('click',()=>{
        
    //     button.style.backgroundColor = 'black';
    //     setTimeout(1000);
    //     button.style.backgroundColor = 'red';
    // })
    

});