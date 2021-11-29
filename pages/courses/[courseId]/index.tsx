import { fetcher } from "client/client";
import { ErrorHandler } from "components/ErrorHandler";
import { Loading } from "components/Loading";
import { Player } from "components/courses/Player";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { CircleFill, Clock, Person } from "react-bootstrap-icons";
import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import useSWR from "swr";
import { fa } from "utils/persian";

interface Course {
  id: string;
  title: string;
  description: string;
  creator: {
    name: string;
    bio: string;
  };
  episodes: Episode[];
}

interface Episode {
  title: string;
  video: string;
}

function CourseInfo({ courseId }: { courseId: string }) {
  const { data, error } = useSWR<Course>(
    `/courses/get_course?course_id=${courseId}`,
    fetcher
  );

  if (error) return <ErrorHandler error={error} />;
  if (!data) return <Loading />;

  const time = "۱ ساعت و ۲۰ دقیقه";

  // current course id from url

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <div className="rounded p-4 mb-4" style={{ backgroundColor: "#f6f6f6" }}>
        <Row>
          <Col lg={7} className="d-flex flex-column">
            <h2>{data.title}</h2>
            <p>{data.description}</p>

            <p className="mt-auto">
              <Clock className="me-3" color="grey" />
              {time}
            </p>
            <p>
              <Person className="me-3" color="grey" />
              ارائه شده توسط:
              {"  "}
              <a href="https://www.linkedin.com/in/mohammad-mohseni-b9a8b9a1/">
                {data.creator.name}
              </a>
            </p>
          </Col>
          <Col lg={5}>
            <Player src={data.episodes[0].video} />
          </Col>
        </Row>
      </div>
      <h5>قسمت های دوره</h5>
      <ListGroup>
        {data.episodes.map((e, i) => (
          <Episode key={i} {...e} episodeNum={i + 1} courseId={courseId} />
        ))}
      </ListGroup>
    </>
  );
}

CourseInfo.dashboard = true;
CourseInfo.searchBar = true;

export default CourseInfo;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      courseId: context.params?.courseId,
    },
  };
};

function Episode({
  title,
  episodeNum,
  courseId,
}: Episode & { episodeNum: number; courseId: string }) {
  return (
    <ListGroupItem>
      <Link href={`/courses/${courseId}/${episodeNum}`}>
        <a>
          <strong>قسمت {fa(episodeNum)}</strong>
          <CircleFill size={5} className="mx-2" />
          {title}
        </a>
      </Link>
    </ListGroupItem>
  );
}
