import React, { useRef, useState } from "react";
import { Trash } from "react-bootstrap-icons";
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  ListGroup,
  ListGroupItem,
  Progress,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Upload } from "tus-js-client";
import { Clock } from "react-bootstrap-icons";
import { fa } from "utils/persian";

interface Episode {
  title: string;
  link: string;
}

function useCourseMaker() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [demoVideo, setDemoVideo] = useState(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  return {
    title,
    description,
    demoVideo,
    episodes,
    setTitle,
    setDescription,
    setDemoVideo,
    addEpisode: (episode: Episode) => {
      setEpisodes([...episodes, episode]);
    },
    removeEpisode: (index: number) => {
      setEpisodes([...episodes.slice(0, index), ...episodes.slice(index + 1)]);
    },
    valid:
      title.length > 0 &&
      description.length > 0 &&
      demoVideo &&
      episodes.length > 0,
  };
}

export default function UploadCourse() {
  const {
    title,
    description,
    demoVideo,
    episodes,
    setTitle,
    setDescription,
    setDemoVideo,
    addEpisode,
    removeEpisode,
    valid,
  } = useCourseMaker();

  return (
    <>
      <div className="rounded p-4 mb-4" style={{ backgroundColor: "#f6f6f6" }}>
        <Row>
          <Col lg={8} className="d-flex flex-column">
            <label>عنوان دوره</label>
            <Input onChange={(e) => setTitle(e.target.value)} size={20} />
            <label>توضیحات دوره</label>
            <Input onChange={(e) => setDescription(e.target.value)} />
          </Col>
          <Col lg={4}>
            <DemoUploader />
          </Col>
        </Row>
      </div>
      <ListGroup className="py-4">
        {episodes.map((e, i) => (
          <EpisodeListItem
            key={i}
            {...e}
            episodeNum={i + 1}
            onDelete={() => removeEpisode(i)}
          />
        ))}
      </ListGroup>
      <EpisodeUploader onSave={addEpisode} />
      <Button disabled={!valid} color="primary" className="ms-2">
        ذخیره
      </Button>
    </>
  );
}

UploadCourse.dashboard = true;

function EpisodeListItem({
  title,
  episodeNum,
  onDelete,
}: {
  title: string;
  episodeNum: number;
  onDelete?: () => void;
}) {
  const time = "۱۲:۰۰";

  return (
    <ListGroupItem className="d-flex align-items-center">
      <p className="fs-4 fw-bold m-0">{fa(episodeNum)}</p>
      <p className="ps-3 my-0">{title}</p>
      <p className="ms-auto my-0">
        <Clock className="me-3" color="grey" />
        {time}
      </p>
      <Button
        outline
        className="border-0 ms-3 rounded-circle p-2"
        onClick={onDelete}
      >
        <Trash size={20} />
      </Button>
    </ListGroupItem>
  );
}

function useVideoUpload(sandbox?: boolean) {
  const [status, setStatus] = useState(0); // 0: not started, 1: uploading, 2: uploaded
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [upload, setUpload] = useState<Upload | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  async function start(file: File) {
    const u = new Upload(file, {
      endpoint: "http://localhost:4004/vod/files",
      retryDelays: [0, 3000, 5000, 10000, 20000],
      metadata: {
        filename: file.name,
        filetype: file.type,
      },
      onError: function (error) {
        console.log("Failed because: " + error);
        setError(true);
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        setProgress(~~((bytesUploaded / bytesTotal) * 100));
      },
      onSuccess: function () {
        setStatus(2);
        0;
      },
    });

    if (sandbox) {
      setUpload(u);
      setProgress(100);
      setStatus(2);
      return;
    }

    const previousUploads = await u.findPreviousUploads();
    if (previousUploads.length) {
      u.resumeFromPreviousUpload(previousUploads[0]);
    }

    // Start the upload
    u.start();

    setUpload(u);
    setStatus(1);
  }

  function cancel() {
    upload?.abort(true);

    reset();
  }

  function reset() {
    setStatus(0);
    setProgress(0);
    setUpload(null);
  }

  return {
    fileRef,
    videoUrl: upload?.url,
    status,
    error,
    progress,
    start,
    cancel,
    reset,
  };
}

function EpisodeUploader({ onSave }: { onSave: (e: Episode) => void }) {
  let { status, videoUrl, error, start, cancel, fileRef, progress, reset } =
    useVideoUpload(true);
  const [title, setTitle] = useState("");

  let color = "primary";
  if (error) color = "danger";
  if (status === 2) color = "success";

  const valid = status === 2 && title.length > 5;

  return (
    <>
      <input
        className="mb-3 d-none"
        type="file"
        id="upload"
        ref={fileRef}
        onChange={async (e) => {
          if (!e.target.files) return cancel();
          if (!e.target.files[0]) return cancel();
          start(e.target.files[0]);
        }}
      />
      <Button
        outline
        color="primary"
        onClick={() => {
          if (!fileRef.current) return;
          fileRef.current.click();
        }}
      >
        آپلود قسمت جدید
      </Button>
      <Modal isOpen={status !== 0}>
        <ModalHeader>
          <span>آپلود قسمت جدید</span>
        </ModalHeader>
        <ModalBody>
          <label htmlFor="title">عنوان</label>
          <Input
            type="text"
            name="title"
            id="title"
            className="mb-3"
            onChange={(e) => setTitle(e.target.value)}
          />

          <Button
            outline
            color="primary"
            className="me-2"
            disabled={!valid}
            onClick={() => {
              onSave({ title, link: videoUrl! });
              reset();
            }}
          >
            تایید
          </Button>
          <Button outline className="border-0" onClick={cancel}>
            انصراف
          </Button>
        </ModalBody>
        <Progress
          animated={status === 1}
          color={color}
          className="m-1"
          value={progress}
          style={{ height: 6 }}
        />
      </Modal>
    </>
  );
}

function DemoUploader() {
  const { status, error, start, cancel, fileRef, progress } = useVideoUpload();

  if (status === 0) {
    return (
      <>
        <input
          className="mb-3 d-none"
          type="file"
          id="upload"
          ref={fileRef}
          onChange={async (e) => {
            if (!e.target.files) return cancel();
            if (!e.target.files[0]) return cancel();
            start(e.target.files[0]);
          }}
        />
        <button
          className="border w-100 h-100 d-flex aligns-items-center justify-content-center"
          onClick={() => {
            if (!fileRef.current) return;
            fileRef.current.click();
          }}
        >
          <p className="my-auto">آپلود دمو</p>
        </button>
      </>
    );
  }

  let color = "primary";
  if (error) color = "danger";
  if (status === 2) color = "success";

  return (
    <Card className="d-flex h-100 aligns-items-center justify-content-center">
      <div className="text-center">
        <Button outline className="border-0 rounded-circle p-2">
          <Trash size={20} />
        </Button>
      </div>
      <Progress
        animated={status === 1}
        color={color}
        className="m-1"
        value={progress}
        style={{ height: 5 }}
      />
    </Card>
  );
}
