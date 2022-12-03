import type { IList } from "@/app/stores/drawerContext";
import { useEffect, useState } from "react";

import useSWR from "swr";
import { fetcher } from "../../../utils/api";

import Skelton from "../../elements/Skeleton";
import ListsNavView from "./ListsNavView";

export default function ListNav() {
  const [taskCats, setTaskCats] = useState<IList[] | []>([]);
  const [areCatsLoading, setAreCatsLoading] = useState<boolean>(false);
  const [addListModalOpen, setAddListModalOpen] = useState(false);
  const { data, error } = useSWR<{ payload: { lists: IList[] } }>(
    "/api/lists",
    fetcher
  );

  useEffect(() => {
    if (data) {
      setTaskCats(data.payload.lists);
    }
  }, [data]);

  const handleOpen = () => setAddListModalOpen(true);
  const handleClose = () => setAddListModalOpen(false);

  if (error) return <div>failed to load</div>;
  if (!data || areCatsLoading) return <Skelton />;

  return (
    <ListsNavView
      lists={taskCats}
      setTaskCats={setTaskCats}
      setAreCatsLoading={setAreCatsLoading}
      handleOpen={handleOpen}
      addListModalOpen={addListModalOpen}
      handleClose={handleClose}
    />
  );
}
