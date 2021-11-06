import { fetcher } from "client/client";
import { Input, Button, Row, Col } from "reactstrap";
import useSWR from "swr";
import { IUser } from "types";
import { Editable } from "components/Editable";
import { Loading } from "components/Loading";
import { fa } from "utils/persian";

function useUserProfile() {
  const { data: user, error, mutate } = useSWR<IUser>("/users/get_me", fetcher);

  async function setName(newName: string) {
    mutate({ ...user!, name: newName }, false);
    await fetcher("/users/edit_profile", { name: newName });
  }

  return {
    name: user?.name,
    phone: user?.phone?.replace("+98", "0"),
    setName,
  };
}

export default function ProfilePage() {
  const { name, setName, phone } = useUserProfile();

  if (!name) {
    return <Loading />;
  }

  return (
    <Row>
      <Col md={7}>
        <PrimaryField label="شماره همراه" defaultValue={fa(phone ?? "")} />
        <Editable label="نام" value={name ?? ""} onChange={setName} />
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
