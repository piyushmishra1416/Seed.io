import { Box, Button, Flex, Group, Text, Title, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconCloudUp } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';

export function Fileuploader(props: Partial<DropzoneProps>) {

   const handleUpload = (file: FileWithPath[]) => {

    };
  
  return (
   <Flex
      w="100vw"
      h="100vh"
      direction="column"
      justify={"center"}
      align={"center"}
      className="bg-gray-300 justify-center items-center relative"
    ><Box
    w="90vw"
    maw="800px"
    className="flex justify-center bg-white flex-col items-center rounded-2xl gap-9 m-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] py-20"
  >
    <Title order={3} className="text-xl">
      Add Audio or Video
    </Title>
    <Dropzone
    onDrop={(files) => handleUpload(files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none', display: 'flex', flexDirection:'column'}}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <Button size='lg' color="rgba(89,102,236)" leftSection={<IconCloudUp size={14} />} radius={"md"}>Upload a File</Button>
        </Dropzone.Idle>

        <div>

          <Text size="sm" c="dimmed" inline mt={7}>
            Drag & drop a file <br>
            </br> <span className=' text-purple-800'>or import from a link</span>
          </Text>
        </div>
      </Group>
    </Dropzone>
    </Box>
    </Flex>
  );
}