import { Separator } from "@/components/ui/separator";
import { ReactElement } from "react";

interface ViewportProps {
  FriendsCircle: ReactElement;
  SplitCalculator: ReactElement;
}
const Viewport: React.FC<ViewportProps> = ({
  FriendsCircle,
  SplitCalculator,
}) => {
  return (
    <div className="container py-20 mx-auto">
      <div className="flex w-full gap-4 px-20">
        <div className="basis-1/2  overflow-scroll max-h-[62vh] scroll-smooth scroll-pl-6 snap-x">
          {FriendsCircle}
        </div>
        <div>
          <Separator orientation="vertical" className="bg-foreground" />
        </div>
        <div className="basis-1/2">{SplitCalculator}</div>
      </div>
    </div>
  );
};
export default Viewport;
