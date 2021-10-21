function LoginForm() {
  return (
    <div className="">
      <h1 className="text-center">ورود</h1>
      <input type="number" />
    </div>
  );
}

export default function Login() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 vh-100" style={{ backgroundColor: "#EEE" }}>
          <div className="d-flex align-items-center justify-content-center h-100">
            <LoginForm />
          </div>
        </div>
        <div
          className="col-md d-none d-md-block vh-100"
          style={{ backgroundColor: "red" }}
        ></div>
      </div>
    </div>
  );
}
