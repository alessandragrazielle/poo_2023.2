let array: number[] = [1, 2, 3, 4];

function formatandoParaString(array: number[]): string {
    let stringfinal: string = ''

    array.forEach((number, index) => {
        stringfinal += number.toString();
        if (index !== array.length - 1) {
            stringfinal += ' - ';
        }
    });

    return stringfinal
}
console.log(formatandoParaString(array));