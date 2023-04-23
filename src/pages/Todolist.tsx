import React from 'react'
import useFetch from 'use-http'
import { useEffect } from 'react'

interface data {
  title: string
}

export const Todolist: React.FC = () => {
  const optiton = {}
  const { loading, error, data = [] } = useFetch('http://localhost:8003/task', {}, [])
  const test: data[] = data
  // test[0].title = (undefined ? loading : false;)

  useEffect(() => {
    console.log(`結果\n`, data)
    console.log(error)
    console.log(loading)
  }, [data, error, loading])
  return <></>
}
