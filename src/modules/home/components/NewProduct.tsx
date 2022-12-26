import { TextInput } from "@mantine/core";
import { FileInput } from "@/components";

export const NewProduct: React.FC = () => {
  return (
    <div>
      <h1 className="mb-6">Crea un nuevo producto para hacer trueque</h1>

      <form className="flex flex-col gap-4">
        <TextInput label="Nombre del producto" placeholder="Ej. iPhone 12" />
        <TextInput label="Descripción" placeholder="Ej. iPhone 12" />

        <FileInput />
      </form>
    </div>
  );
};
