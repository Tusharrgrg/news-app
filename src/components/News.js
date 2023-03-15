import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News =(props)=> {

  const[articles,setArticles] = useState([]);
  const[loading,setLoadings] = useState(false);
  const[page,setPage] = useState(1);
  const[totalResults,setTotalResults] = useState(0);

  const capitalizeFirst=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
   

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoadings(true);
    props.setProgress(30);
    await fetch(url).then(res => res.json()).then(response => {
      props.setProgress(70);
      setArticles(response.articles);
      setLoadings(false);
      setTotalResults(response.totalResults);
    });
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirst(props.category)} - NewsZzy`;
    updateNews();
    // eslint-disable-next-line
  },[]);
 

  const fetchMoreData = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    await fetch(url).then(res => res.json()).then(response => {
      setArticles(articles.concat(response.articles));
      setTotalResults(response.totalResults);
    });
  };

    return (
      <>
        <h1 className='text-center' style={{margin:'35px 0px' ,marginTop :'90px'}}>NewZzy - Top {capitalizeFirst(props.category)} Headlines</h1>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div>
            <div className="row ">
              {articles.map((element,index) => {
                return <div className="my-3" key={index}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage ? element.urlToImage : "https://images.unsplash.com/photo-1602922960044-d48ce791d3c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80"} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
}


News.defaultProps = {
  country: "in",
  pageSize: 7,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
