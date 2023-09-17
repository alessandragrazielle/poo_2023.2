class Postagem{
    id: number;
    texto: string;
    quantidadeCurtidas: number;
    constructor(i:number, t:string, q:number){
        this.id = i;
        this.texto = t;
        this.quantidadeCurtidas = q;
    }

    curtir(): void{
        this.quantidadeCurtidas++;
    }

    toString(): string{
        return `
        Postagem: ${this.texto}
        Numero de curtidas: ${this.quantidadeCurtidas}`;
    }
}


class Microblog{
    postagens: Postagem[] = [];

    inserir(p: Postagem):void{
        this.postagens.push(p);
    }

    consultar(id: number): Postagem{
        let postagemProcurada!: Postagem;
        for(let p of this.postagens){
            if(p.id == id){
                postagemProcurada = p;
                break;
            }
        }

        return postagemProcurada;
    }

    consultarIndice(id: number): number{
        let indice: number = -1;
        for(let i:number = 0; i < this.postagens.length; i++){
            if(this.postagens[i].id == id){
                indice = i;
                break;
            }
        }

        return indice;
    }

    excluir(id: number): void{
        let indice: number = this.consultarIndice(id);
        if(indice != -1){
            for(let i:number = indice; i < this.postagens.length; i++){
                this.postagens[i] = this.postagens[i+1];
            }
        }

        this.postagens.pop();
    }

    maisCurtida(): Postagem{
        let curtidas: number = 0;
        let postMaisCurtido!: Postagem;
        for(let p of this.postagens){
            if(p.quantidadeCurtidas > curtidas){
                curtidas = p.quantidadeCurtidas;
                postMaisCurtido = p;
            }
        }

        return postMaisCurtido;
    }

    curtir(id: number): void{
        let postagem: Postagem = this.consultar(id);
        if(postagem != null){
            postagem.curtir();
        }
    }

    toString(): string{
        let todasPostagens: string = '';
        for(let p of this.postagens){
            todasPostagens += `
            Id: ${p.id}
            Texto: ${p.texto}
            Curtidas: ${p.quantidadeCurtidas}
            `
        }

        return todasPostagens;
    }
}
