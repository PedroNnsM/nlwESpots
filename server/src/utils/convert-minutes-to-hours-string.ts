/* converter 1080 em 18:00
    split vai separar por :
    e o map vai formar o array com numeros
    1080 -> [18,00] -> ["18", "00"]

*/
export function convertMinutsToHoursString(minutesAmount :number){
    const hours = Math.floor(minutesAmount / 60);
    const minutes = minutesAmount % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}