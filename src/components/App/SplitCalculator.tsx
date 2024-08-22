import { ExistingProfile } from "@/types/profile.types";
import Share from "@/types/share.types";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Delete } from "lucide-react";

interface SplitCalculatorProps {
  friends: ExistingProfile[];
  onSplit: (split: Share[]) => void;
  userProfile: ExistingProfile;
}

const SplitCalculator: React.FC<SplitCalculatorProps> = ({
  friends,
  onSplit,
  userProfile,
}) => {
  const isEmptyFriends = friends.length === 0;
  const [isEquiSplit, setIsEquiSplit] = useState(false);
  const [share, setShare] = useState<Share[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<ExistingProfile[]>([]);
  useEffect(() => {
    setSelectedFriends(friends);
    const shares = friends.map((friend) => ({
      profileId: friend.id,
      isPayer: false,
      share: friend.share || 0,
    }));
    shares.push({
      profileId: userProfile.id,
      isPayer: true,
      share: userProfile.share || 0,
    });
    setShare(shares);
  }, [friends, userProfile]);
  const removeFriend = (id: string) => {
    setSelectedFriends((prev) => prev.filter((friend) => friend.id !== id));
    setShare((prev) => prev.filter((share) => share.profileId !== id));
  };
  const [total, setTotal] = useState(0);

  const handleEqiSplit = (total: number) => {
    if (!isEquiSplit) return;
    const equiSplit = share.map(({ profileId, isPayer }) => ({
      isPayer,
      profileId,
      share: total / (friends.length + 1),
    }));
    setShare(equiSplit);
  };

  const onShareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: profileId, value } = e.target;
    const shareValue = parseFloat(value);
    setShare((prev) => {
      const hasProfile = prev.some((share) => share.profileId === profileId);
      if (hasProfile) {
        return prev.map((share) =>
          share.profileId === profileId
            ? { ...share, share: shareValue }
            : share
        );
      }
      return [...prev, { profileId, share: shareValue, isPayer: false }];
    });
  };

  const handleSplit = () => {
    setTotal(share.reduce((total, { share }) => total + share, 0));
    if (total === 0) return;
    if (isEquiSplit) handleEqiSplit(total);
    onSplit(share);
  };
  if (isEmptyFriends)
    return (
      <div className="text-center">
        <p className="text-muted">No friends added</p>
      </div>
    );
  return (
    <div className="">
      {selectedFriends.map((friend) => (
        <Card key={friend.id} className="mb-4">
          <CardHeader>
            <span>{friend.name}</span>
            <Button size={"icon"} onClick={() => removeFriend(friend.id)}>
              <Delete />
            </Button>
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              name={friend.id}
              className="w-full"
              onChange={onShareChange}
              placeholder="Enter Share"
              step="any"
              value={share.find((s) => s.profileId === friend.id)?.share}
              disabled={isEquiSplit}
            />
          </CardContent>
        </Card>
      ))}
      <Card>
        <CardHeader>
          <span className="text-muted">Your Share</span>
        </CardHeader>
        <CardContent>
          <Input
            type="number"
            name={userProfile.id}
            className="w-full"
            onChange={onShareChange}
            placeholder="Enter Share"
            step="any"
            value={share.find((s) => s.profileId === userProfile.id)?.share}
            disabled={isEquiSplit}
            defaultValue={0}
          />
        </CardContent>
      </Card>
      <div>
        <Label htmlFor="equi-split">Split Evenly</Label>
        <Input
          id="equi-split"
          type="checkbox"
          className="w-full"
          onChange={() => setIsEquiSplit(!isEquiSplit)}
        />
      </div>
      <div>
        <Label htmlFor="total">Total</Label>
        <Input
          id="total"
          type="number"
          className="w-full"
          placeholder="Total"
          disabled={!isEquiSplit}
          value={total}
          onChange={(e) => setTotal(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <Button disabled={isEmptyFriends} onClick={handleSplit}>
          Split
        </Button>
      </div>
    </div>
  );
};

export default SplitCalculator;
