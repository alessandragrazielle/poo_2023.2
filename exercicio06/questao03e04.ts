class Conta {
    private _numero: string;
    private _saldo: number;

    constructor(numero:string, saldo:number){
        this._numero = numero;
        this._saldo = saldo;
    }

    get numero(): string{
        return this._numero;
    }

    get saldo(): number{
        return this._saldo;
    }

    sacar(valor: number): boolean{
        if(this.saldo - valor < 0){
            return false
        }

        this._saldo = this._saldo - valor;
        return true;
    }

    depositar(valor: number): void{
        this._saldo = this._saldo + valor;
    }

    consultarSaldo(): number{
        return this.saldo;
    }

    transferir(contaDestino: Conta, valor: number): boolean{
        if(!this.sacar(valor)){
            return false;
        }
        
        contaDestino.depositar(valor);
        return true;
    }
}


class Banco{
    private _contas: Conta[] = [];

    inserir(c: Conta): void{
        if(!this.consultar(c.numero)){
            this._contas.push(c);
        }
    }

    consultar(numero: string): Conta{
        let contaProcurada!: Conta;
        for(let c of this._contas){
            if(c.numero == numero){
                contaProcurada = c;
                break;
            }
        }

        return contaProcurada;
    }

    private consultarIndice(numero: string): number{
        let indice: number = -1;
        for(let i:number = 0; i < this._contas.length; i++){
            if(this._contas[i].numero == numero){
                indice = i;
                break;
            }
        }

        return indice;
    }

    alterar(c: Conta): void{
        let indice = this.consultarIndice(c.numero);
        if(indice != -1){
            this._contas[indice] = c;
        }
    }

    excluir(numero: string): void{
        let indice: number = this.consultarIndice(numero);
        if(indice != -1){
            for(let i:number = indice; i < this._contas.length; i++){
                this._contas[i] = this._contas[i+1];
            }

            this._contas.pop
        }
    }

    depositar(numero:string, valor:number){
        let conta: Conta = this.consultar(numero)
        if(conta != null){
            conta.depositar(valor);
        }
    }

    sacar(numero:string, valor:number){
        let conta: Conta = this.consultar(numero)
        if(conta != null){
            conta.sacar(valor);
        }
    }

    transferir(numeroCredito:string, numeroDebito:string, valor:number){
        let contaCredito: Conta = this.consultar(numeroCredito)
        let contaDebito: Conta = this.consultar(numeroDebito);
        if(contaCredito != null && contaDebito != null){
            contaDebito.transferir(contaCredito, valor);
        }
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
}