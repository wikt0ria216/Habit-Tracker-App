import HabitModal from "../HabitModal/HabitModal";
import HabitDeleteModal from "../HabitDeleteModal/HabitDeleteModal";
import { Habit } from "@/types/Habit";

interface HabitModalsManagerProps {
  modalType: "add" | "edit" | "delete" | null;
  isModalOpen: boolean;
  closeModal: () => void;
  selectedHabit?: Habit | null;
}
const HabitModalsManager = ({ modalType, isModalOpen, closeModal, selectedHabit }: HabitModalsManagerProps) => {
  return (
    <>
      {(modalType === "add" || modalType === "edit") && (
        <HabitModal
          closeModal={closeModal}
          modalType={modalType === "add" ? "add" : "edit"}
          isModalOpen={isModalOpen}
          habitToEdit={selectedHabit}
        />
      )}
      {modalType === "delete" && (
        <HabitDeleteModal closeModal={closeModal} isModalOpen={isModalOpen} habitToDelete={selectedHabit} />
      )}
    </>
  );
};

export default HabitModalsManager;
