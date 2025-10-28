import AreaModal from "../AreaModal/AreaModal";
import AreaDeleteModal from "../AreaDeleteModal/AreaDeleteModal";

interface AreasModalManagerProps {
  modalType: "add" | "edit" | "delete" | null;
  isModalOpen: boolean;
  closeModal: () => void;
  areaId?: number;
}

const AreasModalManager = ({
  modalType,
  isModalOpen,
  closeModal,
  areaId,
}: AreasModalManagerProps) => {
  return (
    <>
      {(modalType === "add" || modalType === "edit") && (
        <AreaModal
          modalType={modalType === "add" ? "add" : "edit"}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          areaId={areaId}
        />
      )}
      {modalType === "delete" && (
        <AreaDeleteModal
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          areaId={areaId}
        />
      )}
    </>
  );
};

export default AreasModalManager;
