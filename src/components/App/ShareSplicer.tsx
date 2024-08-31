import FriendsCircle from "./FriendsCircle";
import Viewport from "../layout/Viewport";
import SplitCalculator from "./SplitCalculator";
import { useDialog } from "../utils/DialogContext";
import FriendProfile from "./FriendProfile";
import { useState } from "react";
import Profile, {
  ExistingProfile,
  NewProfile,
  IsNewProfile,
} from "@/types/profile.types";

export default function ShareSplicer() {
  const { openDialog, closeDialog } = useDialog();
  const [friends, setFriends] = useState<ExistingProfile[]>([]);
  const [editFriend, setEditFriend] = useState<Profile | null>(null);
  const [selectedFriends, setSelectedFriends] = useState<ExistingProfile[]>([]);

  const USER_PROFILE: ExistingProfile = {
    id: "100000",
    name: "User",
    isNew: false,
    share: 0,
  };
  const [userProfile, setUserProfile] = useState<ExistingProfile>(USER_PROFILE);

  const openProfileModal = (id?: string) => {
    openDialog();
    if (id) {
      const friend = friends.find((friend) => friend.id === id);
      setEditFriend(friend || null);
    } else {
      const newFriend: NewProfile = {
        isNew: true,
        name: "",
      };
      setEditFriend(newFriend);
    }
  };
  const addFriend = (profile: ExistingProfile) => {
    setFriends((prev) => [...prev, profile]);
  };
  const removeFriend = (id: string) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
  };
  const updateFriend = (profile: ExistingProfile) => {
    setFriends((prev) =>
      prev.map((friend) => (friend.id === profile.id ? profile : friend))
    );
  };
  const onSave = (profile: Profile, userShare?: number) => {
    if (profile.isNew) {
      const newProfile: ExistingProfile = {
        id: Date.now().toString(),
        ...profile,
        isNew: false,
      };
      addFriend(newProfile);
      closeDialog();
    } else {
      updateFriend(profile);
      if (userShare) {
        setUserProfile({ ...userProfile, share: userShare });
      }
      closeDialog();
    }
  };
  const onToggleSelectFriend = (profile: ExistingProfile) => {
    if (selectedFriends.includes(profile)) {
      setSelectedFriends((prev) =>
        prev.filter((friend) => friend.id !== profile.id)
      );
    } else {
      setSelectedFriends((prev) => [...prev, profile]);
    }
  };
  return (
    <div>
      <Viewport
        FriendsCircle={
          <FriendsCircle
            friends={friends}
            onProfileOpen={openProfileModal}
            onRemove={removeFriend}
            onToggleSelectFriend={onToggleSelectFriend}
            selectedFriends={selectedFriends}
          />
        }
        SplitCalculator={
          <SplitCalculator
            friends={selectedFriends}
            userProfile={userProfile}
            selectedFriends={selectedFriends}
            toggleSelectedFriend={onToggleSelectFriend}
            onSplit={(data) => {
              console.log(data);
            }}
          />
        }
      />
      {editFriend && (
        <FriendProfile
          profile={editFriend}
          onSave={onSave}
          key={IsNewProfile(editFriend) ? new Date().getTime() : editFriend.id}
        />
      )}
    </div>
  );
}
