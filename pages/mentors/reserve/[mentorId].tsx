import { useState } from "react";
import { DateTimePicker } from "components/DateTimePicker/DateTimePicker";

function Cart() {
  return (
    <div className="col-lg-3 order-md-last">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-primary">سبد خرید</span>
        {/* <span className="badge bg-primary rounded-pill">3</span> */}
      </h4>
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <h6 className="my-0">هزینه منتورینگ</h6>
            <small className="text-muted">توضیحات</small>
          </div>
          <span className="text-muted">$12</span>
        </li>
        <li className="list-group-item d-flex justify-content-between bg-light">
          <div className="text-success">
            <h6 className="my-0">تخفیف</h6>
            <small></small>
          </div>
          <span className="text-success">−$5</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>جمع کل (تومان)</span>
          <strong>$20</strong>
        </li>
      </ul>

      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="کد تخفیف" />
        <button className="btn btn-secondary">اعمال کد</button>
      </div>
      <button className="btn btn-primary w-100">خرید</button>
    </div>
  );
}

function SelectedMentor() {
  const [open, setOpen] = useState(true);

  return (
    <div className="accordion-item">
      <h4 className="accordion-header">
        <button
          onClick={() => setOpen(!open)}
          className={`accordion-button ${open && "collapsed"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="false"
          aria-controls="collapseOne"
        >
          منتور انتخاب شده
        </button>
      </h4>
      <div
        className={`accordion-collapse ${open && "collapse"}`}
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <div className="row">
            <div className="col-auto">
              <img
                className="rounded-circle"
                style={{ width: "70px", height: "70px" }}
                src={"https://i.morioh.com/2021/07/31/bf74c9e9.webp"}
              />
            </div>
            <div className="col">
              <h5 className="card-title mb-0">name</h5>
              <p className="card-text">bio</p>
            </div>
          </div>

          <p className="card-text">description</p>
        </div>
      </div>
    </div>
  );
}

function SelectedTime() {
  const [open, setOpen] = useState(true);

  return (
    <div className="accordion-item">
      <h4 className="accordion-header">
        <button
          onClick={() => setOpen(!open)}
          className={`accordion-button ${open && "collapsed"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="false"
          aria-controls="collapseOne"
        >
          زمان انتخاب شده
        </button>
      </h4>
      <div
        className={`accordion-collapse ${open && "collapse"}`}
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <DateTimePicker />
      </div>
    </div>
  );
}

function Accordion() {
  return (
    <div className="col-lg-9">
      <div className="accordion">
        <SelectedMentor />
        <SelectedTime />
      </div>
    </div>
  );
}

function ReserveMentor() {
  return (
    <div className="row">
      <Accordion />
      <Cart />
    </div>
  );
}

ReserveMentor.title = "رزرو منتور";
ReserveMentor.dashboard = true;

export default ReserveMentor;
