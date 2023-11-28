class AplicacaoError extends Error{ // questao 07
    constructor(message:string){
        super(message);
    }
}

class ContaInexistenteError extends AplicacaoError{ // questao 07
    constructor(message:string){
        super(message);
    }
}

class SaldoInsuficienteError extends AplicacaoError{ // questao 07
    constructor(message:string){
        super(message);
    }
}

class ValorInvalidoError extends AplicacaoError{ // questao 10
    constructor(message:string){
        super(message);
    }
}

class PoupancaInvalidaError extends Error{ // questao 12
    constructor(message:string){
        super(message);
    }
}

class ContaJaCadastradaError extends AplicacaoError{ // questao 13
    constructor(message:string){
        super(message);
    }
}

export {AplicacaoError, ContaInexistenteError, SaldoInsuficienteError, ValorInvalidoError, PoupancaInvalidaError, ContaJaCadastradaError}
