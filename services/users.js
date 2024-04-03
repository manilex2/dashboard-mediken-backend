const connectToDatabase = require("../helpers/db");
const { DateTime } = require("luxon");
const bcrypt = require("bcrypt");

module.exports = {
    updatePassword,
    updateFirstLogin,
    updateProfileImg,
    getProfileImg,
    getContratos,
    updatePassNotif
};

async function updatePassword(id, data) {
  const { MedikenUser, Beneficiario, Broker, AfiliadoTitular, Op } = await connectToDatabase();
    let user;
    let claveHash;
    try {
      user = await MedikenUser.findOne({
        where: {
          [Op.or]: [{ usuario: id }, { codigoUsuario: id }],
        },
      });
      if (user) {
        claveHash = await hashPassword(data.clave);
        user.clave = claveHash;
        if (data.email && data.email != user.dataValues.email) {
          user.email = data.email;
        }
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
        user = await Broker.findOne({
          where: {
            [Op.or]: [{ usuario: id }, { codigoBrokerComp: id }],
          },
        });
        if (user) {
          claveHash = await hashPassword(data.clave);
          user.clave = claveHash;
          if (data.email && data.email != user.dataValues.email) {
            user.email = data.email;
          }
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
          user = await AfiliadoTitular.findOne({
            where: {
              usuario: id,
            },
          });
          if (user) {
            claveHash = await hashPassword(data.clave);
            user.clave = claveHash;
            if (data.email && data.email != user.dataValues.email) {
              user.email = data.email;
            }
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
            user = await Beneficiario.findOne({
              where: {
                usuario: id,
              },
            });
            if (user) {
              claveHash = await hashPassword(data.clave);
              user.clave = claveHash;
              if (data.email && data.email != user.dataValues.email) {
                user.email = data.email;
              }
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
                'Usuario no autorizado. Verifique usuario y contraseña'
              );
            }
          }
        }
      }
    } catch (error) {
      throw new Error(
        'Usuario no autorizado. Verifique usuario y contraseña'
      );
    }
}

async function updateFirstLogin(id, data) {
    const { MedikenUser, Beneficiario, Broker, AfiliadoTitular, Op } = await connectToDatabase();
    let user;
    let claveHash;
    try {
      user = await MedikenUser.findOne({
        where: {
          [Op.or]: [{ usuario: id }, { codigoUsuario: id }],
        },
      });
      if (user) {
        user.usuario = data.nuevoUsuario;
        user.email = data.email;
        if (data.clave) {
          claveHash = await hashPassword(data.clave);
          user.clave = claveHash;
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
        }
        if (data.img) {
          user.img = data.img;
        }
        user.firstLogin = false;
        user = await user.save();
        delete user.dataValues.clave;
        delete user.dataValues.img;
        return user;
      } else {
        user = await Broker.findOne({
          where: {
            [Op.or]: [{ usuario: id }, { codigoBrokerComp: id }],
          },
        });
        if (user) {
          user.usuario = data.nuevoUsuario;
          user.email = data.email;
          if (data.clave) {
            claveHash = await hashPassword(data.clave);
            user.clave = claveHash;
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
          }
          if (data.img) {
            user.img = data.img;
          }
          user.firstLogin = false;
          user = await user.save();
          delete user.dataValues.clave;
          delete user.dataValues.img;
          return user;
        } else {
          user = await AfiliadoTitular.findOne({
            where: {
              usuario: id,
            },
          });
          if (user) {
            user.usuario = data.nuevoUsuario;
            user.email = data.email;
            if (data.clave) {
              claveHash = await hashPassword(data.clave);
              user.clave = claveHash;
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
            }
            if (data.img) {
              user.img = data.img;
            }
            user.firstLogin = false;
            user = await user.save();
            delete user.dataValues.clave;
            delete user.dataValues.img;
            return user;
          } else {
            user = await Beneficiario.findOne({
              where: {
                usuario: id,
              },
            });
            if (user) {
              user.usuario = data.nuevoUsuario;
              user.email = data.email;
              if (data.clave) {
                claveHash = await hashPassword(data.clave);
                user.clave = claveHash;
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
              }
              if (data.img) {
                user.img = data.img;
              }
              user.firstLogin = false;
              user = await user.save();
              delete user.dataValues.clave;
              delete user.dataValues.img;
              return user;
            } else {
              throw new Error(
                'Usuario no autorizado. Verifique usuario y contraseña'
              );
            }
          }
        }
      }
    } catch (error) {
      throw new Error(
        'Usuario no autorizado. Verifique usuario y contraseña'
      );
    }
}

