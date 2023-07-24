const connectToDatabase = require("../helpers/db");

module.exports = {
    getUser
};

async function getUser(data) {
    const { MedikenUser, Beneficiario, Broker } = await connectToDatabase();
    try {
        var user = await MedikenUser.findOne({
            where: {
                usuario: data.usuario,
                clave: data.clave
            },
            attributes: {
                exclude: ['clave']
            }
        });
        if (user) {
            user.dataValues.tipoUsuario = "Mediken"
        }
        else {
            user = await Beneficiario.findOne({
               where: {
                    usuario: data.usuario,
                    clave: data.clave
                },
                attributes: {
                    exclude: ['clave']
                }
            });
            if (user) {
                user.dataValues.tipoUsuario = "Beneficiario"
            } else {
                user = await Broker.findOne({
                    where: {
                         usuario: data.usuario,
                         clave: data.clave
                     },
                     attributes: {
                         exclude: ['clave']
                     }
                 });
                if (user) {
                    user.dataValues.tipoUsuario = "Broker"
                }
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    if (user === null) {
        throw error;
    }
    return user;
}