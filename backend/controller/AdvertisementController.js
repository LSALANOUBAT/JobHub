const express = require("express");
const router = express.Router();
const {
    getAllAdvertisement,
    createAdvertisement,
    deleteAdvertisement,
    getOneAdvertisement,
    updateAdvertisement,
} = require("../services/AdvertisementServices");

router.get("/", (req, res) =>
    getAllAdvertisement(req, res, [
        "advertisements.id as id",
        "companies.id as companyid",
        "advertisements.title",
        "advertisements.postdate",
        "advertisements.location",
        "companies.name",
    ])
);
router.get("/monitor", (req, res) =>
    getAllAdvertisement(req, res, ["advertisements.*"])
);
router.get("/:id", (req, res) => getOneAdvertisement(req, res));
router.post("/monitor", (req, res) => createAdvertisement(req, res));
router.delete("/monitor/:id", (req, res) => deleteAdvertisement(req, res));
router.put("/monitor/:id", (req, res) => updateAdvertisement(req, res));

module.exports = router;
