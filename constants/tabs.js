import * as mocks from './mocks';


const cuisine = {
    uppedTabs: [
        {
            id: 'break-fast',
            first: 'Break',
            second: 'fast',
            bottomTabs: [
                { name: 'Veggies'},
                { name: 'Fruits'},
                { name: 'Fried'},
                { name: 'Choco'},
                { name: 'Meat'},
                { name: 'Egg'},
                { name: 'Milk'},
                { name: 'Chicken'},
                { name: 'Beef'},
                { name: 'Fish'},
                { name: 'Shrimp'},
                { name: 'Crab'},
                { name: 'Squid'},
                { name: 'Tofu'},
                { name: 'Turkey'},
                { name: 'Adobo'},
                { name: 'Sinigang'},
                { name: 'Kilawin'},
                { name: 'Ginataan'},
                { name: 'Noodle'},
                { name: 'Pork'}],
            mocks: mocks.breakfast,
            light: true,
            width: 100,
        },
        {
            id: 'brunch',
            first: 'Brunch',
            second: ' ', 
            bottomTabs: [
                { name: 'Veggies'},
                { name: 'Fruits'},
                { name: 'Fried'},
                { name: 'Choco'},
                { name: 'Meat'},
                { name: 'Egg'},
                { name: 'Milk'},
                { name: 'Chicken'},
                { name: 'Beef'},
                { name: 'Fish'},
                { name: 'Shrimp'},
                { name: 'Crab'},
                { name: 'Squid'},
                { name: 'Tofu'},
                { name: 'Turkey'},
                { name: 'Adobo'},
                { name: 'Sinigang'},
                { name: 'Kilawin'},
                { name: 'Ginataan'},
                { name: 'Noodle'},
                { name: 'Pork'}],
            mocks: mocks.brunch,
            light: false,
            width: 140,
        },
        {
            id: 'elevenses',
            first: 'Elevenses',
            second: ' ',
            mocks: mocks.elevenses,
            light: false,
            width: 130,
        },
        {
            id: 'lunch',
            first: 'Lunch',
            second: ' ',
            mocks: mocks.lunch,
            light: false,
            width: 135,
        },
        {
            id: 'tea',
            first: 'Tea',
            second: ' ',
            mocks: mocks.tea,
            light: false,
            width: 129,
        },
        {
            id: 'supper',
            first: 'Supper',
            second: ' ',
            mocks: mocks.supper,
            light: false,
            width: 119,
        },
        {
            id: 'dinner',
            first: 'Dinner',
            second: ' ',
            mocks: mocks.dinner,
            light: false,
            width: 118,
        },
        {
            id: 'dessert',
            first: 'Dessert',
            second: ' ',
            mocks: mocks.dessert,
            light: false,
            width: 118,
        },
        {
            id: 'appetizers',
            first: 'Appetizers',
            second: ' ',
            mocks: mocks.appetizers,
            light: false,
            width: 118,
        },
    ],
    
    leftTabs: {

        breakfast: [
            {
                name: 'Drinks',
                width: 60,
                margin: -20,
            },
            {
                name: 'Bread',
                width: 60,
                margin: -20,
            },
            {
                name: 'Nonrice',
                width: 65,
                margin: -20,
            },
            {
                name: 'Rice',
                width: 60,
                margin: 0,
            },

        ],

    },


}

const favorites = {
    sideTabs : [
        'Recent',
        'Oldest',
        'Breakfast',
        'Brunch',
        'Elevenses',
        'Lunch',
        'Tea',
        'Supper',
        'Dinner',
        'Dessert',
        'Appetizers',
    ],
}

const tutorial = {
    current: 'Ingridients', // todo:  null
    curr_num : 1,
    favorite: false,
    history: false,
    ingridients: true,
}

const variables = {
    active : 0,
    tutorial_proceed : false,
}

export {
    cuisine,
    favorites,
    tutorial,
    variables
}