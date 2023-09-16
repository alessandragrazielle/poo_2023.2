class Hotel{
    quantReservas: number;

    constructor(quant: number){
        this.quantReservas = quant;
    }

    adicionarReserva(): void{
        this.quantReservas++;
    }
}

let hotel: Hotel = new Hotel(2);
console.log(hotel.quantReservas);