const responseMiddleware = (req, res, next) => {
    if (res.err)
        switch (res.err.message) {
            case "Validation error":
                res.status(400).send({ error: true, message: "Validation error" });
                break;
            case "Data not found":
                res.status(404).send({ error: true, message: "Data not found" });
                break;
            default:
                res.status(500).send({ error: true, message: res.err.message });
        }
    else res.send(res.data);
   // TODO: Implement middleware that returns result of the query
    // next();
}

exports.responseMiddleware = responseMiddleware;