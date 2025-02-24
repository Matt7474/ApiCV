// * cette fonction exécute une méthode de controller dans un try catch, ce qui nous évite d'écrire les try catch dans toutes les méthodes
function catchErrors(controllerMethod) {
    return async (req, res, next) => {
        try {
            await controllerMethod(req, res, next);
        } catch (error) {
            // * next est appelé avec une erreur : express lève une erreur et le middleware de gestion d'erreur prend le relais
            next(error);
        }
    };
}

export { catchErrors };