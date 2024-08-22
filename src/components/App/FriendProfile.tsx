import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Profile from "@/types/profile.types";
import { useState } from "react";
import { useDialog } from "../utils/DialogContext";

interface FriendProfileProps {
  profile: Profile;
  onSave: (profile: Profile) => void;
}
const FriendProfile: React.FC<FriendProfileProps> = ({ profile, onSave }) => {
  const { isOpen, closeDialog } = useDialog();
  const isNew = profile.isNew;
  const [friend, setFriend] = useState<Profile>(profile);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFriend((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isNew ? "Add" : "Edit"} Friend</DialogTitle>
          <DialogDescription>
            {isNew
              ? "Add your friend's profile"
              : "Make changes to your profile here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              defaultValue={isNew ? "" : profile.name}
              onChange={onChange}
              className="col-span-3"
              placeholder="Friend's name"
              required
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right">
              Avatar URL
            </Label>
            <Input
              id="username"
              name="avatar"
              defaultValue={isNew ? "" : profile.avatar}
              onChange={onChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onSave(friend)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default FriendProfile;
