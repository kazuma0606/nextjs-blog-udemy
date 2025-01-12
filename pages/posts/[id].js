import Layout from "../../compornents/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilstyle from '../../styles/utils.module.css'
import Head from 'next/head'

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params}) {
    const postData = await getPostData(params.id);

    //console.log(postData);

    return {
        props: {
            postData,
        },
    };
}

export default function Post({postData}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>   
            <article>
                <h1 className={utilstyle.headingXl}>{postData.title}</h1>
                <div className={utilstyle.lightText}>{postData.date}</div>
                <div dangerouslySetInnerHTML={{ __html: postData.blogContentHtml }} />
            </article>
        </Layout>
    );
}