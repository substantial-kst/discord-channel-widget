import "zx/globals";
const dotenv = require("dotenv");
dotenv.config();

// eslint-disable-next-line no-undef
$`aws s3 sync ./build s3://$S3_WEBSITE_BUCKET`.pipe(process.stdout);
