import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './Components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './Components/video_list';
import VideoDetails from './Components/video_detail';

const API_KEY = "AIzaSyDWPpHQgifJpwjHZ_8NLLbXyYnZ1AKMuUE";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: []
        };
        YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
            console.log(videos);
            this.setState({ videos });
        });
    }

    render() {
        return(
            <div>
                <SearchBar />
                <VideoDetails video={this.state.videos[0]}/>
                <VideoList videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));