import "zx/globals";
const dotenv = require("dotenv");
dotenv.config();

// eslint-disable-next-line no-undef
$`aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DISTRIBUTION \
  --paths "/*" "/**/*"`.pipe(process.stdout);
