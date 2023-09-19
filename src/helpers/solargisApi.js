const axios = require('axios');
const parseString = require('xml2js').parseString;

exports.solargisAPI = async (latitud, longitud) => {

    try {
        var xmlBodyStr = `<calculateRequest xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:geo="http://geomodel.eu/schema/common/geo"
            xmlns:pv="http://geomodel.eu/schema/common/pv"
            xmlns="http://geomodel.eu/schema/ws/pvplanner">
        <site lat="${latitud}" lng="${longitud}">
            <pv:geometry xsi:type="pv:GeometryFixedOneAngle" azimuth="175" tilt="45"/>
            <pv:system installedPower="1" installationType="ROOF_MOUNTED" availability="99">
                <pv:module type="CSI">
                </pv:module>
                <pv:inverter>
                    <pv:efficiency xsi:type="pv:EfficiencyConstant" percent="97.5"/>
                </pv:inverter>
                <pv:losses dc="5.5" ac="1.5"/>
            </pv:system>
        </site>
        </calculateRequest>`;
        var config = {
            headers: { 'Content-Type': 'text/xml' }
        };

        const res = await axios.post('https://solargis.info/ws/rest/pvplanner/calculate?key=demo', xmlBodyStr, config);
        //console.log(res.data.calculation.output.esm.monthlies);
        return res.data.calculation.output.esm.monthlies
    }
    catch (err) {
        // Handle Error Here
        console.error(err);
    }
};    