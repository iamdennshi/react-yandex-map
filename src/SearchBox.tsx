import React, { useRef, useState } from 'react'

export default function SearchBox() {
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);


  return (
    <div className='absolute left-1/2 top-4 -translate-x-2/4 max-w-xl w-full px-4'>
        <input ref={inputRef} value={input} className='block w-full px-5 py-2 pl-12 rounded-full border-[#ccc]  border-solid border-[1px] outline-green-500 shadow-lg text-[#4A5568] font-medium' type="text" placeholder='Название объекта' onChange={({target}) => setInput(target.value)} />
        <div className="absolute top-2 left-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#4A5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        {input !== "" && 
            <div onClick={()=> {
                setInput("");
                inputRef.current!.focus();
            }} className="close-icon absolute right-8 top-0 hover:opacity-100"></div>
        }
    </div>
  )
}
