import { Models } from "node-appwrite";

export type Workspace = Models.Document & {
  name: string;
  imageUrl: string;
  inviteCode: string;
  userId: string;
};

export interface GetWorkspaceIdProps {
  workspaceId: string;
}

export interface JoinWorkspaceProps {
  initialValues: {
    name: string;
  };
}
