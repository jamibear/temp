import { TextInput, Text, TouchableOpacity, View, Picker } from "react-native";
import { Formik } from "formik";
import tw from "twrnc";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLink } from "expo-router";
import { useEffect } from "react";

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
  const link = useLink();

  // set user as the default user type
  useEffect(() => {
    AsyncStorage.setItem("signup_usertype", "user");
  });

  const enterFirstName = (fieldName, setFieldValue) => async (text) => {
    setFieldValue(fieldName, text);
    try {
      await AsyncStorage.setItem("signup_firstname", JSON.stringify(text));
    } catch (e) {
      console.log("Failed saving to storage");
    }
  };

  const enterLastName = (fieldName, setFieldValue) => async (text) => {
    setFieldValue(fieldName, text);
    try {
      await AsyncStorage.setItem("signup_lastname", JSON.stringify(text));
    } catch (e) {
      console.log("Failed saving to storage");
    }
  };

  const handleUserType = (fieldName, setFieldValue) => async (text) => {
    setFieldValue(fieldName, text);
    try {
      await AsyncStorage.setItem("signup_usertype", JSON.stringify(text));
    } catch (e) {
      console.log("Failed saving to storage");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={() => link.push("onboarding/signupprofile")}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        setFieldValue,
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
                onChangeText={enterFirstName("first_name", setFieldValue)}
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
                onChangeText={enterLastName("last_name", setFieldValue)}
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
                onValueChange={handleUserType("user_type", setFieldValue)}
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
