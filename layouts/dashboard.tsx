import { fetcher } from "client/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
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
  Dropdown,
  Row,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import useSWR from "swr";
import { fa } from "utils/persian";
import { Icon, Person, Clock } from "react-bootstrap-icons";
import { IUser } from "types";

function ProfileDropDown({ user }: { user: IUser }) {
  const [open, toggle] = useState(false);

  const name = fa(user.name ?? user.phone?.replace("+98", "0") ?? "شما");

  return (
    <Dropdown isOpen={open} toggle={() => toggle(!open)}>
      <DropdownToggle caret>{name}</DropdownToggle>
      <DropdownMenu>
        <Link href="/profile" passHref>
          <DropdownItem>پروفایل من</DropdownItem>
        </Link>
        <DropdownItem divider></DropdownItem>
        <DropdownItem>خروج از حساب</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, error } = useSWR("/users/get_me", fetcher);

  const toggle = () => setIsOpen(!isOpen);

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
      {/* <Nav navbar>
        <NavItem className="text-nowrap">
          <NavLink className="px-3">{usernameLabel}</NavLink>
        </NavItem>
      </Nav> */}
      <ProfileDropDown user={data} />
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
          <SidebarItem
            label="زمان های منتورینگ من"
            href="/my-times"
            currentPath={router.pathname}
            icon={Clock}
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
  icon,
}: {
  label: string;
  currentPath: string;
  href?: string;
  icon?: Icon;
}) {
  const I: Icon = icon ?? Person;
  const active = currentPath === href;
  return (
    <NavItem className="px-1">
      <Link href={href ?? "#"} passHref>
        <NavLink active={active} aria-current="page">
          <I className="me-2" size={18} color="gray" />

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
