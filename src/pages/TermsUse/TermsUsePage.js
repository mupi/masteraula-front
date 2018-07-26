import React from 'react';

import { Container } from 'reactstrap';


const TermsUsePage = ({ date_update = '29 de junho de 2018' }) => (
  <div className="l-site-masteraula__public-home c-terms-use middle-box">
    <Container>
      <h3>
        <i className="fa fa-thumbs-up" />
        {' '}
Damos boas-vindas ao Portal MasterAula.
      </h3>

      <div className="c-terms-use__section">
        <p>
O Portal MasterAula é mantido pela MUPI e nossa missão é apoiar o trabalho de educadores através da oferta de formação continuada online e de conteúdos que acreditamos serem válidos para esses fins.
        </p>
        <p>
Ao usar nosso Portal, você está concordando com estes termos e com nossa política de privacidade. Leia-os com atenção. Este documento contém INFORMAÇÕES LEGAIS importantes e indispensáveis à utilização do Portal.
        </p>
      </div>

      <div className="c-terms-use__section">
        <h5>
SOBRE O CONTEÚDO DO PORTAL E O ACESSO AO MESMO
        </h5>
        <p>
Os conteúdos e as informações contidas neste site poderão ser atualizadas ou modificadas periodicamente. Por conseguinte, não devem ser interpretadas como definitivas.
        </p>
      </div>

      <div className="c-terms-use__section">
        <h5>
SOBRE A CONTA E O CADASTRO DO USUÁRIO
        </h5>
        <p>
Para utilizar o Portal você precisa criar uma Conta pessoal e intransferível através de endereço de email válido e de sua posse e de senha pessoal e confidencial. Caso tenha conhecimento de qualquer uso não autorizado de sua senha ou conta, o usuário deverá imediatamente entrar em contato através do canal contato@mupi.me.
        </p>
      </div>

      <div className="c-terms-use__section">
        <h5>
SOBRE LINKS EXTERNOS
        </h5>
        <p>
A MUPI não se responsabiliza pela navegação dos USUÁRIOS nos links externos contidos nos conteúdos dos cursos e tampouco pela disponibilidade dos mesmos, uma vez que a equipe da MUPI não é responsável pela manutenção nem pelo conteúdo de tais sites.
        </p>
      </div>

      <div className="c-terms-use__section">
        <h5>
SOBRE CANCELAMENTO
        </h5>
        <p>
A MUPI não efetua devolução de pagamento após o USUÁRIO ter realizado o mesmo, exceto quando a oferta do produto adquirido seja cancelada pela MUPI.
        </p>
      </div>

      <div className="c-terms-use__section">
        <h5>
SOBRE OS CONTEÚDOS PRODUZIDOS PELOS USUÁRIOS
        </h5>
        <p>
A MUPI poderá fazer uso, em qualquer um de seus produtos, de todo conteúdo produzido pelos INSCRITOS durante os cursos oferecidos, como em atividades, trabalhos e comentários nos espaços de discussão.
        </p>
      </div>

      <div className="c-terms-use__section">
        <h5>
SOBRE PROPRIEDADE INTELECTUAL
        </h5>
        <p>
O uso comercial da expressão Portal como marca, nome empresarial ou nome de domínio, bem como os conteúdos das telas do Portal, assim como os programas, bancos de dados, redes, arquivos que permitem que o USUÁRIO acesse e use sua conta são de propriedade da empresa responsável pelo Portal.
        </p>
      </div>

      <p className="date-update-terms">
Atualizado em:
        {date_update}
      </p>
    </Container>
  </div>
);
export default TermsUsePage;
