import * as fs from 'fs';

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

    sacar(valor: number): void{
        if (this._saldo >= valor) {
			this._saldo = this._saldo - valor;
		}
    }

    depositar(valor: number): void{
        this._saldo = this._saldo + valor;
    }

    consultarSaldo(): number{
        return this.saldo;
    }

    transferir(contaDestino: Conta, valor: number): void{
        this.sacar(valor)
        contaDestino.depositar(valor);
    }
}

class Poupanca extends Conta{
    private _taxaJuros: number;
    constructor(numero:string, saldo:number, taxa:number){
        super(numero, saldo);
        this._taxaJuros = taxa;
    }

    get taxaJuros(): number {
        return this._taxaJuros
    }

    renderJuros(): void {
        this.depositar(this.saldo * this._taxaJuros/100);
    }
}

class ContaImposto extends Conta {
    private _taxaDeDesconto: number;
    constructor(numero: string, saldo: number, taxaDeDesconto: number) {
        super(numero, saldo);
        this._taxaDeDesconto = taxaDeDesconto;
    }

    get taxaDesconto(): number{
        return this._taxaDeDesconto;
    }
    
    sacar(valor: number){
       let valorTotal = valor + valor*this._taxaDeDesconto/100;
       super.sacar(valorTotal);
    }
}

class Banco{
    private _contas: Conta[] = [];
    private CAMINHO_ARQUIVO: string = './banco/contas.txt';

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

    renderJuros(numero:string){
        let conta: Conta = this.consultar(numero);
        if(conta instanceof Poupanca){
            conta.renderJuros()
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

    exibirConta(numero:string): string{
        let conta: string = '';
        let indice: number = this.consultarIndice(numero);
        conta = `Número: ${this._contas[indice].numero} - Saldo: ${this._contas[indice].saldo.toFixed(2)}`

        return conta;
    }

    public carregarDeArquivo() {
		const arquivo: string = fs.readFileSync(this.CAMINHO_ARQUIVO, 'utf-8');
		//const linhas: string[] = arquivo.split('\n');
		const linhas: string[] = arquivo.split('\r\n');
		console.log("Iniciando leitura de arquivo");

		for (let i: number = 0; i < linhas.length; i++) {
			let linhaConta: string[] = linhas[i].split(";");
			let conta!: Conta;
			let tipo: string  = linhaConta[2];
			if (tipo == 'C') {
				conta = new Conta(linhaConta[0], parseFloat(linhaConta[1]));
			} else if (tipo == 'CP') {
				conta = new Poupanca(linhaConta[0], parseFloat(linhaConta[1]),parseFloat(linhaConta[3]));
			} else if (tipo == 'CI') {
				conta = new ContaImposto(linhaConta[0], parseFloat(linhaConta[1]),parseFloat(linhaConta[3]));
			}

			this.inserir(conta);
			console.log(`Conta ${conta.numero} carregada`);
		}

		linhas.forEach(linha => {
			let linhaConta: string[] = linha.split(";");
			let conta!: Conta;
			let tipo: string  = linhaConta[2];
			if (tipo == 'C') {
				conta = new Conta(linhaConta[0], parseFloat(linhaConta[1]));
			} else if (tipo == 'CP') {
				conta = new Poupanca(linhaConta[0], parseFloat(linhaConta[1]),parseFloat(linhaConta[3]));
			} else if (tipo == 'CI') {
				conta = new ContaImposto(linhaConta[0], parseFloat(linhaConta[1]),parseFloat(linhaConta[3]));
			}

			this.inserir(conta);
			console.log(`Conta ${conta.numero} carregada`);
			


		});
		console.log("fim do arquivo")

	}

	public salvarEmArquivo() {
		console.log("Iniciando a gravação de contas em arquivo.")
		let stringContas: string = "";
		let linha: string = "";

		for (let conta of this._contas) {
			if (conta instanceof Poupanca) {
				linha = `${conta.numero};${conta.saldo};CP;${conta.taxaJuros}\r\n`;
			} else if ((conta instanceof ContaImposto)) {
				linha = `${conta.numero};${conta.saldo};CI;${conta.taxaDesconto}\r\n`;
			} else {
				linha = `${conta.numero};${conta.saldo};C\r\n`;
			}

			stringContas += linha;
		}
		//deleta os últimos \r\n da string que vai pro arquivo, evitando que grave uma linha vazia
		stringContas = stringContas.slice(0,stringContas.length-2);

		fs.writeFileSync(this.CAMINHO_ARQUIVO, stringContas,'utf-8');
		console.log("Contas salvas em arquivo.")
	}

}

export {Conta, Banco, Poupanca, ContaImposto}
