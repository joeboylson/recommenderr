export * from "./propertyData";
export * from "./propertyInput";

export interface WithChildren {
  children: React.ReactNode;
}

export interface PossiblyWithChildren {
  children?: React.ReactNode;
}
