import { useCat } from '../exam';
import { Md } from '../ui/Md';

export function HowPage() {
  const { exam } = useCat();
  return (
    <div className="page prose">
      <Md text={exam.how} />
    </div>
  );
}
