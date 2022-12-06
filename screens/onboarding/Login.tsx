import { TextInput, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import tw from "twrnc";

export default function Login() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              style={tw`bg-gray-300 rounded-xl p-3 mb-3 font-bold`}
              placeholder="Email address"
              placeholderTextColor="gray"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <TextInput
              style={tw.style(
                "bg-gray-300",
                "rounded-xl",
                "p-3",
                "mb-3",
                "font-bold"
              )}
              placeholder="Password"
              placeholderTextColor="gray"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              style={tw`rounded-xl bg-green-500 p-3 mb-3 text-center active:bg-green-700`}
            >
              <Text style={tw`text-white font-bold`}>Login</Text>
            </TouchableOpacity>

            {/* SIGN UP SECTION */}

            <Text style={tw`text-center text-gray-500 m-3`}>
              Don't have an account?
            </Text>

            <TouchableOpacity style={{ width: "max-content", alignSelf: 'center' }}>
              <Text style={tw`text-center font-bold text-green-600`}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
