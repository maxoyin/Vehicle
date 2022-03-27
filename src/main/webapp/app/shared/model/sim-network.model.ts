export interface ISimNetwork {
  id?: number;
  code?: string;
  displayName?: string;
  description?: string | null;
}

export const defaultValue: Readonly<ISimNetwork> = {};
