import type { DraftActionData } from '../../model/types';
import { ActionConfirmationCard } from '../ActionConfirmationCard';

export function DraftActionResponse({ data }: { data: DraftActionData }) {
  return (
    <>
      <div>{data.text}</div>
      <ActionConfirmationCard data={data} />
    </>
  );
}
