import { upload } from "client/client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "reactstrap";
import { Trash } from "react-bootstrap-icons";

export function UploadFile({
  fileId,
  label,
  onChange,
}: {
  fileId: string | null;
  label: string;
  onChange: (fileId: string | null) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const fileName = fileId ? fileRef.current?.files![0].name : null;

  return (
    <div className="mb-3">
      <label>{label}</label>
      <input
        className="mb-3 d-none"
        type="file"
        id="upload"
        ref={fileRef}
        onChange={async (e) => {
          const formData = new FormData();
          if (!e.target.files) return onChange(null);
          if (!e.target.files[0]) return onChange(null);

          formData.append("file", e.target.files[0]);
          // setUploading(true);
          const { id } = await upload(formData);
          onChange(id);
          // setUploading(false);
        }}
      />
      {!fileId && (
        <Button
          className="d-block"
          outline
          onClick={() => {
            if (!fileRef.current) return;
            fileRef.current.click();
          }}
        >
          انتخاب فایل
        </Button>
      )}
      {fileId && (
        <div>
          <label>{fileName ?? ""}</label>

          <Button
            size="sm"
            outline
            color="danger"
            className="border-0 ms-3 px-2"
            onClick={() => onChange(null)}
          >
            {<Trash size={20} className="pe-1" />}
            حذف فایل
          </Button>
        </div>
      )}
    </div>
  );
}
