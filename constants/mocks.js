import  * as directions from './directions';

const breakfast = [
    {
        id: 'lugaw',
        name: 'Lugaw',
        favorte: false,
        tags: ['breakfast', 'rice', 'veggies', 'meat'],
        color: '#FFDFC4',
        image: require('../assets/images/test.png'),
        time: '32 Minutes',
        capacity: '2 Persons',
        burn: '24 Calories',
        description: 'Lugaw is a Filipino rice ' +
         'porridge that is traditionally thought '+
         'of as soft food for sick people, due to the '+
         'fact that it doesn\'t require much chewing. ',
        direction: directions.lugaw,
        recipe: null,
    },
    {
        id: 'daing-na-bangus', 
        name: 'Daing na Bangus',
        favorte: false,
        tags: ['breakfast', 'rice', 'seafood','fried'],
        color: '#FFDFC4',
        image: require('../assets/images/test.png'),
        time: '32 Minutes',
        capacity: '2 Persons',
        burn: '24 Calories',
        description:'This traditional Filipino dish consists of butterflied,'+
        ' marinated milkfish that is pan-fried until crispy. ',
        direction: directions.lugaw,
        recipe: null,
    },
    {
        id: 'champorado',
        name: 'Champorado',
        favorte: false,
        tags: ['breakfast', 'rice', 'choco'],
        color: '#FFDFC4',
        image: require('../assets/images/test.png'),
        time: '32 Minutes',
        capacity: '2 Persons',
        burn: '24 Calories',
        description:'Champorado is a thick Filipino rice pudding. '+
        'Usually enjoyed as a hearty breakfast or a sweet afternoon snack, Filipino'+
        ' champorado can be served hot or cold, drizzled with condensed milk, or'+
        ' accompanied by salted dry fish.',
        direction: directions.lugaw,
        recipe: null,
    },
    {
        id: 'tapsilog',
        name: 'Tapsilog',
        favorte: false,
        tags: ['breakfast', 'rice','fried', 'egg'],
        color: '#FFC4C4',
        image: require('../assets/images/test.png'),
        time: '32 Minutes',
        capacity: '2 Persons',
        burn: '24 Calories',
        description: 'One of the most common breakfast staples in'+
        ' the Philippines is tapsilog, a plate which consists of'+
        ' sliced beef jerky, known as tapa, a heap of garlic rice,'+
        ' and a fried egg.',
        direction: directions.lugaw,
        recipe: null,
    },
    {
        id: 'arroz-caldo',
        name: 'Arroz Caldo',
        favorte: false,
        tags: ['breakfast', 'rice','veggies'],
        color: '#FFF3C4',
        image: require('../assets/images/test.png'),
        time: '32 Minutes',
        capacity: '2 Persons',
        burn: '24 Calories',
        description: 'Arroz caldo is the Filipino variety of congee,'+
        ' a thick rice porridge that is ubiquitous in many Asian countries.'+
        ' Distinguished by the addition of chicken, arroz caldo is usually'+
        ' cooked in a ginger-infused broth and served with various accompaniments and seasonings.',

        direction: directions.lugaw,
        recipe: null,
    },
    {
        id: 'tocino',
        name: 'Tocino',
        favorte: false,
        tags: ['breakfast', 'rice', 'meat', 'fried','egg'],
        color: '#C4FFE8',
        image: require('../assets/images/test.png'),
        time: '32 Minutes',
        capacity: '2 Persons',
        burn: '24 Calories',
        description: 'This combination is called tosilog, and it is a'+
        ' popular Filipino everyday go-to meal, typically enjoyed for'+
        ' breakfast, but it is also readily available at any other time of the day.',
        direction: directions.lugaw,
        recipe: null,
    },
    {
        id: 'torta',
        name: 'Torta',
        favorte: false,
        tags: ['breakfast', 'egg'],
        color: '#FFDFC4',
        image: require('../assets/images/test.png'),
        time: '32 Minutes',
        capacity: '2 Persons',
        burn: '24 Calories',
        description: 'Lugaw is a Filipino rice ' +
         'porridge that is traditionally thought '+
         'of as soft food for sick people, due to the '+
         'fact that it doesn\'t require much chewing. Warm, '+
         'filling, and mushy, the dish acts as an ideal base '+
         'for any type of meat and seasonings, just like a congee.',
         
        direction: directions.lugaw,
        recipe: null,
    },
];

const meal = [
    {
        id: 'Adobo',
        color: '#FFDFC4',
        title: 'Blue',
        title_bold: 'Salad',
        caption: 'Aside from their natural good taste and great crunchy texture alongside wonderful colors and fragrances, eating a large serving of fresh, raw vegetables each day can have significant health benefits.',
    },
    {
        id: 'hakdog',
        color: '#D3D3D3',
    },
    {
        id: 'tocino',
        color: '#80bdab',
    },
];

const brunch = [

];
const elevenses = [

];
const lunch = [

];
const tea = [

];



export {
    breakfast,
    meal,
    brunch,
    elevenses,
    lunch,
    tea,
}