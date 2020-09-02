import * as directions from './directions';
import * as ingridients from './ingridients';
import * as nutrition from './nutrition';
import * as theme from './theme';

const VenjoRecipe= {
    maruya: {
        id: 0,
        name: 'Maruya',
        title_size: 24,
        favorite: false,
        tags: ['nonrice','fruits', 'egg','milk'],
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
        circle_1: {name: 'Carbs', textColor: '#FF6600' ,percent: 40, degree: '-120deg', gradient: theme.gradients.instagram},
        circle_2: {name: 'Protein', textColor: '#348F50' ,percent: 4, degree: '0deg', gradient: theme.gradients.mojito},
        circle_3: {name: 'Fat', textColor: '#185a9d' ,percent: 56, degree: '120deg', gradient: theme.gradients.endless_river},
        direction: directions.maruya,
        ingridients: ingridients.maruya,
        nutrition: nutrition.maruya,
    },
    arroz_caldo: {
        id: 1,
        name: 'Arroz Caldo',
        title_size: 24,
        favorite: false,
        tags: ['rice','veggies','egg','chicken'],
        image: require('../assets/foods/arroz_caldo.png'),
        image_scale: 220,
        cooking_time: '10 mins',
        prep_time: '15 mins',
        capacity: 1,
        capacity_cache : {value: null},
        burn: '538 calories',
        description: 'Arroz caldo is the Filipino variety of congee,'+
        ' a thick rice porridge that is ubiquitous in many Asian countries.',
        author: 'Vanjo Merano',
        circle_1: {name: 'Carbs', textColor: '#FF6600' ,percent: 30, degree: '-120deg', gradient: theme.gradients.instagram},
        circle_2: {name: 'Protein', textColor: '#348F50' ,percent: 19, degree: '0deg', gradient: theme.gradients.mojito},
        circle_3: {name: 'Fat', textColor: '#185a9d' ,percent: 51, degree: '120deg', gradient: theme.gradients.endless_river},
        direction: directions.arroz_caldo,
        ingridients: ingridients.arroz_caldo,
        nutrition: nutrition.arroz_caldo,
    },
    corned_beef_omelet: {
        id: 2,
        name: 'Corned Beef Omelet',
        title_size: 24,
        favorite: false,
        tags: ['nonrice', 'seafood','fried', 'egg'],
        image: require('../assets/foods/corned-beef-omelette.png'),
        image_scale: 230,
        cooking_time: '10 mins',
        prep_time: '15 mins',
        capacity: 2,
        capacity_cache : {value: null},
        burn: '284 calories',
        description:'I consider Corned Beef Omelet (or Tortang Corned Beef) '+
        'as a power breakfast food. It is a complete meal which gives me'+
        ' enough energy that lasts until lunchtime. In addition, it tastes '+
        'great and it is easy to make.',
        author: 'Vanjo Merano',
        circle_1: {name: 'Carbs', textColor: '#FF6600' ,percent: 34, degree: '-120deg', gradient: theme.gradients.instagram},
        circle_2: {name: 'Protein', textColor: '#348F50' ,percent: 10, degree: '0deg', gradient: theme.gradients.mojito},
        circle_3: {name: 'Fat', textColor: '#185a9d' ,percent: 56, degree: '120deg', gradient: theme.gradients.endless_river},
        direction: directions.corned_beef_omelet,
        ingridients: ingridients.corned_beef_omelet,
        nutrition: nutrition.corned_beef_omelet,
    },
    chicken_adobo_fried_rice_and_tortang_corned_beef: {
        id: 3,
        name: 'Chicken Adobo Fried Rice and Tortang Corned Beef',
        title_size: 15,
        favorite: false,
        tags: ['breakfast', 'rice', 'meat', 'fried'],
        image: require('../assets/foods/chicken-adobo-fried-rice-and-tortang-corned-beef.png'),
        image_scale: 230,
        cooking_time: '5 mins',
        prep_time: '15 mins',
        capacity: 3,
        capacity_cache : {value: null},
        burn: '721 calories',
        description:'Chicken Adobo Fried Rice and Tortang Corned Beef is simple and delicious.'+
        'I think that it is worth to mention that'+
        ' it is economical. It saved me money because'+
        ' leftovers food were used in the recipe.',
        author: 'Vanjo Merano',
        circle_1: {name: 'Cal', textColor: '#FF6600' ,percent: 50, degree: '-120deg', gradient: theme.gradients.orange},
        circle_2: {name: 'Iron', textColor: '#1BAA09' ,percent: 25, degree: '0deg', gradient: theme.gradients.blue},
        circle_3: {name: 'Fats', textColor: '#0269FF' ,percent: 40, degree: '120deg', gradient: theme.gradients.green},
        direction: directions.chicken_adobo_fried_rice_and_tortang_corned_beef,
        ingridients: ingridients.chicken_adobo_fried_rice_and_tortang_corned_beef,
        nutrition: nutrition.chicken_adobo_fried_rice_and_tortang_corned_beef,
    },
    tapsilog: {
        id: 4,
        name: 'Tapsilog',
        title_size: 24,
        favorite: false,
        circle_1: {name: 'Cal', textColor: '#FF6600' ,percent: 50, degree: '-120deg', gradient: theme.gradients.orange},
        circle_2: {name: 'Iron', textColor: '#1BAA09' ,percent: 25, degree: '0deg', gradient: theme.gradients.blue},
        circle_3: {name: 'Fats', textColor: '#0269FF' ,percent: 40, degree: '120deg', gradient: theme.gradients.green},
        tags: [,'rice','fried', 'egg','meat'],
        image: require('../assets/foods/tapsilog.png'),
        image_scale: 230,
        cooking_time: '30 mins',
        prep_time: '10 mins',
        capacity: 3,
        capacity_cache : {value: null},
        burn: '883 calories',
        description: 'One of the most common breakfast staples in'+
        ' the Philippines is tapsilog, a plate which consists of'+
        ' sliced beef jerky, known as tapa, a heap of garlic rice,'+
        ' and a fried egg.',
        author: 'Vanjo Merano',
        circle_1: {name: 'Cal', textColor: '#FF6600' ,percent: 50, degree: '-120deg', gradient: theme.gradients.orange},
        circle_2: {name: 'Iron', textColor: '#1BAA09' ,percent: 25, degree: '0deg', gradient: theme.gradients.blue},
        circle_3: {name: 'Fats', textColor: '#0269FF' ,percent: 40, degree: '120deg', gradient: theme.gradients.green},
        direction: directions.tap_silog,
        ingridients: ingridients.tap_silog,
        nutrition: nutrition.tap_silog,
    },
    filipino_omellete: {
        id: 5,
        name: 'Filipino Omellete',
        title_size: 24,
        favorite: false,
        tags: [ 'nonrice', 'meat', 'fried','egg'],
        image: require('../assets/foods/filipino_omellete.png'),
        image_scale: 230,
        cooking_time: '8 mins',
        prep_time: '5 mins',
        capacity:3,
        capacity_cache : {value: null},
        burn: '113 calories',
        description: 'Making Filipino Omelet is quick and easy.'+
        ' The procedure is so simple to the point that newbies'+
        ' can easily understand and apply. More '+
        'vegetables can be added according to your preference. ',
        author: 'Vanjo Merano',
        circle_1: {name: 'Cal', textColor: '#FF6600' ,percent: 50, degree: '-120deg', gradient: theme.gradients.orange},
        circle_2: {name: 'Iron', textColor: '#1BAA09' ,percent: 25, degree: '0deg', gradient: theme.gradients.blue},
        circle_3: {name: 'Fats', textColor: '#0269FF' ,percent: 40, degree: '120deg', gradient: theme.gradients.green},
        direction: directions.filipino_omellete,
        ingridients: ingridients.filipino_omellete,
        nutrition: nutrition.filipino_omellete,
    },
    hot_silog: {
        id: 6,
        name: 'Hot Silog',
        title_size: 24,
        favorite: false,
        tags: ['rice', 'egg','meat', 'fried'],
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
        circle_1: {name: 'Carbs', textColor: '#FF6600' ,percent: 38, degree: '-120deg', gradient: theme.gradients.instagram},
        circle_2: {name: 'Protein', textColor: '#348F50' ,percent: 12, degree: '0deg', gradient: theme.gradients.mojito},
        circle_3: {name: 'Fat', textColor: '#185a9d' ,percent: 50, degree: '120deg', gradient: theme.gradients.endless_river},
        direction: directions.hot_silog,
        ingridients: ingridients.hot_silog,
        nutrition: nutrition.hot_silog,
    },
    skinless_longganisa: {
        id: 7,
        name: 'Skinless Longganisa',
        title_size: 24,
        favorite: false,
        tags: ['nonrice','meat', 'fried'],
        image: require('../assets/foods/skinless_longganisa.png'),
        image_scale: 220,
        cooking_time: '10 mins',
        prep_time: '15 mins',
        capacity : 1,
        capacity_cache : {value: null},
        burn: '114 calories',
        description: 'Skinless longganisa refers'+
        ' to a type of Filipino sausage without the'+
        ' casing. It is also known as naked sausage.'+
        ' Filipino Longganisa can either be sweet or garlicky.',
        author: 'Vanjo Merano',
        circle_1: {name: 'Cal', textColor: '#FF6600' ,percent: 50, degree: '-120deg', gradient: theme.gradients.orange},
        circle_2: {name: 'Iron', textColor: '#1BAA09' ,percent: 25, degree: '0deg', gradient: theme.gradients.blue},
        circle_3: {name: 'Fats', textColor: '#0269FF' ,percent: 40, degree: '120deg', gradient: theme.gradients.green},
        direction: directions.skinless_longganisa,
        ingridients: ingridients.skinless_longganisa,
        nutrition: nutrition.skinless_longganisa,
    },
    t_bone_steak_with_fried_eggs: {
        id: 8,
        name: 'T-Bone Steak with Fried Eggs',
        title_size: 24,
        favorite: false,
        tags: ['nonrice','meat', 'egg'],
        image: require('../assets/foods/t-bone-steak-with-fried-eggs.png'),
        image_scale: 220,
        cooking_time: '8 mins',
        prep_time: '15 mins',
        capacity : 2,
        capacity_cache : {value: null},
        burn: '1050 calories',
        description: 'Note that this recipe calls for '+
        'T-bone steak, but you can also use Porterhouse'+
        ' or any steak cuts that you like. Both T-bone and Porterhouse steaks can'+
        ' be distinguished by the “T” shaped bone. However, each '+
        'has its own properties that make it unique.',
        author: 'Vanjo Merano',
        circle_1: {name: 'Cal', textColor: '#FF6600' ,percent: 50, degree: '-120deg', gradient: theme.gradients.orange},
        circle_2: {name: 'Iron', textColor: '#1BAA09' ,percent: 25, degree: '0deg', gradient: theme.gradients.blue},
        circle_3: {name: 'Fats', textColor: '#0269FF' ,percent: 40, degree: '120deg', gradient: theme.gradients.green},
        direction: directions.t_bone_steak_with_fried_egg,
        ingridients: ingridients.t_bone_steak_with_fried_egg,
        nutrition: nutrition.t_bone_steak_with_fried_egg,
    }, 
    tortang_tuna_with_spinach: {
        id: 9,
        name: 'Tortang Tuna with Spinach',
        title_size: 24,
        favorite: false,
        tags: ['nonrice','meat', 'egg'],
        image: require('../assets/foods/tortang_tuna_with_spinach.png'),
        image_scale: 220,
        cooking_time: '10 mins',
        prep_time: '5 mins',
        capacity : 3,
        capacity_cache : {value: null},
        burn: '462 calories',
        description: 'Tortang Tuna with Spinach is a'+
        ' type of omelet wherein sautéed tuna and '+
        'spinach are added to the beaten egg mixture'+
        ' before cooking. This is a practical way to'+
        ' make stuffed omelet. It is easy to prepare'+
        ' and the result is yummy.',
        author: 'Vanjo Merano',
        circle_1: {name: 'Cal', textColor: '#FF6600' ,percent: 50, degree: '-120deg', gradient: theme.gradients.orange},
        circle_2: {name: 'Iron', textColor: '#1BAA09' ,percent: 25, degree: '0deg', gradient: theme.gradients.blue},
        circle_3: {name: 'Fats', textColor: '#0269FF' ,percent: 40, degree: '120deg', gradient: theme.gradients.green},
        direction: directions.tortang_tuna_with_spinach,
        ingridients: ingridients.tortang_tuna_with_spinach,
        nutrition: nutrition.tortang_tuna_with_spinach,
    },
    spinach_tomato_and_cheese_omelette : {
        id: 10,
        name: 'Spinach Tomato and Cheese Omelette',
        title_size: 18,
        favorite: false,
        tags: ['nonrice','veggies', 'egg'],
        image: require('../assets/foods/spinach_tomato_cheese.png'),
        image_scale: 220,
        cooking_time: '7 mins',
        prep_time: '5 mins',
        capacity : 3,
        capacity_cache : {value: null},
        burn: '649.6 calories',
        description: 'Spinach Tomato and Cheese '+
        'Omelette is an easy and healthy dish that'+
        ' you can make for breakfast. Instead of just'+
        ' frying eggs, you can make your breakfast meal'+
        ' more exciting and tastier.',
        author: 'Vanjo Merano',
        circle_1: {name: 'Carbs', textColor: '#FF6600' ,percent: 30, degree: '-120deg', gradient: theme.gradients.instagram},
        circle_2: {name: 'Protein', textColor: '#348F50' ,percent: 19, degree: '0deg', gradient: theme.gradients.mojito},
        circle_3: {name: 'Fat', textColor: '#185a9d' ,percent: 51, degree: '120deg', gradient: theme.gradients.endless_river},
        direction: directions.spinach_tomato_and_cheese_omelette,
        ingridients: ingridients.spinach_tomato_and_cheese_omelette,
        nutrition: nutrition.spinach_tomato_and_cheese_omelette,
    },
    special_longanisa_fried_rice: {
        id: 11,
        name: 'Special Longanisa Fried Rice',
        title_size: 18,
        favorite: false,
        tags: ['rice','veggies','egg','fried'],
        image: require('../assets/foods/special_longanisa_fried_rice.png'),
        image_scale: 220,
        cooking_time: '30 mins',
        prep_time: '5 mins',
        capacity: 4,
        capacity_cache : {value: null},
        burn: '638 calories',
        description: 'Have you tried cooking Special'+
        ' Longanisa Fried Rice for brunch? If not,'+
        ' you might want to continue reading this recipe'+
        ' so that you can gather all the necessary information'+
        ' to plan ahead.',
        author: 'Vanjo Merano',
        circle_1: {name: 'Cal', textColor: '#FF6600' ,percent: 50, degree: '-120deg', gradient: theme.gradients.orange},
        circle_2: {name: 'Iron', textColor: '#1BAA09' ,percent: 25, degree: '0deg', gradient: theme.gradients.blue},
        circle_3: {name: 'Fats', textColor: '#0269FF' ,percent: 40, degree: '120deg', gradient: theme.gradients.green},
        direction: directions.special_longanisa_fried_rice,
        ingridients: ingridients.special_longanisa_fried_rice,
        nutrition: nutrition.special_longanisa_fried_rice,
    },
};

