import * as directions from './directions';
import * as ingridients from './ingridients';
import * as nutrition from './nutrition';

const breakfast = [
    {
        id: 'maruya',
        index: 0,
        name: 'Maruya',
        title_size: 24,
        favorite: false,
        tags: ['nonrice','fruits', 'egg','milk'],
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
        title_size: 24,
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
        title_size: 24,
        favorite: false,
        tags: ['nonrice', 'seafood','fried', 'egg'],
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
        'great and it is easy to make.',
        author: 'Vanjo Merano',
        direction: directions.corned_beef_omelet,
        ingridients: ingridients.corned_beef_omelet,
        nutrition: nutrition.corned_beef_omelet,
    },
    {
        id: 'chicken-adobo-fried-rice-and-tortang-corned-beef',
        index: 3,
        name: 'Chicken Adobo Fried Rice and Tortang Corned Beef',
        title_size: 15,
        favorite: false,
        tags: ['breakfast', 'rice', 'meat', 'fried'],
        color: '#FFDFC4',
        image: require('../assets/foods/chicken-adobo-fried-rice-and-tortang-corned-beef.png'),
        image_scale: 230,
        cooking_time: '5 mins',
        prep_time: '15 mins',
        capacity: 3,
        capacity_cache : {value: null},
        burn: '721 kilo calories',
        description:'Chicken Adobo Fried Rice and Tortang Corned Beef is simple and delicious.'+
        'I think that it is worth to mention that'+
        ' it is economical. It saved me money because'+
        ' leftovers food were used in the recipe.',
        direction: directions.chicken_adobo_fried_rice_and_tortang_corned_beef,
        ingridients: ingridients.chicken_adobo_fried_rice_and_tortang_corned_beef,
        nutrition: nutrition.chicken_adobo_fried_rice_and_tortang_corned_beef,
    },
    {
        id: 'tapsilog',
        index: 4,
        name: 'Tapsilog',
        title_size: 24,
        favorite: false,
        tags: [,'rice','fried', 'egg','meat'],
        color: '#FFDFC4',
        image: require('../assets/foods/tapsilog.png'),
        image_scale: 230,
        cooking_time: '30 mins',
        prep_time: '10 mins',
        capacity: 3,
        capacity_cache : {value: null},
        burn: '883 kilo calories',
        description: 'One of the most common breakfast staples in'+
        ' the Philippines is tapsilog, a plate which consists of'+
        ' sliced beef jerky, known as tapa, a heap of garlic rice,'+
        ' and a fried egg.',
        direction: directions.tap_silog,
        ingridients: ingridients.tap_silog,
        nutrition: nutrition.tap_silog,
    },
    {
        id: 'filipino_omellete',
        index: 5,
        name: 'Filipino Omellete',
        title_size: 24,
        favorite: false,
        tags: [ 'nonrice', 'meat', 'fried','egg'],
        color: '#FFDFC4',
        image: require('../assets/foods/filipino_omellete.png'),
        image_scale: 230,
        cooking_time: '8 mins',
        prep_time: '5 mins',
        capacity:3,
        capacity_cache : {value: null},
        burn: '113 kilo calories',
        description: 'Making Filipino Omelet is quick and easy.'+
        ' The procedure is so simple to the point that newbies'+
        ' can easily understand and apply. More '+
        'vegetables can be added according to your preference. ',
        direction: directions.filipino_omellete,
        ingridients: ingridients.filipino_omellete,
        nutrition: nutrition.filipino_omellete,
    },
    {
        id: 'hot-silog',
        index: 6,
        name: 'Hot Silog',
        title_size: 24,
        favorite: false,
        tags: ['rice', 'egg','meat', 'fried'],
        color: '#FFDFC4',
        image: require('../assets/foods/hot_silog.png'),
        image_scale: 220,
        cooking_time: '20 mins',
        prep_time: '5 mins',
        capacity : 1,
        capacity_cache : {value: null},
        burn: '707 calories',
        description: 'Hotsilog is a meal composed of hotdogs,'+
        ' garlic fried rice, and fried egg. '+
        'In a Filipino household, this is'+
        ' commonly eaten for breakfast',
        author: 'Vanjo Merano',
        direction: directions.hot_silog,
        ingridients: ingridients.hot_silog,
        nutrition: nutrition.hot_silog,
    },
    {
        id: 'skinless-longganisa',
        index: 7,
        name: 'Skinless Longganisa',
        title_size: 24,
        favorite: false,
        tags: ['nonrice','meat', 'fried'],
        color: '#FFDFC4',
        image: require('../assets/foods/skinless_longganisa.png'),
        image_scale: 220,
        cooking_time: '10 mins',
        prep_time: '15 mins',
        capacity : 1,
        capacity_cache : {value: null},
        burn: '707 calories',
        description: 'Skinless longganisa refers'+
        ' to a type of Filipino sausage without the'+
        ' casing. It is also known as naked sausage.'+
        ' Filipino Longganisa can either be sweet or garlicky.',
        author: 'Vanjo Merano',
        direction: directions.skinless_longganisa,
        ingridients: ingridients.skinless_longganisa,
        nutrition: nutrition.skinless_longganisa,
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