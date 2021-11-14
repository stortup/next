import { fetcher, logout } from "client/client";
import { ErrorHandler } from "components/ErrorHandler";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Search } from "react-bootstrap-icons";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Navbar,
} from "reactstrap";
import useSWR from "swr";
import { IUser } from "types";
import { fa } from "utils/persian";

export function Header({ searchBar }: { searchBar: boolean }) {
  const { data, error } = useSWR("/users/get_me", fetcher);

  if (error) return <ErrorHandler error={error} />;

  return (
    <Navbar
      sticky="top"
      className="flex-md-nowrap p-0 shadow-sm bg-light pt-1"
      light
    >
      {searchBar && <SearchBar />}
      {data && <ProfileDropDown user={data} />}
    </Navbar>
  );
}

function ProfileDropDown({ user }: { user: IUser }) {
  const [open, toggle] = useState(false);
  const router = useRouter();

  const name = fa(user.name ?? user.phone?.replace("+98", "0") ?? "شما");

  return (
    <Dropdown isOpen={open} toggle={() => toggle(!open)} className="ms-auto">
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
            logout();
            router.push("/login");
          }}
        >
          خروج از حساب
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

function SearchBar() {
  const [query, setQuery] = useState<string | undefined>();
  const router = useRouter();

  function search() {
    if (query) {
      router.push({ query: { search: query } });
    } else {
      router.push({ query: {} });
    }
  }

  return (
    <>
      <Input
        className="w-100 rounded me-1 p-1"
        type="text"
        placeholder="جستجو"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value || undefined)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
            search();
          }
        }}
      />
      <Button outline color="primary" className="border-0 me-2">
        <Search onClick={search} />
      </Button>
    </>
  );
}
