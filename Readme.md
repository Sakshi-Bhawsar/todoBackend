express → web framework to handle routes and APIs

mongoose → for MongoDB database connection

dotenv → to store environment variables (like DB URL, secret keys)

cors → to allow frontend to access backend APIs

nodemon → auto-restarts server on changes (dev only)

// how to setup project 
mkdir my-backend  // create folder
cd my-backend   // got to that folder
npm init -y    // install package.json

npm i express // i express
npm i mongoose

// how to im;port and export in node.js
1. CommonJS (CJS) – Default in Node.js

Uses require and module.exports

Example:

📂 math.js

function add(a, b) {
  return a + b;
}

module.exports = { add };


📂 server.js

const { add } = require("./math");

console.log(add(2, 3)); // 5

