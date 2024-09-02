//Constans used appliaction wide

module.exports = {
    HOSTNAME    : '192.168.100.209', 
    PORT        : process.env.PORT || 3001,              
    DB_CONN     : {
            user: 'postgres',
            password: 'Candid2024!',
            host: 'localhost',
            port: 5432,
            database: `mobiledatadisplay_${process.env.DB || 'dev'}`,
        }
}