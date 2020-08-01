import * as directions from './directions';
import * as ingridients from './ingridients';
import * as nutrition from './nutrition';

const breakfast = [
    {
        id: 'maruya',
        index: 0,
        name: 'Maruya',
        favorite: false,
        tags: ['rice','fruits', 'egg','milk'],
        color: '#FFDFC4',
        image: require('../assets/foods/maruya.png'),
        image_scale: 230,
        cooking_time: '10 mins',
        prep_time: '15 mins',
        capacity : 6,
        capacity_cache : {value: null},
        burn: '460 calories',
        description: 'Mashed bananas combined with flour '+
        ' and other ingredients to make a batter and then'+
        ' fried until golden brown. It is best when rolled'+
        ' in granulated white sugar after frying.',
        author: 'Vanjo Merano',
        direction: directions.maruya,
        ingridients: ingridients.maruya,
        nutrition: nutrition.maruya,
    },
    {
        id: 'arroz-caldo',
        index: 1,
        name: 'Arroz Caldo',
        favorite: false,
        tags: ['rice','veggies','egg','chicken'],
        color: '#FFDFC4',
        image: require('../assets/foods/arroz_caldo.png'),
        image_scale: 220,
        cooking_time: '10 mins',
        prep_time: '15 mins',
        capacity: 2,
        capacity_cache : {value: null},
        burn: '24 calories',
        description: 'Arroz caldo is the Filipino variety of congee,'+
        ' a thick rice porridge that is ubiquitous in many Asian countries.',
        author: 'Vanjo Merano',
        direction: directions.arroz_caldo,
        ingridients: ingridients.arroz_caldo,
        nutrition: nutrition.arroz_caldo,
    },
    {
        id: 'corned-beef-omelette', 
        index: 2,
        name: 'Corned Beef Omelet',
        favorite: false,
        tags: ['rice', 'seafood','fried', 'egg'],
        color: '#FFDFC4',
        image: require('../assets/foods/corned-beef-omelette.png'),
        image_scale: 230,
        cooking_time: '10 mins',
        prep_time: '15 mins',
        capacity: 2,
        capacity_cache : {value: null},
        burn: '248 calories',
        description:'I consider Corned Beef Omelet (or Tortang Corned Beef) '+
        'as a power breakfast food. It is a complete meal which gives me'+
        ' enough energy that lasts until lunchtime. In addition, it tastes '+
        'great and it is easy to make. Sometimes I enjoy it with toast'+
        ' or with a cup of rice.',
        author: 'Vanjo Merano',
        direction: directions.corned_beef_omelet,
        ingridients: ingridients.corned_beef_omelet,
        nutrition: nutrition.corned_beef_omelet,
    },
    {
        id: 'chicken-adobo-fried-rice-and-tortang-corned-beef',
        index: 3,
        name: 'Chicken Adobo Fried Rice and Tortang Corned Beef',
        favorite: false,
        tags: ['breakfast', 'rice', 'choco'],
        color: '#FFDFC4',
        image: require('../assets/foods/chicken-adobo-fried-rice-and-tortang-corned-beef.png'),
        image_scale: 230,
        time: '32 Minutes',
        capacity: '3 People',
        burn: '721 kilo calories',
        description:'Champorado is a thick Filipino rice pudding. '+
        'Usually enjoyed as a hearty breakfast or a sweet afternoon snack, Filipino'+
        ' champorado can be served hot or cold, drizzled with condensed milk, or'+
        ' accompanied by salted dry fish.',
        author: 'Vanjo Merano',
        direction: directions.chicken_adobo_fried_rice_and_tortang_corned_beef,
        ingridients: ingridients.chicken_adobo_fried_rice_and_tortang_corned_beef,
    },
    {
        id: 'tapsilog',
        index: 4,
        name: 'Tapsilog',
        favorite: false,
        tags: [,'rice','fried', 'egg'],
        color: '#FFC4C4',
        image: require('../assets/images/test.png'),
        image_scale: 230,
        time: '32 Minutes',
        capacity: '2 Persons',
        burn: '24 calories',
        description: 'One of the most common breakfast staples in'+
        ' the Philippines is tapsilog, a plate which consists of'+
        ' sliced beef jerky, known as tapa, a heap of garlic rice,'+
        ' and a fried egg.',
        direction: directions.lugaw,
        ingridients: null,
    },
    {
        id: 'tocino',
        index: 5,
        name: 'Tocino',
        favorite: false,
        tags: [ 'rice', 'meat', 'fried','egg'],
        color: '#C4FFE8',
        image: require('../assets/images/test.png'),
        image_scale: 230,
        time: '32 Minutes',
        capacity: '2 Persons',
        burn: '24 calories',
        description: 'This combination is called tosilog, and it is a'+
        ' popular Filipino everyday go-to meal, typically enjoyed for'+
        ' breakfast, but it is also readily available at any other time of the day.',
        direction: directions.lugaw,
        ingridients: null,
    },
    {
        id: 'torta',
        index: 6,
        name: 'Torta',
        favorite: false,
        tags: ['egg'],
        color: '#FFDFC4',
        image: require('../assets/images/test.png'),
        image_scale: 230,
        time: '32 Minutes',
        capacity: '2 Persons',
        burn: '24 calories',
        description: 'Lugaw is a Filipino rice ' +
         'porridge that is traditionally thought '+
         'of as soft food for sick people, due to the '+
         'fact that it doesn\'t require much chewing. Warm, '+
         'filling, and mushy, the dish acts as an ideal base '+
         'for any type of meat and seasonings, just like a congee.',
         
        direction: directions.lugaw,
        ingridients: null,
    }, 
    {
        id: 'hot-silog',
        index: 7,
        name: 'Hot Silog',
        favorite: false,
        tags: ['rice', 'egg','meat', 'fried'],
        color: '#FFDFC4',
        image: require('../assets/foods/hot_silog.png'),
        image_scale: 210,
        cooking_time: '20 mins',
        prep_time: '5 mins',
        capacity : 1,
        capacity_cache : {value: null},
        burn: '707 calories',
        description: 'Hotsilog is a meal composed of hotdogs,'+
        ' garlic fried rice, and fried egg. '+
        'In a Filipino household, this is'+
        ' commonly eaten for breakfast with '+
        'a condiment of banana ketchup and some '+
        'pickled shredded papaya (atchara) on the side.',
        author: 'Vanjo Merano',
        direction: directions.hot_silog,
        ingridients: ingridients.hot_silog,
        nutrition: nutrition.hot_silog,
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