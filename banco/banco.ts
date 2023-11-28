// obs: as excessoes estão sendo tratadas no app
import {ContaJaCadastradaError, ContaInexistenteError, PoupancaInvalidaError, SaldoInsuficienteError, ValorInvalidoError} from "./excecoes";

class Conta {
    private _numero: string;
    private _saldo: number;

    constructor(numero:string, saldo:number){
        this._numero = numero;
        this._saldo = 0; // o saldo só será incrementado com depósito
        this.validarEntrada(numero);
    }

    private validarEntrada(entradaStr: string): boolean{ // questao 15
        let entrada: number = parseFloat(entradaStr);
        if (entrada <= 0 || isNaN(entrada) || entrada == null) {
            throw new ValorInvalidoError('Valor inválido.');
        }

        return true;
    }

    private validarvalor(valor: number): boolean { // questao 11
        if (valor <= 0 || isNaN(valor)) {
            throw new ValorInvalidoError('Valor inválido.');
        }

        return true;
    }

    sacar(valor:number): void{
        this.validarvalor(valor) // questao 06 e 10
        if(this._saldo < valor){ // questao 03
            throw new SaldoInsuficienteError('Saldo insuficiente.');
        }
    
        this._saldo = this._saldo - valor;
    }

    depositar(valor: number): void {
        this.validarvalor(valor) // questao 06 e 10
        this._saldo = this._saldo + valor;
    }

    transferir(contaDestino: Conta, valor: number) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }

    get saldo(): number {
        return this._saldo;
    }

    get numero(): string {
        return this._numero;
    }
}


class Poupanca extends Conta {
    private _taxaDejuros: number;

    constructor(numero: string, saldo: number, taxaDeJuros: number) {
        super(numero, saldo);
        this._taxaDejuros = taxaDeJuros;
    }

    get taxaDeJuros(): number {
        return this._taxaDejuros;
    }

    renderJuros() {
        let saldo = this.saldo;
        this.depositar(saldo * this.taxaDeJuros / 100);
    }
}

class ContaImposto extends Conta {
    private _taxaDeDesconto: number;

    constructor(numero: string, saldo: number, taxaDeDesconto: number) {
        super(numero, saldo);
        this._taxaDeDesconto = taxaDeDesconto;
    }

    sacar(valor: number) {
        let valorTotal = valor + valor * this._taxaDeDesconto / 100;
        super.sacar(valorTotal);
    }

    get taxaDeDesconto(): number{
        return this._taxaDeDesconto
    }
}

class Banco {
    private _contas: Conta[] = [];

 
    inserir(conta: Conta): void {
        if(this.existeConta(conta.numero)){
            throw new ContaJaCadastradaError(`Conta já cadastrada: ${conta.numero}.`); // questao 13 (alterada)
        }

        this._contas.push(conta);
    }    

    private existeConta(numero: string): boolean{
        for(let c of this._contas){
            if(c.numero == numero){
                return true
            }
        }

        return false
    }

    consultar(numero: string): Conta{
        let contaProcurada!: Conta;
        for(let c of this._contas){
            if(c.numero == numero){
                contaProcurada = c;
            }
        }

        if (!contaProcurada){ // questao 08
            throw new ContaInexistenteError('Essa conta não existe, por favor, tente outra.')
        }

        return contaProcurada;
    }

    private consultarIndice(numero: string): number{
        let indiceProcurado: number = -1;
        for(let i = 0; i < this._contas.length; i++){
            if(this._contas[i].numero == numero){
                indiceProcurado = i;
            }
        }

        if(indiceProcurado == -1){ // questao 08
            throw new ContaInexistenteError('Essa conta não existe, por favor, tente outra.')
        }
    
        return indiceProcurado;
    }

    alterar(conta: Conta): void { // questao 09
        let indice: number = this.consultarIndice(conta.numero);
        this._contas[indice] = conta;
    }

    depositar(numero: string, valor: number): void { // questao 09
        let indice = this.consultarIndice(numero);
        this._contas[indice].depositar(valor);
    }

    sacar(numero: string, valor: number): void { // questao 09
        let indice = this.consultarIndice(numero);
        this._contas[indice].sacar(valor);
    }

    transferir(numeroDebito: string, numeroCredito: string, valor: number): void { // questao 09
        let contaCredito: Conta = this.consultar(numeroCredito);
        let contaDebito: Conta = this.consultar(numeroDebito);
        contaDebito.transferir(contaCredito, valor);
    }

    excluir(numero: string): void {
        let indice: number = this.consultarIndice(numero);
        for (var i = indice; i < this._contas.length; i++) {
            this._contas[i] = this._contas[i + 1];
        }
        this._contas.pop();
    }

    qtdContas(): number{
        return this._contas.length;
    }

    dinheiroTotal(): number{
        let saldoTotal: number = 0;
        for (let c of this._contas){
            saldoTotal += c.saldo;
        }

        return saldoTotal;
    }

    mediaSaldo(): number{
        let media: number = this.dinheiroTotal() / this.qtdContas();

        return media;
    }

    renderJuros(numero: string): void { // questao 09
        let contaProcurada: Conta = this.consultar(numero);
        
        if (!(contaProcurada instanceof Poupanca)) { // questao 12
           throw new PoupancaInvalidaError('A conta não é uma poupança.');
        } 

        contaProcurada.renderJuros();
    }

    exibirConta(numero: string): string {
        let contaString: string = '';
        let indice: number = this.consultarIndice(numero);
        let conta: Conta = this._contas[indice];
    
        contaString += `Número: ${conta.numero} - `;
    
        if (conta instanceof Poupanca) {
            contaString += `Saldo: ${conta.saldo.toFixed(2)} - Taxa de Juros: ${conta.taxaDeJuros}%`;
        } else if (conta instanceof ContaImposto) {
            contaString += `Saldo: ${conta.saldo.toFixed(2)} - Taxa de Desconto: ${conta.taxaDeDesconto}%`;
        } else {
            contaString += `Saldo: ${conta.saldo.toFixed(2)}`;
        }
    
        return contaString;
    }
    
}

export {Conta, Banco, Poupanca, ContaImposto }
