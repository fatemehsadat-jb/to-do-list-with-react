import React, { Component } from 'react';
import Lists from './Component/worklist/Lists';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    state = { 
        listarray : [],
        newlist:'' ,
        showlist : true,
        finishall:0
     }; 
    handleshowlist = () => {
        this.setState({showlist : !this.state.showlist})
    }; 
    handledeletelist =(id) =>{
        const newlistarray = [...this.state.listarray];
        const starindex = newlistarray.findIndex(l => l.id === id);
        const showstarfinish = newlistarray[starindex];

        let {finishall}=this.state;
        if (finishall > 0 && showstarfinish.star===0){
        finishall -= 1;
        this.setState({finishall:finishall})
        console.log(finishall);
        }
        toast(`${showstarfinish.work} باموفقیت حذف شد`,{
            position:'top-right',
            closeOnClick : 'true'
        })
        const  filterlistarray = newlistarray.filter(l => l.id !== id);
        if(finishall===filterlistarray.length && filterlistarray.length !== 0){
            document.getElementById('finish').innerHTML='افرین تمام کارهارا انجام دادی:)';
        }
        else{
            document.getElementById('finish').innerHTML=' ';
        }
        this.setState({listarray:filterlistarray});
    };
    handlechangelist = (id,event) =>{
        const {listarray:alllist}= this.state;
        const selectedindex = alllist.findIndex(l => l.id === id);
        const selectedid = alllist[selectedindex];
        selectedid.work=event.target.value;
        const listarray= [...alllist];
        listarray[selectedindex]= selectedid;
        this.setState({listarray}); 
    };
    setlist = (event)=> {
        this.setState({newlist: event.target.value});
    };
    hahdlenewlist=() =>{
        const listarray = [...this.state.listarray];
        const newlist = {
            id : Math.floor(Math.random()*1000),
            work : this.state.newlist,
            star : 1
        };
        if (newlist.work!== '' && newlist.work !== ' '){
            listarray.push(newlist);
            this.setState({listarray,newlist:''});
            let {finishall}=this.state;
            toast('کار جدید اضافه شد',{
                position:'bottom-right',
                closeOnClick : 'true'
            });
            if(finishall===listarray.length){
                document.getElementById('finish').innerHTML='افرین تمام کارهارا انجام دادی:)';
            }
            else{
                document.getElementById('finish').innerHTML=' ';
            }
        }
    };
    handlefinishlist= (id) =>{
        const {listarray:finishalllist}= this.state;
        const finishselectedindex = finishalllist.findIndex(l => l.id === id);
        const finishselectedid = finishalllist[finishselectedindex];
        let {finishall}=this.state;
        if (finishselectedid.star===1){
            const check = '✿        '
        finishselectedid.work =check + finishselectedid.work ;
        const listarray= [...finishalllist];
        listarray[finishselectedindex]= finishselectedid;
        this.setState({listarray}); 
        finishselectedid.star = 0 ;
        finishall += 1;
        this.setState({finishall:finishall})
        console.log(finishall);
        if(finishall === listarray.length){
            document.getElementById('finish').innerHTML='افرین تمام کارهارو انجام دادی :)';
        }
        else{
            document.getElementById('finish').innerHTML=' ';
        }
        }
    }
    render() { 
        const {listarray,showlist}= this.state;
        let listcheck = null ;
        if (showlist){
            listcheck = <Lists 
            listarray={listarray} 
            deletelist = {this.handledeletelist}
            changelist = {this.handlechangelist}
            finishlist = {this.handlefinishlist}
            />
        }
        let badgecolor='';
        if(listarray.length >=3){
            badgecolor ='darkcolor';
        }
        if(listarray.length <=2){
            badgecolor ='lightcolor';
        }
        return (
            <div className='rtl'>
                <div className='text-center'>
                <div className='d-flex'>
                    <div className='listcontainer'>
                        <div className='todocolor py-4'>
                            <h2 className='mt-3 mb-3 textcolor'>
                                « کار های روزانه »
                                </h2>
                            <h4 className='textcolor textcolor2 mb-3'>تعداد کار ها&nbsp;  
                            <span className={`badge badge-pill ${badgecolor}`}>
                                {listarray.length}   
                            </span>
                                &nbsp;می باشد 
                            </h4>
                            <div className='d-flex flex-column align-items-center'>
                                <div>
                                    <form action="" onSubmit={event => event.preventDefault()}>
                                        <input className='inputs ml-3' type="text" placeholder='ایجاد برنامه جدید' onChange={this.setlist} value={this.state.newlist} />
                                        <button onClick={this.hahdlenewlist} className="btn btn-sm buttons fa fa-plus-square" />
                                    </form>
                                </div>
                                <div>
                                    <button onClick={this.handleshowlist}className={(showlist) ? "btn showbuttontrue my-3" : "btn showbuttonfalse my-3"}>نمایش برنامه ها</button>
                                </div>
                            </div>
                            {listcheck}
                        </div>
                    </div>
                    <div className='d-flex flex-column align-items-center imgcontainer'>
                       <div><img className='meetimg tea mb-5' src="img/tea.jpg" alt="tea" /></div>
                       <div><img className='meetimg cookie' src="img/cookie.jpg" alt="cookie" /></div>
                    </div>
               </div>

                </div>
                <h2 id='finish' className='textfinish mb-5'> </h2>
                <ToastContainer />
            </div>
        );
    }
}
 
export default App;