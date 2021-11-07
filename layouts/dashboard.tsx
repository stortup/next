import { fetcher, users } from "client/client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Clock, Icon, Person } from "react-bootstrap-icons";
import {
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Nav,
  Navbar,
  NavItem,
  NavLink,
} from "reactstrap";
import useSWR from "swr";
import { IMentorFull, IUser } from "types";
import { fa } from "utils/persian";

function ProfileDropDown({ user }: { user: IUser }) {
  const [open, toggle] = useState(false);
  const router = useRouter();

  const name = fa(user.name ?? user.phone?.replace("+98", "0") ?? "شما");

  return (
    <Dropdown isOpen={open} toggle={() => toggle(!open)}>
      <DropdownToggle outline caret>
        {name}
      </DropdownToggle>
      <DropdownMenu>
        <Link href="/profile" passHref>
          <DropdownItem>پروفایل من</DropdownItem>
        </Link>
        <DropdownItem divider></DropdownItem>
        <DropdownItem
          onClick={() => {
            users.logout();
            router.push("/login");
          }}
        >
          خروج از حساب
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

function Header() {
  const { data, error } = useSWR("/users/get_me", fetcher);

  return (
    <Navbar
      sticky="top"
      className="flex-md-nowrap p-0 shadow-sm bg-light pt-1"
      light
    >
      <Input
        className="form-control form-control-light w-100 rounded me-2"
        type="text"
        placeholder="جستجو"
        aria-label="Search"
      />
      {data && <ProfileDropDown user={data} />}
    </Navbar>
  );
}

function Sidebar() {
  const { data, error } = useSWR<IMentorFull>("/users/get_me", fetcher);

  const router = useRouter();

  return (
    <Col
      tag="nav"
      md={3}
      lg={2}
      className="d-md-block bg-light sidebar collapse pt-0"
    >
      <p className="text fw-lighter fs-3 ms-3 my-2 gray">استورت آپ</p>
      <div className="position-sticky pt-3">
        <Nav pills className="flex-column mb-auto">
          <SidebarItem
            label="منتور ها"
            href="/mentors"
            currentPath={router.pathname}
          />
          {data?.is_mentor && (
            <SidebarItem
              label="تعیین زمان منتورینگ"
              href="/my-times"
              currentPath={router.pathname}
              icon={Clock}
            />
          )}
          <SidebarItem
            label="قرارهای ملاقات من"
            href="/my-meets"
            currentPath={router.pathname}
          />
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
        <NavLink
          active={active}
          aria-current="page"
          className="fw-light"
          style={{ backgroundColor: active ? "gray" : "" }}
        >
          <I className="me-2" size={18} color={active ? "white" : "gray"} />

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
      <Sidebar />
      <Col tag="main" md={9} lg={10} className="ms-sm-auto">
        <Header />
        <div className="px-md-3">
          <div className="my-3 pb-2 border-bottom">
            <h3 className="fw-lighter">{title}</h3>
          </div>
          {children}
        </div>
      </Col>
    </>
  );
};
