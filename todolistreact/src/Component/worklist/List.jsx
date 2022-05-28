import React from 'react';
const List = ({work,deleted,changed,finished}) => {
    return ( 
        <div>
           <div className='my-3 d-sm-flex justify-content-between px-5 workcontainer'>
           <span className='text-justify worktext workspan'>
           {work}
           </span>
           <span className='text-justify workspan'>
           <input className='inputs' type="text" placeholder='ویرایش برنامه' onChange={changed} />
           <button className='buttons btn btn-sm fa fa-trash-o' onClick={deleted}></button>
           <button className='buttons' onClick={finished}>انجام شد</button>
           </span>
           </div>
        </div>
     );
}
 
export default List;