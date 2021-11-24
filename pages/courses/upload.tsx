import React, { useRef, useState } from "react";
import { Trash } from "react-bootstrap-icons";
import { Button, Card, CardBody, Col, Input, Progress, Row } from "reactstrap";
import { Upload } from "tus-js-client";

export default function UploadVideoPage() {
  return (
    <>
      <div className="rounded p-4 mb-4" style={{ backgroundColor: "#f6f6f6" }}>
        <Row>
          <Col lg={7} className="d-flex flex-column">
            <label>عنوان دوره</label>
            <Input size={20} />
            <label>توضیحات دوره</label>

            <Input />
          </Col>
          <Col lg={5}>
            <div className="d-flex justify-content-center mt-4">
              <VideoUploader label="آپلود ویدیو مقدمه" />
            </div>
          </Col>
        </Row>
      </div>

      <VideoUploader label="اپلود قسمت جدید" />
    </>
  );
}

function useVideoUpload() {
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
    if (upload) {
      return upload.abort(true);
    }
  }

  return {
    fileRef,
    status,
    error,
    progress,
    start,
    cancel,
  };
}

function VideoUploader({
  label,
  withTitle,
}: {
  label: string;
  withTitle?: boolean;
}) {
  const { status, error, start, cancel, fileRef, progress } = useVideoUpload();
  const [title, setTitle] = useState("");

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
        <Button
          outline
          color="primary"
          className="text"
          onClick={() => {
            if (!fileRef.current) return;
            fileRef.current.click();
          }}
        >
          {label}
        </Button>
      </>
    );
  }

  let color = "primary";
  if (error) color = "danger";
  if (status === 2) color = "success";

  const valid = status === 2 && title.length > 5;

  return (
    <Card style={{ width: 400 }}>
      <CardBody>
        {withTitle && (
          <>
            <label htmlFor="title">عنوان</label>
            <Input
              type="text"
              name="title"
              id="title"
              className="mb-3"
              onChange={(e) => setTitle(e.target.value)}
            />
          </>
        )}

        <div className="d-flex justify-content-between">
          {withTitle && (
            <Button outline color="primary" disabled={!valid}>
              تایید
            </Button>
          )}
          <Button
            outline
            color="danger"
            className="border-0 rounded-circle p-2"
            disabled={!valid}
          >
            <Trash size={20} />
          </Button>
        </div>
      </CardBody>
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

UploadVideoPage.dashboard = true;
