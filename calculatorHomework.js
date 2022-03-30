const screen = document.querySelector('.screen');


function buttonClick(input) {
    if(input.length === 1)
        screen.innerText = process(input);

}


function createProcess() {
    let output = "0",
        previousOperator = null,
        result = null,
        newOperand = true;

    const setElemActive = (elem) => elem.classList.add("active");

    const setElemInactive = () => {
        const elems = document.getElementsByClassName("calc-button");
        
        for(let i = 0; i < elems.length; i++){
            elems[i].classList.remove("active"); 
        }
    }

    function flushOperation() {
        if(previousOperator === '+') {
            result += parseInt(output); 
        }
        else if(previousOperator === '-'){
            result -= parseInt(output);
        }
        else if(previousOperator === '×'){
            result *= parseInt(output);
        }
        else {
            result /= parseInt(output);
        }
    }

    
    function handleMath(input, elem) {
        if(previousOperator === null){
            previousOperator = input;
            result = parseInt(output);
            newOperand = true;
        }
        else if(!newOperand){
            flushOperation();
            output = result + "";
            previousOperator = input;
            newOperand = true;

        }
        setElemInactive();
        setElemActive(elem);
    }

    function handleFunction(input) {
        if(input === '='){
            if(previousOperator !== null){
                flushOperation();
                output = result + "";
            }

            
            previousOperator = null;
            result = null;
            newOperand = true;

            setElemInactive();
        }
        else if(input === 'C'){
            output = "0",
            previousOperator = null,
            result = null,
            newOperand = true;

            setElemInactive();
        }
        else if(input === '←'){
            if(output.length === 1){
                output = '0';
            }
            else {
                output = output.substring(0, output.length - 1);
            }
        }
    }

    function handleNumber(input) {
        if(output === '0' || newOperand){
            output = input;
            newOperand = false;
        }            
        else 
            output += input;

    }




    return (input, elem) => {
        if(output === '0' && input === '0')
            return output;
        

        if(!isNaN(input)){
            handleNumber(input);
        }
        else if(input === '+' || input === '-' || input === '×' || input === '÷') {
            handleMath(input, elem);
        }
        else {
            handleFunction(input, elem);
        }


        return output;
    }
}



function init() {
    const process = createProcess();

    document.querySelector('.calc-buttons')
            .addEventListener('click', (e) => {
                                            const input = e.target.innerText;
                                            if(input.length === 1) {
                                                screen.innerText = process(input, e.target);
                                            }
                                        })};


init();