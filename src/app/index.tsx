import { Redirect } from "expo-router/build/exports"
import React from "react"

const Index = (): JSX.Element => {
  return <Redirect href="auth/log_in" />
}

export default Index
