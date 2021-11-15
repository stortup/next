import Image from "next/image";

export function Avatar({ url }: { url?: string | null }) {
  if (url) {
    return (
      <Image
        alt="avatar_url"
        className="rounded-circle"
        src={url}
        width={50}
        height={50}
      />
    );
  }

  return (
    <div
      className="rounded-circle"
      style={{ width: 50, height: 50, backgroundColor: "#AAA" }}
    ></div>
  );
}
