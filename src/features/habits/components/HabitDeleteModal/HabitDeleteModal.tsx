import DeleteModal from "@/components/ui/DeleteModal/DeleteModal";
import { useDeleteHabit } from "../../hooks/useDeleteHabit";
import { Habit } from "@/types/Habit";

interface HabitDeleteModalProps {
  closeModal: () => void;
  isModalOpen: boolean;
  habitToDelete?: Habit | null;
}

const HabitDeleteModal = ({ closeModal, isModalOpen, habitToDelete }: HabitDeleteModalProps) => {
  const { mutate: deleteHabit, isPending: isHabitDeleteing } = useDeleteHabit();

  const onHandleDelete = () => {
    if (!habitToDelete?.id) return;

    deleteHabit(habitToDelete.id, {
      onSettled: () => {
        closeModal();
      },
    });
  };

  return (
    <DeleteModal
      title="Delete Habit"
      closeModal={closeModal}
      isModalOpen={isModalOpen}
      resourceId={habitToDelete?.id}
      deleteText={`Are you sure you want to delete "${habitToDelete?.habit_name}" habit? This action cannot be undone.`}
      onDelete={onHandleDelete}
      isDeleting={isHabitDeleteing}
    />
  );
};

export default HabitDeleteModal;
