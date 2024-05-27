// app/dashboard/page.js
'use client';

import { DoubleNavbar } from '@/components/DoubleNavbar';
import { Fileuploader } from '@/components/DropZoneButton';
import { Box, Flex } from '@mantine/core';
import React from 'react';

export default function Dashboard() {
  return (
    <Box>
<Fileuploader/>

</Box>

  );
}

