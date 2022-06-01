export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="layout">
      <header>
        <h1>Nextjs Contentful Example Blog App</h1>
      </header>
      <div className="page-content">{children}</div>
      <footer className="footer">
        <p>Placeholder footer</p>
      </footer>
    </div>
  );
};
