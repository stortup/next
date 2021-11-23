import { fetcher } from "client/client";
import { MentorDateTimePicker } from "components/DateTimePicker/mentor/MentorDateTimePicker";
import { ErrorHandler } from "components/ErrorHandler";
import moment, { Moment } from "jalali-moment";
import { useState } from "react";
import { Button } from "reactstrap";
import useSWR from "swr";
import { ITime } from "types";

// type MomentTimes = ITime & {
//   start_date: Moment;
// };

function useTimes() {
  const [currentDates, _setDates] = useState<Moment[]>([]);
  const [reservedDates, _setReservedDates] = useState<Moment[]>([]);
  const [changed, setChanged] = useState<boolean>(false);

  const {
    data: times,
    error,
    mutate,
  } = useSWR<ITime[]>("/mentors/get_my_times", fetcher, {
    onSuccess(times) {
      _setDates(times.map((time) => moment(time.date)));
      _setReservedDates(
        times.filter((t) => t.reserved).map((time) => moment(time.date))
      );
    },
  });

  function setDates(dates: Moment[]) {
    setChanged(true);
    _setDates(dates);
  }

  async function save() {
    const replace = currentDates.map((date) => {
      return {
        date: date.toISOString(),
        duration: 60,
        reserved: false,
      };
    });

    await fetcher("/mentors/set_my_times", {
      times: replace,
    });

    setChanged(false);
    mutate(replace, false);
  }

  return {
    dates: currentDates,
    reservedDates,
    setDates,
    error,
    save,
    changed,
  };
}

export default function MyTimes() {
  const { dates, error, setDates, save, changed, reservedDates } = useTimes();

  if (error) return <ErrorHandler error={error} />;

  return (
    <>
      <MentorDateTimePicker
        dates={dates}
        reservedDates={reservedDates}
        setDates={setDates}
      />
      <div className="text-center pt-3" onClick={save}>
        <Button disabled={!changed} color="primary">
          ذخیره
        </Button>
      </div>
    </>
  );
}

MyTimes.title = "تعیین زمان منتورینگ";
MyTimes.dashboard = true;
