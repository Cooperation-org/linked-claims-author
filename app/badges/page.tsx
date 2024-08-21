'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import { StorageContext, StorageFactory } from 'trust_storage';
import Handlebars from 'handlebars';

interface ClaimDetail {
  '@context': string[];
  id: string;
  type: string[];
  issuer: {
    id: string;
    type: string[];
  };
  issuanceDate: string;
  expirationDate: string;
  credentialSubject: {
    type: string[];
    name: string;
    achievement: any;
  };
}

const BadgePage = () => {
  const searchParams = useSearchParams();
  const [badgeSvg, setBadgeSvg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { data: session } = useSession();
  const [storage, setStorage] = useState<StorageContext | null>(null);

  const accessToken = session?.accessToken as string;

  useEffect(() => {
    if (accessToken) {
      const storageInstance = new StorageContext(
        StorageFactory.getStorageStrategy('googleDrive', { accessToken })
      );
      setStorage(storageInstance);
    }
  }, [accessToken]);

  const getContent = useCallback(async (fileId: string): Promise<ClaimDetail> => {
    if (!storage) throw new Error('Storage is not initialized');
    const file = await storage.getFileContent(fileId);
    return file as ClaimDetail;
  }, [storage]);

  useEffect(() => {
    const fetchBadgeData = async () => {
      const id = searchParams.get('id');
      if (id && storage) {
        try {
          const claimData = await getContent(id);

          // Generate the SVG using the fetched data
          const template = Handlebars.compile(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
              <defs>
                <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#4a90e2;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#63b3ed;stop-opacity:1" />
                </linearGradient>
              </defs>
              
              <rect width="400" height="300" rx="20" ry="20" fill="url(#badgeGradient)" />
              
              <text x="200" y="50" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle">
                BadgeSummit 2025
              </text>
              
              <text x="200" y="90" font-family="Arial, sans-serif" font-size="18" fill="white" text-anchor="middle">
                Attendee Credential
              </text>
              
              <text x="30" y="130" font-family="Arial, sans-serif" font-size="14" fill="white">
                Name: {{credentialSubject.name}}
              </text>
              
              <text x="30" y="160" font-family="Arial, sans-serif" font-size="14" fill="white">
                Achievement: {{credentialSubject.achievement.0.name}}
              </text>
              
              <text x="30" y="190" font-family="Arial, sans-serif" font-size="14" fill="white">
                Issued: {{issuanceDate}}
              </text>
              
              <text x="30" y="220" font-family="Arial, sans-serif" font-size="12" fill="white">
                Expires: {{expirationDate}}
              </text>
            </svg>
          `);

          const svgContent = template(claimData);
          setBadgeSvg(svgContent);
        } catch (error) {
          console.error('Error fetching badge data:', error);
          setErrorMessage('Failed to fetch badge data. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (storage) {
      fetchBadgeData();
    }
  }, [searchParams, storage, getContent]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (errorMessage) {
    return (
      <Box sx={{ p: 4, maxWidth: 800, margin: 'auto' }}>
        <Typography color="error">{errorMessage}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Your BadgeSummit 2025 Credential</Typography>
      {badgeSvg ? (
        <div dangerouslySetInnerHTML={{ __html: badgeSvg }} />
      ) : (
        <Typography>No badge data found.</Typography>
      )}
    </Box>
  );
};

export default BadgePage;
