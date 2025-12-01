import CustomButton from "@ui/CustomButton/CustomButton";
import Modal from "@ui/Modal/Modal";

import "./deletemodal.css";

interface DeleteModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  resourceId?: number;
  onDelete: (id: number) => void;
  title: string;
  deleteText: string;
  isDeleting: boolean;
}

const DeleteModal = ({
  title,
  isModalOpen,
  closeModal,
  isDeleting,
  deleteText,
  resourceId,
  onDelete,
}: DeleteModalProps) => {
  const onHandleDelete = () => {
    if (!resourceId) {
      return;
    }
    onDelete(resourceId);
  };

  return (
    <Modal
      title={title}
      isModalOpen={isModalOpen}
      onClose={closeModal}
      actions={
        <>
          <CustomButton variant="secondary" onClick={closeModal}>
            Cancel
          </CustomButton>
          <CustomButton
            variant="danger"
            onClick={onHandleDelete}
            isLoading={isDeleting}
            loadingMessage="Deleting"
          >
            Delete
          </CustomButton>
        </>
      }
    >
      <h3 className="modal-delete-title">Are you sure?</h3>
      <p className="modal-delete-text">{deleteText}</p>
    </Modal>
  );
};

export default DeleteModal;
