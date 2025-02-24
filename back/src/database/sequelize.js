import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.PG_URL, {
    dialect: 'postgres',
    define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
    },

    dialectOptions: {
        // cette option permet d'exécuter plusieurs instructions sql en un fois
        multipleStatements: true,
    },
    // logging false pour pas polluer la console (décommenter si besoin)
    // logging: false,
});

export { sequelize };