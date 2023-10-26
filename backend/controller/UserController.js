const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    createUser,
    getOneUser,
    deleteUser,
    connectUser,
    updateUser,
    updatePassword,
} = require("../services/UserServices");

router.get("/", (req, res) => getAllUsers(req, res));
router.get("/:id", (req, res) => getOneUser(req, res));
router.post("/", (req, res) => createUser(req, res));
router.post("/signIn", (req, res) => connectUser(req, res));
router.delete("/:id", (req, res) => deleteUser(req, res));
router.put("/:id", (req, res) => updateUser(req, res));
router.put("/resetPassword", (req, res) => updatePassword(req, res));

module.exports = router;
