import { createClient } from "contentful";
import { IPost } from "../../@types/generated/contentful";
import { GetStaticProps } from "next";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ClipLoader from "react-spinners/ClipLoader";

interface IParams {
  params: {
    slug: string;
  };
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTELTFUL_ACCESS_KEY as string,
});

export const getStaticPaths = async () => {
  const response = await client.getEntries({ content_type: "post" });

  const posts = response.items as IPost[];
  const paths = posts.map((post) => {
    return { params: { slug: post.fields.slug } } as IParams;
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await client.getEntries({
    content_type: "post",
    "fields.slug": params!.slug,
  });
  const items = response.items as IPost[];

  if (!items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { post: items[0] },
    revalidate: 1,
  };
};

const Post: React.FC<{ post: IPost }> = ({ post }) => {
  if (!post) {
    return (
      <div className="loading-spinner-container">
        <ClipLoader />
        <style jsx>
          {`
            .loading-spinner-container {
              display: flex;
              justify-content: center;
            }
          `}
        </style>
      </div>
    );
  }
  const { title, thumbnail, content } = post.fields;
  return (
    <div className="post-content">
      <div className="banner">
        <h2>{title}</h2>
        <Image
          src={`https:${thumbnail?.fields.file.url}`}
          width={thumbnail?.fields.file.details.image?.width}
          height={thumbnail?.fields.file.details.image?.height}
          alt={thumbnail?.fields.title}
        />
      </div>
      <div>{documentToReactComponents(content)}</div>
      <style jsx>{`
        h2 {
          text-transform: uppercase;
          text-align: center;
        }
        .post-content {
          display: flex;
          flex-direction: column;
          row-gap: 20px;
        }
      `}</style>
    </div>
  );
};

export default Post;
