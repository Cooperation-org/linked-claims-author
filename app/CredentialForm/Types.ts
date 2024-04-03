// Interfaces for the credential data
export interface Address {
  addressCountry: string;
  addressRegion: string;
  addressLocality: string;
  streetAddress: string;
  postalCode: string;
}

export interface Achievement {
  id: string;
  type: string[];
  criteria: { narrative: string };
  description: string;
  name: string;
  imageURl: string ;
}

export interface CredentialSubject {
  type: string[];
  name: string;
  address?: Address;
  achievement: Achievement[];
}

export interface Issuer {
  id: string;
  type: string[];
}

export interface Credential {
  "@context": string[];
  type: string[];
  issuer: Issuer;
  issuanceDate: string;
  expirationDate?: string;
  awardedDate?: string;
  name: string;
  credentialSubject: CredentialSubject;
}

// Interfaces for the form fields
export interface FormData {
  name: string;
  address?: string;
  expirationDate?: string;
  awardedDate?: string;
  skillName: string;
  skillCriteria: string;
  skillDescription?: string;
  badgeImage?: string;
  evidence?: string;
  didKeySeed: string;
  [key: string]: string | undefined; // I will keel it here for the future fields
}

// Component Props for the form
export interface FormProps {
  formData: FormData;
  // onChange: (data: Partial<FormData>) => void;
  // onSubmit: (data: FormData) => void;
}

// Component Props for the credential display
export interface CredentialDisplayProps {
  credential: Credential;
  onCopy: () => void;
}
