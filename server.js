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
app.use(jwt({ secret: JWT_SECRET, algorithms: ['HS256']}).unless({ path: ['/dashboard-server/auth', '/dashboard-server/test', '/dashboard-server'] }));

app.use((req, res, next) => {
  const allowedOrigins = [`${process.env.ORIGIN_URL}/dashboard/`, 'http://localhost:4200'];
  const origin = req.headers.referer;
  
  if (allowedOrigins.includes(origin)) {
	  console.log("Entre aqui");
    res.setHeader('Access-Control-Allow-Origin', origin);
    next();
  } else {
    res.status(403).json({ error: 'Acceso no permitido desde esta ubicación.' });
  }
});

app.get('/dashboard-server', (req, res) => {
    res.send('Hola, Permitida la entrada');
});

app.use("/dashboard-server/auth", auth);
app.use("/dashboard-server/powerbi/getToken", powerBIToken);
app.use("/dashboard-server/test", test);

app.listen(port, () => console.log(`Listening on port ${port}`));