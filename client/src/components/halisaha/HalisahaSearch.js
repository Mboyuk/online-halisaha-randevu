import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getHalisaha } from "../../redux/actions/halisaha"
const HalisahaSearch = ({ halisahalar, getHalisaha, match }) => {
    const [halisahalarState, setHalisahalarState] = useState([])
    useEffect(() => {
        getHalisaha(match.params.city)
        setHalisahalarState(halisahalar)
    },[])
    const halisahaProperties = ["Ayakkabi","Eldiven", "Duş","Büfe", "Kafeterya", "Otopark", "WIFI", "Servis", "Açık Saha","Kapalı Saha"];

    const [sortObj, setSortObj] = useState("")
    const [checkedState, setCheckedState] = useState(
        new Array(halisahaProperties.length).fill(false)
    );
    const onChangeSort = async(e) => {
        setSortObj(e.target.value)
        const ss = e.target.value
        let newSort = [];
        if(ss === "point") {
            newSort = halisahalarState.sort(function (a, b) {
                return b.avgPoint - a.avgPoint
            })
        } else if(ss === "comment_count") {
            newSort = halisahalarState.sort(function (a, b) {
                return b.commentCount - a.commentCount
            })
        } else if(ss === "increase_price") {
            newSort = halisahalarState.sort(function (a, b) {
                return a.price - b.price
            })
        } else if(ss === "decrease_price") {
            newSort = halisahalarState.sort(function (a, b) {
                return b.price - a.price
            })
        } else {
            newSort = halisahalarState.sort()
        }
        setHalisahalarState(newSort)
    }
   
    const searchProperties = async(updatedCheckedState) => {
        const searchArr = []
        const abc = halisahalar
        updatedCheckedState.forEach((element, index) => {
            if(element) {
                searchArr.push(halisahaProperties[index])
            }
        })
        let newArray = await abc.filter((element, index) => {
            let bool = true
            searchArr.forEach((item) => {
                if(!element.properties.includes(item)) {
                    bool = false;
                    return false
                } 
            })
            if(bool) {
                return element
            }
            return false
        } )
        setHalisahalarState(newArray)
    }
    const handleOnChange = async(position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);

        searchProperties(updatedCheckedState)
    };
    const [searchText, setSearchText] = useState("") 
    const onSubmit = (e) => {
      e.preventDefault();
    //   getHalisaha(match.params.city) BUNU DENEEEEEEEEEEEEE
      let filteredHalisahalar = halisahalarState.filter(halisaha => {
        return halisaha.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      })
      setHalisahalarState(filteredHalisahalar)
    }
    const onChange = (e) => {
      setSearchText(e.target.value);
    }
    const getAllHalisaha = () => {
        setHalisahalarState(halisahalar)
    }


    return (
        <Fragment>
            <div className="container search-div" > 
                <div>
                    <form className="input-group mb-3" onSubmit={onSubmit} >
                        <input className="form-control" type="text" placeholder="Halısaha Ara" name="searchText" value={searchText} onChange={onChange} />
                        <input className="default-hover" style={{marginRight:"5px", marginLeft:"5px"}} type="submit" value="Ara" />
                        <button className="default-hover" onClick={getAllHalisaha} >Getir</button>
                    </form>
                    
                </div>
                <div className="halisaha-sort">
                    <select value={sortObj} onChange={onChangeSort} >
                        <option value="default">Varsayılan</option>
                        <option value="point">Puan</option>
                        <option value="comment_count">Yorum sayısı</option>
                        <option value="increase_price">Artan Fiyat</option>
                        <option value="decrease_price">Azalan Fiyat</option>
                    </select>
                </div>
            </div>

            <div className="container  halisaha-search-cover "> 
                <div className="halisaha-properties ">
                    <div className="halisaha-property-header"> 
                        Halısaha filtreleri
                    </div>
                    <div className="halisaha-property-body"> 
                        {
                            halisahaProperties.map((item, index) => (
                                <div key={index} > 
                                    <input type="checkbox" name={item} value={item}  onChange={() =>handleOnChange(index)} checked={checkedState[index]} />                                    
                                    <label htmlFor={item}> 
                                        {item}
                                    </label>                                                                                 
                                </div>  
                            ))           
                        }
                    </div>
                </div>
                <div className="halisaha-search-table ">
                    <table className="table table-striped table-hover sort-table" >
                        <thead>
                            <tr>
                                <th>Halısaha ismi</th>
                                <th>Puan</th>
                                <th>Yorum sayısı</th>
                                <th>Fiyat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                halisahalarState.map(halisaha => (
                                    <tr key={halisaha._id}>
                                        <td><Link className="link black" to={ halisaha._id + "/" + halisaha.slug } >{ halisaha.name }</Link>  </td>
                                        <td> <i className="fas fa-star yellow"> </i> { halisaha.avgPoint.toFixed(2) } </td>
                                        <td> <i className="far fa-comments"> </i> { halisaha.commentCount } </td>
                                        <td> <i className="fas fa-lira-sign"></i> { halisaha.price } </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>            
        </Fragment>
    )
}

function mapStateToProps(state) {
    return {
        halisahalar: state.halisaha.halisahalar
    }
}
const mapDispatchToProps = {
    getHalisaha
}
export default connect(mapStateToProps, mapDispatchToProps)(HalisahaSearch) 
