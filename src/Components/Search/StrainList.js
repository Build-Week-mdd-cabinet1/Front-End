import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Axios
import { axiosWithAuth } from "../../Utils/axiosWithAuth";
// Actions
import { getStrains, findStrain } from '../../Actions/index';
// Components
import Search from './Search';
import StrainCard from "./StrainCard";
import Header from "../Dashboard/Header";
import styled from "styled-components";

const Container = styled.section`
  background-color:#98FB98;
  width:100%;
  height:100vh;
`

const CardContainer = styled.section`
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
  .error {
    color:red;
    margin-top:10px;
  }
`

const StrainList = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [query, setQuery] = useState("");
  const [failure, setFailureStatus] = useState(false);
  const [pagination, updatePagination] = useState({
    lowest: 0,
    highest: 12,
  })

  useEffect(() => {
    getData("name");
  }, []);

  const getData = (sortType) => {
    axiosWithAuth().get(`https://medcabinet1.herokuapp.com/api/strains?sortby=${sortType}`)
    .then(response => {
      setFailureStatus(false);
      setData(response.data);
      setOriginalData(response.data);
    })
    .catch(error => {
      setFailureStatus(true);
      console.log("StrainList.js – could not sort data", error);
    })
  }

  return (
    <>
      <Header />
      <Container>
        <Search setQuery={setQuery} getData={getData} originalData={originalData} query={query} setData={setData} data={data} updatePagination={updatePagination} pagination={pagination}/>
        <CardContainer>
          {data.slice(pagination.lowest, pagination.highest).map(strain => {
            return (
              <StrainCard strain={strain}/>
            )
          })}
          <div className="error" style={failure ? {display:"block"} : {display:"none"}}>Could not fetch data. Try refreshing the page or logging out.</div>
        </CardContainer>
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  strains: state.strainReducer.strains,
  error: state.strainReducer.error,
  isFetching: state.strainReducer.isFetching
});


export default connect(
  mapStateToProps,
  { getStrains }
)(StrainList);