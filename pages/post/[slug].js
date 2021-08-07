import Head from "next/head";
import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import styles from "../../styles/Post.module.css";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import { Toolbar } from "../../components/toolbar.js";

export const Post = ({ title, body, image, publish }) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [imageUrl, setImageUrl] = useState("");
  // const [time] = useState(publish);

  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: "w1qp8awm",
      dataset: "production",
    });

    setImageUrl(imgBuilder.image(image));
  }, [image]);
  return (
    <div>
      <NextSeo
        title={title}
        description={`${body[0].children[0].text}`}
        canonical="https://www.career.taxi/"
        openGraph={{
          url: "https://www.career.taxi/",
          title: "Main site",
          description: "This is the description of the main site",
        }}
      />
      <Toolbar />
      <div className={styles.main}>
        <h1>{title}</h1>
        {imageUrl && (
          <img className={styles.mainImage} src={imageUrl} alt="post" />
        )}
        {publish ? (
          <h3>{new Date(publish).toLocaleDateString("en-us", options)}</h3>
        ) : (
          <span></span>
        )}
        {/* <h3>{new Date(publish).toLocaleDateString("en-us", options)}</h3> */}
        <div className={styles.body}>
          <BlockContent blocks={body} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  if (!pageSlug) {
    return {
      notFound: true,
    };
  }

  const query = encodeURIComponent(
    `*[ _type == "post" && slug.current == "${pageSlug}" ]`
  );
  const url = `https://w1qp8awm.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());
  const post = result.result[0];

  if (!post) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        body: post.body,
        title: post.title,
        image: post.mainImage,
        publish: post.publishedAt || null,
      },
    };
  }
};

export default Post;
