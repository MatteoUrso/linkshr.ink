import { getData } from "@/actions/todo";

export default async function Page() {
  const data = await getData();
  console.log(data);

  return null;
}
