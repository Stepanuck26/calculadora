const buttons = document.querySelectorAll('.btn');
const input = document.getElementById('input');
const output = document.getElementById('output');


const operators = ['+', '-', '*', '/', '%'];
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.textContent;
            const lastChar = input.value.slice(-1);/// Sirve para obtener el ultimo caracter del contenido actual del input
            if(value === '.' && input.value === '') {
                alert("You can't start with a decimal point");
                return;
            }
            if(value === '.' && input.value.includes('.')){
                alert('You can only have one decimal point.');
                return;
            }
            if(operators.includes(value) && operators.includes(lastChar)){
            alert('You can only have one operator.');
            return;
            }
            if(operators.includes(value) && input.value === '' && value !== '-'){
                alert('You can only have one operator at the start.');
                return;
            }
                input.value += value;
            })
        });
const deletebtn = document.getElementById('delete');
const equals = document.getElementById('equals');
let deleteTimer; /// para el temporizador

deletebtn.addEventListener("mousedown", () => {
    removeConteinAll();
});

deletebtn.addEventListener("mouseup", () => {
    removeContein();
});

deletebtn.addEventListener("mouseleave", () => {
    clearTimeout(deleteTimer);
});

equals.addEventListener('click', () => {
    equalsContein();
});
const keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "(", ")", ".", "Enter", "Escape", "Backspace", '='] 

document.addEventListener('keydown', (tecla) => {
    const lastChar = input.value.slice(-1); // ultimo caracter del input
    keys.forEach(key => {
        if(key === tecla.key){
            if(key === "Enter"){
            equalsContein();
            }
            else if(key === "Escape"){
                input.value = "";
                output.value = "";  
            }
            else if(key === "Backspace"){
                removeContein();
            }else if(key === '.' && input.value === '') {
                alert("You can't start with a decimal point");
                return;
            } else if(key === '.' && input.value.includes('.')){
                alert('You can only have one decimal point.');
                return;
            } else if(operators.includes(key) && operators.includes(lastChar)){
                alert('You can only have one operator.');
                return;
            }else if(operators.includes(key) && input.value === '' && key !== '-') {
                alert('You can\'t start with an operator.');
                return;
            }else if( key === '='){
                equalsContein();
            }else{
                input.value += key;
            }   
        }
    });
});
function removeContein(){
    clearTimeout(deleteTimer);
    if(input.value && input.value.length > 0) {
        input.value = input.value.slice(0, -1);
    }
}

function removeConteinAll(){
    deleteTimer = setTimeout(() => {
        input.value = null;
        output.value = null;
    }, 500);
}

function equalsContein() {
    try {
        // Si el input está vacío, no realizar la operación
        if (input.value.trim() === "") {
            return;
        }

        // Evaluar el valor del input
        const inputResult = eval(input.value);

        // Convertir el output a un número (si está vacío, se inicializa como 0)
        const currentOutput = parseFloat(output.value) || 0;

        // Sumar el valor evaluado del input al output actual
        const newOutput = currentOutput + inputResult;

        // Mostrar el nuevo resultado en el output
        output.value = newOutput;

        // Limpiar el input
        input.value = "";
    } catch (error) {
        // Mostrar un mensaje de error en caso de una expresión no válida
        output.value = "Error";
        input.value = "";
    }
}