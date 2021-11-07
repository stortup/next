import { fetcher } from "client/client";
import { Input, Button, Row, Col } from "reactstrap";
import useSWR from "swr";
import { IMentorFull, IUserFull } from "types";
import { Editable } from "components/Editable";
import { Loading } from "components/Loading";
import { fa } from "utils/persian";

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

    resume: isMentor ? user?.resume : undefined,
    setResume: (newResume: string) => set({ resume: newResume }),

    bio: isMentor ? user?.bio : undefined,
    setBio: (newBio: string) => set({ bio: newBio }),

    isMentor,
  };
}

export default function ProfilePage() {
  const { name, setName, phone, resume, setResume, bio, setBio, isMentor } =
    useUserProfile();

  if (!name) {
    return <Loading />;
  }

  return (
    <Row>
      <Col md={7}>
        <PrimaryField label="شماره همراه" defaultValue={fa(phone ?? "")} />
        <Editable label="نام" value={name ?? ""} onChange={setName} />
        {isMentor && (
          <Editable label="مدرک تحصیلی" value={bio ?? ""} onChange={setBio} />
        )}
        {isMentor && (
          <Editable
            multiline
            label="سوابق"
            value={resume ?? ""}
            onChange={setResume}
          />
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
