import { TextInput, Text, TouchableOpacity, View, Picker } from "react-native";
import { Formik } from "formik";
import tw from "twrnc";
import * as Yup from "yup";

const initialValues = {
  first_name: "",
  last_name: "",
  user_type: "user",
};

const SignupSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
});

export default function SignUp() {
  return (
    <Formik
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
              <Text>First Name</Text>
              <TextInput
                style={tw`bg-gray-300 rounded-xl p-3 font-bold my-1`}
                placeholder="First Name"
                placeholderTextColor="gray"
                onChangeText={handleChange("first_name")}
                onBlur={handleBlur("first_name")}
                value={values.first_name}
              />
              <Text style={tw`text-red-500`}>
                {errors.first_name && touched.first_name && errors.first_name}
              </Text>
            </View>

            <View style={tw`mb-3 mx-3`}>
              <Text>Last Name</Text>
              <TextInput
                style={tw`bg-gray-300 rounded-xl p-3 font-bold my-1`}
                placeholder="Last Name"
                placeholderTextColor="gray"
                onChangeText={handleChange("last_name")}
                onBlur={handleBlur("last_name")}
                value={values.last_name}
              />
              <Text style={tw`text-red-500`}>
                {errors.last_name && touched.last_name && errors.last_name}
              </Text>
            </View>

            <View style={tw`mb-3 mx-3`}>
              <Text>I am...</Text>
              <Picker
                style={tw`p-3 rounded-xl`}
                selectedValue={values.user_type}
                onValueChange={handleChange("user_type")}
              >
                <Picker.Item label="shopping for products" value="user" />
                <Picker.Item label="selling my products" value="farmer" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            style={{ width: "max-content", padding: 9, alignSelf: "flex-end" }}
          >
            <Text style={tw`text-green-600 text-lg font-bold`}>Next </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}
