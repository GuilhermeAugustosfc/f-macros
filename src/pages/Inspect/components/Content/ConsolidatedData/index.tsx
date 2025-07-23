import CardComponent from './CardComponent';
import { ContainerCards } from './style';

const ConsolidatedData = () => {
  return (
    <ContainerCards>
      <CardComponent
        title="approved"
        summary="all_items_have_been_checked_and_approved"
        quantity={10}
        total_quantity={100}
      />
      <CardComponent
        title="disapproved"
        summary="one_or_more_items_failed_during_inspection"
        quantity={3}
        total_quantity={20}
      />
      <CardComponent
        title="late"
        summary="they_were_not_carried_out_within_the_established_deadline"
        quantity={5}
        total_quantity={20}
      />
      <CardComponent
        title="repaired"
        summary="failed_inspections_that_were_later_repaired"
        quantity={2}
        total_quantity={20}
      />
      <CardComponent
        title="all_completed"
        summary="all_inspections_that_have_been_completed"
        quantity={15}
        total_quantity={20}
      />
    </ContainerCards>
  );
};

export default ConsolidatedData;
