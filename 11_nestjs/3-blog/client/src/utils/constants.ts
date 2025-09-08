const loginInitialValues = {
  username: "",
  password: "Denem@123",
};

const registerInitialValues = {
  username: "",
  email: "",
  password: "Denem@123",
};

const mdeOptions = {
  toolbar: [
    "bold",
    "italic",
    "heading",
    "|",
    "quote",
    "unordered-list",
    "ordered-list",
    "|",
    "link",
    "image",
    "code",
    "|",
    "preview",
  ],
  previewClass: ["bg-zinc-100", "text-black", "p-4", "rounded-md"],
  placeholder: "Not içeriği yazınız...",
} as const;

const reactSelectOptions = {
  option: (styles: any) => ({
    ...styles,
    color: "black",
  }),
  multiValue: (styles: any) => ({
    ...styles,
    color: "black",
  }),
} as const;

export { loginInitialValues, registerInitialValues, mdeOptions, reactSelectOptions };
