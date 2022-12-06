import { create } from "zustand";

interface SignUpState {
	first_name: string
	last_name: string
	user_type: string
	username: string
	email: string
	password: string
	street: string
	city: string
	state: string
	zipcode: string
}

interface SignUpActions {
	setFirstName: (first_name: string) => void;
	setLastName: (last_name: string) => void;
	setUserType: (last_name: string) => void;
	setUsername: (username: string) => void;
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
	setStreet: (password: string) => void;
	setCity: (password: string) => void;
	setState: (state: string) => void;
	setZipCode: (password: string) => void;
}

// create global state for signup form
export default const useSignUpStore = create<SignUpState, SignUpActions>((set) => ({
	first_name: "",
	last_name: "",
	user_type: "",
	username: "",
	email: "",
	password: "",
	street: "",
	city: "",
	state: "",
	zipcode: "",

	setFirstName: (first_name: string) => set(() => ({ first_name }))
}));
