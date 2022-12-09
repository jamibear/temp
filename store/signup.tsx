import create from "zustand";

export interface SignUpState {
  first_name: string;
  last_name: string;
  user_type: string;
  username: string;
  email: string;
  password: string;
  street: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
  zipcode: string;
}

export interface SignUpActions {
  setFirstName: (first_name: string) => void;
  setLastName: (last_name: string) => void;
  setUserType: (user_type: string) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setStreet: (street: string) => void;
  setRegion: (region: string) => void;
  setProvince: (province: string) => void;
  setCity: (city: string) => void;
  setBarangay: (barangay: string) => void;
  setZipCode: (zipcode: string) => void;
}

// create global state for signup form
export const useSignUpStore = create<SignUpState, SignUpActions>((set) => ({
  first_name: "",
  last_name: "",
  user_type: "",
  username: "",
  email: "",
  password: "",
  street: "",
  region: "",
  province: "",
  city: "",
  barangay: "",
  zipcode: "",

  setFirstName: (first_name: string) => set((state) => ({ first_name })),
  setLastName: (last_name: string) => set((state) => ({ last_name })),
  setUserType: (user_type: string) => set((state) => ({ user_type })),
  setUsername: (username: string) => set((state) => ({ username })),
  setEmail: (email: string) => set((state) => ({ email })),
  setPassword: (password: string) => set((state) => ({ password })),
  setStreet: (street: string) => set((state) => ({ street })),
  setRegion: (region: string) => set((state) => ({ region })),
  setProvince: (province: string) => set((state) => ({ province })),
  setCity: (city: string) => set((state) => ({ city })),
  setBarangay: (barangay: string) => set((state) => ({ barangay })),
  setZipCode: (zipcode: string) => set((state) => ({ zipcode })),
}));
