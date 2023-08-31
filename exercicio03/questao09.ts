let elementos: number[] = [10, 16, 17, 20]
let elementosDobrados = elementos.map(elemento => elemento*2);

console.log(`Um array: ${elementos}`);
console.log(`Outro array: ${elementosDobrados}`);

var total = elementos.reduce(function(total, numero){
  return total + numero;
}, 0);

console.log(total);
