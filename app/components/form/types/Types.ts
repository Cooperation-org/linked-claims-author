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
  imageUrl: string
}

export interface CredentialSubject {
  type: string[]
  name: string
  address?: Address
  achievement: Achievement[]
}

export interface Issuer {
  id: string
  type: string[]
}

export interface Credential {
  '@context': string[]
  type: string[]
  issuer: Issuer
  issuanceDate: string
  expirationDate?: string
  awardedDate?: string
  name: string
  credentialSubject: CredentialSubject
}

export interface Portfolio {
  name: string
  url: string
}

export interface Evidence {
  name: string
  url: string
}

export interface FormData {
  storageOption: string
  fullName: string
  howKnow: string
  RecommendationText: string
  evidence: Evidence[]
  qualifications: string
  communicationRating: number
  dependabilityRating: number
  explainAnswer: string
  isRecommend: string
  credentialDescription?: string
  persons?: string
  credentialName?: string
  credentialDuration?: string
  portfolio: Portfolio[]
  evidenceLink?: string
  evidenceDescription?: string
  [key: string]: string | number | Portfolio[] | Evidence[] | undefined
}

// Update the props for components that require formData
export interface SuccessPageProps {
  formData: FormData
  setActiveStep: (step: number) => void
  reset: () => void
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
