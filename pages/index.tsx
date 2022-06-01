import { createClient } from "contentful";
import { IPost } from "../@types/generated/contentful";
import { PostCard } from "../components/PostCard";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTELTFUL_ACCESS_KEY as string,
  });
  const response = await client.getEntries({ content_type: "post" });
  return {
    props: {
      posts: response.items as IPost[],
      revalidate: 10,
    },
  };
};

const Posts: React.FC<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.sys.id} post={post} />
      ))}
      <style jsx>
        {`
          .post-list {
            display: flex;
            flex-direction: column;
            row-gap: 15px;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
};

export default Posts;
