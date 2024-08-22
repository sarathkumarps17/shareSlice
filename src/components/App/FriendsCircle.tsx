// import FriendProfile from "./FriendProfile";

import { ExistingProfile } from "@/types/profile.types";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRoundX, UserPen } from "lucide-react";
interface FriendsCircleProps {
  friends: ExistingProfile[];
  onProfileOpen: (id?: string) => void;
  onRemove: (id: string) => void;
}
const checkFriedOwesYou = (friend: ExistingProfile) => {
  return friend.share && friend.share < 0;
};
const FriendsCircle: React.FC<FriendsCircleProps> = ({
  friends,
  onProfileOpen,
  onRemove,
}) => {
  return (
    <div>
      <Button onClick={() => onProfileOpen()} className="mb-4">
        Add Friend
      </Button>
      <div className="flex flex-wrap gap-4">
        {friends.map((friend) => (
          <Card key={friend.id} className="w-[70%]">
            <CardHeader>
              <CardTitle className="flex gap-2 m-2">
                <div className="flex gap-2 basis-2/3">
                  <Avatar>
                    <AvatarImage src={friend.avatar} alt="Avatar" />
                    <AvatarFallback delayMs={600}>
                      {friend.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="pt-2 mr-10 text-base font-bold capitalize">
                    {friend.name}
                  </span>
                </div>
                <div className="flex justify-end gap-4 basis-1/3">
                  <Button
                    size={"sm"}
                    color="primary"
                    onClick={() => onProfileOpen(friend.id)}
                  >
                    {" "}
                    <span className="pr-1 text-xs">Edit</span>
                    <UserPen size={14} />
                  </Button>

                  <Button
                    size={"sm"}
                    variant="destructive"
                    onClick={() => onRemove(friend.id)}
                  >
                    {" "}
                    <span className="pr-1 text-xs">Delete</span>
                    <UserRoundX size={14} />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full ml-2">
                <div className="text-sm text-lime-400">
                  {friend.name} ows you Rs 20
                </div>
                <div className="text-sm text-red-400">
                  You ows {friend.name} Rs 20
                </div>
              </div>

              {friend.share && (
                <div className="w-full h-px bg-muted">
                  {checkFriedOwesYou(friend) ? (
                    <p className="text-sm text-muted-foreground">
                      {friend.name} owes you Rs{Math.abs(friend.share)}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      You owe {friend.name} Rs{friend.share}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FriendsCircle;
