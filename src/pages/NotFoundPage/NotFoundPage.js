import React from "react";
import logo from "assets/img/home/logo_masteraula.png";
import 'assets/css/Home.css';

const NotFoundPage = ()=>
      <div className="public-home">
        <div className="row">
          <div className="banner-header col-md-12">
            <h2>A página que você tentou acessar não existe ou está indisponível</h2>
          </div>
        </div>
        <div className="container caracteristicas-ma">
              <div style={{'textAlign':'center', 'fontWeight':'bold'}}>
                <h4>Caso acredite que isto é um erro, entre contato com a administração em contato@mupi.me</h4>
              </div>
              <div style={{'padding':'100px 0'}}>
                <img src={logo} style={{  'display': 'block', 'marginLeft': 'auto', 'marginRight': 'auto', 'width':'40%'}} alt="masteraula"/>
              </div>
        </div>
      </div>


export default NotFoundPage;
