class Calculadora{
    private _operando1: number;
    private _operando2: number;
    constructor(op1:number, op2:number){
        this._operando1 = op1;
        this._operando2 = op2;
    }

    soma(): number{
        return this._operando1 + this._operando2;
    }

    multiplicacao(): number{
        return this._operando1 * this._operando2;
    }
}

let cal: Calculadora = new Calculadora(2, 10);
console.log(cal.soma());
console.log(cal.multiplicacao());