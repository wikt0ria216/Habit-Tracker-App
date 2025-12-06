import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MultiValue, SingleValue } from "react-select";

import { useAddHabit } from "@/features/habits/hooks/useAddHabit";
import { useAreas } from "@/features/areas/hooks/useAreas";
import { useEditHabit } from "@/features/habits/hooks/useEditHabit";
import { useHabitById } from "@/features/habits/hooks/useHabitById";

import CustomButton from "@ui/CustomButton/CustomButton";
import CustomSelector from "@ui/CustomSelector/CustomSelector";
import DayPicker from "@ui/DayPicker/DayPicker";
import FormInput from "@form/FormInput/FormInput";
import FormLabel from "@form/FormLabel/FormLabel";
import Modal from "@ui/Modal/Modal";

import { SelectOption } from "@/types/SelectOption";

import { daysOfMonth, daysOfWeek } from "@/utils/daysUtils";

import "./habitmodal.css";

type Frequency = "daily" | "weekly" | "monthly";

interface HabitModalFormProps {
  modalType: "add" | "edit";
  isModalOpen: boolean;
  closeModal: () => void;
  habitId?: number;
}

interface FormData {
  habit_name: string;
  frequency: SelectOption | null;
  areas: SelectOption[] | [];
  days: string[];
}

const frequencyOptions: SelectOption[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const habitSchema = yup.object().shape({
  habit_name: yup.string().required("Habit name is required").min(2, "Habit name must be at least 2 characters"),
  frequency: yup
    .object()
    .shape({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .required("Frequency is required"),
  areas: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().required(),
        label: yup.string().required(),
      })
    )
    .optional()
    .default([]),
  days: yup
    .array()
    .of(yup.string().required())
    .when("frequency", {
      is: (freq: SelectOption | null) => freq?.value === "daily",
      then: (schema) => schema.min(7, "All days are required for daily frequency"),
      otherwise: (schema) => schema.min(1, "At least one day is required"),
    })
    .required("Days are required"),
});

const HabitModal = ({ modalType, isModalOpen, habitId, closeModal }: HabitModalFormProps) => {
  const { mutate: addHabit, isPending: addHabitPending } = useAddHabit();
  const { mutate: editHabit, isPending: editHabitPending } = useEditHabit();
  const { data: habitById, isLoading: habitByIdIsLoading } = useHabitById(
    modalType === "edit" && habitId ? habitId : undefined
  );
  const { data: areas } = useAreas();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(habitSchema),
    defaultValues: {
      habit_name: "",
      frequency: null,
      areas: [],
      days: [],
    },
    mode: "onChange",
  });

  const frequencyValue = watch("frequency")?.value as Frequency | null;

  const areaOptions: SelectOption[] = useMemo(() => {
    const options = areas?.map((area) => ({
      value: String(area.id),
      label: area.area_name,
    }));
    return options ?? [];
  }, [areas]);

  const handleFrequencyChange = (newValue: SingleValue<SelectOption>) => {
    setValue("frequency", newValue, { shouldValidate: true });
    setValue("days", [], { shouldValidate: true });
    if (newValue?.value === "daily") {
      setValue("days", daysOfWeek, { shouldValidate: true });
    }
  };

  const onFormSubmit = (data: FormData) => {
    const { habit_name, frequency, days, areas: selectedAreas } = data;
    const areasIds = selectedAreas.map((area) => parseInt(area.value));

    const habitData = {
      habitName: habit_name,
      frequency: frequency?.value ?? "daily",
      days,
      areasIds,
    };

    if (modalType === "add") {
      addHabit(habitData, {
        onSuccess: () => {
          closeModal();
        },
      });
    } else if (modalType === "edit" && habitId) {
      editHabit(
        {
          habitId: habitId,
          habitName: habitData.habitName,
          frequency: habitData.frequency,
          days: habitData.days,
          areasIds: habitData.areasIds,
        },
        {
          onSuccess: () => {
            closeModal();
          },
        }
      );
    }
  };

  useEffect(() => {
    if (modalType === "edit" && habitId && isModalOpen && habitById && !habitByIdIsLoading) {
      reset({
        habit_name: habitById.habit_name,
        frequency: frequencyOptions.find((option) => option.value === habitById.frequency) || frequencyOptions[0], //potem to zmienic
        days: habitById.days,
        areas: habitById.habit_areas.map((habit_area) => ({
          value: String(habit_area.area_id),
          label: habit_area.areas.area_name,
        })),
      });
    } else if (modalType === "add" && isModalOpen) {
      reset();
    }
  }, [isModalOpen, habitId, modalType, reset, habitById, habitByIdIsLoading]);

  const modalCancelAction = () => {
    closeModal();
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      title={modalType === "add" ? "Add New Habit" : "Edit Habit"}
      onClose={closeModal}
      actions={
        <>
          <CustomButton variant="secondary" onClick={modalCancelAction} type="button">
            Cancel
          </CustomButton>
          <CustomButton
            variant="accent"
            type="submit"
            isLoading={addHabitPending || editHabitPending}
            form="habit-form"
            loadingMessage="Saving"
          >
            Save
          </CustomButton>
        </>
      }
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="habit-form" id="habit-form" noValidate>
        <FormInput
          label="Habit Name"
          id="habitname"
          placeholder={modalType === "add" ? "Habit Name" : "New Habit Name"}
          autoComplete="off"
          {...register("habit_name")}
          error={errors.habit_name?.message}
          isRequired
        />

        <div className="frequency-select">
          <FormLabel htmlFor="frequency-select" label="Frequency" />
          <Controller
            name="frequency"
            control={control}
            render={({ field }) => (
              <>
                <CustomSelector
                  value={field.value}
                  options={frequencyOptions}
                  error={errors.frequency?.message}
                  onChange={handleFrequencyChange}
                  inputId="frequency-select"
                />
              </>
            )}
          />
          {frequencyValue && (
            <>
              <div
                className={`frequency-day-picker ${frequencyValue === "monthly" ? "frequency-day-picker-center" : ""}`}
              >
                <Controller
                  name="days"
                  control={control}
                  render={({ field }) => (
                    <DayPicker
                      days={frequencyValue === "monthly" ? daysOfMonth : daysOfWeek}
                      isMonthly={frequencyValue === "monthly"}
                      selectedDays={field.value}
                      onDayChange={(day) => {
                        const currentDays = field.value;
                        const newDays = currentDays.includes(day)
                          ? currentDays.filter((d) => d !== day)
                          : [...currentDays, day];

                        field.onChange(newDays);
                      }}
                      isOptionDisabled={frequencyValue === "daily"}
                      error={errors.days?.message}
                    />
                  )}
                />
              </div>
            </>
          )}
        </div>

        <div className="areas-select">
          <FormLabel label="Areas" isOptional htmlFor="areas-select" />
          <Controller
            name="areas"
            control={control}
            render={({ field }) => (
              <>
                <CustomSelector
                  value={field.value}
                  onChange={(value: MultiValue<SelectOption>) => field.onChange(value ?? [])}
                  options={areaOptions}
                  error={errors.areas?.message}
                  isMulti
                  inputId="areas-select"
                />
              </>
            )}
          />
        </div>
      </form>
    </Modal>
  );
};

export default HabitModal;
