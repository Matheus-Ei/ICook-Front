import { Card } from "@/components/Card";
import { Text } from "@/components/Text";

interface User {
  name: string;
  email: string;
  followersCount: string;
}

interface UserProfileCardProps {
  user: User;
}

export const UserProfileCard = ({ user }: UserProfileCardProps) => (
  <Card>
    <Text label="Name" text={user.name} />

    <Text label="Email" text={user.email} />

    <Text label="Followers" text={user.followersCount} />
  </Card>
);
