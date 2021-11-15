import { fetcher, upload } from "client/client";
import { Alert, Button, Row, Col, Input } from "reactstrap";
import { IMentorFull, IUserFull } from "types";
import { Editable } from "components/Editable";
import { UploadFile } from "components/Upload";
import { CategoryPicker } from "components/CategoryPicker/CategoryPicker";
import { fa } from "utils/persian";
import { useRef, useState } from "react";
import { allCategories, getCategory } from "categories";

interface BecomeMentorParams {
  resume: string;
  bio: string;
  hourly_cost: number;
  categories: string[];
  bank_no: string;
  file_id: string;
}

function useUserProfile() {
  // const {
  //   data: user,
  //   error,
  //   mutate,
  // } = useSWR<IUserFull | IMentorFull>("/users/get_me", fetcher);
  const [params, setParams] = useState<Partial<BecomeMentorParams>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  console.log(params);
  const valid =
    !!params.resume &&
    !!params.bio &&
    !!params.hourly_cost &&
    !!params.file_id &&
    params.categories &&
    params.categories.length > 0;

  async function set(replacement: Partial<BecomeMentorParams>) {
    setParams({ ...params!, ...replacement });
    // mutate({ ...user!, ...(replacement as any) }, false);
    // await fetcher("/users/edit_profile", replacement);
  }

  function unset(key: keyof BecomeMentorParams) {
    const newParams = { ...params };
    delete newParams[key];
    setParams(newParams);
  }

  async function send() {
    setSending(true);
    await fetcher("/mentors/send_mentoring_request", params);
    setSent(true);
    // fetcher("/users/become_mentor", params).then(() => {
    //   setSent(false);
    // });
  }

  return {
    disabled: !valid || sending,
    sent,
    send,

    resume: params.resume,
    setResume: (newResume: string) => set({ resume: newResume }),

    bio: params.bio,
    setBio: (newBio: string) => set({ bio: newBio }),

    hourlyCost: params.hourly_cost,
    setHourlyCost: (newValue: number) => set({ hourly_cost: newValue }),

    categories: params.categories?.map(getCategory) ?? [],
    setCategories: (newValue: Category[]) =>
      set({ categories: newValue.map((c) => c.id) }),

    bankNo: params.bank_no,
    setBankNo: (newValue: string) => set({ bank_no: newValue }),

    fileId: params.file_id,
    setFileId: (newValue: string | null) =>
      newValue ? set({ file_id: newValue }) : unset("file_id"),
  };
}

interface Category {
  id: string;
  label: string;
}

export default function BecomeMentorPage() {
  const {
    disabled,
    sent,
    send,
    // form params
    resume,
    setResume,
    bio,
    setBio,
    hourlyCost,
    setHourlyCost,
    categories,
    setCategories,
    bankNo,
    setBankNo,
    fileId,
    setFileId,
  } = useUserProfile();

  return (
    <Row>
      {sent && <SuccessMessage />}
      <Col md={7}>
        {
          <>
            <Editable
              label="مدرک تحصیلی"
              value={bio ?? ""}
              onChange={setBio}
              minLength={5}
            />
            <Editable
              type="textarea"
              label="سوابق"
              minLength={10}
              value={resume ?? ""}
              onChange={setResume}
            />
            <Editable
              type="number"
              label="هزینه ساعتی منتورینگ (تومان)"
              value={hourlyCost?.toString() ?? ""}
              pattern={/^\d+$/}
              onChange={(value) => setHourlyCost(Number(value))}
            />
            <CategoryPicker
              label="حوزه های فعالیت"
              selected={categories ?? []}
              all={allCategories}
              setSelected={setCategories}
            />
            <Editable
              label="شماره جساب"
              type="number"
              value={bankNo ?? ""}
              pattern={/^\d+$/}
              onChange={setBankNo}
            />
            <UploadFile
              label="فایل مدرک"
              fileId={fileId ?? null}
              onChange={setFileId}
            />

            <Button disabled={disabled} onClick={send} color="primary">
              ارسال درخواست
            </Button>
          </>
        }
      </Col>
    </Row>
  );
}

BecomeMentorPage.dashboard = true;
BecomeMentorPage.title = "منتور شدن";

function SuccessMessage() {
  return (
    <Alert>
      <h4 className="alert-heading">درخواست منتورینگ ارسال شد</h4>
      <p>با تشکر از شما برای تکمیل درخواست شما به حال بررسی می شود.</p>
    </Alert>
  );
}
