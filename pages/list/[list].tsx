import ListTemplate from "@/app/components/templates/List";
import axios from "axios";
import { getSession } from "next-auth/react";

export default function List({ list }: any) {
  list = JSON.parse(list);
  return (
    <ListTemplate
      listTitle={list.title}
      listTasks={list.tasks}
      listId={list.id}
      listIcon={list.icon}
    />
  );
}

export async function getServerSideProps({ query, req }: any) {
  try {
    const session = await getSession({ req });
    if (!session?.user) {
      throw new Error("Invalid Session");
    }
    const res = await axios.post(
      `${process.env.SITE_URL}api/lists/${query.list}`,
      {
        ownerId: session.user.id,
      }
    );

    return { props: { list: JSON.stringify(res.data.payload.lists[0]) } };
  } catch (error) {
    console.error(error);
    return { props: { list: "[]" } };
  }
}
