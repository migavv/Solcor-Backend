const v = require('validator')

module.exports = class validatorConsultas{

    static validateAll(consulta){
        const { tipoSector, direccion, area, tipoTecho, tipoMaterial, arrayConsumoMensual, poligonos, diasActividad, perfilUso } = consulta;
        const isTipoSector = this.isAlpha(tipoSector)
        const isDireccion = this.isAlpha(direccion)
        const isArea = this.isNumeric(area)
        const isTipoTecho = this.isAlpha(tipoTecho)
        const isTipoMaterial = this.isAlpha(tipoMaterial)
        const isarrayConsumoMensual = this.isArray(arrayConsumoMensual)
        const isDiasActividad = this.isNumeric(diasActividad)
        const isPerfilUso = this.isAlpha(perfilUso)

        const allGood = (
            isTipoSector &&
            isDireccion &&
            isArea &&
            isTipoTecho &&
            isTipoMaterial &&
            isarrayConsumoMensual &&
            isDiasActividad &&
            isPerfilUso
        )?true:false

        return{
            isTipoSector,
            isDireccion,
            isArea,
            isTipoTecho,
            isTipoMaterial,
            isarrayConsumoMensual,
            isDiasActividad,
            isPerfilUso,
            allGood:allGood
        }
    }

    static isAlpha(data){
        var aprobado = (typeof data === "string" && v.isLength(data, 0, 100))
        if(!aprobado) console.log(' fallando aqui con '+ data)
        return aprobado
    }

    static isNumeric(data){
        var aprobado = (v.isFloat(data.toString()))
        if(!aprobado) console.log(' fallando aqui con '+ data)
        return aprobado
    }

    static isArray(data){
        return true
    }
}

/* export default validatorConsultas */
