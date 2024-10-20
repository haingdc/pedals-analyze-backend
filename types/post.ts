export interface Root {
  posts: Post[]
}

export interface Post {
  title: string
  date: string
  tags: string[]
  draft: boolean
  summary: string
  type: string
  readingTime: ReadingTime
  slug: string
  path: string
  filePath: string
  toc: Toc[]
  structuredData: StructuredData
}

export interface ReadingTime {
  text: string
  minutes: number
  time: number
  words: number
}

export interface Toc {
  value: string
  url: string
  depth: number
}

export interface StructuredData {
  "@context": string
  "@type": string
  headline: string
  datePublished: string
  dateModified: string
  description: string
  image: string
  url: string
}

export interface CountPostsByMonth {
  date: string
  count: number
  month: string
}