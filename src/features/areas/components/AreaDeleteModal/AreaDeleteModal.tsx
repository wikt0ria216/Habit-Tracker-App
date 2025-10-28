import DeleteModal from "@/components/ui/DeleteModal/DeleteModal";
import { useDeleteArea } from "../../hooks/useDeleteArea";

interface AreaDeleteModalProps {
  closeModal: () => void;
  isModalOpen: boolean;
  areaId: number | undefined;
}

const AreaDeleteModal = ({ closeModal, isModalOpen, areaId }: AreaDeleteModalProps) => {
  const { mutate: deleteArea, isPending: isAreaDeleting } = useDeleteArea();

  const handleOnDelete = (areaId: number) => {
    deleteArea(areaId, {
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
      resourceId={areaId}
      deleteText="Are you sure you want to delete this area? This action cannot be undone."
      onDelete={handleOnDelete}
      isDeleting={isAreaDeleting}
    />
  );
};

export default AreaDeleteModal;
