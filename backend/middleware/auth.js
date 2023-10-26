function isAdmin(req, res, next) {
    const isAdmin = req.cookies.isadmin;

    if (isAdmin) {
        next();
    } else {
        return res.status(401).json({ error: "Unauthorized. Admin privileges required." });
    }
}

module.exports = isAdmin;