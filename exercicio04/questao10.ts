class Jogador{
    forca: number;
    nivel: number;
    pontosAtuais: number;
    constructor(f: number, n:number, pa:number){
        this.forca = f;
        this.nivel = n;
        this.pontosAtuais = pa;
    }

    calcularAtaque(): number{
        return this.forca * this.nivel;
    }

    atacar(atacado: Jogador): void{
        if(atacado.estaVivo()){
            atacado.pontosAtuais = atacado.pontosAtuais - this.calcularAtaque()
        }
    }

    estaVivo(): boolean{
        return (this.pontosAtuais > 0);
    }

    toString(): string {
        return `
        força: ${this.forca}
        nivel: ${this.nivel}
        pontos atuais: ${this.pontosAtuais}
        `;
    }
}
