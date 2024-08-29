//Constans used appliaction wide

module.exports = {
    MemoIndex : {
        UserSession : 'usersession',
        StationConfig: 'stationconfig'
    },
    SessionIndex: {
        Roles: {
            Edit: 'Edit',
            View: 'View',
            Remove: 'Remove',
            Display: 'Display',
            Admin: 'Admin',
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
        Kind : {
            Alert:'Alert',
            Ncr:'NCR', 
            Deviation:'Deviation'
        },
        Status: ['Active', 'Disable'],
        Active: 'Active',
        Disable: 'Disable'
    },
    Area: {
        Status: ['Active', 'Disable'],
        Active: 'Active',
        Disable: 'Disable'
    },
    User: {
        Status: ['Active', 'Disable']
    }
}