//Constans used appliaction wide

module.exports = {
    MemoIndex : {
        UserSession : 'usersession'
    },
    SessionIndex: {
        Roles: {
            Edit: 'Edit',
            View: 'View',
            Remove: 'Remove',
            Display: 'Display',
            Admin: 'Admin',
            General: 'General'
        }
    },
    NavBar : {
        Pages : [
            {
                text: 'Main',
                route: '/app',
                admin: false
            },
            {
                text: 'Reports',
                route: '/app/reports',
                admin: false
            },
            {
                text: 'Areas',
                route: '/app/areas',
                admin: false
            },
            {
                text: 'Users',
                route: '/app/users',
                admin: true
            },
            {
                text: 'Tabs',
                route: '/app/tabs',
                admin: true
            },
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
    },
    Area: {
        Status: ['Active', 'Disable']
    },
    User: {
        Status: ['Active', 'Disable']
    }
}