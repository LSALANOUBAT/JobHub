const express = require("express");
const router = express.Router();
const {
    getAllApplication,
    createApplication,
    deleteApplication,
    updateApplication,
} = require("../services/ApplicationServices");

router.get("/", (req, res) => getAllApplication(req, res));
router.post("/", (req, res) => createApplication(req, res));
router.delete("/:id", (req, res) => deleteApplication(req, res));
router.put("/:id", (req, res) => updateApplication(req, res));

module.exports = router;
