import React, { useState } from "react";
import "./HomePage.css";
import searchIcon from "../../Images/icons8-search-50.png";
import SortIcon from "../../Images/icons8-funnel-50.png";
import { faculties } from "./jsonData";
import Pagination from "./components/Pagination";

const HomePage = () => {
  const [data, setData] = React.useState(faculties);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowperPage] = React.useState(15);
  const [resType, setResType] = useState("All");
  const [totalrows, setTotalrows] = useState(data.length);
  const [searchName, setSearchName] = useState("");
  const[ currentTable,setCurrentTable] = React.useState([])
  

  React.useEffect(()=>{
    const func=()=>{
        setLoading(true)
        const indexOfLastPost = currentPage * rowperPage;
        const indexofFirstPost = indexOfLastPost - rowperPage;
        setCurrentTable(data.slice(indexofFirstPost,indexOfLastPost))
        setLoading(false)
    }
    func();
  },[data,totalrows])
  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };
  const HandleSearchBtn=()=>{
    setLoading(true)
    setData(faculties.filter((n)=>n.username.toLowerCase().includes(searchName.toLowerCase())))
    setTotalrows(data.length)
    setLoading(false);
  }
  const paginate = (number) => {
    setCurrentPage(number);
    // console.log(number);
  };
  return (
    <div className="homepage">
      <div className="heading">Faculty Research details Management System</div>
      <div className="navbarSelect">
        <ul className="options">
          <li
            className={`option1 ${resType == "All" ? "active" : ""}`}
            onClick={() => {
              setResType("All");
            }}
          >
            All
          </li>
          <li
            className={`option1 ${resType == "Bks" ? "active" : ""}`}
            onClick={() => {
              setResType("Bks");
            }}
          >
            Books
          </li>
          <li
            className={`option1 ${resType == "BkChp" ? "active" : ""}`}
            onClick={() => {
              setResType("BkChp");
            }}
          >
            Book Chapter
          </li>
          <li
            className={`option1 ${resType == "Jou" ? "active" : ""}`}
            onClick={() => {
              setResType("Jou");
            }}
          >
            Jounral
          </li>
          <li
            className={`option1 ${resType == "Conppr" ? "active" : ""}`}
            onClick={() => {
              setResType("Conppr");
            }}
          >
            Conference Paper
          </li>
          <li
            className={`option1 ${resType == "Pat" ? "active" : ""}`}
            onClick={() => {
              setResType("Pat");
            }}
          >
            Patents
          </li>
        </ul>
      </div>
      <div className="searchBox">
        <div className="searchInput">
          <input
            type="text"
            onChange={handleSearch}
            value={searchName}
            placeholder="Search faculty name"
          />
          <button onClick={HandleSearchBtn} className="searchbtn"><img className="searchicon" src={searchIcon} alt="" /></button>
        </div>
      </div>
      <div className="mainBox">
        <div className="tableBox">
          {!loading?<table className="table">
            <tr>
              <th>Faculty Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Research Type</th>
              <th>Research topic</th>
              <th>Year Published</th>
            </tr>
            {currentTable?.map((row) => {
              return (
                <tr key={row._id}>
                  <td>{row.username}</td>
                  <td>{row.designation}</td>
                  <td>{row.department}</td>
                  <td>{row.researchType}</td>
                  <td>{row.researchTitle}</td>
                  <td>{row.year}</td>
                </tr>
              );
            })}
          </table>:"Loading"}
        </div>
        <div className="filterBox">
            <div className="filterHead">
            <img className="searchicon" src={SortIcon} />
          Filter
            </div>
          <div className="filterData">
            <div className="filterTypes">
                <div className="filterTypeHead">Departments</div>
                <ul className="filterList">
                    <li><input type="radio" /> Information technology</li>
                    <li><input type="radio" /> Mechanical engineering</li>
                    <li><input type="radio" /> Civil engineering</li>
                    <li><input type="radio" /> Electrical engineering</li>
                    <li><input type="radio" /> Agriculture engineering</li>
                    <li><input type="radio" /> Computer engineering</li>
                    <li><input type="radio" /> Electronics engineering</li>
                    <li><input type="radio" /> Industrial engineering</li>
                </ul>
            </div>
            <div className="filterTypes">
                <div className="filterTypeHead">Designation</div>
            </div>
          </div>
        </div>
      </div>
      {!loading?<Pagination
            rowperPage={rowperPage}
            totalrows={totalrows}
            paginate={paginate}
          />:""}
    </div>
  );
};

export default HomePage;
