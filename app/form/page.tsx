'use client'
import React from 'react'
import Giscus from '@giscus/react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import ThemeSwitch from 'components/ThemeSwitch'


export default function FormPage() {

  const { theme } = useTheme()
  
  return (
    <div>
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        FormPage
      </h1>
      &nbsp;
      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
        Ask Your Questions Here for Helpful Responses!
      </dd>
      &nbsp;
      <Giscus
        id="Questions"
        repo="zoeeechu/n1bz.dev-site"
        repoId="R_kgDOKFaagw"
        category="Q&A"
        categoryId="DIC_kwDOKFaag84CZJ4O"
        mapping="pathname"
        term="Welcome to the formpage"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme= {theme}
        lang="en"
      />
    </div>
  )
}
