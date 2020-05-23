import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
//서버에서 데이터를 읽어오는 라이브러리
import axios from 'axios';
/*
* useState : function basedddd state
* useEffect => componentDidMount()
* */
class AppMongoDB extends Component{
  //생성자 => state설정, 이벤트 등록
  /*
  * state => 외부에서 데이터를 읽어 올 때 사용
  * ===== 변경이 가능한 변수 ==> useState() !!!!!
  * */

  constructor(props) {
    super(props);
    //▶▶state 설정 방법1) 생성자 안에서 this로 설정
    this.state={
      movie:[]
    }
  }
  //▶▶state 설정 방법2) 전역변수로 설정 Redux       test
  /*state={

  }*/

  //화면 출력 전에 서버에서 데이터 읽어서 state에 저장
  componentDidMount() {
    axios.get('http://localhost:3355/movie').then((result)=>{
      //movie 배열에 결과값(result)을 담음.
      //render후에 didMount호출됨. 다시 render호출(화면갱신)하기 위해 setState필요. update개념★★
      this.setState({movie:result.data});
    })
  }

  //화면 출력 //img태그에 내부스타일 적용 시 중괄호 두개로 묶기 주의
  render() {
    const html=this.state.movie.map((m)=>
      <div className="col-md-4">
        <div className="thumbnail">
          <a href="/w3images/fjords.jpg" target="_blank">
            <img src={m.poster} alt="Fjords" style={{"width":"100%"}}/>
              <div className="caption">
                <p>{m.title}</p>
              </div>
          </a>
        </div>
      </div>
    );

    return (
        <div className={"row"}>
          <h1 className={"text-center"}>현재 상영영화</h1>
          {html}
        </div>
    )
  }
}

export default AppMongoDB;
