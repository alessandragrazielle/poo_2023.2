class Triangulo{
    a: number;
    b: number;
    c: number;
    constructor(a:number, b:number, c:number){
        this.a = a;
        this.b = b;
        this.c = c;
    }

    ehTriangulo(): boolean{
        return (this.a > Math.abs(this.b - this.c) && this.a < this.b + this.c);
        // o math.abs retorna o valor absoluto de um numero, desconsiderando se ele é positivo ou negativo; é como o |x|, por exemplo: |-5| = 5, da mesma forma math.abs(-5) = 5
    }

    ehIsoceles(): boolean{
        if(!this.ehTriangulo){
            return false;
        }

        return (this.a == this.b && this.a != this.c || 
                this.a == this.c && this.a != this.b ||
                this.b == this.c && this.b != this.a)
    }

    ehEquilatero(): boolean{
        if(!this.ehTriangulo){
            return false;
        }

        return (this.a == this.b  && this.a == this.c)
    }

    ehEscaleno(): boolean{
        if(!this.ehTriangulo){
            return false;
        }

        return (this.a != this.b  && this.a != this.c && this.b != this.c)
    }
}

let ex: Triangulo = new Triangulo(3, 4, 6); 
console.log(ex.ehIsoceles());