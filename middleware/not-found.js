const notFound = (req, res) => {
    res.status(404).send("<h2>Routes doesn't exist</h2>")
}

module.exports = notFound;