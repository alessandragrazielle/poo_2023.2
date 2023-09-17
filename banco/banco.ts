class Conta {
    numero: string;
    saldo: number;

    constructor(numero:string, saldo:number){
        this.numero = numero;
        this.saldo = saldo;
    }

    sacar(valor: number): boolean{
        if(this.saldo - valor < 0){
            return false
        }

        this.saldo = this.saldo - valor;
        return true;
    }

    depositar(valor: number): void{
        this.saldo = this.saldo + valor;
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
    contas: Conta[] = [];

    inserir(c: Conta): void{
        if(!this.consultar(c.numero)){
            this.contas.push(c);
        }
    }

    consultar(numero: string): Conta{
        let contaProcurada!: Conta;
        for(let c of this.contas){
            if(c.numero == numero){
                contaProcurada = c;
                break;
            }
        }

        return contaProcurada;
    }

    consultarIndice(numero: string): number{
        let indice: number = -1;
        for(let i:number = 0; i < this.contas.length; i++){
            if(this.contas[i].numero == numero){
                indice = i;
                break;
            }
        }

        return indice;
    }

    alterar(c: Conta): void{
        let indice = this.consultarIndice(c.numero);
        if(indice != -1){
            this.contas[indice] = c;
        }
    }

    excluir(numero: string): void{
        let indice: number = this.consultarIndice(numero);
        if(indice != -1){
            for(let i:number = indice; i < this.contas.length; i++){
                this.contas[i] = this.contas[i+1];
            }

            this.contas.pop
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
        return this.contas.length;
    }

    dinheiroTotal(): number{
        let saldoTotal: number = 0;
        for (let c of this.contas){
            saldoTotal += c.saldo;
        }

        return saldoTotal;
    }

    mediaSaldo(): number{
        let media: number = this.dinheiroTotal() / this.qtdContas();

        return media;
    }

    exibirConta(numero:string): string{
        let conta: string = '';
        let indice: number = this.consultarIndice(numero);
        conta = `Número: ${this.contas[indice].numero} - Saldo: ${this.contas[indice].saldo.toFixed(2)}`

        return conta;
    }
}

export {Conta, Banco}