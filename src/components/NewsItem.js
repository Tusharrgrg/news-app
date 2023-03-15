import React, { Component } from "react";

export class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl, author, date } = this.props;
        return (
            <div className="d-flex justify-content-center">
                <div className="card mb-3 w-100 d-flex justify-content-center" style={{maxWidth: "1180px"}}>
                    <div className="row g-0">
                        <div className="col-md-4 col-12">
                            <img src={imgUrl} style={{ objectFit: "cover", height: "100%"}} className="img-fluid" alt="..." />
                        </div>
                        <div className="col-md-8 col-12 d-flex flex-column">
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{description}</p>
                                <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read more..</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default NewsItem;
