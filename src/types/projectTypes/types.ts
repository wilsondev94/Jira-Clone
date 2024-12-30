import { Models } from "node-appwrite";

export type Project = Models.Document & {
  name: string;
  imageUrl: string;
  workspaceId: string;
};

export interface useGetProjectsProps {
  workspaceId: string;
}

export interface ProjectIdProps {
  params: { projectId: string };
}

export interface GetProjectProps {
  projectId: string;
}

export interface ProjectIdParamsProps {
  params: { projectId: string };
}
