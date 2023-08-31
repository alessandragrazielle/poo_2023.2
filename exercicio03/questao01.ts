function parOuImpar(numero: number): boolean{
    if (numero % 2 == 0){
        return true;
    }

    return false;
}

console.log(parOuImpar(1000));