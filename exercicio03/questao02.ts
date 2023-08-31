function primoOuNao(numero: number){
    if(numero <= 1){
        return false;
    }

    if (numero > 2){
        for(let x = 2; x < numero; x++){
            if(numero % x == 0){
                return false;
            }
        }
    }

    return true;
}
