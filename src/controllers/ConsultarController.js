const Controller = {};

const {potenciaOptima, potenciaOptimaCompleta} = require("../models/CalculoModel");
const {solargisAPI} = require("../helpers/solargisApi")
const db = require("../helpers/database")
const validacion = require("../helpers/validatorConsultas")
//*************************************************************************************
//prueba
const arrayEsm = [
  131.7, 129.3, 146.5, 125.4, 127.3, 103.8, 105.8, 117.8, 121.7, 131.3, 96.3,
  112.8,
];
//*****************************************************************************************

Controller.calculate = async (req, res) => {
  const { tipoSector, direccion, area, tipoTecho, tipoMaterial, arrayConsumoMensual, poligonos, diasActividad, perfilUso } = req.body;
  
  const {isTipoSector,isDireccion,isArea,isTipoTecho,isTipoMaterial,isarrayConsumoMensual,isDiasActividad,isPerfilUso,allGood} = validacion.validateAll(req.body);
  console.log(allGood);

  var arrayEsmString = await solargisAPI(
    poligonos[0].puntos[0].lat,
    poligonos[0].puntos[0].lon
  );

  const arrayEsm = []
  arrayEsmString.forEach(element => arrayEsm.push(parseFloat(element)))
  console.log(arrayEsm)
  
  const calculate = potenciaOptima(
    area, 
    arrayConsumoMensual, 
    arrayEsm
  );
 
  //tipoSector, direccion, area, tipoTecho, tipoMaterial, arrayConsumoMensual, arrayCoordenadas, diasActividad, perfilUso, precioCompra, precioVenta, potenciaOptima, utilidadAnualMax, precio, arrayEsm, descuento, porcentajeUtil, densidadPotenciaPanel, kwpxp, precioPanel;

  const sqlInsert = "INSERT INTO Consultas (tipoSector, direccion, area, tipoTecho, tipoMaterial, arrayConsumoMensual, latitud, longitud, diasActividad, perfilUso, arrayEsm, potenciaOptima, precioPanel, netoAnualMax) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  
  if(!allGood){
    res.status(400).json({
      message: "Error en crear la consulta en la base de datos por un dato erroneo", esTipoSector: isTipoSector, esDireccion: isDireccion, esArea: isArea, esTipoTecho: isTipoTecho,esTipoMaterial: isTipoMaterial, esArrayConsumoMensual: isarrayConsumoMensual,esDiasdActividad: isDiasActividad,esPerfilUso: isPerfilUso,esTodoBien: allGood
    });
  }
  else{
    await db.query(sqlInsert,[tipoSector, direccion, area, tipoTecho, tipoMaterial, arrayConsumoMensual.join(" "), poligonos[0].puntos[0].lat, poligonos[0].puntos[0].lon, diasActividad, perfilUso, arrayEsm.join(" "), calculate[0], calculate[1], calculate[2]],(err, result) => {
      if (err){
        console.log(err)
        res.status(500).json({
          message: "Error en crear la consulta en la base de datos"
        });
      }
      else{
        res.status(200).json({
          message: "Consulta creada", potenciaOptima: calculate[0], precioPanel: calculate[1], netoAnualMax: calculate[2]
        });
      }
    }); 
  }
};

Controller.getAll = async (req, res) => {
  
  const sqlExists = "SELECT * from Consultas";

  await db.query(sqlExists, (err, result) => {
    console.log(result)
    if (result.length == 0) {
      // La base de datos esta vacia
      console.log("Esta vacia la base de datos")
    }

    if (err){
      res.status(500).json({
        message: "Eror en la base de datos"
      });
    }
    else{
      res.status(200).json({
        message: "Consulta creada", data: result
      });
    };
  });
}
   
module.exports = Controller;