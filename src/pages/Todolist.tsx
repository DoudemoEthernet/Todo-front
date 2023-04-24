import React from 'react'
import useFetch from 'use-http'
import { useEffect } from 'react'
import styles from '@/styles/input_todo.module.css';
import axios from 'axios';

interface data {
  title: string
}

export const Todolist: React.FC = () => {
  const { data: string } = useFetch('http://localhost:8003/task', {}, [])
  // const test: data[] = data
  // test[0].title = (undefined ? loading : false;)

  useEffect(() => {
    console.log(`結果\n`, )
    // console.log(error)
    // console.log(loading)
  }, [data])
  return <>
  <div className={styles.todo}>

  </div>
  </>
}
