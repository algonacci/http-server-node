const http = require("http");

const PORT = 3000;

const server = http.createServer();

const friends = [
  {
    id: 0,
    name: "John",
  },
  {
    id: 1,
    name: "Jane",
  },
  {
    id: 2,
    name: "Joe",
  },
];

server.on("request", (req, res) => {
  const items = req.url.split("/");
  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log("Requst:", friend);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else if (req.method === "GET" && items[1] === "friends") {
    // res.writeHead(200, { "Content-Type": "application/json" });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (items.length === 3) {
      const friendIndex = Number(items[2]);
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && items[1] === "messages") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Hello World!</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
  } else if (req.url === "/") {
    res.end(JSON.stringify({ message: "Hello World!" }));
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "NOT FOUND!",
        status_code: 404,
      })
    );
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
