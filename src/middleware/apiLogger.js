const apiLogger = (req, res, next) => {
  const startTime = Date.now();

  console.log(`[API] ${req.method} ${req.path}`);

  const originalSend = res.send;
  res.send = function (body) {
    const responseTime = Date.now() - startTime;

    console.log(
      `[API] ${req.method} ${req.path} → ${res.statusCode} (${responseTime}ms)`,
      {
        response: body,
      }
    );

    originalSend.call(this, body);
  };

  next();
};

module.exports = apiLogger;
