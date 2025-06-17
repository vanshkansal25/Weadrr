import { type PropsWithChildren } from 'react'
import Header from './Header'

const Layout = ({children}:PropsWithChildren) => {
  return (
    <div className='bg-gradient-to-br from-backgrond to-muted'>
        <Header/>
        <main className='min-h-screen container mx-auto px-4 py-8'>
            {children}
        </main>
        <footer className='border-t py-12 '>
            <div className='container mx-auto px-4 text-center text-gray-400'>
                <p className='font-bold'>Made By Vansh Kansal</p>
            </div>
        </footer>
    </div>
  )
}

export default Layout