import { NextPage } from "next";
import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Input,
  Col,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
} from "reactstrap";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar dark sticky="top" className="bg-dark flex-md-nowrap p-0 shadow">
      <NavbarBrand className="col-md-3 col-lg-2 me-0 px-3" href="#">
        استورت آپ
      </NavbarBrand>
      <NavbarToggler
        onClick={toggle}
        className="d-md-none position-absolute d"
      />
      <Collapse isOpen={isOpen} navbar></Collapse>
      <Input
        className="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
    </Navbar>
  );
}

function Sidebar() {
  return (
    <Col
      tag="nav"
      md={3}
      lg={2}
      className="d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <Nav pills className="flex-column mb-auto">
          <SidebarItem label="منتور ها" active />
          <SidebarItem label="کاربر ها" />
          <SidebarItem label="خرید ها" />
        </Nav>

        <SideBarGroupLabel />
        <Nav className="flex-column mb-2">
          <SidebarItem label="لیست دوره ها" />
          <SidebarItem label="دوره های من" />
        </Nav>
      </div>
    </Col>
  );
}

function SidebarItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <NavItem className="nav-item px-1">
      <NavLink active={active} aria-current="page" href="#">
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
      </NavLink>
    </NavItem>
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
      <Container fluid>
        <Row>
          <Sidebar />
          <Col tag="main" md={9} lg={10} className="ms-sm-auto px-md-4">
            <div className="my-3">
              <h2>{title}</h2>
            </div>
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
};
