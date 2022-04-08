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
        'DOIDO', 'LIMPO', 'MEIAS',
        'CARRO', 'NOTAR', 'ERRAR'
    ];

    let todayWord = monthWordsArr[today - 1].toString();

    if(todayWord.length < 5 || todayWord.length > 5){
        console.error('A palavra do dia não esta correta');
        return;
    }

    return todayWord.toLowerCase();
};
