import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomButton from "@ui/CustomButton/CustomButton";
import FormInput from "@form/FormInput/FormInput";
import Modal from "@ui/Modal/Modal";

import { useAddArea } from "@/features/areas/hooks/useAddArea";
import { useEditArea } from "@/features/areas/hooks/useEditArea";

import "./areamodal.css";
import { Area } from "@/types/Area";

interface AreaModalFormProps {
  modalType: "add" | "edit";
  isModalOpen: boolean;
  closeModal: () => void;
  areaToEdit?: Area | null;
}

interface FormData {
  areaName: string;
}

const areaSchema = yup.object({
  areaName: yup
    .string()
    .required("Area name is required")
    .min(2, "Area name must be at least 2 characters long")
    .max(50, "Area name cannot exceed 50 characters"),
});

const AreaModal = ({ modalType, isModalOpen, closeModal, areaToEdit }: AreaModalFormProps) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(areaSchema),
    defaultValues: {
      areaName: "",
    },
    mode: "onChange",
  });

  const { mutate: addArea, isPending: addAreaPending } = useAddArea();
  const { mutate: editArea, isPending: editAreaPending } = useEditArea();

  const onAreaFormSubmit = (data: FormData) => {
    const { areaName } = data;

    if (modalType === "add") {
      addArea(areaName, {
        onSuccess: () => {
          closeModal();
        },
      });
    } else if (modalType === "edit" && areaToEdit) {
      editArea(
        { areaId: areaToEdit.id, areaName: areaName },
        {
          onSuccess: () => {
            closeModal();
          },
        }
      );
    }
  };

  useEffect(() => {
    if (modalType === "edit" && isModalOpen && areaToEdit) {
      reset({
        areaName: areaToEdit.area_name,
      });
    } else if (modalType === "add" && isModalOpen) {
      reset();
    }
  }, [isModalOpen, modalType, reset, areaToEdit]);

  const modalCancelAction = () => {
    closeModal();
  };

  return (
    <Modal
      title={modalType === "add" ? "Add new area" : "Edit area"}
      onClose={closeModal}
      isModalOpen={isModalOpen}
      actions={
        <>
          <CustomButton variant="secondary" onClick={modalCancelAction} type="button">
            Cancel
          </CustomButton>
          <CustomButton
            variant="accent"
            type="submit"
            isLoading={addAreaPending || editAreaPending}
            loadingMessage="Saving"
            form="area-form"
          >
            Save
          </CustomButton>
        </>
      }
    >
      <form onSubmit={handleSubmit(onAreaFormSubmit)} className="area-form" id="area-form" noValidate>
        <FormInput
          label="Area Name"
          id="area-name"
          isRequired
          placeholder={modalType === "add" ? "Area name" : "New area name"}
          autoComplete="off"
          {...register("areaName")}
          error={errors.areaName?.message}
        />
      </form>
    </Modal>
  );
};

export default AreaModal;
