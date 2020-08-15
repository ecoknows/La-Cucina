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

export {
    sizes,
    colors,
    fonts,
    initial_note_data,
    gradients
}