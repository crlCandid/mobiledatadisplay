//Constans used appliaction wide

module.exports = {
    HOSTNAME    : '192.168.100.209', //Open to local IP to be public to external connection
    PORT        : 3000,               //Selected Port - Changes affect the ufw setup
    DB_CONN     : {
            user: 'postgres',
            password: 'Candid2024!',
            host: 'localhost',
            port: 5432,
            database: 'mobiledatadisplay',
        }
}