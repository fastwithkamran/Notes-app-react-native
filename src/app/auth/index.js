import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AuthScreen = () => {
  const { login, register } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(false);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and Password are required");
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError("Passwords doesnt matched!");
      return;
    }

    let response;

    if (isRegistering) {
      response = await register(email, password);
    } else {
      response = await login(email, password);
    }

    if (response?.error) {
      Alert.alert(response?.error.message);
    }

    router.replace("/notes");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isRegistering ? "Sign up" : "Login"}</Text>

      {error && <Text style={styles.error}>{error}</Text>}
      {/* Form */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"#aaa"}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={"#aaa"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="none"
      />

      {/* Confirm password only if signing up */}
      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={"#aaa"}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          textContentType="none"
        />
      )}

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleAuth}>
          {isRegistering ? "SignUp" : "Login"}
        </Text>
      </TouchableOpacity>

      {/* Already have account then switch Login else SignUp Interface */}
      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.switchText}>
          {isRegistering
            ? "Already have an Account? Login"
            : "Dont have an Account? SignUp"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  switchText: {
    color: "red",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default AuthScreen;
