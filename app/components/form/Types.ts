// Interfaces for the credential data
 export interface VerifiableCredential {
  '@context': string[];
  type: string[];
  issuer: Issuer;
  issuanceDate: Date;
  credentialSubject: CredentialSubject;
  proof?: Proof; 
}

interface Issuer {
  id: string;
  name: string;
}

interface CredentialSubject {
  type: string;
  id: string;
  achievement: Achievement;
}

interface Achievement {
  id: string;
  type: string;
  name: string;
  description: string;
  criteria: Criteria;
}

interface Criteria {
  type: string;
  narrative: string;
}

interface Proof {
  type?: string;
  created?: Date;
  proofPurpose?: string;
  verificationMethod?: string;
  jws?: string;
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
