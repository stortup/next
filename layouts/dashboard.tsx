import { NextPage } from "next";

function Header() {
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
        استورت آپ
      </a>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <input
        className="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      ></input>
    </header>
  );
}

function Sidebar() {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav nav-pills flex-column mb-auto">
          <SidebarItem label="منتور ها" active />
          <SidebarItem label="کاربر ها" />
          <SidebarItem label="خرید ها" />
        </ul>

        <SideBarGroupLabel />
        <ul className="nav flex-column mb-2">
          <SidebarItem label="لیست دوره ها" />
          <SidebarItem label="دوره های من" />
        </ul>
      </div>
    </nav>
  );
}

function SidebarItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <li className="nav-item px-1">
      <a
        className={active ? "active nav-link" : "nav-link"}
        aria-current="page"
        href="#"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-home"
          aria-hidden="true"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        {label}
      </a>
    </li>
  );
}

function SideBarGroupLabel() {
  return (
    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
      مدرسه کسب و کار
    </h6>
  );
}

export const Dashboard: NextPage<{ title: string }> = ({ children, title }) => {
  return (
    <>
      <Header />
      <div className="row">
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-3 pt-3">
          <h2>{title}</h2>
          {children}
        </main>
      </div>
    </>
  );
};
