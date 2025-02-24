
INSERT INTO "project" (
  "image", 
  "title", 
  "slug", 
  "github", 
  "description", 
  "created_at", 
  "techno"
) 
VALUES (
  '/ocoffee.png',   
  'O''Coffee',
  'Ocoffee',
  'https://github.com/Matt7474/oCoffee',
  'O''Coffee est une application web développée avec Node.js, Express et le moteur de templates EJS, permettant de générer des pages HTML dynamiques côté serveur. Le projet suit une architecture MVC (Modèle-Vue-Contrôleur) pour assurer une structure de code claire et maintenable. La conception en amont a inclus la réalisation de user stories, d’un MCD (Modèle Conceptuel de Données) et d’une modélisation via la méthode Merise. La base de données est gérée avec PostgreSQL et les interactions sont facilitées par Sequelize, un ORM efficace pour Node.js. ☕️',
  '2024-11-22',
  '{"conception": ["Merise", "User-stories", "MCD"], "front": ["HTML 5", "CSS 3", "JavaScript"], "back": ["EJS", "NodeJs", "Express"], "fullStack": ["Architecture MVC"], "bdd": ["Postgres", "Sequelize"]}'
);
