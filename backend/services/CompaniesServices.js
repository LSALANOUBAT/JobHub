const { db } = require("../database/db");

async function getAllCompanies(req, res) {
    try {
        const companies = await db("companies").select("*");
        res.status(201).json(companies);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}

async function createCompanies(req, res) {
    try {
        const companyName = await db
            .select("name")
            .from("companies")
            .where("name", req.body.name);

        if (companyName.length > 0) {
            return res.status(400).json("Company already exists in the table");
        }

        const company = await db.insert(req.body).into("companies");

        return res.status(200).json(company);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function deleteCompanies(req, res) {
    try {
        const company = await db
            .select("*")
            .from("companies")
            .where("id", req.params.id)
            .first();

        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }

        try {
            await db("companies").where("id", req.params.id).del();
            return res.json("Company deleted");
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: "Internal Server Error when deleting the company",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error when checking if the company exists",
        });
    }
}

async function updateCompany(req, res) {
    try {
        const company = await db("companies")
            .where("id", req.params.id)
            .update(req.body);
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllCompanies,
    createCompanies,
    deleteCompanies,
    updateCompany,
};
