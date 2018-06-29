import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'assets/css/TermsUse.css';
import 'assets/css/General.css';

import { Container, Row, Col } from 'reactstrap';


const TermsUsePage = ({date_update="29 de junho de 2018"}) =>
    <div className="main-contenedor middle-box">
      <Container>
            <h3 className="text-center">Damos boas-vindas ao Portal MasterAula.</h3>
            <p>O Portal MasterAula é mantido pela MUPI e nossa missão é apoiar o trabalho de educadores através da oferta de formação continuada online e de conteúdos que acreditamos serem válidos para esses fins.</p>

            <p>Ao usar nosso Portal, você está concordando com estes termos e com nossa política de privacidade. Leia-os com atenção. Este documento contém INFORMAÇÕES LEGAIS importantes e indispensáveis à utilização do Portal.</p>

            <h4>SOBRE O CONTEÚDO DO PORTAL E O ACESSO AO MESMO</h4>
            <p>Os conteúdos e as informações contidas neste site poderão ser atualizadas ou modificadas periodicamente. Por conseguinte, não devem ser interpretadas como definitivas.
            </p>

            <h4>SOBRE A CONTA E O CADASTRO DO USUÁRIO</h4>
            <p>Para utilizar o Portal você precisa criar uma Conta pessoal e intransferível através de endereço de email válido e de sua posse e de senha pessoal e confidencial. Caso tenha conhecimento de qualquer uso não autorizado de sua senha ou conta, o usuário deverá imediatamente entrar em contato através do canal contato@mupi.me.
            </p>

            <h4>SOBRE LINKS EXTERNOS</h4>
            <p>A MUPI não se responsabiliza pela navegação dos USUÁRIOS nos links externos contidos nos conteúdos dos cursos e tampouco pela disponibilidade dos mesmos, uma vez que a equipe da MUPI não é responsável pela manutenção nem pelo conteúdo de tais sites.
            </p>

            <h4>SOBRE CANCELAMENTO</h4>
              <p>A MUPI não efetua devolução de pagamento após o USUÁRIO ter realizado o mesmo, exceto quando a oferta do produto adquirido seja cancelada pela MUPI.
              </p>
            <h4>SOBRE OS CONTEÚDOS PRODUZIDOS PELOS USUÁRIOS</h4>
            <p>A MUPI poderá fazer uso, em qualquer um de seus produtos, de todo conteúdo produzido pelos INSCRITOS durante os cursos oferecidos, como em atividades, trabalhos e comentários nos espaços de discussão.
            </p>

            <h4>SOBRE PROPRIEDADE INTELECTUAL</h4>
            <p>O uso comercial da expressão Portal como marca, nome empresarial ou nome de domínio, bem como os conteúdos das telas do Portal, assim como os programas, bancos de dados, redes, arquivos que permitem que o USUÁRIO acesse e use sua conta são de propriedade da empresa responsável pelo Portal.
            </p>

            <h4>SOBRE OS DIREITOS DA PERSONALIDADE</h4>
              <p>Por meio deste instrumento o USUÁRIO autoriza a empresa responsável pelo Portal, ou terceiro à sua ordem, a utilizar seus direitos de personalidade, tais como imagem, nome, depoimento e voz, nos materiais de comunicação utilizados por ela, ou qualquer outro material de terceiro que tenha a participação e/ou patrocínio da mesma, para veiculação e divulgação na mídia em geral, escrita, falada, televisada ou eletrônica, de difusão e transmissão por qualquer meio de comunicação, dentre os quais se citam, sem exclusão de qualquer outro aqui não previsto, Ações de merchandising, adesivo, agenda, álbum, anúncios, aplicativos, apostilas, artigos de vestuário, backlight, banner, blog, boletins, brindes, busdoor, caderno, calendário, cartão, cartão postal, cartaz, catálogos, cd-rom, convites, cursos, display, e-mails, encarte, envelope, espetáculo, estande, etiqueta, eventos, faixas, feiras, filmes, flyers, folders, folheto, formulários, frontlight, home page, ilustração, internet, jornal, livreto, livro, mala direta, materiais de identidade visual,  materiais didáticos, mensagens para celular, mural, newsletters, obras audiovisuais, obras multimídias, outdoors, painel eletrônico, papel de carta, peças publicitárias impressas, sonoras ou audiovisuais, pôster, produtos, programa de computador, rádio, redes sociais, relatórios de qualquer natureza, revistas, ringtones, selo, seminários, still para tv, televisão, treinamentos, vídeos, press releases (divulgação para a imprensa), apresentações internas e externas, eventos institucionais internos ou externos, eventos ou materiais históricos da empresa, banco de dados, histórico de sites da empresa, intranet e quaisquer outros materiais e meios de comunicação que a empresa deseje utilizar para divulgação ao público interno e/ou externo, com finalidade institucional e/ou educacional.
              </p>

            <h4>SOBRE OS USOS DO USUÁRIO</h4>
            <p>O USUÁRIO compromete-se a não utilizar o serviço com a finalidade de armazenar, distribuir, transmitir, difundir, colocar à disposição de terceiros conteúdos que incluam mensagens, gráficos, desenhos, arquivos de som e/ou imagem, fotografias, gravações, em geral, qualquer classe de material que por si mesmo ou cuja transmissão para:
            </p>

            <h4>SOBRE A REMOÇÃO DE CONTEÚDO INDEVIDO</h4>
            <p>O Portal envidará seus melhores esforços para promover qualquer investigação interna visando a remoção de conteúdos, desde que a requerimento da parte lesada mediante apresentação dos motivos e indícios de que determinado conteúdo viole as leis ou os Termos e Condições de Uso do Site.
            </p>

            <h4>ALTERAÇÕES DOS TERMOS E CONDIÇÕES</h4>
            <p>Quaisquer alterações que impactem especificamente em ônus financeiro ao USUÁRIO serão feitas mediante comunicação prévia ao mesmo através de seu e-mail de cadastro, que poderá manifestar a sua concordância ou não.
            </p>
            <h4>SOBRE A LEI APLICÁVEL E JURISDIÇÃO</h4>
            <p>O presente Termo e Condições de Uso são regidos pela legislação da República Federativa do Brasil. Seu texto deverá ser interpretado no idioma português e os USUÁRIOS do Portal se submetem ao Foro Central da Comarca da cidade de Campinas do Estado de São Paulo.
            </p>
            <p className="date-update-terms">Atualizado em: {date_update}</p>
        </Container>
    </div>

export default TermsUsePage;
