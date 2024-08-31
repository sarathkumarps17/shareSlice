import { ExistingProfile } from "@/types/profile.types";
import Share from "@/types/share.types";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { SquareX } from "lucide-react";

interface SplitCalculatorProps {
  friends: ExistingProfile[];
  onSplit: (split: Share[]) => void;
  userProfile: ExistingProfile;
  selectedFriends: ExistingProfile[];
  toggleSelectedFriend: (profile: ExistingProfile) => void;
}

const SplitCalculator: React.FC<SplitCalculatorProps> = ({
  friends,
  onSplit,
  userProfile,
  selectedFriends,
  toggleSelectedFriend,
}) => {
  const isEmptyFriends = friends.length === 0;
  const [isEquiSplit, setIsEquiSplit] = useState(false);
  const [share, setShare] = useState<Share[]>([]);
  useEffect(() => {
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
    if (isEmptyFriends) {
      setIsEquiSplit(false);
      setShare([]);
      setTotal(0);
    }
  }, [friends, userProfile, isEmptyFriends]);
  const removeFriend = (id: string) => {
    toggleSelectedFriend(friends.find((friend) => friend.id === id)!);
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
  const setPayer = (profileId: string) => {
    const oldPayer = share.find((share) => share.isPayer);
    if (oldPayer) {
      oldPayer.isPayer = false;
      if (oldPayer.profileId === profileId) return setShare([...share]);
    }
    const newPayer = share.find((share) => share.profileId === profileId);
    if (newPayer) {
      newPayer.isPayer = true;
    }
    setShare([...share]);
  };
  if (isEmptyFriends)
    return (
      <div className="text-center">
        <p className="text-muted">No friends added</p>
      </div>
    );
  return (
    <div className="grid grid-cols-2 gap-2">
      {selectedFriends.map((friend) => (
        <Card key={friend.id}>
          <CardContent className="p-1 m-0">
            <div className="flex w-full pl-4">
              <span className="pt-2 basis-5/6">{friend.name}</span>
              <SquareX
                size={16}
                className="mt-1 ml-4 cursor-pointer"
                onClick={() => removeFriend(friend.id)}
              />
            </div>
            <div className="flex flex-col gap-4 p-4">
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
              <div className="flex flex-row gap-2">
                <Label htmlFor="set-payer">Payer :</Label>
                <Input
                  id="set-payer"
                  type="checkbox"
                  className="w-4 h-4"
                  onChange={() => setPayer(friend.id)}
                  checked={
                    share.find((s) => s.profileId === friend.id)?.isPayer
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Card>
        <CardHeader>
          <span>Your Share</span>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Input
            type="number"
            name={userProfile.id}
            onChange={onShareChange}
            placeholder="Enter Share"
            step="any"
            value={share.find((s) => s.profileId === userProfile.id)?.share}
            disabled={isEquiSplit}
            defaultValue={0}
          />
          <div className="flex flex-row gap-2">
            <Label htmlFor="equi-split">Payer :</Label>
            <Input
              id="set-payer"
              type="checkbox"
              className="w-4 h-4"
              onChange={() => setPayer(userProfile.id)}
              checked={
                share.find((s) => s.profileId === userProfile.id)?.isPayer
              }
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-row gap-2">
        <Label htmlFor="equi-split">Split Evenly: </Label>
        <Input
          id="equi-split"
          type="checkbox"
          className="w-4 h-4"
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
