import _ from 'lodash';
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
            videos: [],
            selectedVideo: null,
        };
        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
            videos: videos,
            selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
        return(
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetails video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo}) } 
                    videos={this.state.videos} 
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));