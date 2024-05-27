"use client";
import Link from "next/link";
import { Container, Flex, Box, Title, Text, Button } from "@mantine/core";
import Image from "next/image";
import image1 from "../../public/image1.png"; 
import { IconCloudUp } from "@tabler/icons-react";

export default function Home() {
  return (
    <Container size="lg" style={{ textAlign: "center", paddingTop: "50px" }}>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify="center"
        align="center"
        style={{ width: "100%" }}
      >
        <Box style={{ flex: 1, maxWidth: "100%" }}>
          <Title order={1}>Add Audio to Video</Title>
          <Text size="xs">
            Add music, sound effects, and other audio tracks to your videos
            online
          </Text>
          <Link href="/dashboard" scroll={false}>
            <Button
              variant="filled"
              size="lg"
              rightSection={<IconCloudUp size={14} />}
              mt="md"
              radius="md"
            >
              Add Audio to your Video
            </Button>
          </Link>
        </Box>
        <Box style={{ flex: 1, maxWidth: "100%" }}>
          <Image src={image1} alt="picture loading" />
        </Box>
      </Flex>
    </Container>
  );
}
