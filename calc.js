const operationsDict = {
    "+": (a, b) => a+b,
    "-": (a, b) => a-b,
    "*": (a, b) => a*b,
    "/": (a, b) => a/b,
}

    function recursiveCalc(expr){
        console.log(expr);
        if(['+', '-', '*', '/'].includes(expr[0])){               //если это составной операнд
            console.log("1st case:");
            let operand1, operand2;
            let operands = expr.slice(1).trim();
            console.log("expr reduced is:" + operands);
            const operation = operationsDict[expr[0]];
            if(operands[0] == "("){
                const index = endBrackets(operands);
                operand1 = operands.slice(1, index);
                operand2 = operands.slice(index + 1);
            } else if(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(operands[0])){    //первый операнд простой
                ({operand1, operand2} = /(?<operand1>\d+)[\s(]+(?<operand2>.+)*/.exec(operands).groups);
                //const [oper1, oper2] = operands.split(' ')     //опеределение первого операнда
                //TODO: использоват lookahead для исключения поседней ) из второго операнда
                //заглушка
                if(operand2[operand2.length-1] == ')'){
                    operand2 = operand2.slice(0, operand2.length-1);
                }
            }
            //result = /\(?(?<operand1>[\+\-\*\/\d\s()]+)\)?\s*\(?(?<operand2>[\+\-\*\/\d\s()]+)\)?/.exec(expr.slice(1));
            console.log("op1:" + operand1);
            console.log("op2:" + operand2);
            return operation(recursiveCalc(avoidBrackets(operand1)), recursiveCalc(avoidBrackets(operand2)));
        } else {      
            console.log("2nd case");
            return parseInt(expr);
        }

        function endBrackets(str){
            let counter = 0;
            for(let i=0; i<str.length; ++i){
                if(str[i] == "("){
                    counter++;
                } else if(str[i] == ")"){
                    counter--;
                }
                if(counter == 0) return i;
            }
        }

    }
    
    function avoidBrackets(str){
        const freeBrackets = str.trim().match(/(?<brackets>\(*).*/).groups.brackets.length;
        const result = str.trim().slice(freeBrackets, str.length - freeBrackets);
        return result;
    }

console.log(recursiveCalc("/1 0"));