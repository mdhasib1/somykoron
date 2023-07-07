import { create } from "zustand";

type FormData = {
  name: string;
  email: string;
  age: string;
};

type FormStore = {
  formData: FormData[];
  addFormData: (data: FormData) => void;
};

export const useStore = create<FormStore>((set) => ({
  formData: [],
  addFormData: (data) =>
    set((state) => ({ formData: [...state.formData, data] })),
}));
