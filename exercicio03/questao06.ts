function exibir(...par: string[]){
    par.forEach(parametro => {
        console.log(parametro);
    })
    
}

exibir('a', 'b');
exibir('a', 'b', 'c');
exibir('a', 'b', 'c', 'd');