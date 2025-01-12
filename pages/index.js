import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout, {siteTitle} from '../compornents/Layout'
import utilstyle from '../styles/utils.module.css'

import {  getPostsData } from '../lib/post'

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData()
  // console.log(allPostsData)

  return {
    props: {
      allPostsData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps(constext) {
//   //例えば、外部APIからデータを取得する場合
//   //SNSのAPIからデータを取得する場合
//   return {
//     props: {
//       //props for your component
//     }
//   }
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>      
      <section className={utilstyle.headingMd}>
        <p>
          私は放射線技師です/好きなことはプログラミングです/好きな言語はPythonとTypescriptです
        </p>
      </section>

      <section className={`${utilstyle.headingMd} ${utilstyle.padding1px}`}>
        <h2>📝AIエンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, date, title, thumbnail }) => (
            <article key={id}>
            <Link href={`/posts/${id}`}>
            <Image 
              src={thumbnail} 
              alt={title} 
              width={500} 
              height={300} 
              className={styles.thumbnailImage}
            />
            </Link>
            <Link href = {`/posts/${id}`}>
              <span className={utilstyle.boldText}>{title}</span>
            </Link>
            <br /> 
            <small className={utilstyle.lightText}>{date}</small>
          </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
