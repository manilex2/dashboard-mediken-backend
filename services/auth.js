const connectToDatabase = require("../helpers/db");
const { DateTime } = require("luxon");
const { init, smtp2go } = require("../helpers/keys");
const bcrypt = require("bcrypt");
const crypto = require("crypto-js");
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');

module.exports = {
    getUser,
    resetPassword,
    changePasswordReset
};

async function getUser(data) {
    const { MedikenUser, Beneficiario, Broker, AfiliadoTitular, Op } = await connectToDatabase();
    try {
        var user = await MedikenUser.findOne({
            where: {
                [Op.or]: [
                    { usuario: data.usuario },
                    { codigoUsuario: data.usuario }
                ]
            }
        });
        if (user) {
            let passwordMatch = await comparePasswords(
                data.clave.trim(),
                user.dataValues.clave.trim(),
            );
            if (!passwordMatch && data.noNewPass) {
                passwordMatch = true;
            }
            if (passwordMatch) {
                // TODO: Eliminar asignacion de codigoUsuario como usuario
                user.dataValues.usuario = user.dataValues.usuario
                  ? user.dataValues.usuario.trim()
                  : user.dataValues.codigoUsuario.trim();
                delete user.dataValues.clave;
                delete user.dataValues.img;
                user.dataValues.email = user.dataValues.email
                  ? user.dataValues.email.trim()
                  : null;
                user.dataValues.tipoUsuario = 'Mediken';
                return user;
            } else {
                throw new Error(
                  'Usuario no autorizado. Verifique usuario y contraseña'
                );
            }
        }
        else {
            user = await Broker.findOne({
                where: {
                    [Op.or]: [
                        { usuario: data.usuario },
                        { codigoBrokerComp: data.usuario },
                    ],
                 }
             });
            if (user) {
                let passwordMatch = await comparePasswords(
                    data.clave.trim(),
                    user.dataValues.clave.trim(),
                );
                if (!passwordMatch && data.noNewPass) {
                    passwordMatch = true;
                }
                if (passwordMatch) {
                    // TODO: Eliminar asignacion de codigoBrokerComp como usuario
                    user.dataValues.usuario = user.dataValues.usuario
                      ? user.dataValues.usuario.trim()
                      : user.dataValues.codigoBrokerComp.trim();
                    delete user.dataValues.clave;
                    delete user.dataValues.img;
                    user.dataValues.email = user.dataValues.email
                      ? user.dataValues.email.trim()
                      : null;
                    user.dataValues.tipoUsuario = 'Broker';
                    return user;
                } else {
                    throw new Error(
                      'Usuario no autorizado. Verifique usuario y contraseña'
                    );
                }
            } else {
                user = await AfiliadoTitular.findOne({
                    where: {
                      usuario: data.usuario,
                    },
                });
                if (user) {
                    let passwordMatch = await comparePasswords(
                        data.clave.trim(),
                        user.dataValues.clave.trim(),
                    );
                    if (!passwordMatch && data.noNewPass) {
                        passwordMatch = true;
                    }
                    if (passwordMatch) {
                        user.dataValues.usuario = user.dataValues.usuario.trim();
                        delete user.dataValues.clave;
                        delete user.dataValues.img;
                        user.dataValues.tipoUsuario = 'AfiliadoTitular';
                        user.dataValues.email = user.dataValues.email
                            ? user.dataValues.email.trim()
                            : null;
                        return user;
                    } else {
                        throw new Error(
                            'Usuario no autorizado. Verifique usuario y contraseña'
                        );
                    }
                } else {
                    user = await Beneficiario.findOne({
                        where: {
                          usuario: data.usuario,
                        },
                    });
                    if (user) {
                        let passwordMatch = await comparePasswords(
                            data.clave.trim(),
                            user.dataValues.clave.trim(),
                        );
                        if (!passwordMatch && data.noNewPass) {
                            passwordMatch = true;
                        }
                        if (passwordMatch) {
                            user.dataValues.usuario = user.dataValues.usuario.trim();
                            delete user.dataValues.clave;
                            delete user.dataValues.img;
                            user.dataValues.tipoUsuario = 'Beneficiario';
                            user.dataValues.email = user.dataValues.email
                            ? user.dataValues.email.trim()
                            : null;
                            return user;
                        } else {
                            throw new Error(
                                'Usuario no autorizado. Verifique usuario y contraseña'
                            );
                        }
                    } else {
                        throw new Error(
                            'Usuario no autorizado. Verifique usuario y contraseña'
                        );
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function resetPassword(data) {
    const { MedikenUser, Beneficiario, Broker, AfiliadoTitular, Op } = await connectToDatabase();
    let user;
    let token;
    try {
      user = await MedikenUser.findOne({
        where: {
          [Op.or]: [{ usuario: data.email }, { email: data.email }],
        },
        attributes: [
          ['Dsusuemail', 'email'],
          ['Dsusucod', 'codigoUsuario'],
          ['Dsusuide', 'usuario'],
        ],
      });
      if (user) {
        if (!user.dataValues.email) {
          throw new Error(
            'Lo siento, no hay un email asociado a este usuario, por favor contacte al administrador.'
          );
        }
        token = await generateToken();
        user.tokenReset = token;
        user.tokenResetDate = DateTime.now()
          .setLocale('es-ec')
          .toISO({ includeOffset: false });
        user = await user.save();
      } else {
        user = await Broker.findOne({
          where: {
            [Op.or]: [{ usuario: data.email }, { email: data.email }],
          },
          attributes: [
            ['dsvcema', 'email'],
            ['dsvccod', 'codigoBrokerComp'],
            ['dsvcide', 'usuario'],
          ],
        });
        if (user) {
          if (!user.dataValues.email) {
            throw new Error(
              'Lo siento, no hay un email asociado a este usuario, por favor contacte al administrador.'
            );
          }
          token = await generateToken();
          user.tokenReset = token;
          user.tokenResetDate = user.tokenResetDate = DateTime.now()
            .setLocale('es-ec')
            .toISO({ includeOffset: false });
          user = await user.save();
        } else {
          user = await AfiliadoTitular.findOne({
            where: {
              [Op.or]: [{ usuario: data.email }, { email: data.email }],
            },
            attributes: [
              ['ClRgFema', 'email'],
              ['ClRgide', 'usuario'],
              ['ClRgcnt', 'contrato'],
              ['ClRgcnsc', 'secuencial'],
            ],
          });
          if (user) {
            if (!user.dataValues.email) {
              throw new Error(
                'Lo siento, no hay un email asociado a este usuario, por favor contacte al administrador.'
              );
            }
            token = await generateToken();
            user.tokenReset = token;
            user.tokenResetDate = DateTime.now()
              .setLocale('es-ec')
              .toISO({ includeOffset: false });
            user = await user.save();
          } else {
            user = await Beneficiario.findOne({
              where: {
                [Op.or]: [{ usuario: data.email }, { email: data.email }],
              },
              attributes: [
                ['beveema', 'email'],
                ['beveIde', 'usuario'],
              ],
            });
            if (user) {
              if (!user.dataValues.email) {
                throw new Error(
                  'Lo siento, no hay un email asociado a este usuario, por favor contacte al administrador.'
                );
              }
              token = await generateToken();
              user.tokenReset = token;
              user.tokenResetDate = DateTime.now()
                .setLocale('es-ec')
                .toISO({ includeOffset: false });
              user = await user.save();
            } else {
              throw new Error(
                'Email o Usuario no existe. Verifique su email o usuario e intente de nuevo o ponganse en contacto con el administrador'
              );
            }
          }
        }
      }
      
      const config = {
        host: smtp2go.server,
        port: smtp2go.port,
        auth: {
          user: smtp2go.username,
          pass: smtp2go.password
        }
      };
      const transporter = nodemailer.createTransport(config);
      transporter.use('compile', hbs({
        viewEngine: {
          extname: ".hbs",
          layoutsDir: 'views/layouts',
          defaultLayout: 'main',

        },
        viewPath: `views`,
        extName: ".hbs"
      }));

      //TEST ONLY
      /* user = {
        datavalues: {
          email: 'manilex2@gmail.com',
          usuario: '00001',
          token: ''
        }
      }; */

      const message = {
        from: `"NOREPLY MEDIKEN" <${smtp2go.emailServer}>`,
        to: user.dataValues.email? user.dataValues.email.trim() : "",
        subject: 'SOLICITUD DE RESETEO DE CONTRASEÑA',
        template: user.dataValues.email.includes('@gmail.com') ? 'index' : 'index-plain',
        context: {
          email: user.dataValues.email? user.dataValues.email.trim() : "",
          urlPwd: `${init.origin_url}/dashboard`,
          token: user.dataValues.tokenReset? user.dataValues.tokenReset.trim() : "",
          usuario: user.dataValues.usuario? user.dataValues.usuario.trim() : "",
        },
        attachments: [
          {
            filename: 'mediken.png',
            path: `${process.cwd()}/src/assets/mediken.png`,
            cid: 'mediken',
          },
        ],
      }

      const res = await transporter
        .sendMail(message)
        .then((success) => {
          return success;
        })
        .catch((err) => {
          console.error(err);
          throw new Error(err.message);
        });
      return {
        status: 200,
        message: 'Se envió un correo para el reseteo de contraseña',
      };
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
}

async function changePasswordReset(data) {
    const { MedikenUser, Beneficiario, Broker, AfiliadoTitular, Op } = await connectToDatabase();
    let user;
    let claveHash;
    try {
      user = await MedikenUser.findOne({
        where: {
          tokenReset: data.token,
          [Op.or]: [{ usuario: data.usuario }, { email: data.email }],
        },
        attributes: {
          exclude: ['Dsusuimg'],
        },
      });
      if (user) {
        const initDate = DateTime.fromJSDate(
          user.dataValues.tokenResetDate,
        ).setZone('UTC');
        const expireDate = DateTime.now().setZone('UTC', {
          keepLocalTime: true,
        });
        if (expireDate.diff(initDate, ['minutes']).toObject().minutes <= 60) {
          claveHash = await hashPassword(data.nuevaClave);
          user.clave = claveHash;
          user.tokenReset = null;
          user.tokenResetDate = null;
          if (!user.dataValues.notifChangePass1) {
            user.notifChangePass1 = true;
          }
          if (!user.dataValues.notifChangePass2) {
            user.notifChangePass2 = true;
          }
          if (!user.dataValues.notifChangePass3) {
            user.notifChangePass3 = true;
          }
          if (!user.dataValues.notifChangePassDate1) {
            user.notifChangePassDate1 = DateTime.now().toISO({
              includeOffset: false,
            });
          }
          if (!user.dataValues.notifChangePassDate2) {
            user.notifChangePassDate2 = DateTime.now().toISO({
              includeOffset: false,
            });
          }
          if (!user.dataValues.notifChangePassDate3) {
            user.notifChangePassDate3 = DateTime.now().toISO({
              includeOffset: false,
            });
          }
          user = await user.save();
          return {
            status: 200,
            message: 'Contraseña cambiada exitosamente',
          };
        } else {
          throw new Error(
            'Su token expiró. Debe reestablecer su contraseña nuevamente.'
          );
        }
      } else {
        user = await Broker.findOne({
          where: {
            tokenReset: data.token,
            [Op.or]: [{ usuario: data.usuario }, { email: data.email }],
          },
          attributes: {
            exclude: ['dsvcimg'],
          },
        });
        if (user) {
          const initDate = DateTime.fromJSDate(
            user.dataValues.tokenResetDate,
          ).setZone('UTC');
          const expireDate = DateTime.now().setZone('UTC', {
            keepLocalTime: true,
          });
          if (expireDate.diff(initDate, ['minutes']).toObject().minutes <= 60) {
            claveHash = await hashPassword(data.nuevaClave);
            user.clave = claveHash;
            user.tokenReset = null;
            user.tokenResetDate = null;
            if (!user.dataValues.notifChangePass1) {
              user.notifChangePass1 = true;
            }
            if (!user.dataValues.notifChangePass2) {
              user.notifChangePass2 = true;
            }
            if (!user.dataValues.notifChangePass3) {
              user.notifChangePass3 = true;
            }
            if (!user.dataValues.notifChangePassDate1) {
              user.notifChangePassDate1 = DateTime.now().toISO({
                includeOffset: false,
              });
            }
            if (!user.dataValues.notifChangePassDate2) {
              user.notifChangePassDate2 = DateTime.now().toISO({
                includeOffset: false,
              });
            }
            if (!user.dataValues.notifChangePassDate3) {
              user.notifChangePassDate3 = DateTime.now().toISO({
                includeOffset: false,
              });
            }
            user = await user.save();
            return {
              status: 200,
              message: 'Contraseña cambiada exitosamente',
            };
          } else {
            throw new Error(
              'Su token expiró. Debe reestablecer su contraseña nuevamente.'
            );
          }
        } else {
          user = await AfiliadoTitular.findOne({
            where: {
              tokenReset: data.token,
              [Op.or]: [{ usuario: data.usuario }, { email: data.email }],
            },
            attributes: {
              exclude: ['Afiimg'],
            },
          });
          if (user) {
            const initDate = DateTime.fromJSDate(
              user.dataValues.tokenResetDate,
            ).setZone('UTC');
            const expireDate = DateTime.now().setZone('UTC', {
              keepLocalTime: true,
            });
            if (
              expireDate.diff(initDate, ['minutes']).toObject().minutes <= 60
            ) {
              claveHash = await hashPassword(data.nuevaClave);
              user.clave = claveHash;
              user.tokenReset = null;
              user.tokenResetDate = null;
              if (!user.dataValues.notifChangePass1) {
                user.notifChangePass1 = true;
              }
              if (!user.dataValues.notifChangePass2) {
                user.notifChangePass2 = true;
              }
              if (!user.dataValues.notifChangePass3) {
                user.notifChangePass3 = true;
              }
              if (!user.dataValues.notifChangePassDate1) {
                user.notifChangePassDate1 = DateTime.now().toISO({
                  includeOffset: false,
                });
              }
              if (!user.dataValues.notifChangePassDate2) {
                user.notifChangePassDate2 = DateTime.now().toISO({
                  includeOffset: false,
                });
              }
              if (!user.dataValues.notifChangePassDate3) {
                user.notifChangePassDate3 = DateTime.now().toISO({
                  includeOffset: false,
                });
              }
              user = await user.save();
              return {
                status: 200,
                message: 'Contraseña cambiada exitosamente',
              };
            } else {
              throw new Error(
                'Su token expiró. Debe reestablecer su contraseña nuevamente.'
              );
            }
          } else {
            user = await Beneficiario.findOne({
              where: {
                tokenReset: data.token,
                [Op.or]: [{ usuario: data.usuario }, { email: data.email }],
              },
              attributes: {
                exclude: ['beveimg'],
              },
            });
            if (user) {
              const initDate = DateTime.fromJSDate(
                user.dataValues.tokenResetDate,
              ).setZone('UTC');
              const expireDate = DateTime.now().setZone('UTC', {
                keepLocalTime: true,
              });
              if (
                expireDate.diff(initDate, ['minutes']).toObject().minutes <= 60
              ) {
                claveHash = await hashPassword(data.nuevaClave);
                user.clave = claveHash;
                user.tokenReset = null;
                user.tokenResetDate = null;
                if (!user.dataValues.notifChangePass1) {
                  user.notifChangePass1 = true;
                }
                if (!user.dataValues.notifChangePass2) {
                  user.notifChangePass2 = true;
                }
                if (!user.dataValues.notifChangePass3) {
                  user.notifChangePass3 = true;
                }
                if (!user.dataValues.notifChangePassDate1) {
                  user.notifChangePassDate1 = DateTime.now().toISO({
                    includeOffset: false,
                  });
                }
                if (!user.dataValues.notifChangePassDate2) {
                  user.notifChangePassDate2 = DateTime.now().toISO({
                    includeOffset: false,
                  });
                }
                if (!user.dataValues.notifChangePassDate3) {
                  user.notifChangePassDate3 = DateTime.now().toISO({
                    includeOffset: false,
                  });
                }
                user = await user.save();
                return {
                  status: 200,
                  message: 'Contraseña cambiada exitosamente',
                };
              } else {
                throw new Error(
                  'Su token expiró. Debe reestablecer su contraseña nuevamente.'
                );
              }
            } else {
              throw new Error(
                'Token ya utilizado. Debe reestablecer nuevamente la contraseña dandole a ¿Olvide mi contraseña?'
              );
            }
          }
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
}


async function comparePasswords(
  plainTextPassword,
  hashedPassword,
) {
  // Verificar si la contraseña almacenada está hasheada

  const isHashed = /^\$2[ayb]\$[0-9]{2}\$.{53}$/.test(hashedPassword);

  if (!isHashed) {
    // La contraseña almacenada no está hasheada, realizar una comparación directa
    return plainTextPassword.toString() === hashedPassword.toString();
  }

  // La contraseña almacenada está hasheada, utilizar bcrypt para compararlas
  return bcrypt.compare(plainTextPassword, hashedPassword);
}

async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function generateToken(length = 256) {
  const randomBytes = crypto.lib.WordArray.random(length / 2);
  const timestampBytes = crypto.lib.WordArray.create([Date.now()]);
  const combinedBytes = randomBytes.concat(timestampBytes);
  const hash = crypto.SHA256(combinedBytes).toString(crypto.enc.Hex);
  return hash.slice(0, length);
}
