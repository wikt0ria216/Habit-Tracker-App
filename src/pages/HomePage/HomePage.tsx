import { useMemo, useState } from "react";
import { SingleValue } from "react-select";

import { useAreas } from "@/features/areas/hooks/useAreas";
import { useHabits } from "@/features/habits/hooks/useHabits";
import { useHabitsActions } from "@/features/habits/hooks/useHabitsActions";
import { useHabitsFilterByTab } from "@/features/habits/hooks/useHabitsFilterByTab";

import Card from "@ui/Card/Card";
import CustomButton from "@ui/CustomButton/CustomButton";
import CustomSelector from "@ui/CustomSelector/CustomSelector";
import HabitList from "@features/habits/components/HabitList/HabitList";
import PageHeader from "@layout/PageHeader/PageHeader";

import { Plus } from "@/assets/icons";

import { SelectOption } from "@/types/SelectOption";

import { useFilteredHabitsByDate } from "@/features/habits/hooks/useFilteredHabitsByDate";
import HabitStateHandler from "@/features/habits/components/HabitStateHandler/HabitStateHandler";
import HabitModalsManager from "@/features/habits/components/HabitModalsManager/HabitModalsManager";
import { calculateHabitProgress } from "@/utils/calculateHabitProgress";
import "./homepage.css";
import ProgressBar from "@/components/ui/ProgressBar/ProgressBar";

const DEAFULT_FILTER: SelectOption = { value: "all", label: "All" };

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<string>(DEAFULT_FILTER.label);
  const [selectedFilter, setSelectedFilter] = useState<SelectOption>(DEAFULT_FILTER);

  const { data: habits, isLoading: habitsIsLoading, isError: habitsIsError, refetch: refetchHabits } = useHabits();
  const { openEditHabitModal, openDeleteHabitModal, isOpen, openAddHabitModal, selectedHabit, closeModal, modalType } =
    useHabitsActions();
  const { data: areas } = useAreas();
  const { filteredHabits: todayHabits } = useFilteredHabitsByDate({ habits, dateOption: "today" });
  const { filteredHabits: tomorrowHabits } = useFilteredHabitsByDate({ habits, dateOption: "tomorrow" });
  const progress = calculateHabitProgress(todayHabits);
  const { completedHabits, notCompletedHabits } = useHabitsFilterByTab({
    habits: todayHabits,
    activeTab,
  });

  const areaOptions = useMemo(() => {
    const options = areas?.map((area) => ({
      value: area.area_name.toLowerCase(),
      label: area.area_name,
    }));
    return options ?? [];
  }, [areas]);

  const filterOptions: SelectOption[] = [DEAFULT_FILTER, ...areaOptions];

  const handleFilterChange = (newValue: SingleValue<SelectOption>) => {
    const filter = newValue ?? DEAFULT_FILTER;
    setActiveTab(filter.label);
    setSelectedFilter(filter);
  };

  return (
    <div className="home">
      <PageHeader title="Home">
        <CustomButton icon={<Plus />} variant="accent" onClick={openAddHabitModal}>
          New Habit
        </CustomButton>
      </PageHeader>
      <div className="content-grid-holder">
        <Card
          title="Todays Habits"
          className="todays-habits"
          headerExtra={
            <CustomSelector
              options={filterOptions}
              onChange={handleFilterChange}
              value={selectedFilter}
              className="narrow-select"
              placeholder="Filter habits"
              ariaLabel="Filter habits by area"
            />
          }
        >
          <HabitStateHandler
            isLoading={habitsIsLoading}
            isError={habitsIsError}
            habits={notCompletedHabits}
            emptyMessage={
              activeTab === "All"
                ? "No habits scheduled for today."
                : `No habits scheduled for today in "${activeTab}".`
            }
            loadingLabel="Loading today's habits"
            onRetry={refetchHabits}
          >
            <HabitList habits={notCompletedHabits} onEdit={openEditHabitModal} onDelete={openDeleteHabitModal} />
          </HabitStateHandler>
        </Card>
        <Card title="Completed Habits" className="completed-todays-habits">
          <HabitStateHandler
            habits={completedHabits}
            isLoading={habitsIsLoading}
            isError={habitsIsError}
            emptyMessage={
              activeTab === "All"
                ? "No completed habits yet today."
                : `No completed habits yet today in "${activeTab}".`
            }
            loadingLabel="Loading completed habits"
            onRetry={refetchHabits}
          >
            <HabitList habits={completedHabits} onEdit={openEditHabitModal} onDelete={openDeleteHabitModal} />
          </HabitStateHandler>
        </Card>
        <Card title="Todays Progress" className="stat">
          <ProgressBar percentage={progress} size={250} thickness={8} ariaLabel="Daily habits completion" />
        </Card>
        <Card title="Tomorrow Habits" className="upcoming-habits">
          <HabitStateHandler
            habits={tomorrowHabits}
            isLoading={habitsIsLoading}
            isError={habitsIsError}
            emptyMessage="No habits scheduled for tomorrow."
            loadingLabel="Loading tomorrow's habits"
            onRetry={refetchHabits}
          >
            <HabitList habits={tomorrowHabits} isReadOnly />
          </HabitStateHandler>
        </Card>
      </div>
      <HabitModalsManager
        modalType={modalType}
        isModalOpen={isOpen}
        closeModal={closeModal}
        selectedHabit={selectedHabit}
      />
    </div>
  );
};

export default HomePage;
