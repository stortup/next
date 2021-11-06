export function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "50%",
        left: 0,
      }}
    >
      <div className="d-flex justify-content-center">
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </div>
  );
}
