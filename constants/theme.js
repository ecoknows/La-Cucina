const sizes = {
    margin: 8, 
    padding: 16,

    base: 8,
    radius: 4,
};


const colors = {
    accent: '#E24300',
    semi_accent: '#ff5f40',
    secondary: '#979797',
    thirdary: '#7A7474',
    pinkish: '#FFDFC4',
    gray: '#595959',
    gray2: '#E6E6E6',
    gray3: '#9B9B9B',

    white: 'white',
    black: 'black',

    wheel : [
        '#ff5f40',
        '#24a19c',
        '#6ebfb5',
        '#ff847c',
        '#64D671' ,
        '#99b898',
        '#5a3d55',
        '#e79c2a',
        '#ba7967',
        '#5e6f64',
        '#5682FF' ,
        '#FFA2A2' ,
        '#FF84DF' ,
        '#8685FF' ,
    ],

};

const gradients = {
    orange: {
        start : '#FF7B36',
        middle : '#FFAD63',
        end : '#FF7B36',
    },
    green: {
        start : '#1BAA09',
        middle : '#78F032',
        end : '#1BAA09',
    },
    blue: {
        start : '#005EE8',
        middle : '#AAC0FF',
        end : '#005EE8',
    },
    flare: {
        start : '#f12711',
        middle : null,
        end : '#f5af19',
    },
    instagram: {
        start : '#833ab4',
        middle : '#fd1d1d',
        end : '#fcb045',

    },
    endless_river: {
        start : '#43cea2',
        middle : null,
        end : '#185a9d',
    },
    mojito:{
        start : '#56B4D3',
        middle : null,
        end : '#348F50',
    }
};

const fonts = {
    h1: 36,
    h2: 30,
    h3: 24,
    
    body: 20,
    b1: 16,

    caption: 13,
};

const initial_note_data = [
    {
        title: 'Ingridients',
        note: 'You can write here what are the things that you want to see when you open this ingridient tab.',
        color: '#ff5f40',
        date: '16 July',
        checkList: [{_text:'', status: false}],
        isCheckList: 0,
        isNote: 1,
    },
    {
        title: 'Shopping List',
        note: '',
        color: '#24a19c',
        date: '16 July',
        checkList: [
            {
                _text: '3 pcs of Onions',
                status: 1,
            },
            {
                _text: '5 pcs of Garlic',
                status: 0,
            },
            {
                _text: '1/2 kilo of Salt',
                status: 0,
            },
            {
                _text: '1 kilo of Sugar',
                status: 0,
            },
            {
                _text: '1 dozen of Eggs',
                status: 0,
            },

        ],
        isCheckList: 1,
        isNote: 1,
    },
    {
        title: 'Things To do',
        note: '',
        color: '#ba7967',
        date: '16 July',
        checkList: [
            {
                _text: 'Chop the Onions',
                status: 1,
            },
            {
                _text: 'Wash the dishes and cooking tools',
                status: 0,
            },
            {
                _text: 'Read some new ingridients',
                status: 0,
            },

        ],
        isCheckList: 1,
        isNote: 1,
    },
    {
        title: 'Plan for Today',
        note: '',
        color: '#e79c2a',
        date: '16 July',
        checkList: [
            {
                _text: 'Go to the market and buy ingridients',
                status: 1,
            },
            {
                _text: 'Check some cooking tools',
                status: 0,
            },
            {
                _text: 'Bake some cookies',
                status: 0,
            },
            {
                _text: 'Go plant some veggies',
                status: 0,
            },

        ],
        isCheckList: 1,
        isNote: 1,
    },
    {
        title: 'Availabe Ingridients',
        note: '1. 1 bottle of Vinigar \n2. 1/2 dozen of eggs \n3. 45 pcs of fresh tomatoes ',
        color: '#5a3d55',
        date: '16 July',
        checkList: [{_text:'', status: false}],
        isCheckList: 0,
        isNote: 1,
    },
];

const tutorial_info = {
    cuisine: [
        'You can swipe the upper tabs\nto see more meals of ^_^',
        'Tap the meal that you want',
        'You can tap the left tab,\non what kind of food you want ^_^',
        'You can swipe the bottom tabs\nto see what kind of cuisine \nyou want ^_^',
        'Tap the kind of cuisine you want ^_^',
        'The middle part is where the food are,\nswipe it to see more ^_^',
        'If you click the photo \nof the meal it will zoom',
        'At the left top you will see a heart icon,\nif you tap the food will be\nlist on your favorites ^_^',
        'Lastly if you tap the food it\nwill navigate you to the recipe.',
    ],
    cuisine_selected : [
        'You can increase the people who can eat it. ^_^',
        'You can decrease the people who can eat it. ^_^',
        'Swipe upward the sheet\nwhere the ingridients and \ndirection listed ^.^',
        'Swipe sideward the nutrition\nso that you can see \nthe nutrition xD',
        'Tap the nutrition to automatically open it ^,^',
        'You can also zoom the image\nof cuisine by tapping it ^,^',
        'On the ingridients you can tap \nthe check boxes =.=',
        'Tap on direction so that you can see \nthe proceedure. *^.^',
        'If you want to start the proceedure tap the start ^.^',
        'If you\'re done doing the proceedure you can tap done ^_^',
        'You can go back to ingridients \nby tapping it. ^_^',
        'Lastly if your done and changes \nare made you can save it or not \nby tapping X. ^_^',
    ],
}


export {
    sizes,
    colors,
    fonts,
    initial_note_data,
    gradients,
    tutorial_info
}