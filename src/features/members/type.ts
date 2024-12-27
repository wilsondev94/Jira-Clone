import { type Databases } from "node-appwrite";

export enum MemberRole {
  ADMIN = "admin",
  MEMBER = "member",
}

export interface GetMemberProps {
  databases: Databases;
  workspaceId: string;
  userId: string;
}

export interface UseGetMembersProps {
  workspaceId: string;
}

export interface MembersAvatarProps {
  name: string;
  className?: string;
  fallbackClassName?: string;
}
