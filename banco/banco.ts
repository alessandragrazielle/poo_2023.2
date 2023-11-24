// obs: as excessoes estão sendo tratadas no app
import { ContaJaCadastradaError, ContaInexistenteError, PoupancaInvalidaError, SaldoInsuficienteError, ValorInvalidoError, AplicacaoError } from "./excecoes";

class Conta {
    private _numero: string;
    private _saldo: number;

    constructor(numero:string, saldo:number){
        this._numero = numero;
        this._saldo = saldo;
    }

    private validarvalor(valor: number): boolean {
        if (valor <= 0 || isNaN(valor)) {
            throw new ValorInvalidoError('Valor inválido!');
        }

        return true;
    }

    sacar(valor:number): void{
        this.validarvalor(valor)
        if(this._saldo < valor){
            throw new SaldoInsuficienteError('Saldo insuficiente');
        }
    
        this._saldo = this._saldo - valor;
    }

    depositar(valor: number): void {
        this.validarvalor(valor)
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
        try {
            this.consultar(conta.numero);
            throw new ContaJaCadastradaError('Conta já cadastrada!');
        } catch (e: any) {
            if (e instanceof ContaInexistenteError) {
                this._contas.push(conta);
            } else if (e instanceof ContaJaCadastradaError){
                console.log(e.message);
            }
        }        
    }    

    consultar(numero: string): Conta{
        let contaProcurada!: Conta;
        for(let c of this._contas){
            if(c.numero == numero){
                contaProcurada = c;
            }
        }

        if (!contaProcurada){
            throw new ContaInexistenteError('Essa conta não existe, por favor, tente outra!')
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

        if(indiceProcurado == -1){
            throw new ContaInexistenteError('Essa conta não existe, por favor, tente outra!')
        }
    
        return indiceProcurado;
    }

    alterar(conta: Conta): void {
        let indice: number = this.consultarIndice(conta.numero);
        this._contas[indice] = conta;
    }

    depositar(numero: string, valor: number): void {
        let indice = this.consultarIndice(numero);
        this._contas[indice].depositar(valor);
    }

    sacar(numero: string, valor: number): void {
        let indice = this.consultarIndice(numero);
        this._contas[indice].sacar(valor);
    }

    transferir(numeroDebito: string, numeroCredito: string, valor: number): void {
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

    renderJuros(numero: string): void {
        let contaProcurada: Conta = this.consultar(numero);
        
        if (!(contaProcurada instanceof Poupanca)) {
           throw new PoupancaInvalidaError('A conta não é uma poupança!');
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
//c1.transferir(c2, 1000);
//c2.transferir(c1, -50)

//b.transferir('2', '1', 500)
//b.transferir('2', '1', -50)

//b.depositar('1', -1000)
