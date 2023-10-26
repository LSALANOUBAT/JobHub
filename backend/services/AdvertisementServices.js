const { db } = require("../database/db");

async function getAllAdvertisement(req, res, select) {
    try {
        await db("advertisements")
            .innerJoin("companies", "companies.id", "advertisements.companyid")
            .select(select)
            .then((data) => {
                return res.json(data);
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error : can't find advertisement",
        });
    }
}

async function getOneAdvertisement(req, res) {
    try {
        const advertisement = await db
            .select("description", "wage", "contact")
            .from("advertisements")
            .where("id", req.params.id)
            .first();
        if (advertisement) {
            res.json(advertisement);
        } else {
            res.json("Advertisement doesn't exist");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error when get one advertisement",
        });
    }
}

async function createAdvertisement(req, res) {
    try {
        const company = await db
            .select("*")
            .from("companies")
            .where("companies.id", req.body.companyid)
            .first();

        if (!company) {
            throw new Error(
                "Company name does not exist in the company table."
            );
        }
        const advertisement = await db.insert(req.body).into("advertisements");
        res.status(200).json(advertisement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteAdvertisement(req, res) {
    try {
        const deletedAdvertisement = await db("advertisements")
            .where("id", req.params.id)
            .first();

        if (!deletedAdvertisement) {
            return res.status(404).json({ error: "Advertisement not found." });
        }

        try {
            const deletedRows = await db("advertisements")
                .where("id", req.params.id)
                .del();

            if (deletedRows > 0) {
                return res.status(200).json({
                    message: "Advertisement deleted successfully.",
                    deletedAdvertisement,
                });
            } else {
                return res
                    .status(500)
                    .json({ error: "Error deleting advertisement." });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function updateAdvertisement(req, res) {
    try {
        const advertisement = await db("advertisements")
            .where("id", req.params.id)
            .update(req.body);

        res.status(200).json("Advertisement updated successfully.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllAdvertisement,
    createAdvertisement,
    deleteAdvertisement,
    getOneAdvertisement,
    updateAdvertisement,
};
