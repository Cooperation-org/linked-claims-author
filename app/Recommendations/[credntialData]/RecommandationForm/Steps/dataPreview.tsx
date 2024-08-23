import React from 'react';
import {
  Box,
  Card,
  Container,
  Link,
  Typography,
  Rating
} from '@mui/material';
import { ThumbUp, FormatQuote } from '@mui/icons-material';
import Image from 'next/image';
import FetchedData from '../../viewCredential/FetchedData';

interface Evidence {
  name: string;
  url: string;
}

interface FormData {
  fullName: string;
  isRecommend: string;
  explainAnswer: string;
  howKnow: string;
  communicationRating: number;
  dependabilityRating: number;
  portfolio: Evidence[];
}

interface DataPreviewProps {
  formData: FormData;
}

const DataPreview: React.FC<DataPreviewProps> = ({ formData }) => {
  return (
    <Container maxWidth='sm' sx={{ mt: 4, mb: 4 }}>
      <Typography variant='body1' align='center' gutterBottom>
        If everything looks good, select Finish & Sign to complete your recommendation.
      </Typography>

      <FetchedData
        setFullName={name => console.log('Full Name:', name)}
        setEmail={email => console.log('Email:', email)}
      />

      <Card variant='outlined' sx={{ p: 2, mb: 2 }}>
        <Box display='flex' alignItems='center'>
          <Image
            src='/app/Assets/SVGs/Badge.svg'
            alt='Badge'
            width={24}
            height={24}
          />
          <Typography variant='body2'>
            Carol Taylor vouched for {formData.fullName}.
          </Typography>
        </Box>
      </Card>

      <Card variant='outlined' sx={{ p: 2, mb: 2 }}>
        <Typography variant='body1' fontWeight='bold'>
          Would You Recommend {formData.fullName}?
        </Typography>
        <Box display='flex' alignItems='center' mt={1}>
          <ThumbUp color='primary' fontSize='large' />
          <Typography variant='h6' color='primary' ml={1}>
            {formData.isRecommend === 'yes' ? 'YES' : 'NO'}
          </Typography>
        </Box>
      </Card>

      <Card variant='outlined' sx={{ p: 2, mb: 2 }}>
        <Box display='flex' alignItems='center'>
          <FormatQuote fontSize='large' />
          <Typography variant='body2' ml={1}>
            {formData.explainAnswer ||
              'I worked with Alice for about two years, managing her work at the community garden. She was an excellent worker, prompt, and friendly.'}
          </Typography>
        </Box>
      </Card>

      <Card variant='outlined' sx={{ p: 2, mb: 2 }}>
        <Typography variant='subtitle1' fontWeight='bold'>
          How They Know Each Other
        </Typography>
        <Typography variant='body2'>
          {formData.howKnow ||
            'I was Alice’s manager for about two years, but I have known her in total about 5 years.'}
        </Typography>
      </Card>

      <Card variant='outlined' sx={{ p: 2, mb: 2 }}>
        <Typography variant='subtitle1' fontWeight='bold'>
          Communication
        </Typography>
        <Rating value={formData.communicationRating} readOnly sx={{ mb: 1 }} />
        <Typography variant='body2'>
          I gave Alice 4 stars because she doesn’t like to speak in front of a group of
          people and this sometimes made it challenging for her to lead groups in
          volunteer activities.
        </Typography>
      </Card>

      <Card variant='outlined' sx={{ p: 2, mb: 2 }}>
        <Typography variant='subtitle1' fontWeight='bold'>
          Dependability
        </Typography>
        <Rating value={formData.dependabilityRating} readOnly />
      </Card>

      <Card variant='outlined' sx={{ p: 2 }}>
        <Typography variant='subtitle1' fontWeight='bold'>
          Supporting Evidence
        </Typography>
        {formData.portfolio?.map((item: Evidence, index: number) => (
          <Link key={item.url} href={item.url} underline='hover' color='primary'>
            {item.name || 'Name of the evidence'}
          </Link>
        ))}
      </Card>
    </Container>
  );
};

export default DataPreview;
