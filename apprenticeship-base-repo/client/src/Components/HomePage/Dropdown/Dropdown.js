import React,{useState,useRef,useEffect} from 'react'
import "./Dropdown.css"
function Dropdown({options,prompt,value,onChange}) {
    
    const[open,setOpen] = useState(false)
    const ref = useRef(null)

    useEffect(()=>{
        document.addEventListener("click",close)
        return () => document.removeEventListener("click",close)
    })

    function close(e) {
        setOpen(e && e.target == ref.current)
    }
    return (
        <div className="dropdown">
            <div className="control" onClick = {() => setOpen((prev)=>!prev)}>
                <div className="selected-value" ref={ref}>{value ? value : prompt}</div>
                <div className={`arrow ${open ? "open" : null}`} />
            </div>
            <div className={`options ${open ? "open" : null}`}>
                {options.map((option,index)=> <div className={`option ${value===option ? "selected" : null}`} key={index} onClick={()=>{onChange(option); setOpen(false);}}>{option}</div>)
}
            </div>
            
        </div>
    )
}

export default Dropdown;
