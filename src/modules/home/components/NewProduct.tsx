import { useState } from "react";
import { TextInput, Text, Button } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import type { FileWithPath } from "@mantine/dropzone";

export const NewProduct: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (files: FileWithPath[]) => {
    setFiles((state) => [...state, ...files]);
  };

  return (
    <div>
      <h1 className="mb-6">Crea un nuevo producto para hacer trueque</h1>

      <form className="flex flex-col gap-4">
        <TextInput label="Nombre del producto" placeholder="Ej. iPhone 12" />
        <TextInput label="Descripción" placeholder="Ej. iPhone 12" />

        <div>
          <Text fw={500} fz="sm" className="mb-1">
            Imagenes del producto
          </Text>
          <Dropzone accept={IMAGE_MIME_TYPE} onDrop={handleDrop}>
            <Text align="center">Arrastra y suelta tus imagenes</Text>
          </Dropzone>

          <div className="mt-4 flex flex-wrap gap-4">
            {files.map((file) => (
              <div key={file.name} className="flex flex-col items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-32 w-32 rounded-md object-cover"
                />
                <Text size="xs">{file.name}</Text>
                <Button
                  type="button"
                  compact
                  variant="outline"
                  color="red"
                  onClick={() =>
                    setFiles((state) => state.filter((f) => f !== file))
                  }
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
