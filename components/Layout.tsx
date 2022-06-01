export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <h1>Nextjs Contentful Example Blog Post App</h1>
      </header>
      <div className="page-content">{children}</div>
      <footer className="footer">
        <p>Example footer</p>
      </footer>
    </div>
  );
};
