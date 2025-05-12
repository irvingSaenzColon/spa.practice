import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entryPoint = path.join(__dirname, 'src', 'index.html');
const ignoreRoutes = [
  '/.well-known/appspecific/com.chrome.devtools.json',
]
const fileTypes = [
  {
    mimetype: 'text/javascript',
    extension: 'js'
  },
  {
    mimetype: 'text/css',
    extension: 'css'
  },
  {
    mimetype: 'text/html',
    extension: 'html'
  },
  {
    mimetype: 'image/vnd.microsoft.icon',
    extension: 'ico'
  }
];
//process.env = envReader(path.join(__dirname, 'src/.env')) || null;


const server = http.createServer(async (req, res) => {
  let buffer = null
  let reqParts = req.url.split('/');
  const lastPart = reqParts[reqParts.length - 1];
  if(ignoreRoutes.includes(req.url)) {
    res.end();
    return;
  }
  console.log(req.url);
  if(req.url && lastPart.includes('.')) {
    let extension = lastPart.split('.');
    extension = extension[extension.length - 1];
    const contentType = fileTypes.find((ft) => ft.extension === extension);
    if(contentType) {
      let newPath = path.join(__dirname, 'src', ...reqParts);
      try {
        await fs.access(newPath, fs.constants.F_OK)
        res.setHeader('Content-Type', contentType.mimetype);
        res.statusCode = 200
        buffer = await fs.readFile(newPath);
      } catch(e) {
        res.statusCode = 404
        buffer = '';
        console.error('file not found');
      }
    }
  } else {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html');
    buffer = await fs.readFile(entryPoint);
  }
  res.write(buffer);
  res.end();
})


server.listen(3000, () => {
  console.log('Server listening on port 3000');
})