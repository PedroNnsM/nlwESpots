/* converter 18:00 em 1080
    split vai separar por :
    e o map vai formar o array com numeros
    18:00 -> ['18','00'] -> [18, 00]

*/
export function converHourStringToMinutes(hourString :string){
    const[hours,minutes] = hourString.split(':').map(Number)

    const minutesAmout = (hours *60) + minutes;
    return minutesAmout;
}