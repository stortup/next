import { fetcher } from "client/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Col, Container, Row, Button } from "reactstrap";
import { Input } from "utils/Input";

const phoneRegex = /^0\d{10}$/;
const codeRegex = /^\d{5}$/;

function EnterPhoneStep({
  onComplete,
}: {
  onComplete: (phone: string) => void;
}) {
  const [phone, setPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendCode = async () => {
    setLoading(true);
    await fetcher("/users/send_code", {
      phone: phone!.replace("0", "+98"),
    });
    onComplete(phone!);
  };

  return (
    <div className="">
      <h1 className="text-center mb-5">ورود</h1>
      <div className="form-floating mb-3">
        <Input
          className="form-control"
          placeholder="09171233456"
          id="phone"
          type="tel"
          validate={(v) => phoneRegex.test(v)}
          onValue={setPhone}
        />
        <label htmlFor="phone">شماره تلفن</label>
      </div>

      <Button
        disabled={!phone}
        onClick={sendCode}
        color="primary"
        className="w-100"
      >
        ارسال کد
      </Button>
    </div>
  );
}

function EnterCodeStep({
  phone,
  next,
}: {
  phone: string;
  next: (accessToken: string) => void;
}) {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    const { access_token } = await fetcher("/users/enter_user", {
      phone: phone.replace("0", "+98"),
      code,
    });
    next(access_token);
  };

  return (
    <div className="">
      <h1 className="text-center mb-5">ورود</h1>
      <p className="mb-3">کد ارسال شده را وارد کنید</p>
      <div className="form-floating mb-3">
        <Input
          className="form-control text-center"
          placeholder="123456"
          id="code"
          type="number"
          validate={(v) => codeRegex.test(v)}
          onValue={setCode}
        />
        <label htmlFor="code">کد</label>
      </div>

      <Button
        disabled={!code}
        onClick={login}
        color="primary"
        className="w-100"
      >
        ورود
      </Button>
    </div>
  );
}

function LoginForm() {
  const [phone, setPhone] = useState<string | null>(null);
  const router = useRouter();

  function onUserEnter(token: string) {
    localStorage.setItem("access_token", token);
    router.push("/");
  }

  return (
    <>
      {phone === null && (
        <EnterPhoneStep onComplete={(phone) => setPhone(phone)} />
      )}
      {phone && <EnterCodeStep phone={phone} next={onUserEnter} />}
    </>
  );
}

export default function Login() {
  return (
    <Container fluid>
      <Row>
        <Col md={4} className="vh-100">
          <div className="d-flex align-items-center justify-content-center h-100">
            <LoginForm />
          </div>
        </Col>
        <Col className="d-none d-md-block vh-100 bg-info"></Col>
      </Row>
    </Container>
  );
}
