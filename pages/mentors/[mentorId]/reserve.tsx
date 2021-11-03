import { useEffect, useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import Image from "next/image";
import { UserDateTimePicker } from "components/DateTimePicker/user/UserDateTimePicker";
import useSWR from "swr";
import { fetcher, mentors } from "client/client";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { IMentor, ITime } from "types";
import { fa } from "utils/persian";
import moment, { Moment } from "jalali-moment";

function Cart({ price, disable }: { price: number; disable?: boolean }) {
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
          <span className="text-muted">{fa(price)}</span>
        </ListGroupItem>
        {/* <ListGroupItem className="d-flex justify-content-between bg-light">
          <div className="text-success">
            <h6 className="my-0">تخفیف</h6>
            <small></small>
          </div>
          <span className="text-success">−$5</span>
        </ListGroupItem> */}
        <ListGroupItem className="d-flex justify-content-between">
          <span>جمع کل (تومان)</span>
          <strong>{fa(price)}</strong>
        </ListGroupItem>
      </ListGroup>

      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="کد تخفیف" />
        <button className="btn btn-secondary">اعمال کد</button>
      </div>
      <button disabled={disable} className="btn btn-primary w-100">
        خرید
      </button>
    </>
  );
}

function Mentor({ mentor }: { mentor: IMentor }) {
  return (
    <div className="d-flex flex-row pb-3">
      <div className="p-1">
        <Image
          alt="mentor avatar"
          className="rounded-circle"
          src={mentor.avatar_url}
          width={70}
          height={70}
        />
      </div>

      <div className="p-1">
        <h5 className="title mb-0">{mentor.name}</h5>
        <p className="text">{mentor.bio}</p>
        <p className="text">{mentor.resume}</p>
      </div>
    </div>
  );
}

export default function ReserveMentor({
  mentorId,
  timeId,
}: {
  mentorId: string;
  timeId?: string;
}) {
  const [loading, setLoading] = useState(true);
  const { data, error } = useSWR<IMentor>(
    `/mentors/get_mentor?mentor_id=${mentorId}`,
    fetcher
  );

  const [selectedDate, setDate] = useState<ITime | null>(null);

  useEffect(() => {
    if (loading === true && data) {
      setDate(data.times.find((time) => time.id === timeId) ?? selectedDate);
      setLoading(false);
    }
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const timeTitle = selectedDate
    ? `زمان انتخاب شده: ${fa(
        moment(selectedDate.start_date)
          .locale("fa")
          .format("ddd D MMM YYYY - ساعت HH:MM")
      )}`
    : "زمان انتخاب شده";

  return (
    <Row className="gy-3">
      <Col lg={9}>
        <Mentor mentor={data} />
        <Card>
          <CardHeader>{timeTitle}</CardHeader>
          <CardBody>
            <UserDateTimePicker
              availableDates={data.times.map((d) => d.start_date)}
              reservedDates={[]}
              selectedDate={selectedDate?.start_date ?? null}
              onDate={(date) => {
                console.log("setDate", date);
                if (date === null) return setDate(null);
                for (const source of data.times) {
                  const isSame = compareDates(moment(source.start_date), date);
                  if (isSame) return setDate(source);
                }
              }}
            />
          </CardBody>
        </Card>
      </Col>

      <Col lg={{ size: 3, order: "last" }}>
        <Cart price={data.hourly_cost} disable={!selectedDate} />
      </Col>
    </Row>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      mentorId: context.params?.mentorId,
      timeId: context.query?.timeId ?? null,
    },
  };
};

ReserveMentor.title = "رزرو منتور";
ReserveMentor.dashboard = true;

function compareDates(a: Moment, b: Moment) {
  if (a.jYear() !== b.jYear()) return false;
  if (a.jMonth() !== b.jMonth()) return false;
  if (a.jDate() !== b.jDate()) return false;
  if (a.hour() !== b.hour()) return false;
  return true;
}