async function updatePassNotif(id) {
  const { MedikenUser, Beneficiario, Broker, AfiliadoTitular, Op } = await connectToDatabase();
  let user;
  try {
    user = await MedikenUser.findOne({
      where: {
        [Op.or]: [{ usuario: id }, { codigoUsuario: id }],
      },
    });
    if (user) {
      if (!user.dataValues.notifChangePass1) {
        user.notifChangePass1 = true;
        user.notifChangePassDate1 = DateTime.now().toISO({
          includeOffset: false,
        });
        user.notifChangePassDate2 =  DateTime.now().plus({ days: 7 }).toISO({
          includeOffset: false,
        });
        user.notifChangePassDate3 =  DateTime.now().plus({ days: 14 }).toISO({
          includeOffset: false,
        });
      } else if (!user.dataValues.notifChangePass2 && user.dataValues.notifChangePass1) {
        user.notifChangePass2 = true;
      }
      user = await user.save();
      delete user.dataValues.clave;
      delete user.dataValues.img;
      return user;
    } else {
      user = await Broker.findOne({
        where: {
          [Op.or]: [{ usuario: id }, { codigoBrokerComp: id }],
        },
      });
      if (user) {
        if (!user.dataValues.notifChangePass1) {
          user.notifChangePass1 = true;
          user.notifChangePassDate1 = DateTime.now().toISO({
            includeOffset: false,
          });
          user.notifChangePassDate2 =  DateTime.now().plus({ days: 7 }).toISO({
            includeOffset: false,
          });
          user.notifChangePassDate3 =  DateTime.now().plus({ days: 14 }).toISO({
            includeOffset: false,
          });
        } else if (!user.dataValues.notifChangePass2 && user.dataValues.notifChangePass1) {
          user.notifChangePass2 = true;
        }
        user = await user.save();
        delete user.dataValues.clave;
        delete user.dataValues.img;
        return user;
      } else {
        user = await AfiliadoTitular.findOne({
          where: {
            usuario: id,
          },
        });
        if (user) {
          if (!user.dataValues.notifChangePass1) {
            user.notifChangePass1 = true;
            user.notifChangePassDate1 = DateTime.now().toISO({
              includeOffset: false,
            });
            user.notifChangePassDate2 =  DateTime.now().plus({ days: 7 }).toISO({
              includeOffset: false,
            });
            user.notifChangePassDate3 =  DateTime.now().plus({ days: 14 }).toISO({
              includeOffset: false,
            });
          } else if (!user.dataValues.notifChangePass2 && user.dataValues.notifChangePass1) {
            user.notifChangePass2 = true;
          }
          user = await user.save();
          delete user.dataValues.clave;
          delete user.dataValues.img;
          return user;
        } else {
          user = await Beneficiario.findOne({
            where: {
              usuario: id,
            },
          });
          if (user) {
            if (!user.dataValues.notifChangePass1) {
              user.notifChangePass1 = true;
              user.notifChangePassDate1 = DateTime.now().toISO({
                includeOffset: false,
              });
              user.notifChangePassDate2 =  DateTime.now().plus({ days: 7 }).toISO({
                includeOffset: false,
              });
              user.notifChangePassDate3 =  DateTime.now().plus({ days: 14 }).toISO({
                includeOffset: false,
              });
            } else if (!user.dataValues.notifChangePass2 && user.dataValues.notifChangePass1) {
              user.notifChangePass2 = true;
            }
            user = await user.save();
            delete user.dataValues.clave;
            delete user.dataValues.img;
            return user;
          } else {
            throw new Error(
              'Usuario no autorizado. Verifique usuario y contraseña'
            );
          }
        }
      }
    }
  } catch (error) {
    throw new Error(
      'Usuario no autorizado. Verifique usuario y contraseña'
    );
  }
}

