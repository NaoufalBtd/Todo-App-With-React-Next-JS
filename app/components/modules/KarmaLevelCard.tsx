import Card from "../elements/Card";
import ProgressRing from "../elements/ProgressRing";

export default function KarmaLevelCard() {
  return (
    <Card primaryText="karma level" secondaryText={1090}>
      <ProgressRing outerCircleVal={40} innerCircleVal={30} />
    </Card>
  );
}
