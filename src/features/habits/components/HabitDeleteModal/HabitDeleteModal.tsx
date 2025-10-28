import DeleteModal from "@/components/ui/DeleteModal/DeleteModal";
import { useDeleteHabit } from "../../hooks/useDeleteHabit";

interface HabitDeleteModalProps {
  closeModal: () => void;
  isModalOpen: boolean;
  habitId: number | undefined;
}

const HabitDeleteModal = ({ closeModal, isModalOpen, habitId }: HabitDeleteModalProps) => {
  const { mutate: deleteHabit, isPending: isHabitDeleteing } = useDeleteHabit();

  const onHandleDelete = () => {
    if (!habitId) return;

    deleteHabit(habitId, { onSettled: () => closeModal() });
  };

  return (
    <DeleteModal
      title="Delete Habit"
      closeModal={closeModal}
      isModalOpen={isModalOpen}
      resourceId={habitId}
      deleteText="Are you sure you want to delete this habit? This action cannot be undone."
      onDelete={onHandleDelete}
      isDeleting={isHabitDeleteing}
    />
  );
};

export default HabitDeleteModal;
