import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';


class QuestionContent  extends Component {

  constructor(props) {
    super(props);
  }
/*In discipline-name row, we need an array of disciplines that question belongs to*/
  render() {
    return (

            <Container>
              <Row>
                <Col sm="12" xs="12">
                  <p>a) Devido à falta de recursos naturais a serem explorados no Brasil, conflitos étnicos e culturais como os ocorridos na África estiveram ausentes no período da independência e formação do Estado brasileiro.
                  </p>
<p>b) A maior distinção entre os processos histórico- formativos dos continentes citados é a que se estabelece entre colonizador e colonizado, ou seja, entre a Europa e os demais.
</p>
<p>c) À época das conquistas, a América Latina, a África e a Ásia tinham sistemas políticos e administrativos muito mais sofisticados que aqueles que lhes foram impostos pelo colonizador.
</p>
<p>d) Comparadas ao México e ao Peru, as instituições brasileiras, por terem sido eliminadas à época da conquista, sofreram mais influência dos modelos institucionais europeus.
</p>
<p>e) O modelo histórico da formação do Estado asiático equipara-se ao brasileiro, pois em ambos se manteve o espírito das formas de organização anteriores à conquista.
</p>                </Col>
              </Row>
            </Container>
    );
  }
}

export default QuestionContent;
