class Veiculo{
    placa: string;
    ano: number;
    constructor(p:string, a:number){
        this.placa = p;
        this.ano = a;
    }
}

class Carro extends Veiculo{
    modelo: string;
    constructor(p:string, a:number, m:string){
        super(p, a);
        this.modelo = m;
    }
}

class CarroEletrico extends Carro{
    autonomiaBateria: number;
    constructor(p:string, a:number, m:string, ab: number){
        super(p, a, m);
        this.autonomiaBateria = ab;
    }
}