paginafinal.com/api/consultar 

Se conecta por el metodo de post y envia la siguiente informacion:

potenciaOptima: Potencia óptima a instalar.
netoAnualMax: Almacena la generación máxima de energía teniendo en cuenta el ahorro por 
              autoconsumo y la pérdida por exceso mensual.

{
    "Front-a-Back": {
        "tipoSector": "string",
        "direccion": "string",
        "area": "double; metros",
        "tipoTecho": "string",
        "tipoMaterial": "string",
        "poligonos": [
            {
                "area": "double; metros",
                "puntos": [
                    {
                        "lat": "double",
                        "lon": "double"
                    },
                    {
                        "lat": "double",
                        "lon": "double"
                    }
                ]
            },
            {
                "area": "double; metros",
                "puntos": [
                    {
                        "lat": "double",
                        "lon": "double"
                    },
                    {
                        "lat": "double",
                        "lon": "double"
                    }
                ]
            }
        ],
        "arrayConsumoMensual": "double",
        "diasActividad": "integer",
        "perfilUso": "string"
    },
    "Back-a-Front": {
        "potenciaOptima": "double", 
        "precioPanel": "double", 
        "netoAnualMax": "double"
    }
}

Error al ingresar un dato (400): "Error en crear la consulta en la base de datos por un dato erroneo"
Error al crear la consulta en la base de datos (500): "Error en crear la consulta en la base de datos"
Consulta creada (200): "Consulta creada" 
