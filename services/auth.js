const connectToDatabase = require("../helpers/db");

module.exports = {
    getUser
};

async function getUser(data) {
    const { MedikenUser, Beneficiario } = await connectToDatabase();
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