import React, { Fragment } from 'react'
import { Link } from "react-router-dom"
const MyTable = (props) => {
    const userRezervationTable = props.userRezervationTable
    const dd = (a) => {
        const date = new Date()
        date.setDate(date.getDate()+a);
        var options = { weekday: 'long'};
        let dayString = new Intl.DateTimeFormat('en-US', options).format(date)
        if(dayString === "Wednesday") {
            dayString= "Çarşamba"
        } else if(dayString === "Thursday") {
            dayString= "Perşembe"
        } else if(dayString === "Friday") {
            dayString= "Cuma"
        } else if(dayString === "Saturday") {
            dayString= "Cumartesi"
        } else if(dayString === "Sunday") {
            dayString= "Pazar"
        } else if(dayString === "Monday") {
            dayString= "Pazartesi"
        } else if(dayString === "Tuesday") {
            dayString= "Salı"
        }

        let time = date.toLocaleDateString();
        time = time.split(".").join("-");
        return {time, dayString}
    }
    const btnClick = (subItems,e) => {
        // REZERVASYON İŞLEMLERİ
    }
    const btnClickUser = (subItems,e) => {

    }
    const dateControl = (item) => {
        const { time, date } = item;
        const newTime = time.split("-")[1];
        const newDate = date.split("-");
        const d1 = new Date(`${newDate[0]}.${newDate[1]}.${newDate[2]} ${newTime}`);
        const d2 = new Date()
        if(d1.getTime() - d2.getTime() < 7200000){
            return false
        }
        return true;
    }
    const managerTable = (subItems) => {
        let isEpmty = "rezervation-table-data"
        if(subItems.isEmpty) {
            isEpmty +="-full"
        } 
        return (
            <td className={isEpmty} key={subItems.time + subItems.date}>
              {subItems.isEmpty ? (
                'DOLU'
              ) : (
                <button
                  className="rounded btn-primary"
                  type="button"
                  onClick={(e) => btnClick(subItems, e)}>
                  {subItems.price}<span> <i className="fas fa-lira-sign"> </i></span>
            
                </button>
              )}
            </td>
        );          
    }
    const userTable = (subItems) => {
        let isEpmty = "rezervation-table-data"
        if(subItems.isEmpty) {
            isEpmty +="-full"
        } 
        return (
            <td className={isEpmty} key={subItems.time + subItems.date}>
              {
                  !dateControl(subItems) ? (
                      "--"
                  ) :
              
                subItems.isEmpty ? (
                <span>DOLU</span>
                
              ) : (
                <Link className="table-link"
                    to={props.currentHalisaha+"/"+subItems.date+"/"+subItems.time+"/reservation"}
                    onClick={(e) => btnClickUser(subItems, e)}>
                    {subItems.price} <span> <i className="fas fa-lira-sign"> </i></span>
            
                </Link>
              )}
            </td>
        );          
    }
    return (
        <Fragment>
            <table className="table table-bordered rezervation-table" >
                <thead>
                    <tr>
                        <th>Saat/Tarih</th>
                        <th>{dd(0).time.split("-").join(".")}<br/> {dd(0).dayString}</th>
                        <th>{dd(1).time.split("-").join(".")}<br/> {dd(1).dayString}</th>
                        <th>{dd(2).time.split("-").join(".")}<br/> {dd(2).dayString}</th>
                        <th>{dd(3).time.split("-").join(".")}<br/> {dd(3).dayString}</th>
                        <th>{dd(4).time.split("-").join(".")}<br/> {dd(4).dayString}</th>
                        <th>{dd(5).time.split("-").join(".")}<br/> {dd(5).dayString}</th>
                        <th>{dd(6).time.split("-").join(".")}<br/> {dd(6).dayString}</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        userRezervationTable && userRezervationTable.map((items, index)=> {
                            return (
                                <tr key={index}>
                                    <td  >{items[0].time}</td>
                                    {
                                        items.map((subItems, sindex) => {
                                          
                                            return props.authTable === "managerTable" ? managerTable(subItems) : userTable(subItems)       
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                   
                </tbody>
            </table>
        </Fragment>
    )
}

export default MyTable