const breakfast = [
    {
        index: 0,
        recipe: VenjoRecipe.maruya
    },
    {
        index: 1,
        recipe: VenjoRecipe.arroz_caldo
    },
    {
        index: 2,
        recipe: VenjoRecipe.corned_beef_omelet
    },
    {
        index: 3,
        recipe: VenjoRecipe.chicken_adobo_fried_rice_and_tortang_corned_beef
    },
    {
        index: 4,
        recipe: VenjoRecipe.filipino_omellete
    },
    {
        index: 5,
        recipe: VenjoRecipe.hot_silog
    },
    {
        index: 6,
        recipe: VenjoRecipe.skinless_longganisa
    },
    {
        index: 7,
        recipe: VenjoRecipe.t_bone_steak_with_fried_eggs
    },
    {
        index: 8,
        recipe: VenjoRecipe.tortang_tuna_with_spinach
    },
    {
        index: 9,
        recipe: VenjoRecipe.spinach_tomato_and_cheese_omelette
    },

];

const brunch = [
    {
        index: 0,
        recipe: VenjoRecipe.special_longanisa_fried_rice
    },
];

const elevenses = [
];

const lunch = [
];

const tea = [

];
const supper = [

];
const dinner = [

];
const dessert = [

];
const appetizers = [

];





export {
    breakfast,
    brunch,
    elevenses,
    lunch,
    tea,
    supper,
    dinner,
    dessert,
    appetizers,
}