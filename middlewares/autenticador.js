module.exports = function (req, res, next) {
    if (!req.session.usuario){
        return res.redirect('/');
    }else{
        next();
    }
    return next;

};