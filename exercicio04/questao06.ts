class Saudacao{
    texto: string;
    destinatario: string;
    constructor(text:string, dest:string){
        this.texto = text;
        this.destinatario = dest;
    }

    obterSaudacao(): string{
        return `${this.texto}, ${this.destinatario}`;
    }
}

let hello: Saudacao = new Saudacao('Hello', 'Alessandra')
console.log(hello.obterSaudacao());