import DeleteModal from "@/components/ui/DeleteModal/DeleteModal";
import { useDeleteArea } from "../../hooks/useDeleteArea";
import { Area } from "@/types/Area";

interface AreaDeleteModalProps {
  closeModal: () => void;
  isModalOpen: boolean;
  areaToDelete?: Area | null;
}

const AreaDeleteModal = ({ closeModal, isModalOpen, areaToDelete }: AreaDeleteModalProps) => {
  const { mutate: deleteArea, isPending: isAreaDeleting } = useDeleteArea();

  const handleOnDelete = () => {
    if (!areaToDelete?.id) return;

    deleteArea(areaToDelete.id, {
      onSettled: () => {
        closeModal();
      },
    });
  };

  return (
    <DeleteModal
      title="Delete Area"
      closeModal={closeModal}
      isModalOpen={isModalOpen}
      resourceId={areaToDelete?.id}
      deleteText={`Are you sure you want to delete "${areaToDelete?.area_name}" area? This action cannot be undone.`}
      onDelete={handleOnDelete}
      isDeleting={isAreaDeleting}
    />
  );
};

export default AreaDeleteModal;
