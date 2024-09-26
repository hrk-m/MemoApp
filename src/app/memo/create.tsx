import { router } from "expo-router"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { useState } from "react"
import {
  Alert,
  StyleSheet,
  TextInput,
  View
} from "react-native"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/Icon"
import KeyboardSafeView from "../../components/KeyboardAvoidingView"
import { auth, db } from "../../config"

const handlePress = (bodyText: string): void => {
  if (auth.currentUser == null) { return }
  const ref = collection(db, `users/${auth.currentUser?.uid}/memos`)

  addDoc(ref, {
    bodyText: bodyText,
    updatedAt: Timestamp.fromDate(new Date())
  })
  .then((docRef) => {
      console.log("docRef", docRef.id)
    })
    .catch((error) => {
      console.log("error", error)
      Alert.alert("EmailまたはPasswordが違います")
    })

  router.back()
}

const Create = (): JSX.Element => {
  const [bodyText, setBodyText] = useState('')

  return (
    <KeyboardSafeView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter text here"
          multiline
          style={styles.input}
          value={bodyText}
          autoCapitalize="none"
          autoFocus
          onChangeText={(text) => setBodyText(text)}
        />
      </View>
      <CircleButton onPress={() => handlePress(bodyText)}>
        <Icon name="check" size={40} color="#ffffff" />
      </CircleButton>
    </KeyboardSafeView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24
  }
})

export default Create
