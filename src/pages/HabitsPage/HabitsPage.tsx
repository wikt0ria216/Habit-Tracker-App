import Card from "@ui/Card/Card";
import CustomButton from "@ui/CustomButton/CustomButton";
import HabitList from "@/features/habits/components/HabitList/HabitList";
import HabitModalsManager from "@features/habits/components/HabitModalsManager/HabitModalsManager";
import PageHeader from "@layout/PageHeader/PageHeader";

import { Plus } from "@/assets/icons";

import { useHabits } from "@/features/habits/hooks/useHabits";
import { useHabitsActions } from "@/features/habits/hooks/useHabitsActions";
import HabitStateHandler from "@/features/habits/components/HabitStateHandler/HabitStateHandler";

const HabitsPage = () => {
  const { data: habits, isLoading: isHabitsLoading, isError: isHabitsError, refetch: refetchHabits } = useHabits();
  const { openEditHabitModal, openDeleteHabitModal, closeModal, isOpen, modalType, selectedHabit, openAddHabitModal } =
    useHabitsActions();

  return (
    <div className="habits-page">
      <PageHeader title="Habits">
        <CustomButton icon={<Plus />} variant="accent" onClick={openAddHabitModal}>
          New Habit
        </CustomButton>
      </PageHeader>
      <Card ariaLabel="Your Habits">
        <HabitStateHandler
          habits={habits}
          isError={isHabitsError}
          isLoading={isHabitsLoading}
          emptyMessage="No habits yet. Create your first habit."
          onRetry={refetchHabits}
        >
          <HabitList
            habits={habits}
            ignoreCompletedStyle
            onDelete={openDeleteHabitModal}
            onEdit={openEditHabitModal}
            showCheckbox={false}
          />
        </HabitStateHandler>
      </Card>

      <HabitModalsManager
        closeModal={closeModal}
        isModalOpen={isOpen}
        modalType={modalType}
        selectedHabit={selectedHabit}
      />
    </div>
  );
};

export default HabitsPage;
