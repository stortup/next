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

interface BecomeMentorParams {
  resume: string;
  bio: string;
  hourly_cost: number;
  categories: string[];
  bank_no: string;
}

function useUserProfile() {
  // const {
  //   data: user,
  //   error,
  //   mutate,
  // } = useSWR<IUserFull | IMentorFull>("/users/get_me", fetcher);
  const [params, setParams] = useState<Partial<BecomeMentorParams>>({});

  async function set(replacement: Partial<BecomeMentorParams>) {
    setParams({ ...params!, ...replacement });
    // mutate({ ...user!, ...(replacement as any) }, false);
    // await fetcher("/users/edit_profile", replacement);
  }

  return {
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
  };
}

interface Category {
  id: string;
  label: string;
}

export default function BecomeMentorPage() {
  const {
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
  } = useUserProfile();

  return (
    <Row>
      <Col md={7}>
        {
          <>
            <Editable
              label="مدرک تحصیلی"
              value={bio ?? ""}
              onChange={setBio}
              minLength={10}
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
            <Button color="primary">ارسال درخواست</Button>
          </>
        }
      </Col>
    </Row>
  );
}

BecomeMentorPage.dashboard = true;
BecomeMentorPage.title = "منتور شدن";
