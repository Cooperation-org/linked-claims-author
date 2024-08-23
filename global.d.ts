interface Window {
  ethereum?: {
    isMetaMask?: boolean
    request: (request: { method: string; params?: any[] }) => Promise<any>
    on?: (eventName: string, callback: (...args: any[]) => void) => void
  }
}
