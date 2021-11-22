import { fetcher } from "client/client";
import { ErrorHandler } from "components/ErrorHandler";
import Link from "next/link";
import { useRouter } from "next/router";
import { ClipboardPlus, Clock, Icon, Person } from "react-bootstrap-icons";
import { Col, Nav, NavItem, NavLink } from "reactstrap";
import useSWR from "swr";
import { IMentorFull, IUserFull } from "types";

export function Sidebar() {
  const { data, error } = useSWR<IUserFull | IMentorFull>(
    "/users/get_me",
    fetcher
  );

  const router = useRouter();

  if (error) return <ErrorHandler error={error} />;

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
            icon={ClipboardPlus}
          />
          {data?.is_mentor === false && (
            <SidebarItem
              label="منتور شدن"
              href="/become-mentor"
              currentPath={router.pathname}
              icon={ClipboardPlus}
            />
          )}
        </Nav>

        <Nav pills className="flex-column mb-auto">
          <SideBarGroupLabel name="مدرسه کسب و کار" />
          <SidebarItem
            label="دوره ها"
            href="/courses"
            currentPath={router.pathname}
            icon={ClipboardPlus}
          />
        </Nav>

        {data?.is_admin && (
          <Nav pills className="flex-column mb-auto">
            <SideBarGroupLabel name="مدیریت" />
            <SidebarItem
              label="درخواست های منتورینگ"
              href="/admin/mentoring-requests"
              currentPath={router.pathname}
              icon={ClipboardPlus}
            />
          </Nav>
        )}
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
      <Link href={href ?? "/"} passHref>
        <NavLink
          active={active}
          aria-current="page"
          className="fw-light"
          style={{
            backgroundColor: active ? "gray" : "",
          }}
        >
          <I className="me-2" size={18} color={active ? "white" : "gray"} />

          {label}
        </NavLink>
      </Link>
    </NavItem>
  );
}

function SideBarGroupLabel({ name }: { name: string }) {
  return (
    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
      {name}
    </h6>
  );
}
