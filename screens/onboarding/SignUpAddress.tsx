import { TextInput, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import tw from "twrnc";
import * as Yup from "yup";

const initialValues = {
	street: "",
	state: "",
	city: "",
	barangay: "",
	zipcode: "",
};

const SignupSchema = Yup.object().shape({
	street: Yup.string()
		.min(5, "Please enter your street address")
		.required("Required"),
	state: Yup.string().required("Required"),
	city: Yup.string().required("Required"),
	barangay: Yup.string().required("Required"),
	zipcode: Yup.string().required("Required"),
});

export default function SignUp() {
	return (
		<Formik
			validateOnChange={false}
			initialValues={initialValues}
			validationSchema={SignupSchema}
			onSubmit={(values) => console.log(values)}
		>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				values,
				touched,
				errors,
			}) => (
				<View style={tw`flex-1 justify-between p-15`}>
					<Text style={tw`text-xl text-center font-bold`}>
						Create an account
					</Text>
					<View>
						<View style={tw`mb-3 mx-3`}>
							<Text>Street Address</Text>
							<TextInput
								style={tw`bg-gray-300 rounded-xl p-3 font-bold my-1`}
								placeholder="Street address"
								placeholderTextColor="gray"
								onChangeText={handleChange("street")}
								onBlur={handleBlur("street")}
								value={values.street}
							/>
							<Text style={tw`text-red-500`}>
								{errors.street && touched.street && errors.street}
							</Text>
						</View>
						</View>


						<TouchableOpacity
							onPress={handleSubmit}
							style={{ width: "max-content", padding: 9, }}
						>
							<Text style={tw`text-white-600 bg-zinc-600 text-lg font-bold`}>Create Account</Text>
						</TouchableOpacity>
					</View>
      )}
				</Formik>
			);
}
