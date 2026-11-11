const catchAsync = (fn) =>        // takes your async controller function
    (req, res, next) => {           // returns a NEW function (Express calls this)
        Promise.resolve(
            fn(req, res, next)          // calls your controller
        )
            .catch(next);                 // if it throws/rejects → passes error to next()
    };

module.exports = catchAsync;
