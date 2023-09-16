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

let c1: Conta = new Conta('1', 100);
let c2: Conta = new Conta('2', 100);
console.log(c1.transferir(c2, 10));


console.log(c1.consultarSaldo());
console.log(c2.consultarSaldo());

