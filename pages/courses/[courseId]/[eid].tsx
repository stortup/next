import Head from "next/head";
import Link from "next/link";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Player } from "components/Player";
import { Clock, Person } from "react-bootstrap-icons";

function EpisodePage() {
  const title = "طراحی تجربه کاربر؛ طراحی برای یوزر نهایی";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Player />
      <h4 className="pt-4">{title}</h4>
      <hr />
      <ListGroup flush className="py-4">
        <EpisodeListItem />
        <EpisodeListItem />
        <EpisodeListItem />
      </ListGroup>
    </>
  );
}

function EpisodeListItem() {
  const i = "۱";
  const title = "طراحی تجربه کاربر؛ طراحی برای یوزر نهایی";
  const time = "۱۲:۰۰";

  return (
    <ListGroupItem className="d-flex align-items-center">
      <div
        className="bg-secondary text-white text-center rounded-circle p-1 me-3"
        style={{ width: 30, height: 30 }}
      >
        <p className="fw-bold">{i}</p>
      </div>
      <VideoThumbnail />
      <p className="ps-3">{title}</p>
      <p className="ms-auto">
        <Clock className="me-3" color="grey" />
        {time}
      </p>
    </ListGroupItem>
  );
}

function VideoThumbnail() {
  return (
    <div style={{ width: 160, height: 90, backgroundColor: "#eee" }}></div>
  );
}

EpisodePage.dashboard = true;

export default EpisodePage;
