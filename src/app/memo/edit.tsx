import { router, useLocalSearchParams } from "expo-router"
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { useEffect, useState } from "react"
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

const handlePress = (id: string, bodyText: string): void => {
  if (auth.currentUser === null) { return }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
  setDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then(() => {
      router.back()
    })
    .catch(() => {
      Alert.alert('更新に失敗しました')
    })
}

const Edit = (): JSX.Element => {
  const id  = String(useLocalSearchParams().id)
  const [bodyText, setBodyText] = useState("")
  useEffect(() => {
    if (auth.currentUser == null) { return }

    const ref = doc(db, `users/${auth.currentUser?.uid}/memos/`, id)
    getDoc(ref)
      .then((docRef) => {
        const RemoteBodyText = docRef?.data()?.bodyText
        setBodyText(RemoteBodyText)
      })
      .catch(() => {
        Alert.alert("メモデータの取得に失敗しました")
      })

  }, [])

  return (
    <KeyboardSafeView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter text here"
          multiline
          autoFocus
          autoCapitalize="none"
          onChangeText={(bodyText) => setBodyText(bodyText)}
          style={styles.input}
          value={bodyText}
        />
      </View>

      <CircleButton onPress={() => handlePress(id, bodyText)}>
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

export default Edit
