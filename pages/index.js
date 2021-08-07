import Head from "next/head";
import Image from "next/image";
import { NextSeo } from "next-seo";
import styles from "../styles/Home.module.css";
import { Toolbar } from "../components/toolbar";
import imageUrlBuilder from "@sanity/image-url";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home({ posts }) {
  const router = useRouter();
  const [mappedPosts, setMappedPosts] = useState([]);

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: "w1qp8awm",
        dataset: "production",
      });

      setMappedPosts(
        posts.map((p) => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
          };
        })
      );
      console.log(mappedPosts);
    } else {
      setMappedPosts([]);
    }
  }, [posts]);

  return (
    <div>
      <NextSeo
        title="Simple Usage Example"
        description="A short description goes here."
      />
      {/* <Head>
        <title>Home Page</title>
        <meta
          name="description"
          content="This is the description of our home page."
        />
      </Head> */}
      <Toolbar />
      <div className={styles.main}>
        <h1>Welcome To My Blog</h1>

        <h3>Recent Posts:</h3>

        <div className={styles.feed}>
          {mappedPosts.length ? (
            mappedPosts.map((p, index) => (
              <div
                onClick={() => router.push(`/post/${p.slug.current}`)}
                key={index}
                className={styles.post}
              >
                <h3>{p.title}</h3>
                <img
                  className={styles.mainImage}
                  src={p.mainImage}
                  alt="First Post"
                />
              </div>
            ))
          ) : (
            <>No Posts Yet</>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent('*[ _type == "post" ]');
  const url = `https://w1qp8awm.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());

  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: [],
      },
    };
  } else {
    return {
      props: {
        posts: result.result,
      },
    };
  }
};
