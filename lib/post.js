import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
//console.log(`post:${postsDirectory}`);

//mdファイルのデータを取得
export function getPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // idを取得するためにファイル名の拡張子を除外
        const id = fileName.replace(/\.md$/, "");
    
        //マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
    
        //投稿のメタデータ部分を解析
        const matterResult = matter(fileContents);
    
        //idとデータを返す。
        return {
          id,
          ...matterResult.data,
        };
    });
    return allPostsData;
}

//GetStaticPathsのための関数
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
    /**
     * [
     *  { 
     *    params: { id: 'ssg-ssr' } 
     *  },
     * ]
     */
}

//Idを受け取って、そのidに対応するデータを取得
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    // matterResult.content //マークダウンの内容
    const blogNontent = await remark()
    .use(html)
    .process(matterResult.content);

    const blogContentHtml = blogNontent.toString();

    return {
        id,
        blogContentHtml,
        ...matterResult.data,
    };
}//