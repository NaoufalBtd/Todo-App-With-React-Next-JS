import axios from "axios";
import { useRouter } from "next/router";

import Modal from "@/app/components/elements/Modal";
import ActionButtons from "@/app/components/elements/Modal/ActionButtons";
import { useDrawerContext } from "@/app/stores/drawerContext";
import { useListContext } from "@/app/stores/listContext";

export default function DeleteListModal({ open, handleClose }: IProps) {
  const { listId } = useListContext();
  const { setLists } = useDrawerContext();
  const router = useRouter();

  const saveTask = async () => {
    try {
      await axios.post("/api/delete-list", {
        listId,
      });
      setLists && setLists((state) => state.filter((el) => el.id !== listId));
      handleClose();
      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Are you sure to delete this list">
      <ActionButtons handleClick={saveTask} handleClose={handleClose} />
    </Modal>
  );
}

interface IProps {
  open: boolean;
  handleClose: () => void;
}
