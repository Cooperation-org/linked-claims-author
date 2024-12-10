import React from 'react'
import './PrivacyPolicy.css'
import { Logo } from '../Assets/SVGs'

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Google Permissions',
      items: [
        'Used to all the user to send a copy of the credential they author to themselves',
        'Profile Access: Used to prefill user data in the app',
        'Used to save and manage user-authored credentials  to their Google Drive',
        'Read-only Drive Access: Enables viewing and recommendations for documents created by the user'
      ]
    },
    {
      title: 'Data Collection & Usage',
      items: [
        'We temporarily access your Google Account email and basic profile information strictly for authentication and pre-filling of forms for user convenience.',
        'No personal data is stored on our servers',
        'All authentication data is temporary and is not retained beyond your current session'
      ]
    },
    {
      title: 'Data Storage & Processing',
      items: [
        'User-created credentials are stored exclusively in your Google Drive',
        'No personal data is stored on our servers',
        "Data interactions occur directly between your browser and Google's services",
        'Read-only access is used soley to enable viewing a credential the credential author sends to a third-party of their choice.'
      ]
    },
    {
      title: 'Data Sharing & Protection',
      items: [
        'Your data is never shared with third parties',
        'All data transmissions use encrypted HTTPS connections',
        'We implement OAuth 2.0 security protocols for authentication',
        'Regular security audits and monitoring are conducted',
        'Access tokens are securely stored only in the browser for the duration of an authoring session'
      ]
    }
  ]

  return (
    <main className='privacy-policy-container'>
      <div className='privacy-policy-box'>
        <header className='privacy-policy-header'>
          <a href='/' aria-label='OpenCreds Home' className='privacy-policy-link'>
            <Logo />
            <span className='privacy-policy-logo-text'>OpenCreds</span>
          </a>
        </header>

        <section className='privacy-policy-paper'>
          <h1 className='privacy-policy-heading'>Privacy Policy</h1>

          <p className='privacy-policy-paragraph'>
            OpenCreds is an open-source web application developed by the{' '}
            <a
              href='https://t3innovation.net'
              target='_blank'
              rel='noopener noreferrer'
              className='privacy-policy-link'
            >
              T3 Innovation Network
            </a>{' '}
            ,<br />a network of leading organizations committed to open infrastructure for
            Learning and Employment Records compliant with the W3C Verifiable Credential
            standard.
          </p>

          {sections.map(({ title, items }) => (
            <div key={title} className='privacy-policy-section'>
              <h2 className='privacy-policy-section-heading'>{title}</h2>
              <ul className='privacy-policy-list'>
                {items.map((item, index) => (
                  <li key={`${title}-${index}`} className='privacy-policy-list-item'>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className='privacy-policy-footer-note'>
            <p className='privacy-policy-footer-paragraph'>
              This Privacy Policy may change from time to time. Any significant changes in
              data handling will be clearly communicated through policy updates.
            </p>
          </div>

          <div className='privacy-policy-bottom-border'>
            <p className='privacy-policy-footer-text'>
              &copy; 2024, US Chamber of Commerce Foundation
            </p>
            <div className='privacy-policy-footer-links'>
              <a
                href='https://t3networkhub.org'
                target='_blank'
                rel='noopener noreferrer'
                className='privacy-policy-footer-link'
              >
                T3 Network
              </a>
              <a href='/accessibility' className='privacy-policy-footer-link'>
                Accessibility
              </a>
              <a href='/terms' className='privacy-policy-footer-link'>
                Terms
              </a>
              <a
                href='https://github.com/Cooperation-org'
                target='_blank'
                rel='noopener noreferrer'
                className='privacy-policy-footer-link'
              >
                Github
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default PrivacyPolicy
