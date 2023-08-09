class Circulo {
    raio: number = 0;

    calcularArea(): number {
        return 3.14 * this.raio * this.raio;
    }

    calcularPerimetro(): number{
        return 2 * 3.14 * this.raio;
    }
}

let circulo: Circulo = new Circulo;
circulo.raio = 5;

console.log(circulo.calcularArea());
console.log(circulo.calcularPerimetro());

