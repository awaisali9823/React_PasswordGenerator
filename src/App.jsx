import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
        const [length, setLength] = useState(8)
        const [numbers, setNumbers] = useState(false)
        const [characters, setCharacters] = useState(false)
        const [password, setPassword] = useState("")

        const passwordRef = useRef(null)

        const passwordGenerator = useCallback(() => {
          let pass = ""
          let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
          if(numbers) str += "1234567890"
          if(characters) str += "!@#$%^&*+-?"

          for(let i = 1; i <= length; i++){
            let char = Math.floor(Math.random() * str.length)
            pass += str.charAt(char)
          }
          setPassword(pass)
        },[length, numbers, characters, setPassword])

        const copyPassword = useCallback(() => {
            passwordRef.current?.select()
            window.navigator.clipboard.writeText(password)
        }, [password])

        useEffect(() => {
          passwordGenerator()
        },[length, characters, numbers, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 pt-5 pb-10  my-40 text-orange-500 bg-gray-800 sm:px-4 sm:pt-5 sm:pb-10 sm:my-40'>
        <h1 className='text-white text-center text-3xl my-3 pb-5 sm:text-3xl sm:my-3 sm:pb-5'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
           className='outline-none w-full py-1 px-3 text-sm sm:py-1 sm:px-3'
           value={password}
           ref={passwordRef}
           placeholder='password'
           readOnly
          />
          <button onClick={copyPassword} className='outline-none bg-blue-600 text-white px-3 py-0.5 text-sm shrink-0 sm:px-3 sm:py-0.5'>copy</button>
        </div>
        <div className='flex flex-col text-sm gap-y-2 gap-x-0 sm:flex-row sm:gap-y-0 sm:gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
             className='cursor-pointer'
             value={length}
             min={6}
             max={50}
             onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input type="checkbox"
             defaultChecked={numbers}
             id='numberInput'
             onChange={() => setNumbers(prev => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input type="checkbox"
             defaultChecked={characters}
             id='charInput'
             onChange={() => setCharacters(prev => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
