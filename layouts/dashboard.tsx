import { fetcher } from "client/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
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
import useSWR from "swr";
import { fa } from "utils/persian";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, error } = useSWR("/users/get_me", fetcher);

  const toggle = () => setIsOpen(!isOpen);

  const usernameLabel = fa(
    data?.name ?? data?.phone?.replace("+98", "0") ?? "شما"
  );

  return (
    <Navbar dark sticky="top" className="bg-dark flex-md-nowrap p-0 shadow">
      <Link href="/" passHref>
        <NavbarBrand className="col-md-3 col-lg-2 me-0 px-3">
          استورت آپ
        </NavbarBrand>
      </Link>

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
      <Nav navbar>
        <NavItem className="text-nowrap">
          <NavLink className="px-3">{usernameLabel}</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

function Sidebar() {
  const router = useRouter();

  return (
    <Col
      tag="nav"
      md={3}
      lg={2}
      className="d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <Nav pills className="flex-column mb-auto">
          <SidebarItem
            label="منتور ها"
            href="/mentors"
            currentPath={router.pathname}
          />
          <SidebarItem label="کاربر ها" currentPath={router.pathname} />
          <SidebarItem label="خرید ها" currentPath={router.pathname} />
        </Nav>

        <SideBarGroupLabel />
        <Nav className="flex-column mb-2">
          <SidebarItem label="لیست دوره ها" currentPath={router.pathname} />
          <SidebarItem label="دوره های من" currentPath={router.pathname} />
        </Nav>
      </div>
    </Col>
  );
}

function SidebarItem({
  label,
  currentPath,
  href,
}: {
  label: string;
  currentPath: string;
  href?: string;
}) {
  const active = currentPath === href;
  return (
    <NavItem className="px-1">
      <Link href={href ?? "#"} passHref>
        <NavLink active={active} aria-current="page">
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
      </Link>
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
      <Sidebar />
      <Col tag="main" md={9} lg={10} className="ms-sm-auto px-md-2">
        <div className="my-3 pb-2">
          <h3 className="fw-100">{title}</h3>
        </div>
        {children}
      </Col>
    </>
  );
};
