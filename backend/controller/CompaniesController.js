const express = require("express");
const router = express.Router();
const {
    getAllCompanies,
    createCompanies,
    deleteCompanies,
    updateCompany,
} = require("../services/CompaniesServices");

router.get("/", (req, res) => getAllCompanies(req, res));
router.post("/", (req, res) => createCompanies(req, res));
router.delete("/:id", (req, res) => deleteCompanies(req, res));
router.put("/:id", (req, res) => updateCompany(req, res));

module.exports = router;
