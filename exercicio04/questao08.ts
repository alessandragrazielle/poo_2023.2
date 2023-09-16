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
        this.ligado = !this.ligado; 
    }

    estaLigado(): boolean {
        return this.ligado
    }
}
