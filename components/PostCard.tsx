import { IPost } from "../@types/generated/contentful";
import Link from "next/link";
import Image from "next/image";

export const PostCard: React.FC<{ post: IPost }> = ({ post }) => {
  const { title, slug, thumbnail } = post.fields;
  return (
    <div className="post-card">
      <div className="thumbnail">
        <Image
          src={`https:${thumbnail?.fields.file.url}`}
          width={200}
          height={200}
          alt={thumbnail?.fields.title}
        />
      </div>
      <div className="info">
        <h3>{title}</h3>
        <Link href={`/posts/${slug}`}>
          <a>
            <h5>READ MORE</h5>
          </a>
        </Link>
      </div>
      <style jsx>{`
        .post-card {
          magin-top: 10px;
          display: flex;
          height: 200px;
          width: 600px;
          flex-direction: row;
          background: #fff;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08),
            0 3px 6px rgba(0, 0, 0, 0.15);
        }
        .info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        a {
          text-decoration: none;
          color: black;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
