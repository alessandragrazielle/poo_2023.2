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
