import { fetcher } from "client/client";
import { Input, Button, Row, Col } from "reactstrap";
import useSWR from "swr";
import { IMentorFull, IUserFull } from "types";
import { Editable } from "components/Editable";
import { Loading } from "components/Loading";
import { CategoryPicker } from "components/CategoryPicker/CategoryPicker";
import { fa } from "utils/persian";
import { useState } from "react";
import { allCategories, getCategory } from "categories";

function useUserProfile() {
  const {
    data: user,
    error,
    mutate,
  } = useSWR<IUserFull | IMentorFull>("/users/get_me", fetcher);

  async function set(replacement: Partial<IUserFull | IMentorFull>) {
    mutate({ ...user!, ...(replacement as any) }, false);
    await fetcher("/users/edit_profile", replacement);
  }

  const isMentor = user?.is_mentor;

  return {
    name: user?.name,
    setName: (newName: string) => set({ name: newName }),

    phone: user?.phone?.replace("+98", "0"),

    email: user?.email,
    setEmail: (newEmail: string) => set({ email: newEmail }),

    resume: isMentor ? user?.resume : undefined,
    setResume: (newResume: string) => set({ resume: newResume }),

    bio: isMentor ? user?.bio : undefined,
    setBio: (newBio: string) => set({ bio: newBio }),

    hourlyCost: isMentor ? user?.hourly_cost : undefined,
    setHourlyCost: (newValue: number) => set({ hourly_cost: newValue }),

    categories: isMentor ? user?.categories.map(getCategory) : undefined,
    setCategories: (newValue: Category[]) =>
      set({ categories: newValue.map((c) => c.id) }),

    bankNo: isMentor ? user?.bank_no : undefined,
    setBankNo: (newValue: string) => set({ bank_no: newValue }),

    isMentor,
  };
}

interface Category {
  id: string;
  label: string;
}

export default function ProfilePage() {
  const {
    name,
    setName,
    phone,
    email,
    setEmail,
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
    isMentor,
  } = useUserProfile();

  if (!name) {
    return <Loading />;
  }

  return (
    <Row>
      <Col md={7}>
        <PrimaryField label="شماره همراه" defaultValue={fa(phone ?? "")} />
        <Editable label="ایمیل" value={email ?? ""} onChange={setEmail} />
        <Editable label="نام" value={name ?? ""} onChange={setName} />

        {isMentor && (
          <>
            <Editable label="مدرک تحصیلی" value={bio ?? ""} onChange={setBio} />
            <Editable
              label="سوابق"
              type="textarea"
              value={resume ?? ""}
              onChange={setResume}
            />
            <Editable
              label="هزینه ساعتی منتورینگ (تومان)"
              type="number"
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
          </>
        )}
      </Col>
    </Row>
  );
}

ProfilePage.dashboard = true;
ProfilePage.title = "ویرایش اطلاعات کاربری";

function PrimaryField({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue: string;
}) {
  return (
    <div>
      <label>{label}</label>
      <div className="d-flex flex-row w-100 pb-2">
        <Input type="text" value={defaultValue} disabled />
        <div>
          <Button className="ms-2">ویرایش</Button>
        </div>
      </div>
    </div>
  );
}
