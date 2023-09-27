import { useCallback, useState, useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password,setPassword] = useState("")
  // useRef hook
  const passwordRef = useRef(null); 
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "0123456789";
    if(characterAllowed) str += "!@#$%^&*(){}[]?/><+=_"

    for( let i =1; i<length;i++)
    {
      let char = Math.floor(Math.random()*str.length +1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  },[length,numberAllowed,characterAllowed,setPassword])

  // copy to clipboard function
  const copyToClipboard = useCallback( ()=>{
    passwordRef.current?.select() // selecting whole password
    // passwordRef.current?.setSelectionRange(0,99) // selecting password with particular range

    window.navigator.clipboard.writeText(password);
  },[password]);

  useEffect( ()=> { passwordGenerator()}, [length,numberAllowed,characterAllowed,passwordGenerator])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-2 my-8
     text-orange-500 bg-gray-800 text-4xl'>
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className='className = "flex shadow rounded-lg overflow-hidden mb-4"'>
        <input type = "text"
        value = {password}
        className='outline-none w-full py-1 px-3 my-4 rounded-lg'
        placeholder='password'
        readOnly
        // giving reference
        ref = {passwordRef}
        />
        <button 
        onClick = {copyToClipboard}
        className='outline-none bg-blue-700 text-white text-2xl px-3 rounded-lg py-1 mb-2 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
      <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange = {(e) => {setLength(e.target.value)}}
        />
        <label> Length : {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => {
                  setCharacterAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
      </div>
     </div>

    </>
  )
}

export default App
