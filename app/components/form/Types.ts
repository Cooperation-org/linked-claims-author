// Interfaces for the credential data
export interface Address {
  addressCountry: string
  addressRegion: string
  addressLocality: string
  streetAddress: string
  postalCode: string
}

export interface Achievement {
  id: string
  type: string[]
  criteria: { narrative: string }
  description: string
  name: string
  image: any
}

export interface CredentialSubject {
  id: string
  type: string[]
  address?: Address
  achievement: Achievement[]
}

interface Issuer {
  id: string;
  name?: string; 
  url: string;
  image: {
    id: string;
    type: string;
  };
}

export interface Credential {
  proof: CredentialProof
  '@context': string[]
  id: string
  type: string[]
  issuer: Issuer
  issuanceDate: string
  expirationDate?: string
  awardedDate?: string
  name: string
  credentialSubject: CredentialSubject
}

interface Portfolio {
  name: string
  url: string
}

// Interfaces for the form fields
export interface FormData {
  storageOption: string
  fullName: string
  persons: string
  credentialName: string
  credentialDuration: string
  credentialDescription: string
  portfolio: Portfolio[]
  imageLink: string
  description: string
  url: string
  [key: string]: string | undefined | Portfolio[]
  
}

export interface CredentialProof {
  type: string
  created: string
  proofPurpose: string
  verificationMethod: string
  jws: string
}
export interface credential {
  '@context': string
  id: string
  type: string
  recipient: { type: string; hashed: boolean; salt: string; identity: string }
  badge: string
  issuedOn: string
  verification: { type: string }
  badgeClass: {
    '@context': string
    id: string
    type: string
    name: any
    description: any
    image: any
    criteria: { narrative: any }
    issuer: { id: string; type: string; name: any; url: string }
  }
  issuer: { '@context': string; id: string; type: string; name: any; url: string }
  proof?: CredentialProof
}

// Component Props for the form
export interface FormProps {
  formData: FormData
  // onChange: (data: Partial<FormData>) => void;
  // onSubmit: (data: FormData) => void;
}

// Component Props for the credential display
export interface CredentialDisplayProps {
  credential: Credential
  onCopy: () => void
}
