//Constans used appliaction wide

module.exports = {
    MemoIndex : {
        UserSession : 'usersession'
    },
    NavBar : {
        Pages : [
            {
                text: 'Main',
                route: '/app'
            },
            {
                text: 'Reports',
                route: '/app/reports'
            },
            {
                text: 'Areas',
                route: '/app/areas'
            },
            {
                text: 'Users',
                route: '/app/Users'
            },
        ],
        Profile : [
            'Logout'
        ]
    },
    Colors: {
        Primary:{
            Main: '#1976d2'
        },
        Secondary:{
            Main: '#dc004e',
        }
    },
    Report: {
        Kinds : ['Alert', 'NCR', 'Deviation'],
        Status: ['Active', 'Disable']
    }
}