class SituacaoFinanceira{
    valorCreditos: number = 0;
    valorDebitos: number = 0;

    saldo(): number{
        return this.valorCreditos - this.valorDebitos;
    }
}

let situacao: SituacaoFinanceira = new SituacaoFinanceira;
situacao.valorCreditos = 1000;
situacao.valorDebitos = 640;

console.log(situacao.saldo());
