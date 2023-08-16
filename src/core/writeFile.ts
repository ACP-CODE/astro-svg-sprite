import fs from '../paths';
/**
 * 将生成的 sprite 代码写入（sprite.svg）文件
 * @param path 
 * @param content 
 */
export default function writeFile(path: any, content: any) {
	if (!fs.existsSync(path)) {
    const dirname = path.substr(0, path.lastIndexOf('/'));
    if(!fs.existsSync(dirname)){
      fs.mkdirSync(dirname, { recursive: true });
    }
    fs.writeFileSync(path, "", "utf-8");
  }
	
	fs.writeFileSync(path, content, 'utf-8');
}