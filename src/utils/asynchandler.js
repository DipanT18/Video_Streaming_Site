// const asynchandler = (fn) => async (err, req, res, next) => {
//     try{
//         await fn(req, res, next) 
//     } catch {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }
const asynchandler = (requestHandler) => {
    (err, req, res, next) => {
        Promise.resolve(requestHandler(err, req, res, next)).catch((err) => next(err))
    }
} 


export { asynchandler }