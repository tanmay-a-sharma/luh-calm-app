mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 500, // Increase the timeout to 20 seconds for debugging purposes

  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connected to MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});