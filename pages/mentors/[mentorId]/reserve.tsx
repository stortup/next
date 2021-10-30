import { useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "reactstrap";
import Image from "next/image";
import { DateTimePicker } from "components/DateTimePicker/DateTimePicker";

function Cart() {
  return (
    <>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-primary">سبد خرید</span>
        {/* <span className="badge bg-primary rounded-pill">3</span> */}
      </h4>
      <ListGroup className="mb-3">
        <ListGroupItem className="d-flex justify-content-between lh-sm">
          <div>
            <h6 className="my-0">هزینه منتورینگ</h6>
            <small className="text-muted">توضیحات</small>
          </div>
          <span className="text-muted">$12</span>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between bg-light">
          <div className="text-success">
            <h6 className="my-0">تخفیف</h6>
            <small></small>
          </div>
          <span className="text-success">−$5</span>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between">
          <span>جمع کل (تومان)</span>
          <strong>$20</strong>
        </ListGroupItem>
      </ListGroup>

      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="کد تخفیف" />
        <button className="btn btn-secondary">اعمال کد</button>
      </div>
      <button className="btn btn-primary w-100">خرید</button>
    </>
  );
}

function Mentor() {
  return (
    <div className="d-flex flex-row pb-3">
      <div className="p-1">
        <Image
          alt="mentor avatar"
          className="rounded-circle"
          src={"https://i.morioh.com/2021/07/31/bf74c9e9.webp"}
          width={70}
          height={70}
        />
      </div>

      <div className="p-1">
        <h5 className="title mb-0">name</h5>
        <p className="text">bio</p>
      </div>
    </div>
  );
}

function SelectedTime() {
  return (
    <AccordionItem>
      <AccordionHeader targetId="1">زمان انتخاب شده</AccordionHeader>
      <AccordionBody accordionId="1">
        <DateTimePicker />
      </AccordionBody>
    </AccordionItem>
  );
}

function SelectedMentorAndTime() {
  const [open, setOpen] = useState<string | null>("1");
  const toggle = (id: string) => {
    open === id ? setOpen(null) : setOpen(id);
  };

  return (
    <>
      <Mentor />
      {/* @ts-ignore */}
      <Accordion open={open} toggle={toggle}>
        <SelectedTime />
      </Accordion>
    </>
  );
}

function ReserveMentor() {
  return (
    <Row className="gy-3">
      <Col lg={9}>
        <SelectedMentorAndTime />
      </Col>

      <Col lg={{ size: 3, order: "last" }}>
        <Cart />
      </Col>
    </Row>
  );
}

ReserveMentor.title = "رزرو منتور";
ReserveMentor.dashboard = true;

export default ReserveMentor;
