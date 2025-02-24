/* eslint-disable no-unused-vars */
// * le rôle de ce middleware est de faire un objet error qui représente une 404 et de l'envoyer au middleware de gestion d'erreur
const notFound = (req, res, next) => {
    const error = new Error('Not Found');
    error.statusCode = 404;

    // * appeler next avec un argument fait qu'express lève une erreur
    next(error);
};

// * le rôle de ce middleware est d'analyser les erreurs qu'il reçoit et de les envoyer au client
// https://expressjs.com/en/guide/error-handling.html
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({ error: err.message });
};

export { notFound, errorHandler };