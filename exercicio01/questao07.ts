class Retangulo {
    l1: number = 0;
    l2: number = 0;

    calcularArea(): number {
        return this.l1 * this.l2;
    }

    calcule(): number {
        return (this.l1 * 2) + (this.l2 * 2)
    }
}

let retangulo: Retangulo = new Retangulo();
retangulo.l1 = 5;
retangulo.l2 = 7;

console.log(retangulo.calcularArea());
console.log(retangulo.calcule());

