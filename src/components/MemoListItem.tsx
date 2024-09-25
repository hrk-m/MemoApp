import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { Link } from "expo-router"

import Icon from "./Icon"

const MemoListItem = (): JSX.Element => {
  return (
    <Link href="/memo/detail" asChild>
      <TouchableOpacity style={styles.MemoListItem}>
        <View>
          <Text style={styles.MemoListItemTitle}>買い物リスト</Text>
          <Text style={styles.MemoListItemDate}>2023年10月1日 10:00</Text>
        </View>
        <TouchableOpacity>
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
