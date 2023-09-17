import prompt from "prompt-sync";
import { Conta, Banco } from "./banco";

let input = prompt();
let b: Banco = new Banco();
let opcao: string = '';

do{
    console.log('\nBem vindo! \nDigite uma opção: ');
    console.log('1 - Cadastrar 2 - Consultar 3 - Sacar\n' +
                '4 - Depositar 5 - Excluir 6 - Transferir\n' +
                '7 – Totalizações ' +
                '0 - Sair\n');
    opcao = input('Opção: ');
    switch(opcao){
        case '1':
            inserir();
            break;
        case '2':
            consultar();
            break;
        case '3':
            sacar();
            break;
        case '4':
            depositar();
            break;
        case '5':
            excluir();
            break;
        case '6':
            transferir();
            break;
        case '7':
            totalizações();
            break;
    }
} while (opcao != "0");
console.log("Aplicação encerrada");

function inserir(): void{
    console.log('\ncadastrar conta\n');
    let numero: string = input('Digite o numero da conta: ');

    let conta: Conta = new Conta(numero, 0);
    b.inserir(conta);
}

function consultar(): void{
    console.log('\nConsultar conta\n');
    let numero: string = input('Digite o numero da conta: ');

    b.consultar(numero);
    console.log(b.exibirConta(numero));
}

function sacar(): void{
    console.log('\nRealizar saque\n');
    let numero: string = input('Digite o numero da conta: ');
    let valorStr: string = input('Digite o valor a ser sacado: ');

    let valor: number = parseFloat(valorStr);
    b.sacar(numero, valor);
}

function depositar(): void{
    console.log('\nRealizar depósito\n');
    let numero: string = input('Digite o numero da conta: ');
    let valorStr: string = input('Digite o valor a ser depositado: ');

    let valor: number = parseFloat(valorStr);
    b.depositar(numero, valor);
}

function excluir(): void{
    console.log('\nExcluir conta\n');
    let numero: string = input('Digite o numero da conta: ');

    b.excluir(numero);
}

function transferir(): void{
    console.log('\nRealizar transferência\n');
    let numeroCredito: string = input('Digite o numero da conta a ser creditada: ');
    let numeroDebito: string = input('Digite o numero da conta a ser debitada: ');
    let valorStr: string = input('Digite o valor a ser transferido: ')

    let valor: number = parseFloat(valorStr);
    b.transferir(numeroCredito, numeroDebito, valor);
}

function totalizações(): void{
    console.log('\nTotalizações\n');
    console.log(`Total de contas que há no banco: ${b.qtdContas()}`);
    console.log(`Saldo total que há no banco: ${b.dinheiroTotal()}`); 
}