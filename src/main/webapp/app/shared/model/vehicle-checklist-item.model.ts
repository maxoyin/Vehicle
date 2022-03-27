export interface IVehicleChecklistItem {
  id?: number;
  code?: string;
  displayName?: string;
  description?: string | null;
}

export const defaultValue: Readonly<IVehicleChecklistItem> = {};
