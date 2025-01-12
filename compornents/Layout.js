import Head from "next/head";
import styles from "./layout.module.css";
import utilstyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Yoshino"
export const siteTitle = "Next.js Blog"

function Layout({ children ,home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel='icon' href="/images/favicon.ico"/>
            </Head>
            <header className={styles.header}>
                {home  ? (
                    <>
                        <img
                            src="/images/profile.png" 
                            className={`${utilstyles.borderCircle} ${styles.headerHomeImage}`} 
                        />       
                        <h1 className={utilstyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <img
                            src="/images/profile.png" 
                            className={`${utilstyles.borderCircle}`} 
                        />       
                        <h1 className={utilstyles.heading2Xl}>{name}</h1>
                    </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">← ホームへ戻る</Link>
                </div>
            )}
        </div>
    );
}

export default Layout;