import { web } from "./app/web.js";
import { logger } from "./app/logging.js";


const port = 5000;

web.listen(port, () => {
  logger.info("Server started at http://localhost:5000");
});