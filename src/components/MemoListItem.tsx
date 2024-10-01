import { Link } from "expo-router"
import { deleteDoc, doc } from 'firebase/firestore'
import React from "react"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { type Memo } from "../../types/memo"
import { auth, db } from "../config"
import Icon from "./Icon"

interface Props {
  memo: Memo
}

const handlePress = (id: string): void => {
  if (auth.currentUser == null) { return }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
  Alert.alert('メモを削除します', 'よろしいですか?', [
    {
      text: 'キャンセル'
    },
    {
      text: '削除する',
      style: 'destructive',
      onPress: () => {
        deleteDoc(ref)
        .catch(() => { Alert.alert('削除に失敗しました') })
      }
    }
  ])


}

const MemoListItem = (props: Props): JSX.Element | null => {
  const { memo } = props
  const { bodyText, updatedAt } = memo

  if (bodyText === null || updatedAt === null) { return null }

  const dataString = updatedAt.toDate().toLocaleString('ja-JP')

  return (
    <Link href={{ pathname: '/memo/detail', params: { id: memo.id } }} asChild>
      <TouchableOpacity style={styles.MemoListItem}>
        <View>
          <Text style={styles.MemoListItemTitle} numberOfLines={1}>{bodyText}</Text>
          <Text style={styles.MemoListItemDate}>{dataString}</Text>
        </View>
        <TouchableOpacity onPress={() => { handlePress(memo.id) }}>
          <Icon name="delete" size={32} color="#B0B0B0" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  )
}

const styles = StyleSheet.create({
  MemoListItem: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.15)"
  },
  MemoListItemTitle: {
    fontSize: 16,
    lineHeight: 32
  },
  MemoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#848484"
  }
})

export default MemoListItem
