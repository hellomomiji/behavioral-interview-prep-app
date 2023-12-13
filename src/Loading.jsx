
function Loading({ children='Loading...' }) {
  return (
    <div className="loading">
      <i className="gg-spinner-alt"></i>
      {children}
    </div>
  );
}

export default Loading;
