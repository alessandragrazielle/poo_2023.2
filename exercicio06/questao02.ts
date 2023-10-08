class Hora{
    private _hora: number;
    private _minutos: number;
    private _segundos: number;
    constructor(h:number, m:number, s:number){
        this._hora = h;
        this._minutos = m;
        this._segundos = s;
    }

    get hora(): number{
        return this._hora;
    }

    get minutos(): number{
        return this._minutos;
    }

    get segundos(): number{
        return this._segundos;
    }

    get horario(): string{
        return `${this._hora}:${this._minutos}:${this._segundos}`
    }
}