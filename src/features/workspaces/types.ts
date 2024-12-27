import { Models } from "node-appwrite";

export type Workspace = Models.Document & {
  name: string;
  imageUrl: string;
  inviteCode: string;
  userId: string;
};

export interface GetWorksapceProps {
  workspaceId: string;
}

export interface WorkspaceIdProps {
  params: {
    workspaceId: string;
  };
}

export interface JoinWorkspaceProps {
  initialValues: {
    name: string;
  };
}


export interface WorkspaceAvatarProps {
  image?: string;
  name: string;
  className?: string;
}