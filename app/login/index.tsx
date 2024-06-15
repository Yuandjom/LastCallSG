import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext"; // Adjust the path as needed
import Toast from "react-native-toast-message";

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://411r12agye.execute-api.ap-southeast-1.amazonaws.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const { email } = data;

        login({ username, password, email });
        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: "Welcome back to LastCallSG! Redirecting...",
        });
        setMessage("");
        setTimeout(() => {
          router.push("/");
        }, 400); // 0.4 seconds delay before navigation
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
          <Image
            source={{
              uri: "https://walaoeh.s3.ap-southeast-1.amazonaws.com/lastcall-logo.png",
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Log in to your account to continue
          </Text>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#888"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            {message && <Text style={styles.message}>{message}</Text>}
          </View>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.loginText}>
              Don't have an account?{" "}
              <Text style={styles.loginLink}>Create Account</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast topOffset={60} />
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(12, 82, 49, 1)",
    paddingVertical: 40,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 15,
    backgroundColor: "#F2F5F9",
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  logo: {
    width: 200,
    height: 65,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    alignSelf: "flex-start",
    marginLeft: 24,
  },
  subtitle: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 20,
    alignSelf: "flex-start",
    marginLeft: 24,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#f2f2f2",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
  button: {
    backgroundColor: "rgba(86, 192, 113, 1)",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  googleIcon: {
    marginRight: 8,
  },
  googleButtonText: {
    color: "#888",
    fontSize: 16,
  },
  orText: {
    marginVertical: 20,
    color: "#fff",
    fontSize: 16,
  },
  loginText: {
    marginTop: 20,
    color: "#ffffff",
    textAlign: "center",
  },
  loginLink: {
    color: "rgba(86, 192, 113, 1)",
    fontWeight: "bold",
  },
  message: {
    marginTop: 16,
    color: "red",
    textAlign: "center",
  },
});

export default LoginScreen;
