"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_config_1 = require("./configuration/env.config");
const app_1 = require("./app");
(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default
        // .connect("mongodb://localhost:27017/assignmentFive")
        .connect(env_config_1.envVars.DATABASE_CONNECTION_STRING)
        .then(() => {
        console.log("database connected successfully");
        const databaseName = mongoose_1.default.connection.name;
        console.log({ databaseName });
        console.log(`Connected to the ${databaseName} database successfully.`);
        app_1.app.listen(env_config_1.envVars.PORT, () => {
            console.log(`The server is running on port ${env_config_1.envVars.PORT}`);
        });
    })
        .catch((error) => {
        console.log("database connection failed and hence server also failed to start.");
    });
}))();
