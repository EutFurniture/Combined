import React from 'react'

export default function Title({name,title}) {
    return (
        <div className="row">
            <div className="col-10 mx-auto my-2 text-center ">
                <h1 className=" font-weight-bold font-size-10px">
                   <strong className="text-blue  "> {name} {title}
                    </strong>
                </h1>
            </div>
            
        </div>
    )
}
