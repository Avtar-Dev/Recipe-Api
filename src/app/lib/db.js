const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

export const connectionStr =
  "mongodb+srv://" +
  MONGO_USERNAME +
  ":" +
  MONGO_PASSWORD +
  "@cluster0.dwyxnxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
