import { fetcher } from "client/client";
import { Avatar } from "components/Avatar";
import { UserDateTimePicker } from "components/DateTimePicker/user/UserDateTimePicker";
import { compareMoment } from "components/DateTimePicker/utils";
import { ErrorHandler } from "components/ErrorHandler";
import { Loading } from "components/Loading";
import moment from "jalali-moment";
import { GetServerSideProps } from "next";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import useSWR from "swr";
import { IMentor, ITime } from "types";
import { fa } from "utils/persian";

export default function ReserveMentor({
  mentorId,
  time,
}: {
  mentorId: string;
  time?: string;
}) {
  const [selectedDate, setDate] = useState<ITime | null>(null);
  const { data, error } = useSWR<IMentor>(
    `/mentors/get_mentor?mentor_id=${mentorId}`,
    fetcher,
    {
      onSuccess(data) {
        const dateInQuery = data.times.find((t) => t.date === time);
        if (dateInQuery) setDate(dateInQuery);
      },
    }
  );

  async function reserve() {
    await fetcher("/mentors/reserve_mentor", {
      mentor_id: mentorId,
      date: selectedDate!.date,
      price_paid: data!.hourly_cost,
    });
  }

  if (error) return <ErrorHandler error={error} />;
  if (!data) return <Loading />;

  const timeTitle = selectedDate
    ? `زمان انتخاب شده: ${fa(
        moment(selectedDate.date)
          .locale("fa")
          .format("ddd D MMM YYYY - ساعت HH:mm")
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
              availableDates={data.times.map((d) => d.date)}
              reservedDates={data.times
                .filter((d) => d.reserved)
                .map((d) => d.date)}
              selectedDate={selectedDate?.date ?? null}
              onDateSelected={(date) => {
                if (date === null) return setDate(null);
                for (const source of data.times) {
                  const isSame = compareMoment(moment(source.date), date);
                  if (isSame) return setDate(source);
                }
              }}
            />
          </CardBody>
        </Card>
      </Col>

      <Col lg={{ size: 3, order: "last" }}>
        <Cart price={data.hourly_cost} disable={!selectedDate} next={reserve} />
      </Col>
    </Row>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      mentorId: context.params?.mentorId,
      time: context.query?.time ?? null,
    },
  };
};

ReserveMentor.title = "رزرو منتور";
ReserveMentor.dashboard = true;

function Cart({
  price,
  disable,
  next,
}: {
  price: number;
  disable?: boolean;
  next: () => void;
}) {
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
        <Button color="secondary">اعمال کد</Button>
      </div>
      <Button
        color="primary"
        disabled={disable}
        onClick={next}
        className="w-100"
      >
        خرید
      </Button>
    </>
  );
}

function Mentor({ mentor }: { mentor: IMentor }) {
  return (
    <div className="d-flex flex-row pb-3">
      <div className="p-1">
        <Avatar url={mentor.avatar_url} />
      </div>

      <div className="p-1">
        <h5 className="title mb-0">{mentor.name}</h5>
        <p className="text">{mentor.bio}</p>
        <p className="text">{mentor.resume}</p>
      </div>
    </div>
  );
}
