import { layout } from "../podlet/podlet";

export default async function Home() {
  const [header] = await layout();

  return (
    <>
      <div>Hello world from Next</div>{" "}
      <div dangerouslySetInnerHTML={{ __html: header.content }} />
    </>
  );
}
