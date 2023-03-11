import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  articles = [
    {
      "source": {
        "id": "news24",
        "name": "News24"
      },
      "author": "Heinz Schenk",
      "title": "Proteas quickie Coetzee learns from pesky last-wicket stand: 'Luckily we still have a good lead'",
      "description": "Much might've gone right over the past week or so for Gerald Coetzee after his introduction to Test cricket, but the rookie quick also had to contend with the \"pain\" of the classic pesky last-wicket stand.",
      "url": "https://www.news24.com/sport/cricket/proteas/proteas-quickie-coetzee-learns-from-pesky-last-wicket-stand-luckily-we-still-have-a-good-lead-20230309",
      "urlToImage": "https://cdn.24.co.za/files/Cms/General/d/8519/976a939b0617427fa840b4968c2f7738.jpg",
      "publishedAt": "2023-03-09T20:01:58+00:00",
      "content": "At the Wanderers\r\n<ul><li>Young Gerald Coetzee ended a successful day by also experiencing his first pesky last-wicket stand with the Proteas.</li><li>The alliance between Jason Holder and Gudakesh M… [+3786 chars]"
    },
    {
      "source": {
        "id": "abc-news-au",
        "name": "ABC News (AU)"
      },
      "author": "ABC News",
      "title": "Live scorecard: India vs Australia, fourth Test in Ahmedabad",
      "description": "Australia is looking to draw the series with victory in cricket's largest stadium, the Narendra Modi Stadium in Ahmedabad. Follow all the live scores in our scorecard.",
      "url": "http://www.abc.net.au/news/2023-03-09/live-scorecard-india-vs-australia-fourth-test-ahmedabad/102068776",
      "urlToImage": "https://live-production.wcms.abc-cdn.net.au/efe80d41a60494b6829cf55bc923150f?impolicy=wcms_crop_resize&cropH=2813&cropW=5000&xPos=0&yPos=431&width=862&height=485",
      "publishedAt": "2023-03-09T03:33:13Z",
      "content": "There is a watch and act warning in place for Tambaroora in New South Wales. For the latest information, search ABC Emergency"
    },
  ]



  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false
    };
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=afe813c65ea940b5849bd478a02327b9";
    let data = await fetch(url);
    let parseData = await data.json(data);
    this.setState({ articles: parseData.articles });
  }

  render() {
    return (
      <div className='container'>
        <div className="row my-4">
          {this.state.articles.map((element) => {
            return <div className="col col-md-4 my-3" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 85) : ""} imgUrl={element.urlToImage ? element.urlToImage : "https://images.unsplash.com/photo-1602922960044-d48ce791d3c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80"} newsUrl={element.url} />
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default News
