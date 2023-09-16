class Equipamento{
    ligado: boolean;
    constructor(lig:boolean){
        this.ligado = lig;
    }

    liga(): void{
        this.ligado = true
    }

    desliga(): void{
        this.ligado = false;
    }

    inverte(): void{
        this.ligado = !this.ligado; // o status atual sera inverso ao status anterior
    }

    estaLigado(): boolean {
        return this.ligado
    }
}

let equi: Equipamento = new Equipamento(true);
console.log(equi);

equi.inverte();
console.log(equi);

equi.estaLigado();
console.log(equi);

