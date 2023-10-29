class Produto{
    private _id: number;
    private _descricao: string;
    private _qtdEstoque: number;
    private _valorUnitario: number;
    constructor(id:number, des:string, qe:number, vu:number){
        this._id = id;
        this._descricao = des;
        this._qtdEstoque = qe;
        this._valorUnitario = vu;
    }

    get id(): number{
        return this._id;
    }

    get descricao(): string{
        return this._descricao;
    }

    get qtdEstoque(): number{
        return this._qtdEstoque;
    }

    repor(quantidade:number): void{
        this._qtdEstoque += quantidade;
    }

    darBaixa(quantidade:number): void{
        this._qtdEstoque -= quantidade;
    }
}

class ProdutoPerecivel extends Produto{
    private _dtValidade: Date;
    dtValidade: any;
    constructor(id:number, des:string, qe:number, vu:number, dv:Date){
        super(id, des, qe, vu);
        this._dtValidade = dv;
    }

    estaValido(): boolean{
        return this._dtValidade >= new Date()
    }

    repor(quantidade:number): void{
        if(this.estaValido()){
            super.repor(quantidade);
        }
    }

    darBaixa(quantidade: number): void {
        if(this.estaValido()){
            super.darBaixa(quantidade);
        }
    }
}

class Estoque{
    private _produtos: Produto[] =[];

    consultar(id:number, descricao:string): Produto{
        let produtoProcurado!: Produto;
        for(let p of this._produtos){
            if(p.id == id || p.descricao == descricao){
                produtoProcurado = p;
                break;
            }
        }

        return produtoProcurado;
    }

    consultarPorIndice(id: number): number{
        let indiceProcurado = -1;
        for(let i:number = 0; i < this._produtos.length; i++){
            if(this._produtos[i].id == id){
                indiceProcurado = i;
                break;
            }
        }

        return indiceProcurado;
    }

    inserir(p:Produto): void{
        if(!this.consultar(p.id, p.descricao)){
            this._produtos.push(p)
        }
    }

    excluir(id:number): void{
        let indice = this.consultarPorIndice(id);
        if(indice != -1){
            for(let i:number = indice; i < this._produtos.length; i++){
                this._produtos[i] = this._produtos[i+1]
            }

            this._produtos.pop()
        }
    }

    repor(id:number, descricao:string, quantidade:number){
        let produtoProcurado: Produto = this.consultar(id, descricao);
        if(produtoProcurado){
            produtoProcurado.repor(quantidade);
        }
    }

    darBaixa(id:number, descricao:string, quantidade:number){
        let produtoProcurado: Produto = this.consultar(id, descricao);
        if(produtoProcurado){
            produtoProcurado.darBaixa(quantidade);
        }
    }

    listarProdutosVencidos(): string {
        let produtosVencidos = '';
        for (let p of this._produtos) {
            if (p instanceof ProdutoPerecivel && !p.estaValido()) {
                produtosVencidos += `
                    Id: ${p.id}
                    Descrição: ${p.descricao}
                    Quantidade em estoque: ${p.qtdEstoque}
                    `;
            }
        }
    
        return produtosVencidos;
    }
    
}


let p1: ProdutoPerecivel = new ProdutoPerecivel(1, 'a', 5, 6, new Date("2020-02-10"));
console.log(p1.estaValido());

let e: Estoque = new Estoque;
e.inserir(p1);
e.inserir(new Produto(2, 'arroz', 20, 5));
e.inserir(new Produto(3, 'feijao', 10, 6));
e.inserir(new ProdutoPerecivel(4, 'tomate', 10, 5, new Date('2020-11-10')));
e.inserir(new Produto(5, 'macarrao', 20, 5))
e.excluir(3)
e.repor(4, 'tomate', 2)
e.repor(2, 'arroz', 2)
console.log(e.listarProdutosVencidos());



