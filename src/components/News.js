import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 7,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
  }

  updateNews = async () => {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    await fetch(url).then(res => res.json()).then(response => {
      this.setState({
        loading: false,
        articles: response.articles,
        totalResults: response.totalResults
      });
    });

    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async() => {
    this.setState({
      page:this.state.page+1
    });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    await fetch(url).then(res => res.json()).then(response => {
      this.setState({
        loading: false,
        articles:  this.state.articles.concat(response.articles),
        totalResults: response.totalResults,
      });
    });
  };

  render() {
    return (
      <>
        <h1 className='text-center' style={{margin:'35px 0px'}}>NewZzy - Top {this.props.category} Headlines</h1>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div>
            <div className="row ">
              {this.state.articles.map((element,index) => {
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
}

export default News
