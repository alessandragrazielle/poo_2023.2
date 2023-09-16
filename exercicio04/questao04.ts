class Radio{
    volume: number;
    constructor(volume:number){
        this.volume = volume;
    }
}

let r: Radio = new Radio();
r.volume = 10;

// o erro ocorre porque há uma tentativa de inicialização errada, já que existe um construtor, a inicialização deve ocorrer no momento da instanciação, após o new

// solucao:
let r: Radio = new Radio(10);

// caso depois queira mudar o volume faz da maneira mostrada no enunciado:
r.volume = 30;
