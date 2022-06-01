import { createClient } from "contentful";
import { IPost } from "../@types/generated/contentful";
import { PostCard } from "../components/PostCard";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTELTFUL_ACCESS_KEY as string,
  });
  const response = await client.getEntries({ content_type: "post" });
  const posts = response.items as IPost[];
  const sortedPosts = posts.sort(
    (a, b) =>
      Number(new Date(b.sys.createdAt)) - Number(new Date(a.sys.createdAt))
  );
  return {
    props: {
      posts: sortedPosts,
      revalidate: 60,
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
