const tedious = require("tedious");
const { database } = require("./keys");
const { Sequelize, Op } = require('sequelize');
const MedikenUserModel = require('../models/medikenUser');
const BeneficiarioModel = require('../models/beneficiarios');
const BrokerModel = require('../models/brokers');
const AfiliadoTitularModel = require('../models/afiliadoTitular');
const SolicitudBeneficiarioModel = require('../models/solicitudBeneficiario');
const SolicitudModel = require('../models/solicitud');
const MenuOptionsModel = require('../models/menuOptions');

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options);
    return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

const sequelize = new Sequelize(database.db, database.user, database.pwd, {
    host: database.host,
    dialect: 'mssql',
    port: database.port,
    dialectModule: tedious,
    dialectOptions: {
        useUTC: false,
        options: {
          cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
          }
        }
    },
    timezone: 'America/Guayaquil'
});

const MedikenUser = MedikenUserModel(sequelize, Sequelize);
const Beneficiario = BeneficiarioModel(sequelize, Sequelize);
const Broker = BrokerModel(sequelize, Sequelize);
const AfiliadoTitular = AfiliadoTitularModel(sequelize, Sequelize);
const SolicitudBeneficiario = SolicitudBeneficiarioModel(sequelize, Sequelize);
const Solicitud = SolicitudModel(sequelize, Sequelize);
const MenuOptions = MenuOptionsModel(sequelize, Sequelize);

const Models = { 
  sequelize
  , MedikenUser
  , Beneficiario
  , Broker
  , AfiliadoTitular
  , SolicitudBeneficiario
  , Solicitud
  , MenuOptions
  , Op
};

const connection = {};

module.exports = async () => {
  try {
    if (connection.isConnected) {
      console.log('=> Using existing connection.');
      return Models;
    }
  
    // await sequelize.sync()
    await sequelize.authenticate();
    connection.isConnected = true;
    console.log('=> Created a new connection.');
    return Models;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}