'use client'
import React from 'react'
import Giscus from '@giscus/react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import ThemeSwitch from 'components/ThemeSwitch' // Assuming ThemeSwitch component is in a separate file


export default function FormPage() {
  const { theme } = useTheme()

  return (
    <div>
      <h1 className={`text-3xl font-extrabold leading-9 tracking-tight ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} sm:text-4xl sm:leading-10 md:text-6xl md:leading-14`}>
        FormPage
      </h1>
      &nbsp;
      <dd className={`text-base font-medium leading-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        Ask Your Questions Here for Helpful Responses!
      </dd>
      &nbsp;
      <ThemeSwitch /> {/* Render the ThemeSwitch component */}
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
        theme={theme === 'dark' ? 'dark' : 'preferred_color_scheme'} {/* Set the theme based on the current theme */}
        lang="en"
      />
    </div>
  )
}
