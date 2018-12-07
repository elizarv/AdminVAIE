<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<c:if test = "${usuario == null}">
    <c:redirect url = "/Login"/>
</c:if>
<%@page pageEncoding="UTF-8"%>
<section class="content">
    <div class="col-md-8">
        <div class="box box-danger">
            <div class="box-header with-border">
                <h3 class =" box-title" id="tituloH" name="tituloH"></h3>
            </div>
            <div class="box-body">
                <form id="frmRegistrarInformacion" enctype="multipart/form-data">
                    <input hidden id="id_info" name="id_info">
                    <input name="cant" type="hidden" id="cant" value="0">
                    <input name="cantB" type="hidden" id="cantB" value="0">
                    <input name="cantA" type="hidden" id="cantA" value="0">
                    <div class="row" style="padding-top: 15px">
                        <div class="col-md-6">
                            <label>Título: </label>
                            <input id="titulo" name="titulo" class="form-control" readonly>
                        </div>
                        <div class="col-md-2 col-md-offset-3">
                            <a style="cursor: pointer" class="btn btn-app" id="editarMenu">
                                <i class="fa fa-edit"></i>Editar menú
                            </a>
                        </div>
                    </div>
                    <div class="row" style="padding-top: 15px">
                        <div class="col-md-12">
                            <label>Descripción: </label>
                            <textarea id="descripcion" name="descripcion" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="row" style="padding-top: 15px">
                        <div class="col-md-12">
                            <label>Redirigir: </label>
                            <input id="nombreUrlR" name="nombreUrlR" class="form-control" placeholder="Digite el nombre del link"/><br>
                            <input id="urlR" name="urlR" class="form-control" placeholder="Digite la página a la cual se desea redirigir">
                        </div>
                    </div>
                    <div class="row" style="padding-top: 15px">
                        <div class="col-md-8">
                            <br id="archivosTabla">
                            <input type="file" id="archivoT0" name="archivoT0" class="form-control"><br>
                        </div>
                        <div class="col-md-3 col-md-offset-1">
                            <label>&nbsp</label><br>
                            <a style="cursor: pointer" class="btn btn-danger" id="agregarA">Agregar archivo</a>
                        </div>
                        <input type="hidden" name="agregarArchivo">
                        <input type="hidden" id="nombre" name="nombre">
                    </div>
                    <div class="row table-responsive col-md-12" style="padding-top: 25px">
                        <table class="table table-hover table-bordered" id="tablaArch">
                            <thead>
                                <tr>
                                    <th>Archivo</th>
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="row" style="padding-top: 15px">
                        <div class="col-md-12" id="final">
                            <input type="hidden" name="id" id="id">
                            <input type="hidden" name="guardarInfoMenu">
                            <button class="btn btn-danger">Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>