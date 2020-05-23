import React,{Component, Fragment} from "react";
import axios from 'axios';

class MovieHome extends Component{
    constructor(props) {
        super(props);
        this.state={
            movie:[],
            detail:{},
            isShow:false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3355/movie_home', {
            params:{
                no:1
            }
        }).then((result)=>{
            //배열 movie에 result값 넣기
            this.setState({movie:result.data});
        })
    }

    //Event1
    onMovie(no){
        //movie_home?no=1
        axios.get('http://localhost:3355/movie_home', {
            params:{
                no:no
            }
        }).then((result)=>{
            //배열 movie에 result값 넣기
            this.setState({movie:result.data});
        })
    }

    //Event2
    onMovieDetail(m){
        this.setState({detail:m, isShow:true});
    }

    //movie배열의 값을 map으로 반복해서 html태그안에 담음
    render() {
        const html=this.state.movie.map((m)=>
            <tr onMouseOver={this.onMovieDetail.bind(this, m)}>
                <td><img src={"http://www.kobis.or.kr"+m.thumbUrl} alt="thumbUrl" width={"35"} height={"35"}/></td>
                <td>{m.movieNm+"("+m.movieNmEn+")"}</td>
                <td>{m.director}</td>
                <td>{m.genre}</td>
            </tr>
        );

        return (
            <Fragment>
                <div className="row" style={{"margin":"0px auto", "width":"100%"}}>
                    <button className={"btn btn-sm btn-primary"} onClick={this.onMovie.bind(this, 1)}>박스오피스</button>
                    <button className={"btn btn-sm btn-danger"} onClick={this.onMovie.bind(this, 2)}>실시간 예매율</button>
                    <button className={"btn btn-sm btn-success"} onClick={this.onMovie.bind(this, 3)}>좌석 점유율</button>
                    <button className={"btn btn-sm btn-info"} onClick={this.onMovie.bind(this, 4)}>온라인 이용순위</button>
                </div>
                <div className={"row"} style={{"margin":"0px auto", "width":"100%"}}>
                    <div className={"col-sm-6"}>
                        <table className={"table"}>
                            <thead>
                                <tr>
                                    <th className={"text-center"}></th>
                                    <th className={"text-center"}>영화명111</th>
                                    <th className={"text-center"}>감독</th>
                                    <th className={"text-center"}>장르</th>
                                </tr>
                            </thead>
                            <tbody>
                                {html}
                            </tbody>
                        </table>
                    </div>
                    <div className={"col-sm-6"}>
                        {this.state.isShow===true?<MovieDetail movie={this.state.detail}/>:null}
                    </div>
                </div>
            </Fragment>
        )
    }
}

//상세보기
/*
* <App2 name""/>
* constructor(props){ => this.props.name은 생성자를 명시하지 않아도 사용가능할 것.
* }
*
* function App2(props){ => props.name
* }
* */
class MovieDetail extends Component {
    render() {
        return (
            //this.props.name
            <fragment>
                <table className={"table"}>
                    <tbody>
                        <tr>
                            <td className={"text-center"} width={"30%"} rowSpan={"5"}>
                                <img src={"http://www.kobis.or.kr"+this.props.movie.thumbUrl} alt={"details"} width={"300px"} />
                            </td>
                            <td width={"70%"}>
                                <h2>{this.props.movie.movieNm}</h2>
                                <sub style={{"color":"gray"}}>{this.props.movie.movieNmEn}</sub>
                            </td>
                        </tr>
                        <tr>
                            <td width={"20%"}>Director</td>
                            <td width={"50%"}>{this.props.movie.director}</td>
                        </tr>
                        <tr>
                            <td width={"20%"}>Genre</td>
                            <td width={"50%"}>{this.props.movie.genre}</td>
                        </tr>
                        <tr>
                            <td width={"20%"}>Grade</td>
                            <td width={"50%"}>{this.props.movie.watchGradeNm}</td>
                        </tr>
                        <tr>
                            <td width={"20%"}>StartDate</td>
                            <td width={"50%"}>{this.props.movie.startDate}</td>
                        </tr>
                        <tr>
                            <td colSpan={"3"}>
                                {this.props.movie.synop}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </fragment>
        )
    }
}

export default MovieHome;