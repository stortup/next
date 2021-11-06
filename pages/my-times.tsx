import { fetcher } from "client/client";
import { MentorDateTimePicker } from "components/DateTimePicker/mentor/MentorDateTimePicker";
import { Button } from "reactstrap";
import useSWR from "swr";

function useTimes() {
  const { data, error } = useSWR("/mentors/my-times", fetcher);
}

export default function MyTimes() {
  return (
    <>
      <MentorDateTimePicker />
      <div className="text-center pt-3">
        <Button color="primary">ذخیره</Button>
      </div>
    </>
  );
}

MyTimes.title = "زمان های منتورینگ من";
MyTimes.dashboard = true;
