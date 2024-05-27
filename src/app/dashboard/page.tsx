// app/dashboard/page.js
'use client';

import { DoubleNavbar } from '@/components/DoubleNavbar';
import { Fileuploader } from '@/components/DropZoneButton';
import TrimAudio from '@/components/TrimAudio';
import { Box, Flex, Stack } from '@mantine/core';
import React from 'react';

export default function Dashboard() {
  return (
    <Flex direction={"row"}>
    <DoubleNavbar />
    <Stack justify="space-between">

      <TrimAudio />
    </Stack>
  </Flex>

  );
}

