let result_display = document.querySelector('#result_display'); //Input que muestra el resultado
let copyBtn = document.querySelector('#copy');
let num_a = document.querySelector('#num_a'); //Input que muestra el operador @uno
let num_b = document.querySelector('#num_b'); //Input que muestra el operador @dos
const operation = document.querySelectorAll('.operation'); //Lista de elementos que contienen la clase @operation
const number = document.querySelectorAll('.number'); //Lista de elementos que contienen la clase @number
const op_prev = document.querySelector('#op_prev'); //Boton que muestra la operacion elegida
let op_choosed = ''; //Inicialmente no hay opcion elegida, ni operadores
let op1 = ''; 
let op2 = '';

operation.forEach(element =>{
    element.addEventListener('click', ()=>{ //Se agrega un evento de escucha a cada item de tipo operacion
        if((element.textContent != '=') && (element.textContent != 'AC') && (num_a.value != '') && (element.textContent != '.')){
            op_prev.innerHTML = element.textContent; // Mostrarlo a nivel interfaz
            op_choosed = element.textContent; //Guardar la operacion a nivel logico
        }else if(element.textContent == '.'){
            //Si operador @dos esta vacio, significa que aun estamos digitando operador uno, por ende el @punto va a ese numero
            if((num_b.value == '') && (op_choosed == '')){
                console.log('intentando decimal en numero uno');
                op1 += element.textContent; // A nivel logico concatenamos un punto decimal, y esperamos otro posible numero
            }else{
                console.log('intentando decimal en numero dos');
                op2 += element.textContent;
            }
        }else if(element.textContent == '='){
            if((num_a.value == '') || (num_b.value == '')){
                alert('Error #1: Debes digitar ambos números antes de poder ver un resultado');
            }else{
                //Despues de todas las validaciones, se evalua el operador como tal.
                switch (op_choosed) {
                    case '+':
                        result_display.value = parseFloat(op1) + parseFloat(op2);
                        break;
                    case '-':
                        result_display.value = parseFloat(op1) - parseFloat(op2);
                        break;
                    case 'x':
                        result_display.value = parseFloat(op1) * parseFloat(op2);
                        break;
                    case '/':
                        if(parseFloat(op2) > 0){
                            result_display.value = (parseFloat(op1) / parseFloat(op2)).toFixed(2);
                        }else{
                            alert('El segundo operando en una división no puede ser cero :)')
                        }
                        break;
                    case '%':
                        result_display.value = parseFloat(op1) % parseFloat(op2);
                        break;
                }
            }
        }else if(element.textContent == 'AC'){
            // Limpiar data a nivel logico
            op_choosed = ''; //Inicialmente no hay opcion elegida, ni operadores
            op1 = ''; 
            op2 = '';
            // Limpiar data a nivel visual
            result_display.value = 0;
            num_a.value = '';
            num_b.value = '';
            op_prev.innerHTML = '';
        }else{
            alert('Error #2: Debes digitar un número antes de intentar usar un operador');
        }
    });
});

number.forEach(button =>{
    button.addEventListener('click', (event)=>{
        const number = parseFloat(event.target.textContent);
        // Si aun no se ha elegido una operacion, significa que se está digitando el operador @uno
        if(op_choosed == ''){ 
            op1 += number;
            num_a.value = op1;
        }else{ //Cuando ya se eligió un operador, significa que se está digitando el operador @dos
            op2 += number;
            num_b.value = op2;
        }
    })
});

copyBtn.addEventListener('click', ()=>{
    // Se obtiene el resultado desplegado
    result = result_display.value;

    //Para esto necesito un input auxiliar para copiar de él su contenido, que básicamente
    //Sería una copia exacta del result_display, pero este si me permitiría seleccionarlo
    const aux = document.createElement('input');
    aux.setAttribute('value', result); //Le asignamos el mismo valor
    document.body.appendChild(aux); //Lo adjuntamos al body

    aux.select(); //Lo seleccionamos

    document.execCommand('copy'); //Copiamos su contenido

    document.body.removeChild(aux); //Lo removemos del HTML

    copyBtn.innerHTML = '✅' //Cambiar el emoji del boton para indicar que se ha copiado el reusltado
    setTimeout(() => {
        copyBtn.innerHTML = '📄';//Despues de medio segundo, volver a restaurar el emoji
    }, 500);
    //Pero antes de este medio segundo el contenido ya se habrá copiado :D
});