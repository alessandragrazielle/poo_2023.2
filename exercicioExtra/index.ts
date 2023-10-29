class Empregado{
    salario: number;
    constructor(s:number){
        this.salario = s;
    }

    calcularSalario(): number{
        return this.salario;
    }
}

class Diarista extends Empregado{
    constructor(s:number){
        super(s);
    }

    calcularSalario(): number {
        return super.calcularSalario() / 30;
    }
}

class Horista extends Diarista{
    constructor(s:number){
        super(s);
    }

    calcularSalario(): number {
        return super.calcularSalario() / 24;
    }
}

class Pessoa{
    private _nome: string;
    private _sobrenome: string;
    constructor(n:string, s:string){
        this._nome = n;
        this._sobrenome = s;
    }

    get nome(): string{
        return this._nome;
    }

    get sobrenome(): string{
        return this._sobrenome;
    }

    get nomeCompleto(): string{
        return `${this.nome} ${this.sobrenome}`;
    }
}

class Funcionario extends Pessoa{
    private _matricula: string;
    private _salario: number;
    constructor(n:string, s:string, m:string, sa:number){
        super(n, s);
        this._matricula = m;
        this._salario = sa;
    }

    get matricula(): string{
        return this._matricula;
    }

    get salario(): number{
        return this._salario;
    }

    calcularSalarioPrimeiraParcela(): number{
        return this.salario * 60/100;
    }

    calcularSalarioSegundaParcela(): number{
        return this.salario * 40/100;
    }
}

class Professor extends Funcionario{
    private _titulacao: string;
    constructor(n:string, s:string, m:string, sa:number, t:string){
        super(n, s, m, sa);
        this._titulacao = t;
    }

    get titulacao(): string{
        return this._titulacao;
    }

    calcularSalarioPrimeiraParcela(): number{
        return super.salario;
    }

    calcularSalarioSegundaParcela(): number{
        return 0;
    }
}

class FolhaDePagamento{
    constructor(private _pessoas: Pessoa[]){}

    calcularPagamentos(): number{
        let total: number = 0;
        for(let p of this._pessoas){
            if(p instanceof Funcionario || p instanceof Professor){
                total += p.salario;
            }
        }

        return total;
    }
}
