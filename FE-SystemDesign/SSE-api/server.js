const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());

app.get("/events", (req, res) => {
  // Set the appropriate headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Function to send a message to the client
  const sendEvent = (message) => {
    res.write(`data: ${JSON.stringify(message)}\n\n`);
  };

  // Send some initial events
  sendEvent({ message: "Connected to SSE" });
  sendEvent({ message: "Collecting data fromkearney.com" });

  // Set an interval to send messages every 2 seconds
  const timerId = setTimeout(() => {
    const message = {
      message: "Hello, here is a new event!",
      timestamp: new Date(),
    };
    sendEvent(message);
  }, 300000);

  // Stop sending events and close the connection after sending "DONE"
  setTimeout(() => {
    clearTimeout(timerId); // Stop the interval
    sendEvent({ message: "DONE" }); // Send final "DONE" message
    res.end(); // Close the SSE connection
  }, 300060); // 5 mins in milliseconds

  // Handle client disconnects to clean up
  req.on("close", () => {
    clearTimeout(timerId);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
