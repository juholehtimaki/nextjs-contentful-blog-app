import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push("/"), 4000);
  });
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Ooops! That page cannot be found.</h2>
      <p>
        Redirecting to the <Link href="/">Homepage</Link> for more posts...
      </p>
      <style jsx>{`
        .not-found {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
