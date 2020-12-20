import "zx/globals";
const dotenv = require("dotenv");
dotenv.config();

// eslint-disable-next-line no-undef
$`REACT_APP_API_HOST=$REACT_APP_API_HOST react-scripts build`.pipe(
  process.stdout
);
