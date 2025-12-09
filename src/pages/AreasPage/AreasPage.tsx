import AreaList from "@/features/areas/components/AreaList/AreaList";
import AreasModalManager from "@/features/areas/components/AreasModalManager/AreasModalManager";
import AreaStateHandler from "@/features/areas/components/AreaStateHandler/AreaStateHandler";
import Card from "@ui/Card/Card";
import CustomButton from "@ui/CustomButton/CustomButton";
import PageHeader from "@layout/PageHeader/PageHeader";

import { Plus } from "@/assets/icons";

import { useAreas } from "@/features/areas/hooks/useAreas";
import { useAreasActions } from "@/features/areas/hooks/useAreasActions";

const AreasPage = () => {
  const { data: areas, isLoading: areasIsLoading, isError: areasIsError, refetch: refetchAreas } = useAreas();
  const { openDeleteAreaModal, openEditAreaModal, isOpen, modalType, openAddAreaModal, closeModal, selectedArea } =
    useAreasActions();

  return (
    <div className="areas-page">
      <PageHeader title="Areas">
        <CustomButton icon={<Plus />} variant="accent" onClick={openAddAreaModal}>
          New Area
        </CustomButton>
      </PageHeader>
      <Card ariaLabel="Your Areas">
        <AreaStateHandler
          isLoading={areasIsLoading}
          isError={areasIsError}
          areas={areas}
          emptyMessage="No areas added yet."
          loadingLoader="Loading areas content."
          onRetry={refetchAreas}
        >
          <AreaList areas={areas} onDelete={openDeleteAreaModal} onEdit={openEditAreaModal} />
        </AreaStateHandler>
      </Card>

      <AreasModalManager
        modalType={modalType}
        isModalOpen={isOpen}
        closeModal={closeModal}
        selectedArea={selectedArea}
      />
    </div>
  );
};

export default AreasPage;
