import { fetcher } from "client/client";
import { ErrorHandler } from "components/ErrorHandler";
import { Loading } from "components/Loading";
import { Player } from "components/courses/Player";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Clock, PlayFill } from "react-bootstrap-icons";
import { ListGroup, ListGroupItem } from "reactstrap";
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
  thumbnail: string;
}

function EpisodePage({ courseId, eid }: { courseId: string; eid: string }) {
  const { data, error } = useSWR<Course>(
    `/courses/get_course?course_id=${courseId}`,
    fetcher
  );

  if (error) return <ErrorHandler error={error} />;
  if (!data) return <Loading />;

  const episodeId = Number(eid);
  const episode = data.episodes[episodeId - 1];

  return (
    <>
      <Head>
        <title>{episode.title}</title>
      </Head>

      <Player src={episode.video} />
      <h4 className="pt-4">{episode.title}</h4>
      <hr />
      <ListGroup flush className="py-4">
        {data.episodes.map((e, i) => (
          <EpisodeListItem
            key={i}
            {...e}
            episodeNum={i + 1}
            courseId={courseId}
            current={i + 1 === episodeId}
          />
        ))}
      </ListGroup>
    </>
  );
}

function EpisodeListItem({
  title,
  thumbnail,
  episodeNum,
  courseId,
  current,
}: Episode & { episodeNum: number; courseId: string; current: boolean }) {
  const time = "۱۲:۰۰";

  return (
    <ListGroupItem>
      <Link href={`/courses/${courseId}/${episodeNum}`}>
        <a className="d-flex align-items-center">
          <div
            className="bg-secondary text-white text-center rounded-circle p-1 me-3"
            style={{ width: 30, height: 30 }}
          >
            {current ? (
              <PlayFill />
            ) : (
              <p className="fw-bold">{fa(episodeNum)}</p>
            )}
          </div>
          <VideoThumbnail src={thumbnail} />
          <p className="ps-3 my-0">{title}</p>
          <p className="ms-auto my-0">
            <Clock className="me-3" color="grey" />
            {time}
          </p>
        </a>
      </Link>
    </ListGroupItem>
  );
}

function VideoThumbnail({ src }: { src?: string }) {
  return (
    <div
      style={{
        width: 160,
        height: 90,
        backgroundColor: "#eee",
        overflow: "hidden",
      }}
    >
      {src && <img src={src} className="w-100" alt="Video thumbnail" />}
    </div>
  );
}

EpisodePage.dashboard = true;

export default EpisodePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      courseId: context.params?.courseId,
      eid: context.params?.eid,
    },
  };
};
