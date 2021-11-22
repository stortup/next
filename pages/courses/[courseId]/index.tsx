import Head from "next/head";
import Link from "next/link";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Player } from "components/Player";
import { Clock, Person, CircleFill } from "react-bootstrap-icons";
import { useRouter } from "next/router";

function CourseInfo() {
  const title = "دوره جامع مدیریت مالی و جذب سرمایه";
  const description =
    "در این دوره شما اصول جذب سرمایه و صحبت با سرمایه گذار؛بررسی پیشنهاد هایمختلف از ونچر کپیتال های مختلف را می‌آموزید";

  const time = "۱ ساعت و ۲۰ دقیقه";

  // current course id from url
  const router = useRouter();
  const courseId = router.query.courseId;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="rounded p-4 mb-4" style={{ backgroundColor: "#f6f6f6" }}>
        <Row>
          <Col lg={7} className="d-flex flex-column">
            <h2>{title}</h2>
            <p>{description}</p>

            <p className="mt-auto">
              <Clock className="me-3" color="grey" />
              {time}
            </p>
            <p>
              <Person className="me-3" color="grey" />
              ارائه شده توسط:
              {"  "}
              <a href="https://www.linkedin.com/in/mohammad-mohseni-b9a8b9a1/">
                محمد علی محمدی
              </a>
            </p>
          </Col>
          <Col lg={5}>
            <Player />
          </Col>
        </Row>
      </div>
      <h5>قسمت های دوره</h5>
      <ListGroup>
        <ListGroupItem>
          <Link href={`/courses/${courseId}/1`}>
            <a>
              <strong>قسمت ۱</strong>
              <CircleFill size={5} className="mx-2" />
              طراحی تجربه کاربر؛ طراحی برای یوزر نهایی
            </a>
          </Link>
        </ListGroupItem>
        <ListGroupItem>
          <Link href={`/courses/${courseId}/2`}>
            <a>
              <strong>قسمت ۲</strong>
              <CircleFill size={5} className="mx-2" />
              طراحی تجربه کاربر؛ طراحی برای یوزر نهایی
            </a>
          </Link>
        </ListGroupItem>
      </ListGroup>
    </>
  );
}

CourseInfo.dashboard = true;

export default CourseInfo;
