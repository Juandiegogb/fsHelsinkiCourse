import { app } from "./app.js";
import { variables } from "./src/utils/config.js";

const PORT = variables.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
