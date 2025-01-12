import Image from "next/image";

export default function Custom404() {
    return (
        <h1>
            ページが見つかりませんでした。
            <Image 
                src="/images/404.png"
                alt="404"
                width={600}
                height={600}
            />
        </h1>
    );
}