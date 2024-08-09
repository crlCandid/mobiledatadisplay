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
                route: '/app/users'
            },
            {
                text: 'Tabs',
                route: '/app/tabs'
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
    }
}