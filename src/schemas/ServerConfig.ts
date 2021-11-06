import mongoose from "mongoose";

const ServerConfigSchema = new mongoose.Schema({
  server: {
    type: String,
    required: true,
  },
  words: {
    type: [{ type: String }],
    required: true,
  },
});

export interface IServerConfigSchema extends mongoose.Document {
  server: string;
  words: string[];
}

const ServerConfig = mongoose.model<IServerConfigSchema>(
  "ServerConfig",
  ServerConfigSchema
);

export { ServerConfig };
