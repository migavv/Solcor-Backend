# API de Gestión de Clientes Solcor y Estimación de Precios de Instalación Solar

Este proyecto consiste en una API REST desarrollada en Node.js para Solcor, una empresa especializada en la instalación de paneles solares. La API permite a Solcor gestionar eficazmente los datos de sus clientes y proporciona estimaciones precisas de precios de instalación de sistemas solares personalizados. Además, se integra con una base de datos MySQL para un almacenamiento seguro y confiable de la información del cliente.

## Características Clave

- **Gestión de Clientes**: La API permite a Solcor registrar y mantener registros actualizados de sus clientes, incluyendo información personal y detalles específicos de sus requerimientos de instalación.

- **Estimación de Precios Personalizada**: Utilizando los datos del cliente y los parámetros de instalación, la API genera estimaciones de precios altamente precisas para proyectos de paneles solares, lo que facilita la toma de decisiones informadas.

- **Integración con MySQL**: La API se conecta de manera eficiente con una base de datos MySQL para el almacenamiento de datos de clientes y registros de estimaciones, garantizando la seguridad y la disponibilidad de los datos.

- **Consulta Avanzada**: La API ofrece una funcionalidad adicional al permitir a Solcor realizar consultas avanzadas para determinar la potencia óptima a instalar y la generación máxima de energía. Estos cálculos se basan en factores como el tipo de sector, la ubicación, el tipo de techo, el material utilizado y otros parámetros relevantes.

## Uso de la Funcionalidad Avanzada

Solcor puede aprovechar la funcionalidad avanzada de la API a través de la [página de consulta](https://paginafinal.com/api/consultar), que utiliza el método POST para enviar información crucial, incluyendo:

- `potenciaOptima`: Potencia óptima a instalar.
- `netoAnualMax`: Generación máxima de energía teniendo en cuenta el ahorro por autoconsumo y la pérdida por exceso mensual.

Al interactuar con la página de consulta, la API proporciona respuestas detalladas para diferentes escenarios:

- Error al ingresar un dato (Código 400): "Error en crear la consulta en la base de datos por un dato erróneo".
- Error al crear la consulta en la base de datos (Código 500): "Error en crear la consulta en la base de datos".
- Consulta creada exitosamente (Código 200): "Consulta creada".

Esto permite a Solcor realizar cálculos precisos y obtener estimaciones de precios actualizadas basadas en datos específicos de cada cliente.

## Ventajas

- **Optimización de Recursos**: Solcor puede utilizar la API para gestionar sus clientes de manera eficiente, lo que ahorra tiempo y recursos en la administración manual de registros.

- **Precisión en la Estimación de Precios**: La API utiliza algoritmos avanzados para calcular precios, lo que resulta en estimaciones precisas y competitivas.

- **Mejora de la Experiencia del Cliente**: Los clientes de Solcor pueden recibir estimaciones de precios personalizadas de manera rápida, lo que mejora la satisfacción del cliente y fomenta la toma de decisiones informadas.

- **Escalabilidad**: La API está diseñada para manejar un gran volumen de datos y puede escalarse fácilmente para adaptarse al crecimiento de Solcor.



