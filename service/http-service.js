const https = require("https");

module.exports = class HttpService {
  get(url) {
    return new Promise((resolve, reject) => {
      https.get(url, async (res) => {
        try {
          let body = "";
          res.setEncoding("utf-8");
          for await (const chunk of res) {
            body += chunk;
          }
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    });
  }
};
