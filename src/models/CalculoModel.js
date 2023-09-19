/*
potenciaOptima: Potencia óptima a instalar.
netoAnualMax: Almacena la generación máxima de energía teniendo en cuenta el ahorro por 
              autoconsumo y la pérdida por exceso mensual.
netoAnual: Almacena la generación de energía teniendo en cuenta el ahorro por autoconsumo 
            y la pérdida por exceso mensual.
genEsperada: Generación esperada de energía mensual según consumo mensual.
autoconsumo: Porcentaje de la energía generada que se aprovecha.
excedente: Porcentaje de la energía generada que sobra.
ahorroAutoconsumo: Ahorro estimado por uso de páneles solares.
perdidaExceso: Pérdida estimada por generación extra de energía.

potenciaOptima:
  Entradas: 
    consumo: Array bidimensional con el número del mes y su consumo correspondiente
    esm: Array unidimensional con valores propocionales a la irradiación solar por cada mes.
  Salidas:
    potenciaOptima.
*/

exports.potenciaOptima = function(area, consumo, esm) {
    const porcentajeUtil = 0.8;
    const desidadPotenciaPanel = 0.2;
    const precioPanel = 50000;

    const factorAhorro = 0.33; //Proporción entre la generación y el ahorro
    const factorPerdida = 0.8; //Proporción entre el exceso de energía generado y la pérdida
    const limiteLegal = 100; //?
    const factorSobredimensionamiento = 0.3; //?

    const kwpMax = area * porcentajeUtil * desidadPotenciaPanel;

    var potenciaOptima = 0;
    var netoAnualMax = 0;
    for (let kwp = 1; kwp < kwpMax; kwp++) {
      var netoAnual = 0;
      consumo.forEach((consumo) => {
        var consumoActual = consumo[1];
        if (kwp > limiteLegal * (factorSobredimensionamiento + 1)) {
          consumoActual *= 0.66;
        }
        var genEsperada = kwp * esm[consumo[0]];
        var autoconsumo = genEsperada > consumoActual ? consumoActual / genEsperada : 1;
        var excedente = 1 - autoconsumo;
        var ahorroAutoconsumo = autoconsumo * factorAhorro * genEsperada;
        var perdidaExceso = genEsperada * factorPerdida * excedente;
        netoAnual += ahorroAutoconsumo - perdidaExceso;
      });
      if (netoAnual > netoAnualMax) {
        potenciaOptima = kwp;
        netoAnualMax = netoAnual;
      }
    }
    return [potenciaOptima, precioPanel, netoAnualMax];
};