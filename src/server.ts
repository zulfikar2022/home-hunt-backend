import mongoose from "mongoose";
import { envVars } from "./configuration/env.config";
import { app } from "./app";

(async () => {
  mongoose
    // .connect("mongodb://localhost:27017/assignmentFive")
    .connect(envVars.DATABASE_CONNECTION_STRING as string)
    .then(() => {
      console.log("database connected successfully");
      const databaseName = mongoose.connection.name;
      console.log({ databaseName });
      console.log(`Connected to the ${databaseName} database successfully.`);
      app.listen(envVars.PORT, () => {
        console.log(`The server is running on port ${envVars.PORT}`);
      });
    })
    .catch((error) => {
      console.log(
        "database connection failed and hence server also failed to start."
      );
    });
})();
