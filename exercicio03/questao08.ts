let numeros: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function ehPar(numero: number){
    if (numero % 2 == 0)
    return numero;
}

let numerospares = numeros.filter(ehPar);
