export type FormState =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      errors?: {
        field: string;
        message: string;
      }[];
    }
  | null;
