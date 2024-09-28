import { router, useNavigation } from "expo-router"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { type Memo } from "../../../types/memo"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/Icon"
import LogOutButton from "../../components/LogOutButton"
import MemoListItem from "../../components/MemoListItem"
import { auth, db } from "../../config"

const handlePress = (): void => {
  router.push("/memo/create")
}

const List = (): JSX.Element => {
  const [memos, setMemos] = useState<Memo[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <LogOutButton />
        )
      }
    })
  }, [])

  useEffect(() => {
    if (auth.currentUser == null) { return }
    const ref = collection(db, `users/${auth.currentUser?.uid}/memos`)
    const q = query(ref, orderBy('updatedAt', 'desc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteMemos: Memo[] = []

      snapshot.forEach(doc => {
        const { bodyText, updatedAt } = doc.data()
        remoteMemos.push({
          id: doc.id,
          bodyText,
          updatedAt
        })
      })

      setMemos(remoteMemos)
    })

    return unsubscribe
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={memos}
          renderItem={({ item }) => <MemoListItem memo={item} />}
        />
      </View>
      <CircleButton onPress={handlePress}>
        <Icon name="plus" size={35} color="#ffffff" />
      </CircleButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
})

export default List
