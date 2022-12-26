import { useRef } from "react";
import { Text, Group, Button, createStyles } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { BsCloudUpload, BsCloudDownload } from "react-icons/bs";
import { MdOutlineClose as MdClose } from "react-icons/md";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: "absolute",
    width: 250,
    left: "calc(50% - 125px)",
    bottom: -20,
  },
}));

export function FileInput() {
  const { classes } = useStyles();
  const openRef = useRef<() => void>(null);

  const handleDrop = (files: File[]) => {
    console.log(files);
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.pdf]}
        maxSize={30 * 1024 ** 2}
      >
        <div style={{ pointerEvents: "none" }}>
          <Group position="center">
            <Dropzone.Accept>
              <BsCloudDownload className="h-12 w-12 text-gray-800" />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <MdClose className="h-12 w-12 text-gray-800" />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <BsCloudUpload className="h-12 w-12 text-gray-800" />
            </Dropzone.Idle>
          </Group>

          <Text align="center" weight={700} size="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload resume</Dropzone.Idle>
          </Text>
          <Text align="center" size="sm" mt="xs" color="dimmed">
            Drag&apos;n&apos;drop files here to upload. We can accept only{" "}
            <i>.pdf</i> files that are less than 30mb in size.
          </Text>
        </div>
      </Dropzone>

      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current?.()}
        variant="outline"
      >
        Select files
      </Button>
    </div>
  );
}
