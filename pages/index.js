import Head from "next/head";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import styles from "../styles/Home.module.css";
import imageUrlBuilder from "@sanity/image-url";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home({ posts }) {
  // console.log(posts);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

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
      <Header />
      <div className={styles.main}>
        <div className={styles.wrapper}>
          {mappedPosts.length ? (
            mappedPosts.map((p, index) => (
              <div
                onClick={() => router.push(`/post/${p.slug.current}`)}
                key={index}
                className={styles.post}
              >
                <img
                  className={styles.mainImage}
                  src={p.mainImage}
                  alt="First Post"
                />
                <h2>{p.title}</h2>
                {/* Description of the blog (First few lines) */}
                <p className={styles.desc}>
                  {p.body[0].children[0].text.substring(0, 100) + "..."}
                </p>
                {p.publishedAt ? (
                  <p className={styles.date}>
                    {new Date(p.publishedAt).toLocaleDateString(
                      "en-us",
                      options
                    )}
                  </p>
                ) : (
                  <span></span>
                )}
              </div>
            ))
          ) : (
            <>No Posts Yet</>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent(
    '*[_type == "post"] | order(_createdAt desc)' // right statement is for sorting blogs newest to oldest
  );
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
