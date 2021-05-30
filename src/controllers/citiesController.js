import { Router } from 'express';
var { cityRepository } = require("../db/repositories/cityRepository")
var router = Router();


const getCities = async (req, res) => {
    var cityList = await cityRepository.getAll();
    res.json(cityList);
};

const getCityById = async (req, res) => {
    let id = req.params.id;
    console.log(id);
    let cityList = await cityRepository.getById(id);
    res.json(cityList);
}

const getDistricts = async (req, res) => {
    let id = req.params.id;
    let districts = await cityRepository.getDistricts(id);
    res.json(districts);
};

const getDistrictById = async (req, res) => {
    let id = req.params.id;
    let districtId = req.params.districtId;
    let district = await cityRepository.getDistrictById(id, districtId);
    res.json(district);
};

const getNeighbourhoods = async (req, res) => {
    let id = req.params.id;
    let districtId = req.params.districtId;
    let district = await cityRepository.getNeighbourhoods(id, districtId);
    res.json(district);
};


router.get('/', getCities);
router.get("/:id", getCityById);
router.get("/:id/districts", getDistricts);
router.get("/:id/districts/:districtId", getDistrictById);
router.get("/:id/districts/:districtId/neighbourhoods", getNeighbourhoods);
export default router;