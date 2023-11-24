/* Erros mais comuns:
1. Desconsiderar operação;
2. Exibir mensagem de erro;
3. Retornar um código de erro;*/


// exemplos: um método que calcula a media de um aluno nao pode receber notas abaixo de 0 ou acima de 10
class Aluno{
    nome: string;
    n1: number;
    n2: number;

    constructor(n:string, n1:number, n2:number){
        this.nome = n;
        this.n1 = n1;
        this.n2 = n2;
    }

    // 1. desconsiderando uma operação:
    calculoMedia1(){
        let media: number;
        if(this.n1>=0 && this.n2>=0 && this.n1<=10 && this.n2<=10){
            media = (this.n1+this.n2)/2;
            return media;
        }
    }

    // 2. exibir mensagem de erro:
    calculoMedia2(): void{
        let media: number;
        if(this.n1>=0 && this.n2>=0 && this.n1<=10 && this.n2<=10){
            media = (this.n1+this.n2)/2;
            console.log(media);            
        } else {
            console.log('A nota inserida nao eh valida!');            
        }
    }

    //3. Retornar um código de erro;
    calculoMedia3(): boolean {
        if (this.n1>=0 && this.n2>=0 && this.n1<=10 && this.n2<=10) {
            return true;
        } else {
            return false;
        }
    }
}