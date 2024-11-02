export function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`Not found - ${req.origunalUrl}`);
    next(error);
}

export function errorHandler(error, req, res, next) {
    let statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    let message = error.message;

    res.status(statusCode);

    res.json({ message });
}