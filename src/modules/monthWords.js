export default function getDayWord(){
    let today = new Date();
    today = today.getDate();

    let monthWordsArr = [
        'CASAS', 'MOTOS', 'PORTA',
        'QUEDA', 'BUNDA', 'TAMPA',
        'VIGOR', 'MEXER', 'IDEIA',
        'CARNE', 'PRECO', 'HAVER', 
        'EXPOR', 'CENSO', 'MANSO',
        'PONTO', 'TARDE', 'FRUTA',
        'EPICO', 'ESPIA', 'ERRAR',
        'DOIDO'
    ];

    let todayWord = monthWordsArr[today - 1].toString();

    return todayWord.toLowerCase();
};
