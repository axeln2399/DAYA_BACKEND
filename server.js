const app = require("./app");
const config = require("./config/index");
// const port = 3000;

app.listen(config.port, () => {
    console.log(`Using PORT ${config.port}!`);
});
