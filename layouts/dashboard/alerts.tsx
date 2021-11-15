import { fetcher } from "client/client";
import useSWR from "swr";
import { ErrorHandler } from "components/ErrorHandler";
import { IUser } from "types";
import { Alert, Button } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";

export function UserIncompleteProfileAlert() {
  const { data, error } = useSWR<IUser>("/users/get_me", fetcher);
  const router = useRouter();

  if (error) return <ErrorHandler error={error} />;
  if (!data) return null;

  const complete = data.name && data.phone && data.email;

  if (complete) return null;

  const path = router.pathname;
  if (path === "/profile") return null;

  return (
    <Alert color="warning">
      اطلاعات کاربری شما ناقص است.
      <Button color="warning" className="ms-3">
        <Link href="/profile">
          <a>تکمیل اطلاعات</a>
        </Link>
      </Button>
    </Alert>
  );
}
