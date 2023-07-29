require("dotenv").config();
const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");
const app = express();
var { expressjwt: jwt } = require("express-jwt");
const port = process.env.PORT || 5300;
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const auth = require("./routes/auth");
const powerBIToken = require("./routes/powerBIToken");
const test = require("./routes/test");

app.use(cors());
app.set('trust proxy', true);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(morgan("dev"));
app.use(jwt({ secret: JWT_SECRET, algorithms: ['HS256']}).unless({ path: ['/dashboard-server/authenticate', '/dashboard-server/test', '/dashboard-server'] }));

app.use((req, res, next) => {
    const clientIP = req.ip;
    const allowedIPs = ['127.0.0.1', 'localhost', 'https://www.mediken.com.ec', "::1"];
    if (allowedIPs.includes(clientIP)) {
      next();
    } else {
      res.status(403).send('Acceso prohibido desde esta dirección IP.');
    }
  });

app.get('/dashboard-server', (req, res) => {
    res.send('Hola, Permitida la entrada');
});

app.use("/dashboard-server/authenticate", auth);
app.use("/dashboard-server/token", powerBIToken);
app.use("/dashboard-server/test", test);

app.listen(port, () => console.log(`Listening on port ${port}`));