export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="layout">
      <header>
        <h1>NEXTJS CONTENTFUL BLOG POST APP EXAMPLE :)</h1>
      </header>
      <div className="page-content">{children}</div>
    </div>
  );
};
