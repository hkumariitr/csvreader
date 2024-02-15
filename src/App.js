import "./App.css";
import { useState } from "react";
import Papa from "papaparse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const fileError = () => {
    toast.error('No file chosen', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const changeHandler = (event) => {
    if (event.target.files && event.target.files.length > 0){
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    }) 
  }else{
    fileError();
    };
  };

  

  const prevPageError = () => {
    toast.error('You are already on Page 1', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const nextPageError = () => {
    toast.error('No More Records to show!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  
  console.log(tableRows);
  console.log(values);
  
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage*recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = values.slice(firstIndex,lastIndex);
  console.log(firstIndex);
  console.log(lastIndex);
  console.log(Math.ceil(values.length/recordsPerPage));
  function prePage(){
    if(currentPage !==1){
        setCurrentPage(currentPage-1);
    }
    else{
      prevPageError();
    }
  }

  function nextPage(){
    if(currentPage !== Math.ceil(values.length/recordsPerPage)){
        setCurrentPage(currentPage+1);
    }
    else{
      nextPageError();
    }
  }
  return (
    <div>
      {/* Page Head */}

      <h1> CSV File Reader </h1>

      {/* File Uploader */}
      <input
        type="file"
        name="file"
        id="fileInput"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
        data-file-name={values.length > 0 ? values[0].name : ""}
      />
      
      <br />
      <br />
      {/* Table */}
      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {records.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      { values .length>0 && (<nav>
        <ul className="pagination">

            <li className="page-item">
                <a href="#" className="page-link" onClick={prePage}>Prev</a>
            </li>
           
            <li className="page-item">
                <a href="#" className="page-link" onClick={nextPage}>Next</a>
            </li>
        </ul>
      </nav>)}
      <ToastContainer/>
    </div>
  );
}

export default App;