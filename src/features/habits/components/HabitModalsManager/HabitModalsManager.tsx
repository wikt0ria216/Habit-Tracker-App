import HabitModal from "../HabitModal/HabitModal";
import HabitDeleteModal from "../HabitDeleteModal/HabitDeleteModal";

interface HabitModalsManagerProps {
  modalType: "add" | "edit" | "delete" | null;
  isModalOpen: boolean;
  closeModal: () => void;
  habitId?: number;
}
const HabitModalsManager = ({
  modalType,
  isModalOpen,
  closeModal,
  habitId,
}: HabitModalsManagerProps) => {
  return (
    <>
      {(modalType === "add" || modalType === "edit") && (
        <HabitModal
          closeModal={closeModal}
          modalType={modalType === "add" ? "add" : "edit"}
          isModalOpen={isModalOpen}
          habitId={habitId}
        />
      )}
      {modalType === "delete" && (
        <HabitDeleteModal
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          habitId={habitId}
        />
      )}
    </>
  );
};

export default HabitModalsManager;
