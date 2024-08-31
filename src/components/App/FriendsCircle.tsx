// import FriendProfile from "./FriendProfile";

import { ExistingProfile } from "@/types/profile.types";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  UserRoundX,
  UserPen,
  UserRoundCheck,
  UserRoundMinus,
} from "lucide-react";
interface FriendsCircleProps {
  friends: ExistingProfile[];
  onProfileOpen: (id?: string) => void;
  onRemove: (id: string) => void;
  onToggleSelectFriend: (profile: ExistingProfile) => void;
  selectedFriends: ExistingProfile[];
}
const checkFriedOwesYou = (friend: ExistingProfile) => {
  return friend.share && friend.share < 0;
};
const FriendsCircle: React.FC<FriendsCircleProps> = ({
  friends,
  onProfileOpen,
  onRemove,
  selectedFriends,
  onToggleSelectFriend,
}) => {
  const isSelectedFried = (id: string) => {
    return selectedFriends.some((friend) => friend.id === id);
  };
  return (
    <div>
      <Button onClick={() => onProfileOpen()} className="mb-4">
        Add Friend
      </Button>
      <div className="flex flex-wrap gap-4">
        {friends.map((friend) => (
          <Card key={friend.id} className="h-32">
            <CardHeader>
              <CardTitle className="flex gap-1 m-1">
                <div className="flex gap-1 basis-2/3">
                  <Avatar>
                    <AvatarImage src={friend.avatar} alt="Avatar" />
                    <AvatarFallback delayMs={600}>
                      {friend.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="w-32 pt-2 mr-2 text-base font-bold capitalize">
                    {friend.name}
                  </span>
                </div>
                <div className="flex justify-end gap-2 basis-1/3">
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
                  <Button
                    size={"icon"}
                    variant="ghost"
                    onClick={() => onToggleSelectFriend(friend)}
                  >
                    {isSelectedFried(friend.id) ? (
                      <UserRoundMinus size={24} color="red" strokeWidth={3} />
                    ) : (
                      <UserRoundCheck size={24} color="green" strokeWidth={3} />
                    )}
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
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
