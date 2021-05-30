import db from '../init';
import { getDb, closeConnection } from '../init';


const getLocation = async (latitude, longitude) => {
    const database = await getDb();
    const collection = database.collection('geo_data_1');

    const query = {
        "geometry": {
            "$geoIntersects": {
                "$geometry": {
                    "type": "Point",
                    "coordinates": [longitude, latitude]
                }
            }
        }
    };
    const locationInfo = await collection.findOne(query, { fields: { geometry: 0, _id: 0 } });

    return locationInfo;
}


export const locationRepository = {
    getLocation
};
