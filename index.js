const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // res.writeHead(200, { "Content-Type": "application/json" });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "SUCCESS!",
        status_code: 200,
      })
    );
  } else if (req.url === "/messages") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Hello World!</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
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
