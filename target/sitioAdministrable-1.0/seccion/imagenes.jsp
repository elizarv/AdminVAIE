<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<section class="content" id="contenido" name="contenido">
    <div class="row no-margin">
        <div class="col-md-12 no-padding">
            <ul class="pgwSlider" id="slider" name="slider">
                <li id='noticia1' name='noticia1'></li>
            </ul>
        </div>
    </div>
    <!-- EVENTOS ---------------------->
    <div style="background-color: #e8e8e8; ">
        <div class="container content-prin profile">
            <div class="row margin-top-10">
                <div class="headline-center-v2 headline-center-v2-dark margin-bottom-10">
                    <h1 style="font-size: 30px;"><b>Eventos</b></h1>
                    <span class="bordered-icon"><i class="fa fa-calendar-o" aria-hidden="true"></i></span>
                </div>
                <div class="col-md-12">
                    <div class="row equal-height-columns margin-bottom-10">
                        <div class="container">
                            <div class="owl-carousel-v1 owl-work-v1 margin-bottom-40">
                                <div class="owl-carousel">
                                    <div class="item">
                                        <a href="/ueventos/ingles_junio"  style="text-align: center;">
                                            <div class="easy-block-v1-badge rgba-red" style="color:#fff; padding: 5px;">
                                                Del 18 al 22 de junio                                                 
                                            </div>
                                            <em class="overflow-hidden">
                                                <img class="img-responsive" src="https://ww2.ufps.edu.co/public/imagenes/eventos/39aa5659954b27fb7c48644f97ebf89f.jpg" alt="Imagen de eventos">
                                            </em>
                                            <span>
                                                <strong>Prueba de inglés </strong>
                                                <i>Lugar: Más información </i>
                                            </span>
                                        </a>
                                    </div>
                                </div>

                                <div class="headline">
                                    <div class="owl-navigation">
                                        <div class="customNavigation">
                                            <a class="owl-btn prev-v2"><i class="fa fa-angle-left"></i></a>
                                            <a class="owl-btn next-v2"><i class="fa fa-angle-right"></i></a>
                                        </div>
                                    </div><!--/navigation-->
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    </div>
    <!-- FIN EVENTOS --->


    <!-- NOVEDADES -->
    <div style="background-color: #b43432;">
        <div class="container content-prin profile">

            <div class="row margin-bottom-10 margin-top-10">
                <div class="headline-center-v2 margin-bottom-10">
                    <h1 style="font-size: 30px; color:#fff;"><b>Novedades</b></h1>
                    <span class="bordered-icon"><i class="fa fa-files-o" aria-hidden="true"></i></span>
                </div>
                <div id="novedades" name="novedades"></div>
                
            </div><!--/row-->

        </div>
    </div>
    <!-- FIN DESTACADOS -->
</section>
