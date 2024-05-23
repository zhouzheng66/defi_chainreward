/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-05-23 14:17:35
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-05-23 14:19:45
 * @FilePath: /defi_chainreward/backend/src/app.js
 * @Description: 后端示例文件
 */
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.xml());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
