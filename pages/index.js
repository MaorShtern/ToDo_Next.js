import Head from 'next/head';
import List from './Com/list';


export default function Home({data}) {

  return (
    <>
     <Head>
        <title>Todo App</title>
      </Head>
      <div>
        <List data={data}/>
      </div>
    </>
  )
}




export async function getStaticProps() {
  let res = await fetch('http://localhost:3000/api/api', { method: "GET" })
  let data = await res.json()

  data.sort((a,b) => (a.date > b.date ) ? -1: 1)
  data.sort((a) => (a.isComplet === true ) ? -1: 1)

  return {
    props: {data}, 
  }
}
