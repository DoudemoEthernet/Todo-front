import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Inter } from 'next/font/google'
import { useEffect, useState } from "react";
import { Todolist } from './Todolist';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


    return<>
      <p className={styles.test}>To do List</p>
      <div className={styles.menu}>
        <div className={styles.menu_edge}></div>
        <div className={styles.menu_back}>
        <Todolist />
          
        </div>
        
      </div>
    {/* <div>{loading ? "loading" : "ERROR!"}</div>  */}
    </>
  

}





