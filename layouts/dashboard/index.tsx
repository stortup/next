import { NextPage } from "next";
import React from "react";
import { Col } from "reactstrap";
import { UserIncompleteProfileAlert } from "./alerts";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export const Dashboard: NextPage<{ title?: string; searchBar: boolean }> = ({
  children,
  title,
  searchBar,
}) => {
  return (
    <>
      <Sidebar />
      <Col tag="main" md={9} lg={10} className="ms-sm-auto">
        <Header searchBar={searchBar} />
        <UserIncompleteProfileAlert />
        <div className="px-md-3">
          {title && (
            <div className="my-3 pb-2 border-bottom">
              <h3 className="fw-lighter">{title}</h3>
            </div>
          )}
          {children}
        </div>
      </Col>
    </>
  );
};
