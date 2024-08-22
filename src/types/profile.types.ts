interface ProfileSchema {
    isNew: boolean;
    id: string;
    name: string;
    avatar?: string;
    share?: number;
}

export interface NewProfile extends Omit<ProfileSchema, 'id'> {
    isNew: true;
}

export interface ExistingProfile extends ProfileSchema {
    isNew: false;
}

type Profile = NewProfile | ExistingProfile;


export default Profile;

export const IsNewProfile = (profile: Profile): profile is NewProfile => {
    return (profile as NewProfile).isNew;
};