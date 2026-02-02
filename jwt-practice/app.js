import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome!",
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "Rnadom Secret", (err, authData) => {
		if (err) return res.sendStatus(403);

		res.json({
			message: "Post created!",
			authData,
			date: new Date(),
		});
	});
});

app.post("/api/login", (req, res) => {
  // Mock user
  const user =  {
    id: 1,
    username: "Vinson",
    email: "vinsonhe2@gmail.com",
  };

  jwt.sign({ user }, "Rnadom Secret", { expiresIn: "30s" }, (err, token) => {
    res.json({
      token,
    });
  });

});

app.listen(5000, (err) => {
  if (err) throw err;

  console.log("Running on port 5000");
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    
    // Check if bearer if undefined
    if (typeof bearerHeader !== "undefined") {
        // Split at the space
        const bearer = bearerHeader.split(" ");
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

// curl http://localhost:5000/api = { "message": "Welcome!" };
// curl -X POST http://localhost:5000/api/login
// curl -X POST http://localhost:5000/api/posts


/* Test (store <access_token> in LocalStorage (recommended) or as a cookie in a real project)
	NOTE: Token expires in 30 seconds, so try to be quick or adjust it to be longer! (line 32)
	1. curl -X POST http://localhost:5000/api/login (copy token value)
	2. curl -X POST http://localhost:5000/api/posts (should return forbidden)
	3. curl -X POST -H "Authorization: Bearer randomvaluesaisd9090uqd209d19u2d9wssadk.2193u" http://localhost:5000/api/posts (also forbidden)
	4. curl -X POST -H "Authorization: Bearer <access_token>" http://localhost:5000/api/posts (you should get a json with message, authData, iat (issued at, check docs), and date values!)
*/
