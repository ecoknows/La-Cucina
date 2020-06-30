import * as directions from './directions';
import * as ingridients from './ingridients';

const breakfast = [
    {
        id: 'banana-fritter-recipe',
        name: 'Banana Fritter ( Maruya )',
        favorite: false,
        tags: ['breakfast', 'rice', 'veggies', 'meat'],
        color: '#FFDFC4',
        image: require('../assets/images/test.png'),
        time: '25 Minutes',
        capacity: '6 People',
        burn: '460 Calories',
        description: 'Mashed bananas combined with flour '+
        ' and other ingredients to make a batter and then'+
        ' fried until golden brown. It is best when rolled'+
        ' in granulated white sugar after frying.',
        author: 'Vanjo Merano',
        direction: directions.maruya,
        ingridients: ingridients.maruya,
    },
    {
        id: 'corned-beef-omelette', 
        name: 'Corned Beef Omelet',
        favorite: false,
        tags: ['breakfast', 'rice', 'seafood','fried'],
        color: '#FFDFC4',
        image: require('../assets/images/test.png'),
        time: '32 Minutes',
        capacity: '4 Persons',
        burn: '248 Calories',
        description:'This traditional Filipino dish consists of butterflied,'+
        ' marinated milkfish that is pan-fried until crispy. ',
        author: 'Vanjo Merano',
        direction: directions.corned_beef_omelet,
        ingridients: ingridients.corned_beef_omelet,
    },
    {
        id: 'champorado',
        name: 'Champorado',
        favorite: false,
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
        ingridients: null,
    },
    {
        id: 'tapsilog',
        name: 'Tapsilog',
        favorite: false,
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
        ingridients: null,
    },
    {
        id: 'arroz-caldo',
        name: 'Arroz Caldo',
        favorite: false,
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
        ingridients: null,
    },
    {
        id: 'tocino',
        name: 'Tocino',
        favorite: false,
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
        ingridients: null,
    },
    {
        id: 'torta',
        name: 'Torta',
        favorite: false,
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
        ingridients: null,
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