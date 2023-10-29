class Calculadora{
    protected _a: number;
    protected _b: number;
    constructor(a:number, b:number){
        this._a = a;
        this._b = b;
    }

    soma(): number{
        return this._a + this._b;
    }
}

class CalculadoraCientifica extends Calculadora{
    constructor(a:number, b:number){
        super(a, b);
    }

    exponenciar(): number{
        return this._a ** this._b;
    }
}

let c: Calculadora = new Calculadora(2, 5);
console.log(c.soma());

let cc: CalculadoraCientifica = new CalculadoraCientifica(3, 2);
console.log(cc.exponenciar());

// Foi necessário mudar os atributos de "private" para "protect"