async function updateProfileImg(id, data) {
    const { MedikenUser, Beneficiario, Broker, AfiliadoTitular, Op } = await connectToDatabase();
    let user;
    try {
      user = await MedikenUser.findOne({
        where: {
          [Op.or]: [{ usuario: id }, { codigoUsuario: id }],
        },
      });
      if (user) {
        user.img = data;
        user = await user.save();
        const imgBuffer = user.dataValues.img;
        const imgBase64 = imgBuffer.toString('base64');
        return {
          img: imgBase64,
        };
      } else {
        user = await Broker.findOne({
          where: {
            [Op.or]: [{ usuario: id }, { codigoBrokerComp: id }],
          },
        });
        if (user) {
          user.img = data;
          user = await user.save();
          const imgBuffer = user.dataValues.img;
          const imgBase64 = imgBuffer.toString('base64');
          return {
            img: imgBase64,
          };
        } else {
          user = await AfiliadoTitular.findOne({
            where: {
              usuario: id,
            },
          });
          if (user) {
            user.img = data;
            user = await user.save();
            const imgBuffer = user.dataValues.img;
            const imgBase64 = imgBuffer.toString('base64');
            return {
              img: imgBase64,
            };
          } else {
            user = await Beneficiario.findOne({
              where: {
                usuario: id,
              },
            });
            if (user) {
              user.img = data;
              user = await user.save();
              const imgBuffer = user.dataValues.img;
              const imgBase64 = imgBuffer.toString('base64');
              return {
                img: imgBase64,
              };
            } else {
              throw new Error(
                `No se pudo actualizar la imágen, por favor verifique`
              );
            }
          }
        }
      }
    } catch (error) {
      throw new Error(
        `No se pudo actualizar la imágen, por favor verifique: ${error}`
      );
    }
}

async function getProfileImg(id) {
    const { MedikenUser, Beneficiario, Broker, AfiliadoTitular, Op } = await connectToDatabase();
    let user;
    try {
      user = await MedikenUser.findOne({
        where: {
          [Op.or]: [{ usuario: id }, { codigoUsuario: id }],
        },
      });
      if (user && (await user).dataValues.img) {
        const imgBuffer = (await user).dataValues.img;
        const imgBase64 = imgBuffer.toString('base64');
        return {
          img: imgBase64,
        };
      } else {
        user = await Broker.findOne({
          where: {
            [Op.or]: [{ usuario: id }, { codigoBrokerComp: id }],
          },
        });
        if (user && (await user).dataValues.img) {
          const imgBuffer = (await user).dataValues.img;
          const imgBase64 = imgBuffer.toString('base64');
          return {
            img: imgBase64,
          };
        } else {
          user = await AfiliadoTitular.findOne({
            where: {
              usuario: id,
            },
          });
          if (user && (await user).dataValues.img) {
            const imgBuffer = (await user).dataValues.img;
            const imgBase64 = imgBuffer.toString('base64');
            return {
              img: imgBase64,
            };
          } else {
            user = await Beneficiario.findOne({
              where: {
                usuario: id,
              },
            });
            if (user && (await user).dataValues.img) {
              const imgBuffer = (await user).dataValues.img;
              const imgBase64 = imgBuffer.toString('base64');
              return {
                img: imgBase64,
              };
            } else {
              throw new Error(
                `No se pudo encontrar la imágen usuario, por favor verifique`
              );
            }
          }
        }
      }
    } catch (error) {
      throw new Error(
        `No se pudo encontrar la imágen para ese usuario, por favor verifique: ${error}`
      );
    }
}

