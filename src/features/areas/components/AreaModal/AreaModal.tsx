import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomButton from "@ui/CustomButton/CustomButton";
import FormInput from "@form/FormInput/FormInput";
import Modal from "@ui/Modal/Modal";

import { useAddArea } from "@/features/areas/hooks/useAddArea";
import { useEditArea } from "@/features/areas/hooks/useEditArea";
import { useAreaById } from "@/features/areas/hooks/useAreaById";

import "./areamodal.css";

interface AreaModalFormProps {
  modalType: "add" | "edit";
  isModalOpen: boolean;
  closeModal: () => void;
  areaId?: number;
}

interface FormData {
  areaName: string;
}

const areaSchema = yup.object({
  areaName: yup.string().required("Area name is required").min(2, "Area name must be at least 2 characters"),
});

const AreaModal = ({ modalType, isModalOpen, areaId, closeModal }: AreaModalFormProps) => {
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
  });

  const { mutate: addArea, isPending: addAreaPending } = useAddArea();
  const { mutate: editArea, isPending: editAreaPending } = useEditArea();
  const { data: areaById, isLoading: areaByIdIsLoading } = useAreaById(
    modalType === "edit" && areaId ? areaId : undefined
  );

  const onAreaFormSubmit = (data: FormData) => {
    const { areaName } = data;

    if (modalType === "add") {
      addArea(areaName, {
        onSuccess: () => {
          closeModal();
        },
      });
    } else if (modalType === "edit" && areaId) {
      editArea(
        { areaId: areaId, areaName: areaName },
        {
          onSuccess: () => {
            closeModal();
          },
        }
      );
    }
  };

  useEffect(() => {
    if (modalType === "edit" && areaId && isModalOpen && areaById && !areaByIdIsLoading) {
      reset({
        areaName: areaById.area_name ?? "",
      });
    } else if (modalType === "add" && isModalOpen) {
      reset();
    }
  }, [areaById, isModalOpen, areaId, modalType, reset, areaByIdIsLoading]);

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
