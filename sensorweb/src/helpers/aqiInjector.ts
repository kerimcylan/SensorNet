import type { BoxData, FieldData, FullData, BoxFieldData, BoxResolutionData, SensorDatum } from "./dataManipulation";


const aqiResolutonCalculator = (fields: Array<Array<SensorDatum>>, aqiWeight: Array<number>) => {
    const newResolution: Array<SensorDatum> = [];
    /*
                console.log("-------------------");
    console.log(field)
    console.log(aqiWeight)
                console.log("-------------------");
                */
    for (let i = 0; i < fields[0].length; i++) {
        const AQIweighted: SensorDatum = {
            timestamp: fields[0][i].timestamp,
            value: 0,
            _id: i.toString()
        }

        for (let j = 0; j < aqiWeight.length; j++) {
            
            if (fields[j][i])
                AQIweighted.value += fields[j][i].value * aqiWeight[j];
            else
                console.log(fields)
        }
        newResolution.push(AQIweighted);
    }

    return newResolution;
};

const aqiFieldCalculator = (field: Array<BoxFieldData>) => {
    const resolutions = ['raw', "1m", "5m", "30m", "1h", "4h", "12h", "1d", "1w"]
    const newData: BoxResolutionData = {
          raw: [], "1m": [], "5m": [], "30m": [], "1h": [], "4h": [], "12h": [], "1d": [], "1w": []
    }

    for (const newDataKey in newData) {
        const aqiWeights = [];
        const resolutionData: Array<Array<SensorDatum>> = []

        for (const i in field) {
            resolutionData.push(field[i].data[newDataKey as keyof BoxResolutionData]);
            aqiWeights.push(field[i].field.AQI);
        }
        const calculatedResolutionAQI = aqiResolutonCalculator(resolutionData, aqiWeights)
        newData[newDataKey as keyof BoxResolutionData] = calculatedResolutionAQI
    }

    return newData;
};

const aqiBoxCalculator = (box: Array<BoxFieldData>) => {
    const aqiFieldData = aqiFieldCalculator(box)
    const aqiField: BoxFieldData = {
        field: {
            _id: 'aqi',
            name: 'AQI',
            min: 0,
            max: 100,
            AQI: 0,
        },
        _id: 'boxAQI',
        data: aqiFieldData
    };
    //console.log(aqiFieldData);
    return aqiField;
}

const aqiInjector = (data: FullData) => {
    const injectedData = data.map((box) => {
        const calculatedField = aqiBoxCalculator(box.fields);
        const newData: BoxData = {
            _id: box._id,
            name: box.name,
            fields: [calculatedField, ...box.fields],
            location: box.location,
            slug: box.slug

        };
        return newData;
    })
    return injectedData;
}

export default aqiInjector;