import React from "react";
import logo from "assets/img/home/logo_masteraula.png";
import 'assets/css/Home.css';

const NotFoundPage = ()=>
      <div className="public-home">
        <div className="row">
          <div className="banner-header col-md-12">
            <h1>A página que você tentou acessar não existe ou está indisponível</h1>
          </div>
        </div>
        <div className="container caracteristicas-ma">
              <p style={{'text-align':'center', 'font-weight':'bold'}}>
                <h3>Caso acredite que isto é um erro, entre contato com a administração em contato@mupi.me</h3>
              </p>
              <div style={{'padding':'100px 0'}}>
                <img src={logo} style={{  'display': 'block', 'marginLeft': 'auto', 'marginRight': 'auto', 'width':'40%'}}/>
              </div>
        </div>
      </div>


export default NotFoundPage;