async function getContratos(data) {
  const { Beneficiario, AfiliadoTitular, Solicitud, SolicitudBeneficiario, Op } = await connectToDatabase();
  let user;
  try {
    user = await AfiliadoTitular.findOne({
      where: {
        usuario: data.usuario,
      },
    });
    if (user) {
      user.dataValues.usuario = user.dataValues.usuario.trim();
      delete user.dataValues.clave;
      delete user.dataValues.img;
      user.dataValues.tipoUsuario = 'AfiliadoTitular';
      user.dataValues.email = user.dataValues.email
          ? user.dataValues.email.trim()
          : null;
      const contratos = await AfiliadoTitular.findAll({
          where: {
              usuario: data.usuario,
              [Op.not]: [
                { statusCliente: 'E' }
            ]
          },
          attributes: [
              ['ClRgcnt', 'contrato'],
              ['ClRgcnsc', 'secuencial'],
          ],
      });
      delete user.dataValues.contrato;
      user.dataValues.contratos = [];
      for (let i = 0; i < contratos.length; i++) {
          const contrato = contratos[i];
          const benef = await Beneficiario.findAll({
              where: {
                  contrato: contrato.contrato,
                  secuencialContrato: contrato.secuencial
              },
              attributes: [
                  ['beveIde', 'id'],
                  ['bevenom', 'nombres'],
                  ['beveape', 'apellidos'],
                  ['bevecnt', 'contrato'],
                  ['bevecntsec', 'secuencialContrato'],
                  ['bevebensec', 'secuencialBeneficiario'],
                  ['beveimg', 'img'],
              ],
          });
          for (let i = 0; i < benef.length; i++) {
            const element = benef[i];
            if(element.dataValues.img) {
              benef[i].dataValues.img = benef[i].dataValues.img.toString('base64');
            }
            const solBenef = await SolicitudBeneficiario.findOne({
              where: {
                secuencialSolicitud: element.dataValues.secuencialContrato,
                secuencialBeneficiario: element.dataValues.secuencialBeneficiario,
                apellidos: element.dataValues.apellidos.trim()
              },
              attributes: [
                ['DsSocod', 'solicitud']
              ]
            })
            benef[i].dataValues.solicitud = solBenef.dataValues.solicitud;
            const sol = await Solicitud.findOne({
              where: {
                solicitud: solBenef.dataValues.solicitud,
                secuencialSolicitud: element.dataValues.secuencialContrato
              },
              attributes: [
                ['DsSoFecRnv', 'fechaRenovacion']
              ]
            });
            benef[i].dataValues.fechaRenovacion = {
              mes: DateTime.fromJSDate(sol.dataValues.fechaRenovacion).month,
              anio: DateTime.fromJSDate(sol.dataValues.fechaRenovacion).year,
            };
          }
          user.dataValues.contratos.push({
              contrato: contrato.dataValues.contrato,
              secuencial: contrato.dataValues.secuencial,
              fechaRenovacion: {
                mes: benef[0].dataValues.fechaRenovacion.mes,
                anio: benef[0].dataValues.fechaRenovacion.anio
              },
              beneficiarios: benef
          });
      }
      return user.dataValues.contratos;
    } else {
      user = await Beneficiario.findOne({
        where: {
          usuario: data.usuario,
        },
        attributes: [
          ['beveIde', 'usuario'],
          ['bevenom', 'nombres'],
          ['beveape', 'apellidos'],
          ['bevecnt', 'contrato'],
          ['bevecntsec', 'secuencialContrato'],
          ['bevebensec', 'secuencialBeneficiario'],
          ['beveimg', 'img'],
      ],
      });
      if (user) {
        user.dataValues.usuario = user.dataValues.usuario.trim();
        user.dataValues.tipoUsuario = 'Beneficiario';
        user.dataValues.email = user.dataValues.email
            ? user.dataValues.email.trim()
            : null;
        const beneficiarios = [];
        const contratos = []
        beneficiarios.push(user);
        for (let i = 0; i < beneficiarios.length; i++) {
            const beneficiario = beneficiarios[i];
            if(beneficiario.dataValues.img) {
              beneficiarios[i].dataValues.img = beneficiarios[i].dataValues.img.toString('base64');
            }
            const solBenef = await SolicitudBeneficiario.findOne({
              where: {
                secuencialSolicitud: beneficiario.dataValues.secuencialContrato,
                secuencialBeneficiario: beneficiario.dataValues.secuencialBeneficiario,
                apellidos: beneficiario.dataValues.apellidos.trim()
              },
              attributes: [
                ['DsSocod', 'solicitud']
              ]
            })
            beneficiarios[i].dataValues.solicitud = solBenef.dataValues.solicitud;
            const sol = await Solicitud.findOne({
              where: {
                solicitud: solBenef.dataValues.solicitud,
                secuencialSolicitud: beneficiario.dataValues.secuencialContrato
              },
              attributes: [
                ['DsSoFecRnv', 'fechaRenovacion']
              ]
            });
            beneficiarios[i].dataValues.fechaRenovacion = {
              mes: DateTime.fromJSDate(sol.dataValues.fechaRenovacion).month,
              anio: DateTime.fromJSDate(sol.dataValues.fechaRenovacion).year,
            };
            contratos.push({
                contrato: beneficiario.dataValues.contrato,
                secuencial: beneficiario.dataValues.secuencialContrato,
                fechaRenovacion: {
                  mes: beneficiarios[0].dataValues.fechaRenovacion.mes,
                  anio: beneficiarios[0].dataValues.fechaRenovacion.anio
                },
                beneficiarios: beneficiarios
            });
        }
        return contratos;
      } else {
        throw new Error(
          'Usuario no autorizado. Verifique usuario y contraseña'
        );
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error(
      `No se pudo encontrar el contrato para ese usuario, por favor verifique: ${error}`
    );
  }
}

async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}