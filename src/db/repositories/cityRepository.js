import { getDb, closeConnection } from '../init';


const getAll = async () => {
    const database = await getDb();
    const collection = database.collection('geo_data_1');

    let cities = await collection.aggregate([
        { "$group": { _id: { city_id: "$city_id", city: "$city" } } },
        { "$project": { _id: 0, city: "$_id.city", city_id: "$_id.city_id" } },
        { "$sort": { city_id: 1 } }
    ]).toArray();

    return cities;
}


const getById = async (cityId) => {
    const database = await getDb();
    const collection = database.collection('geo_data_1');

    let city = await collection.aggregate([
        { "$match": { city_id: Number.parseInt(cityId) } },
        { "$group": { _id: { city_id: "$city_id", city: "$city" } } },
        { "$project": { _id: 0, city: "$_id.city", city_id: "$_id.city_id" } }
    ]).toArray();

    return city[0];
}


const getDistricts = async (cityId) => {
    const database = await getDb();
    const collection = database.collection('geo_data_1');

    let ditricts = await collection.aggregate([
        { "$match": { city_id: Number.parseInt(cityId) } },
        { "$group": { _id: { city_id: "$city_id", city: "$city", district_id: "$district_id", district: "$district" } } },
        { "$project": { _id: 0, city: "$_id.city", city_id: "$_id.city_id", district: "$_id.district", district_id: "$_id.district_id" } },
        { "$sort": { district: 1 } }
    ]).toArray();

    return ditricts;
}

const getDistrictById = async (cityId, districtId) => {
    const database = await getDb();
    const collection = database.collection('geo_data_1');

    let ditrict = await collection.aggregate([
        { "$match": { city_id: Number.parseInt(cityId), district_id: Number.parseInt(districtId) } },
        { "$group": { _id: { city_id: "$city_id", city: "$city", district_id: "$district_id", district: "$district" } } },
        { "$project": { _id: 0, city: "$_id.city", city_id: "$_id.city_id", district: "$_id.district", district_id: "$_id.district_id" } }
    ]).toArray();

    return ditrict[0];
}


const getNeighbourhoods = async (cityId, districtId) => {
    const database = await getDb();
    const collection = database.collection('geo_data_1');

    const query = {
        city_id: Number.parseInt(cityId),
        district_id: Number.parseInt(districtId)
    };
    const list = await collection.find(query, { fields: { geometry: 0, _id: 0 } }).toArray();

    return list;
}

export const cityRepository = {
    getAll,
    getById,
    getDistricts,
    getDistrictById,
    getNeighbourhoods
};
