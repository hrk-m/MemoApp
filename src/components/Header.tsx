import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Header = (): JSX.Element => {
  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        <Text style={styles.headerTitle}>Memo App</Text>
        <Text style={styles.headerRight}>ログアウト</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#467FD3',
    height: 104,
    justifyContent: 'flex-end'
  },
  headerInner: {
    alignItems: 'center'
  },
  headerTitle: {
    marginBottom: 8,
    fontSize: 22,
    lineHeight: 22,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  headerRight: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    color: '#ffffff'
  }
})

export default Header
