import { router } from "expo-router"
import { signOut } from "firebase/auth"
import React from "react"
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native"
import { auth } from "../config"

const handlePress = (): void => {
  signOut(auth)
    .then(() => {
        router.replace("/auth/log_in")
      })
      .catch((error) => {
        console.log("error", error)
        Alert.alert("ログアウトに失敗しました")
      })
}

const LogOutButton = () => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.text}>ログアウト</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.7)'
  }
})

export default LogOutButton
