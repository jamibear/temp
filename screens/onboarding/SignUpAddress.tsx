import { Picker, TextInput, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import tw from "twrnc";
import * as Yup from "yup";
import {
  regions,
  provinces,
  provincesByCode,
  regionByCode,
  cities,
  barangays,
} from "select-philippines-address";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialValues = {
  street: "",
  region: "",
  province: "",
  city: "",
  barangay: "",
  zipcode: "",
};

const SignupSchema = Yup.object().shape({
  street: Yup.string()
    .min(5, "Please enter your street address")
    .required("Required"),
  region: Yup.string().required("Required"),
  province: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  barangay: Yup.string().required("Required"),
  zipcode: Yup.string().required("Required"),
});

export default function SignUp() {
  const [region, setRegion] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [barangay, setBarangay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);

  const fetchRegions = async () => {
    const r = await regions();
    setRegion(r);
  };

  const fetchProvinces = async () => {
    const r = await provinces(selectedRegion);
    setProvince(r);
  };

  const fetchCities = async () => {
    const r = await cities(selectedProvince);
    setCity(r);
  };

  const fetchBarangays = async () => {
    const r = await barangays(selectedCity);
    setBarangay(r);
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    fetchProvinces();
  }, [selectedRegion]);

  useEffect(() => {
    fetchCities();
  }, [selectedProvince]);

  useEffect(() => {
    fetchBarangays();
  }, [selectedCity]);

  const enterStreet = (fieldName, setFieldValue) => async (text) => {
    setFieldValue(fieldName, text);
    await AsyncStorage.setItem("signup_street", text);
  };

  const enterZipcode = (fieldName, setFieldValue) => async (text) => {
    setFieldValue(fieldName, text);
    await AsyncStorage.setItem("signup_zipcode", text);
  };

  const selectRegion = (fieldName, setFieldValue) => async (text) => {
    setFieldValue(fieldName, text);
    setSelectedRegion(text);
    setSelectedProvince("");
    setSelectedCity("");
    const { region_name } = await regionByCode(text);
    await AsyncStorage.setItem("signup_regionname", region_name);
  };

  const selectProvince = (fieldName, setFieldValue) => async (text) => {
    setFieldValue(fieldName, text);
    setSelectedProvince(text);
    setSelectedCity("");
    const findProvince = ({ province_code }) => {
      return text === province_code;
    };
    const provinceList = await provincesByCode(selectedRegion);
    const { province_name } = provinceList.find(findProvince);
    await AsyncStorage.setItem("signup_provincename", province_name);
  };

  const selectCity = (fieldName, setFieldValue) => async (text) => {
    setFieldValue(fieldName, text);
    setSelectedCity(text);
    const findCity = ({ city_code }) => {
      return text === city_code;
    };
    const cityList = await cities(selectedProvince);
    const { city_name } = cityList.find(findCity);
    await AsyncStorage.setItem("signup_cityname", city_name);
  };

  const selectBarangay = (fieldName, setFieldValue) => async (text) => {
    setFieldValue(fieldName, text);
    const { brgy_name } = barangay.find(({ brgy_code }) => text === brgy_code);
    await AsyncStorage.setItem("signup_brgyname", brgy_name);
  };

  return (
    <Formik
      validateOnChange={false}
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={async () => {
        console.log(await AsyncStorage.getItem("signup_firstname"));
        console.log(await AsyncStorage.getItem("signup_lastname"));
        console.log(await AsyncStorage.getItem("signup_usertype"));
        console.log(await AsyncStorage.getItem("signup_email"));
        console.log(await AsyncStorage.getItem("signup_username"));
        console.log(await AsyncStorage.getItem("signup_password"));
        console.log(await AsyncStorage.getItem("signup_street"));
        console.log(await AsyncStorage.getItem("signup_regionname"));
        console.log(await AsyncStorage.getItem("signup_provincename"));
        console.log(await AsyncStorage.getItem("signup_cityname"));
        console.log(await AsyncStorage.getItem("signup_brgyname"));
        console.log(await AsyncStorage.getItem("signup_zipcode"));
      }}
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
              <Text>Street Address</Text>
              <TextInput
                style={tw`bg-gray-300 rounded-xl p-3 font-bold my-1`}
                placeholder="Street address"
                placeholderTextColor="gray"
                onChangeText={enterStreet("street", setFieldValue)}
                onBlur={handleBlur("street")}
                value={values.street}
              />
              <Text style={tw`text-red-500`}>
                {errors.street && touched.street && errors.street}
              </Text>
            </View>

            <View style={tw`mx-3 mb-3`}>
              <Text>Region</Text>
              <Picker
                style={tw`p-3 rounded-xl`}
                selectedValue={values.region}
                onValueChange={selectRegion("region", setFieldValue)}
              >
                {region &&
                  region.map((r) => (
                    <Picker.Item
                      label={r.region_name}
                      key={r.region_code}
                      value={r.region_code}
                    />
                  ))}
              </Picker>
            </View>

            <View style={tw`mx-3 mb-3`}>
              <Text>Province</Text>
              <Picker
                style={tw`p-3 rounded-xl`}
                selectedValue={values.province}
                onValueChange={selectProvince("province", setFieldValue)}
              >
                {province &&
                  province.map((r) => (
                    <Picker.Item
                      label={r.province_name}
                      value={r.province_code}
                      key={r.province_code}
                    />
                  ))}
              </Picker>
            </View>

            <View style={tw`mx-3 mb-3`}>
              <Text>City</Text>
              <Picker
                style={tw`p-3 rounded-xl`}
                selectedValue={values.city}
                onValueChange={selectCity("city", setFieldValue)}
              >
                {city &&
                  city.map((r) => (
                    <Picker.Item
                      label={r.city_name}
                      value={r.city_code}
                      key={r.city_code}
                    />
                  ))}
              </Picker>
            </View>

            <View style={tw`mx-3 mb-3`}>
              <Text>Barangay</Text>
              <Picker
                style={tw`p-3 rounded-xl`}
                selectedValue={values.barangay}
                onValueChange={selectBarangay("barangay", setFieldValue)}
              >
                {barangay &&
                  barangay.map((r) => (
                    <Picker.Item
                      label={r.brgy_name}
                      value={r.brgy_code}
                      key={r.brgy_name}
                    />
                  ))}
              </Picker>
            </View>

            <View style={tw`mb-3 mx-3`}>
              <Text>Zip code</Text>
              <TextInput
                style={tw`bg-gray-300 rounded-xl p-3 font-bold my-1`}
                placeholder="Zip code"
                placeholderTextColor="gray"
                onChangeText={enterZipcode("zipcode", setFieldValue)}
                onBlur={handleBlur("zipcode")}
                value={values.zipcode}
                keyboardType="numeric"
              />
              <Text style={tw`text-red-500`}>
                {errors.zipcode && touched.zipcode && errors.zipcode}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            style={tw`p-3 rounded-xl bg-zinc-900 text-center`}
          >
            <Text style={tw`text-white font-bold`}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}
