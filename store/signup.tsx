import { create } from "zustand";

// create global state for signup form
export default const useSignUpStore = create((set) => ({
  first_name: "",
  last_name: "",
  user_type: "",
  username: "",
  email: "",
  password: "",
  // address
  street: "",
  city: "",
  state: "",
  zipcode: "",
}));
