import AreaModal from "../AreaModal/AreaModal";
import AreaDeleteModal from "../AreaDeleteModal/AreaDeleteModal";
import { Area } from "@/types/Area";

interface AreasModalManagerProps {
  modalType: "add" | "edit" | "delete" | null;
  isModalOpen: boolean;
  closeModal: () => void;
  selectedArea?: Area | null;
}

const AreasModalManager = ({ modalType, isModalOpen, closeModal, selectedArea }: AreasModalManagerProps) => {
  return (
    <>
      {(modalType === "add" || modalType === "edit") && (
        <AreaModal
          modalType={modalType === "add" ? "add" : "edit"}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          areaToEdit={selectedArea}
        />
      )}
      {modalType === "delete" && (
        <AreaDeleteModal closeModal={closeModal} isModalOpen={isModalOpen} areaToDelete={selectedArea} />
      )}
    </>
  );
};

export default AreasModalManager;
