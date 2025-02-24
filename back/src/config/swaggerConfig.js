import swaggerJSDoc from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "CV API",
			version: "1.0.0",
			description: "Documentation de l'API du CV",
		},
		servers: [
			{
				url: "http://localhost:3003",
				description: "Serveur de développement",
			},
		],
	},
	apis: ["./src/router/index.js"],
};

export default swaggerJSDoc(options);
