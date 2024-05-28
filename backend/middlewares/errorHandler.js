const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message,
            details: err.errors || [],
        },
    });
};

module.exports = errorHandler;
