const { db } = require("../database/db");

async function getAllApplication(req, res) {
    try {
        await db
            .select("jobapplications.*")
            .from("jobapplications")
            .innerJoin(
                "advertisements",
                "advertisements.id",
                "jobapplications.advertisementid"
            )
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

async function createApplication(req, res) {
    console.log(req.body);
    try {
        const application = await db
            .select("jobapplications.*")
            .from("jobapplications")
            .innerJoin(
                "advertisements",
                "advertisements.id",
                "jobapplications.advertisementid"
            )
            .where("advertisementid", req.body.advertisementid)
            .where("email", req.body.email)
            .first();
        console.log(application);
        if (application) {
            return res
                .status(400)
                .json({ error: "Application already exists." });
        } else {
            try {
                await db.insert(req.body).into("jobapplications");
                res.status(201).json({ message: "Applied successfully" });
            } catch (error) {
                console.error(error);
                res.status(500).json({
                    error: error.message,
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error when checking the application",
        });
    }
}

async function deleteApplication(req, res) {
    try {
        const jobapplication = await db
            .select("*")
            .from("jobapplications")
            .where("id", req.params.id)
            .first();

        if (!jobapplication) {
            return res.status(404).json({ error: "Application not found" });
        }

        try {
            await db("jobapplications").where("id", req.params.id).del();
            return res.json("application deleted");
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: "Internal Server Error when deleting the application",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error when checking if the application exists",
        });
    }
}
async function updateApplication(req, res) {
    try {
        const advertisement = await db("jobapplications")
            .where("id", req.params.id)
            .update(req.body);

        res.status(200).json("Application updated successfully.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllApplication,
    createApplication,
    deleteApplication,
    deleteApplication,
    updateApplication,
};
