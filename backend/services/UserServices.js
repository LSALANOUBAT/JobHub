const { db } = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getAllUsers(_req, res) {
    await db
        .select("*")
        .from("users")
        .then((users) => {
            return res.json(users);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ err: "Internal Server Error" });
        });
}

async function getOneUser(req, res) {
    try {
        const user = await db
            .select("*")
            .from("users")
            .where("id", req.params.id)
            .first();
        if (user) {
            res.json(user);
        } else {
            return res.json("User doesn't exist");
        }
    } catch (err) {
        console.log(err);
        return  res.status(500).json({
            error: "Internal Server Error when get one user",
        });
    }
}

async function createUser(req, res) {
    try {
        const user = await db
            .select("email")
            .from("users")
            .where("email", req.body.email)
            .first();
        if (!user) {
            const password = await bcrypt.hash(req.body.password, 12);
            req.body.password = password;
            try {
                const newuser = await db.insert(req.body).into("users");
                return res.status(201).json({ message: "User created successfully" });
            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    error: "Internal Server Error when creating user",
                });
            }
        }
        return res.json("User already exist");
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error when checking if user exist with email",
        });
    }
}

async function connectUser(req, res) {
    try {
        const user = await db
            .select("*")
            .from("users")
            .where("email", req.body.email)
            .first();

        if (user) {
            const isMatching = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (isMatching) {
                const token = jwt.sign(
                    { userId: user.id, isadmin: user.isadmin, email: user.email, firstName: user.firstname, lastName: user.lastname },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                res.cookie("jwt", token, { secure: true, domain: "localhost" });
                return res.json({message: "Connected !", isadmin: user.isadmin});
            } else {
                return res.status(401).json("Wrong password");
            }
        } else {
            return res.status(401).json("User doesn't exist");
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error when trying to connect",
        });
    }
}

async function deleteUser(req, res) {
    try {
        const user = await db
            .select("*")
            .from("users")
            .where("id", req.params.id);
        if (user.length !== 0) {
            try {
                await db("users").where("id", user[0].id).del();
                return res.json("User deleted");
            } catch (err) {
                console.log(err);
                return res.status(500).json({
                    error: "Internal Server Error when deleting a user with id",
                });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error when checking if user exist with id",
        });
    }
}

async function updateUser(req, res) {
    try {
        if (req.body.password) {
            const password = await bcrypt.hash(req.body.password, 12);
            req.body.password = password;
        }
        const user = await db("users")
            .where("id", req.params.id)
            .update(req.body);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function updatePassword() {
    try {
        const password = await bcrypt.hash(req.body.password, 12);
        const user = await db("users").where("email", req.body.email);
        if (user) {
            req.body.password = password;
            const user = await db("users")
                .where("email", req.body.email)
                .update("password", password);
            return res.status(200).json(user);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getOneUser,
    deleteUser,
    connectUser,
    updateUser,
    updatePassword,
};
