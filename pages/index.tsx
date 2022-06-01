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
    },
  };
};

const Posts: React.FC<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <PostCard key={post.sys.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
