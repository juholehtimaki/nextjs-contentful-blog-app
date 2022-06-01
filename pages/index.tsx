import { createClient } from "contentful";
import { PostCard } from "../components/PostCard";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTELTFUL_ACCESS_KEY as string,
  });
  const response = await client.getEntries({ content_type: "post" });
  return {
    props: {
      posts: response.items,
    },
  };
};

export interface Post {
  fields: any;
  metadata: any;
  sys: any;
}

export interface Props {
  posts: Post[];
}

const Posts = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <PostCard key={post.sys.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
