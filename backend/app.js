import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';  
import { uploadFileToIPFS, uploadJsonToIPFS } from './ipfs-uploader.js';
import { createBounty } from './BountyCreator.js';


const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());


app.get('/', (req, res) => {
    res.render('home');
    });

// Express 路由
app.post('/createBounty', async (req, res) => {
  try {
      const { title, description, reward, expiry } = req.body;

      // 检查文件是否存在
      if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).send('No files were uploaded.');
      }

      const file = req.files.file;
      const filePath = `files/${file.name}`;

      // 移动文件到本地临时目录
      file.mv(filePath, async (err) => {
          if (err) {
              console.log(err);
              return res.status(500).send('Error occurred while uploading file.');
          }

          try {
              // 上传文件到 IPFS
              const fileResult = await uploadFileToIPFS(filePath);
              const fileCid = fileResult.cid.toString();

              // 创建元数据
              const metadata = { 
                  title: title,
                  description: description,
                  reward: reward,
                  expiry: expiry,
                  file: `http://localhost:8080/ipfs/${fileCid}/${file.name}`
              };
              

              // 上传元数据到 IPFS
              const metadataResult = await uploadJsonToIPFS(metadata);
              const metadataCid = metadataResult.cid.toString();
              //文件在ipfs的url
              const fileURL = metadata.file;

              // 调用合约的 createBounty 方法
              await createBounty(reward, fileURL, expiry);
              res.json({
                  message: 'Upload successful',
                  data: metadata
              });
          } catch (contractError) {
              console.error("Error creating bounty:", contractError);
              res.status(500).send('Error occurred while creating bounty.');
          }
      });
  } catch (err) {
      console.log(err);
      res.status(500).send('Error occurred.');
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});