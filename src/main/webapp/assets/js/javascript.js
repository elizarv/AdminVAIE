/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




$(function () {
    //SECCION DEL ADMINISTRADOR
    if ($("#navegacionP").length > 0) {
        $.getJSON("../info_vaieController", {consultarMenu: "true"})
                .done(function (json) {
                    if (json.length > 0) {
                        for (var i = 0; i < json.length; i++) {
                            var url = "'" + json[i].url + "'";
                            var nombre = "'" + json[i].nombre + "'";
                            var id = "'" + json[i].id + "'";
                            var esmenu = "'esmenu'";
                            var espacio = "''";
                            if (json[i].id_menu == 0) {
                                var x = "'m" + json[i].id + "'";
                                if (json[i].tiene_submenu == 1) {
                                    if (json[i].id != 4) {
                                        $("#navegacionP").append('<li id="li' + json[i].id + '" class="treeview"> <a onclick="redirigir(' + url + ',' + nombre + ',' + id + ',' + esmenu + ')" id=' + x + ' style="cursor:pointer"><i class="fa fa-sticky-note"></i><span>' + json[i].nombre + '</span></a> </li>');
                                    } else {
                                        $("#navegacionP").append('<li id="li' + json[i].id + '" class="treeview"> <a  id=' + x + ' style="cursor:pointer"><i class="fa fa-sticky-note"></i><span>' + json[i].nombre + '</span></a> </li>');
                                    }
                                } else {
                                    $("#navegacionP").append('<li id="li' + json[i].id + '" class="treeview"> <a onclick="redirigir(' + url + ',' + nombre + ',' + id + ',' + esmenu + ')" style="cursor:pointer" id=' + x + '><i class="fa fa-sticky-note"></i><span>' + json[i].nombre + '</span></a> </li>');
                                }
                            } else {
                                if ($("#i" + json[i].id_menu).length == 0) {
                                    $("#m" + json[i].id_menu).append('<span id="i' + json[i].id_menu + '" class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i> </span>');
                                    $("#li" + json[i].id_menu).append('<ul id="ul' + json[i].id_menu + '" class="treeview-menu"></ul>');
                                }

                                $("#ul" + json[i].id_menu).append('<li><a onclick="redirigir(' + url + ',' + nombre + ',' + id + ',' + espacio + ')" style="cursor:pointer"><i class="fa fa-circle-o"></i>' + json[i].nombre + '</a></li>');
                            }
                        }
                        var url = "'Menu'";
                        $("#navegacionP").append('<li id="li' + json.length + '" class="treeview"> <a onclick="redirigir(' + url + ',' + url + ',' + espacio + ',' + espacio + ')" style="cursor:pointer" id=m' + json.length + ' style="cursor:pointer"><i class="fa fa-plus-circle"></i><span>Agregar menu</span></a> </li>');
                    }

                });

    } else {
        $.getJSON("info_vaieController", {consultarMenu: "true"})
                .done(function (json) {
                    if (json.length > 0) {
                        for (var i = 3; i < json.length; i++) {
                            var url = "'seccion/mostrarInfo.jsp'";
                            var url2 = "'seccion/mostrarInfo2.jsp'";
                            var nombre = "'" + json[i].nombre + "'";
                            var id = "'" + json[i].id + "'";
                            var redirigir = json[i].redirigir;
                            var esmenu = "'esmenu'";
                            var espacio = "''";

                            if (json[i].id_menu == 0) {
                                if (json[i].tiene_submenu == 1) {
                                    $("#ulAdd").append('<li id="li' + json[i].id + '" class="dropdown"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">' + json[i].nombre + '</a></li>');
                                    $("#li" + json[i].id).append('<ul id="ul' + json[i].id + '" class="dropdown-menu"></ul>');
                                } else {
                                    if (redirigir !== "none") {
                                        $("#ulAdd").append('<li class="nodropdown"><a href="' + redirigir + '" style="cursor:pointer" target="_blank">' + json[i].nombre + '</a></li>');
                                    } else {
                                        $("#ulAdd").append('<li class="nodropdown"><a onclick="redirigir(' + url2 + ',' + nombre + ',' + id + ',' + espacio + ')" style="cursor:pointer">' + json[i].nombre + '</a></li>');
                                    }
                                }
                            } else {
                                if (json[i].id < 9) {
                                    $("#ul" + json[i].id_menu).append('<li ><a onclick="redirigir(' + url + ',' + nombre + ',' + id + ',' + espacio + ')" style="cursor:pointer">' + json[i].nombre + '</a></li>');
                                } else {
                                    if (redirigir !== "none") {
                                        $("#ul" + json[i].id_menu).append('<li ><a href="' + redirigir + '" style="cursor:pointer" target="_blank">' + json[i].nombre + '</a></li>');
                                    } else {
                                        $("#ul" + json[i].id_menu).append('<li ><a onclick="redirigir(' + url2 + ',' + nombre + ',' + id + ',' + espacio + ')" style="cursor:pointer">' + json[i].nombre + '</a></li>');
                                    }
                                }
                            }
                        }
                    }

                });
    }
    if ($("#formIniciarSesion").length > 0) {
        $("#formIniciarSesion").bind("submit", function () {
            $.ajax({
                type: "POST",
                url: "user",
                data: $("#formIniciarSesion").serialize(),
                success: function (data) {
                    if (data === 'false') {
                        swal(
                                'Oops...',
                                'Credenciales erroneas',
                                'error'
                                )
                    } else {
                        window.location = "seccion/Administrador";
                    }
                },
                error: function (data) {

                }
            });
            return false;
        });
    }
    if ($("#slider").length > 0) {
        var nombre = 'Noticias';
        var url = '"seccion/mostrarNo.jsp"';
        var espacio = '""';
        var pg = $('.pgwSlider').pgwSlider();
        var n = "";
        $.getJSON("infoController", {listar: nombre})
                .done(function (json) {
                    nombre='"Noticias"';
                    if (json.length > 0) {
                        for (var i = 0; i < json.length; i++) {
                            var id= '"'+json[i].id+'"';
                            n += "<li><a onclick='redirigir(" + url + "," + nombre + "," + id + "," + espacio + ")'>\n\
                                    <img src='" + json[i].archivo + "' \n\
                                    alt='" + json[i].titulo + "'>\n\
                                    <span style='font-family: inherit; font-weight: bold;'>\n\
                                    " + json[i].titulo + "</span></a></li>";
                        }
                    }
                    document.getElementById("slider").removeChild(document.getElementById("noticia1"));
                    $("#slider").append(n);
                    pg.reload({maxHeight: 300,
                        intervalDuration: 4000});
                });
        nombre = 'Novedades';
        var m="";
        $.getJSON("infoController", {listar: nombre})
                .done(function (json) {
                    nombre='"Novedades"';
                    if (json.length > 0) {
                        for (var i = 0; i < json.length; i++) {
                            var id= '"'+json[i].id+'"';
                            m+="<div class='col-sm-4'><div class='service-block-v1 md-margin-bottom-50' \n\
                                style='background: #fff; border-top: 5px solid #f1c40f;'><i class='icon-custom \n\
                                icon-lg rounded-x icon-color-yellow icon-line fa fa-link' style='background: #fff;'></i>\n\
                                <h5 class='title-v3-bg text-uppercase'>\n\
                                <a onclick='redirigir(" + url + "," + nombre + "," + id + "," + espacio + ")' \n\
                                style='text-transform:none; color:#464646;'><b>"+json[i].titulo+"</b></a></h5>\n\
                                <p>"+json[i].fPublicacion+"</p><a \n\
                                onclick='redirigir(" + url + "," + nombre + "," + id + "," + espacio + ")'><b>Leer más</b></a>\n\
                                </div></div>";
                        }
                    }
                    $("#novedades").append(m);
                });
                
        var nombre3 ='Eventos';
        var z="";
        //PENDIENTE
                
        

    }
        
    


});


function redirigir(url, nombre, id, esmenu) {
    $("#Remp").empty();
    $("#Remp").load(url, function () {
        if (url == "Eventos") {
            var i = 0;
            $("#agregarP").on("click", function () {
                if ($("#fecha").val() == "" || $("#nombre").val() == "" || $("#descrip").val() == ""
                        || $("#responsable").val() == "" || $("#lugar").val() == "") {
                    alertify.logPosition("bottom right");
                    alertify.error("Debe llenar todos los campos");
                } else {
                    var tds = '<tr id="' + i + '">';
                    tds += '<td><input style="border:0px; background: none" readonly name="fechaT" value="' + $("#fecha").val() + '"></td>';
                    tds += '<td><input style="border:0px; background: none" readonly name="nombreT" value="' + $("#nombre").val() + '"></td>';
                    tds += '<td><input style="border:0px; background: none" readonly name="descripT" value="' + $("#descrip").val() + '"></td>';
                    tds += '<td><input style="border:0px; background: none" readonly name="responsableT" value="' + $("#responsable").val() + '"></td>';
                    tds += '<td><input style="border:0px; background: none" readonly name="lugarT" value="' + $("#lugar").val() + '"></td>';
                    tds += '<td><a onclick="borrar(' + i + ')" style="cursor: pointer; color: #dd4b39"><span style="font-size:20px;" class="fa fa-trash-o"></span></a></td>';
                    tds += '</tr>';
                    $("#tablaProg").append(tds);
                    i++;
                    $("#fecha").val("");
                    $("#nombre").val("");
                    $("#descrip").val("");
                    $("#responsable").val("");
                    $("#lugar").val("");
                }
            });

            $("#frmRegistrarEvento").on("submit", function () {
                var form = $("#frmRegistrarEvento")[0];
                var formData = new FormData(form);
                if ($("#fechaIni").val() > $("#fechaFin").val()) {
                    alertify.logPosition("bottom right");
                    alertify.error("La fecha final no puede ser superior a la fecha de inicio del evento");
                    return false;
                }
                if (i == 0) {
                    alertify.logPosition("bottom right");
                    alertify.error("Debe agregar la programaci\u00F3n del evento");
                    return false;
                }
                $.ajax({
                    type: "POST",
                    url: "../infoController",
                    data: formData,
                    enctype: 'multipart/form-data',
                    contentType: false,
                    processData: false,
                    cache: false,
                    success: function (data) {
                        if (data == "true") {
                            alertify.logPosition("bottom right");
                            alertify.success("Registro exitoso");
                            setTimeout(function () {
                                redirigir('Consultar','Eventos',id,esmenu);
                            }, 700);
                        } else {
                            alertify.logPosition("bottom right");
                            alertify.error("Se ha producido un error");
                        }
                    },
                    error: function (data) {

                    }
                });
                return false;
            });

        } else if (url == "Noticias") {
            $("#frmRegistrarNoticia").on("submit", function () {
                if ($("#titulo").val() == "" || $("#descripcion").val() == "" ||
                        $("#archivo").val() == "") {
                    alertify.logPosition("bottom right");
                    alertify.error("Debe llenar todos los campos");
                } else {
                    var form = $("#frmRegistrarNoticia")[0];
                    var formData = new FormData(form);
                    $.ajax({
                        type: "POST",
                        url: "../infoController",
                        data: formData,
                        enctype: 'multipart/form-data',
                        contentType: false,
                        processData: false,
                        cache: false,
                        success: function (data) {
                            if (data == "true") {
                                alertify.logPosition("bottom right");
                                alertify.success("Registro exitoso");
                                setTimeout(function () {
                                    redirigir('Consultar','Noticias',id,esmenu);
                                }, 700);
                            } else {
                                alertify.logPosition("bottom right");
                                alertify.error("Se ha producido un error");
                            }
                        },
                        error: function (data) {

                        }
                    });
                }
                return false;

            });
        } else if (url == "Novedades") {
            $("#frmRegistrarNovedad").on("submit", function () {
                if ($("#titulo").val() == "" || $("#descripcion").val() == "" ||
                        $("#archivo").val() == "") {
                    alertify.logPosition("bottom right");
                    alertify.error("Debe llenar todos los campos");
                } else {
                    var form = $("#frmRegistrarNovedad")[0];
                    var formData = new FormData(form);
                    $.ajax({
                        type: "POST",
                        url: "../infoController",
                        data: formData,
                        async: false,
                        contentType: false,
                        processData: false,
                        cache: false,
                        success: function (data) {
                            if (data == "true") {
                                alertify.logPosition("bottom right");
                                alertify.success("Registro exitoso");
                                setTimeout(function () {
                                    redirigir('Consultar','Novedades',id,esmenu);
                                }, 700);
                            } else {
                                alertify.logPosition("bottom right");
                                alertify.error("Se ha producido un error");
                            }
                        },
                        error: function (data) {

                        },
                        contentType: false,
                        processData: false,
                        cache: false
                    });
                }
                return false;

            });
        } else if (url == 'agregar') {
            $("#tituloH").prepend(nombre);
            $("#id").val(id);
            $("#titulo").val(nombre);
            $.getJSON("../info_vaieController", {consultarInfo: "true", id: id})
                    .done(function (json) {
                        $("#ruta").val(nombre);
                        $("#rutaVieja").val(json.archivo);
                        $("#descripcion").val(json.descripcion);
                    });
            $("#frmRegistrarDinamico").on("submit", function () {
                if ($("#descripcion").val() == "") {
                    alertify.logPosition("bottom right");
                    alertify.error("Debe llenar el campo de descripción");
                } else {
                    var form = $("#frmRegistrarDinamico")[0];
                    var formData = new FormData(form);
                    $.ajax({
                        type: "POST",
                        url: "../info_vaieController",
                        data: formData,
                        enctype: 'multipart/form-data',
                        contentType: false,
                        processData: false,
                        cache: false,
                        success: function (data) {
                            if (data == "true") {
                                alertify.logPosition("bottom right");
                                alertify.success("Registro exitoso");
                                setTimeout(function () {
                                    location.reload();
                                }, 700);
                            } else {
                                alertify.logPosition("bottom right");
                                alertify.error("Se ha producido un error");
                            }
                        },
                        error: function (data) {

                        },
                        contentType: false,
                        processData: false,
                        cache: false

                    });
                }
                return false;
            });
        } else if (url == 'Consultar') {
            $("#titulo").prepend(nombre);
            $("#btnAgregar").on('click', function () {
                redirigir(nombre, '', '', '');
            });
            $.getJSON("../infoController", {listar: nombre})
                    .done(function (json) {
                        var tr, u;
                        if (nombre == 'Eventos') {
                            u = "'EditarEvento'";
                        } else {
                            u = "'Editar'";
                        }
                        var n = "'" + nombre + "'";
                        var espacio = "' '";
                        if (json.length > 0) {
                            for (var i = 0; i < json.length; i++) {
                                tr = $('<tr/>');
                                tr.append("<td><input type='checkbox' name='check' value='check'></td>")
                                tr.append("<td>" + json[i].fPublicacion + "</td>");
                                tr.append("<td><img src='" + json[i].archivo + "' height='80' width='100'></td>")
                                tr.append("<td>" + json[i].titulo + "</td>");
                                tr.append('<td>\n\
<a style="cursor: pointer;>\n\
<span style="font-size:20px;" class="fa fa-pencil" title="Editar" onclick="redirigir(' + u + ',' + n + ',' + json[i].id + ',' + espacio + ')"></span></a></td>');
                                tr.append('<td><a style="cursor: pointer; \n\
color: #dd4b39"><span style="font-size:20px;" class="fa fa-trash-o" title="Eliminar" onclick="eliminar(' + json[i].id + ',' + n + ')"></span></a></td>');
                                $('#tablaInfo').append(tr);
                            }
                        }
                    });
        } else if (url == "Editar") {
            $("#btnVolver").on('click', function () {
                redirigir('Consultar', nombre, '', '');
            });
            $.getJSON("../infoController", {consultarInfo: "true", id: id})
                    .done(function (json) {
                        $("#titulo").val(json.titulo);
                        $("#descripcion").val(json.descripcion);
                        $("#imagen").append("<img src=" + json.archivo + " height='80' width='100'>");
                        $("#ruta").val(nombre);
                        $("#rutaVieja").val(json.archivo);
                        $("#id").val(id);
                    });
            $("#nombre").prepend("Editar " + nombre);
            $("#frmEditarDinamico").on("submit", function () {
                var form = $("#frmEditarDinamico")[0];
                var formData = new FormData(form);
                $.ajax({
                    type: "POST",
                    url: "../infoController",
                    data: formData,
                    enctype: 'multipart/form-data',
                    contentType: false,
                    processData: false,
                    cache: false,
                    success: function (data) {
                        if (data == "true") {
                            alertify.logPosition("bottom right");
                            alertify.success("La informaci\u00F3n se ha guardado correctamente");
                            setTimeout(function () {
                                redirigir('Consultar',nombre,0,0);
                            }, 700);
                        } else {
                            alertify.logPosition("bottom right");
                            alertify.error("Se ha producido un error");
                        }
                    },
                    error: function (data) {

                    },
                    contentType: false,
                    processData: false,
                    cache: false

                });
                return false;
            });
        } else if (url == "Informacion") {
            if (esmenu != "esmenu") {
                $("#editarMenu").hide();
            }
            $("#titulo").val(nombre);
            $("#tituloH").prepend(nombre);
            $("#id").val(id);
            $("#editarMenu").attr('onclick', 'redirigir("Menu","' + nombre + '","' + id + '","' + esmenu + '")');
            var f = 0;
            var i = 0;
            $.getJSON("../info_vaieController", {consultarVaie: "true", id: id})
                    .done(function (json) {
                        if (json != null) {
                            $("#descripcion").val(json.descripcion);
                            $("#urlR").val(json.menu.redirigir);
                        }
                        $("#id_info").val(id);
                        $("#id").val(id);
                        for (i = 0; i < json.archivos.length; i++) {
                            var tds = '<tr id="' + i + '">';
                            var text2 = json.archivos[i].nombre.split('/')[3];
                            tds += '<td><a href="' + json.archivos[i].nombre + '" target="_blank">' + text2 + '</a><br></td>';
                            tds += '<td><a onclick="borrarP(' + i + ',' + json.archivos[i].id + ')" title="Eliminar" style="cursor: pointer; color: #dd4b39"><span style="font-size:20px;" class="fa fa-trash-o"></span></a></td>';
                            tds += '</tr>';
                            $("#tablaArch").append(tds);
                            f++;
                        }
                        $("#cantA").val(f);
                    });
            var x = 0;
            $("#agregarA").on("click", function () {
                f = $("#cantA").val();
                i = f;
                var tds = '<tr id="' + i + '">';
                var text2 = $('#archivoT' + x).val().split('\\').pop();
                tds += '<td><input style="border:0px; background: none" readonly name="nombreT" value="' + text2 + '"></td>';
                tds += '<td><a onclick="borrarP(' + i + ')" title="Eliminar" style="cursor: pointer; color: #dd4b39"><span style="font-size:20px;" class="fa fa-trash-o"></span></a></td>';
                tds += '</tr>';
                $("#tablaArch").append(tds);
                $("#archivoT" + x).hide();
                f++;
                x++;
                $("#cantA").val(f);
                $("#cant").val(x);
                $("#archivosTabla").after('<input type="file" id="archivoT' + x + '" name="archivoT' + x + '" class="form-control">');
                i++;
            });

            $("#frmRegistrarInformacion").on("submit", function () {
                var form = $("#frmRegistrarInformacion")[0];
                var formData = new FormData(form);
                $.ajax({
                    type: "POST",
                    url: "../info_vaieController",
                    data: formData,
                    enctype: 'multipart/form-data',
                    contentType: false,
                    processData: false,
                    cache: false,
                    success: function (data) {
                        if (data == "true") {
                            alertify.logPosition("bottom right");
                            alertify.success("La informaci\u00F3n se ha guardado correctamente");
                            setTimeout(function () {
                                location.reload();
                            }, 700);
                        } else {
                            alertify.logPosition("bottom right");
                            alertify.error("Se ha producido un error");
                        }
                    },
                    error: function (data) {

                    },
                    contentType: false,
                    processData: false,
                    cache: false

                });
                return false;
            });
//ACAAAAAAAAAA
        } else if (url == "EditarEvento") {
            var j, t = 't';
            $.getJSON("../infoController", {listarProgramacion: "true", id: id})
                    .done(function (json) {
                        j = json.lista_evento.length;
                        $("#titulo").val(json.id_info.titulo);
                        $("#descripcion").val(json.id_info.descripcion);
                        $("#lugarEv").val(json.lugar);
                        $("#fechaIni").val(json.fIni);
                        $("#fechaFin").val(json.fFin);
                        $("#rutaVieja").val(json.archivo);
                        $("responsable").prepend(json.responsable);
                        $("#id").val(json.id);
                        $("#id_info").val(json.id_info.id);
                        for (var i = 0; i < json.lista_evento.length; i++) {
                            var tds = '<tr id="' + i + '">';
                            tds += '<input type="hidden" name="id_pT" id="id_p" value="' + json.lista_evento[i].id + '">';
                            tds += '<td><input type="datetime-local" style="border:0px; background: none" name="fechaT" value="' + json.lista_evento[i].fHora + '"></td>';
                            tds += '<td><input style="border:0px; background: none" name="nombreT" value="' + json.lista_evento[i].nombre + '"></td>';
                            tds += '<td><input style="border:0px; background: none" name="descripT" value="' + json.lista_evento[i].descripcion + '"></td>';
                            tds += '<td><input style="border:0px; background: none" name="responsableT" value="' + json.lista_evento[i].responsable + '"></td>';
                            tds += '<td><input style="border:0px; background: none" name="lugarT" value="' + json.lista_evento[i].lugar + '"></td>';
                            if (i > 0) {
                                tds += '<td><a onclick="borrarP(' + i + ',' + json.lista_evento[i].id + ')" style="cursor: pointer; color: #dd4b39"><span style="font-size:20px;" class="fa fa-trash-o"></span></a></td>';
                            } else {
                                tds += '<td></td>';
                            }
                            tds += '</tr>';
                            $("#tablaProg").append(tds);
                        }
                    });
            $("#agregarP").on("click", function () {
                if ($("#fecha").val() == "" || $("#nombre").val() == "" || $("#descrip").val() == ""
                        || $("#responsable").val() == "" || $("#lugar").val() == "") {
                    alertify.logPosition("bottom right");
                    alertify.error("Debe llenar todos los campos");
                } else {
                    var tds = '<tr id="' + j + '">';
                    tds += '<input type="hidden" name="id_pT" id="id_p" value="0">';
                    tds += '<td><input style="border:0px; background: none" readonly name="fechaT" value="' + $("#fecha").val() + '"></td>';
                    tds += '<td><input style="border:0px; background: none" readonly name="nombreT" value="' + $("#nombre").val() + '"></td>';
                    tds += '<td><input style="border:0px; background: none" readonly name="descripT" value="' + $("#descrip").val() + '"></td>';
                    tds += '<td><input style="border:0px; background: none" readonly name="responsableT" value="' + $("#responsable").val() + '"></td>';
                    tds += '<td><input style="border:0px; background: none" readonly name="lugarT" value="' + $("#lugar").val() + '"></td>';
                    tds += '<td><a onclick="borrar(' + j + ')" style="cursor: pointer; color: #dd4b39"><span style="font-size:20px;" class="fa fa-trash-o"></span></a></td>';
                    tds += '</tr>';
                    $("#tablaProg").append(tds);
                    j++;
                    $("#fecha").val("");
                    $("#nombre").val("");
                    $("#descrip").val("");
                    $("#responsable").val("");
                    $("#lugar").val("");
                }
            });

            $("#frmEditarEvento").on("submit", function () {
                var form = $("#frmEditarEvento")[0];
                var formData = new FormData(form);
                $.ajax({
                    type: "POST",
                    url: "../infoController",
                    data: formData,
                    enctype: 'multipart/form-data',
                    contentType: false,
                    processData: false,
                    cache: false,
                    success: function (data) {
                        if (data == "true") {
                            alertify.logPosition("bottom right");
                            alertify.success("La informaci\u00F3n se ha guardado correctamente");
                            setTimeout(function () {
                                redirigir('Consultar','Eventos',0,0);
                            }, 700);
                        } else {
                            alertify.logPosition("bottom right");
                            alertify.error("Se ha producido un error");
                        }
                    },
                    error: function (data) {

                    },
                    contentType: false,
                    processData: false,
                    cache: false

                });
                return false;
            });
        } else if (url == "Menu") {
            if (esmenu == "esmenu" || esmenu == "editar") {
                $("#nombre").val(nombre);
                $("#id").val(id);
                $("#nombreS").attr("readonly", false);
                $("#id_info").append('<input type="hidden" name="editarMenu" id="editarMenu">');
            } else {
                $("#id_info").append('<input type="hidden" name="agregarMenu" id="agregarMenu" >');
            }
            $.getJSON("../info_vaieController", {consultarSubMenu: "true", id: id})
                    .done(function (json) {
                        if (json.length > 0) {
                            for (var i = 0; i < json.length; i++) {
                                var tds = '<tr id="' + i + '">';
                                tds += '<td><input style="border:0px; background: none" name="submenuT" value="' + json[i].nombre + '">\n\
<input type="hidden" name="id_menuT" value="' + json[i].id + '"></td>';
                                tds += '<td><a onclick="borrarP(' + i + ',' + json[i].id + ')" style="cursor: pointer; color: #dd4b39">\n\
<span style="font-size:20px;" class="fa fa-trash-o"></span></a></td>';
                                tds += '</tr>';
                                $("#tablaSubmenus").append(tds);
                            }
                        }
                    });
            $("#id_menu").val(id);
            $("#tituloH").append("Administrar Men\u00FA");
            var i = 0;
            $("#nombre").on("input", function () {
                if ($("#nombre").val() == "") {
                    $("#nombreS").attr("readonly", true);
                } else {
                    $("#nombreS").attr("readonly", false);
                }
            });
            $("#eliminarMenu").on("click", function () {
                eliminar(id, 'esmenu');
            });
            $("#agregarSub").on("click", function () {
                if ($("#nombreS").val() == "") {
                    alertify.logPosition("bottom right");
                    alertify.error("Debe indicar el nombre del Submenu");
                } else {
                    var tds = '<tr id="' + i + '">';
                    tds += '<td><input style="border:0px; background: none" name="submenuT" value="' + $("#nombreS").val() + '">\n\
<input type="hidden" name="id_menuT" value="0"></td>';
                    tds += '<td><a onclick="borrar(' + i + ')" style="cursor: pointer; color: #dd4b39"><span style="font-size:20px;" class="fa fa-trash-o"></span></a></td>';
                    tds += '</tr>';
                    $("#tablaSubmenus").append(tds);
                    i++;
                    $("#nombreS").val("");
                }
            });
            $("#frmRegistrarMenu").on("submit", function () {
                if ($("#nombre").val() == "") {
                    alertify.logPosition("bottom right");
                    alertify.error("Debe indicar el nombre del menu");
                } else {
                    var form = $("#frmRegistrarMenu")[0];
                    var formData = new FormData(form);
                    $.ajax({
                        type: "POST",
                        url: "../info_vaieController",
                        data: formData,
                        enctype: 'multipart/form-data',
                        contentType: false,
                        processData: false,
                        cache: false,
                        success: function (data) {
                            if (data == "true") {
                                alertify.logPosition("bottom right");
                                alertify.success("Registro exitoso");
                                setTimeout(function () {
                                    location.reload();
                                }, 700);
                            } else {
                                alertify.logPosition("bottom right");
                                alertify.error("Se ha producido un error");
                            }
                        },
                        error: function (data) {

                        }
                    });
                }
                return false;
            });
        } else if (url == "seccion/mostrarInfo.jsp") {
            $("#titulo").prepend(nombre);
            $.getJSON("info_vaieController", {consultarVaie: "true", id: id})
                    .done(function (json) {
                        if (json !== null) {
                            var agg = "";
                            var str = json.descripcion.split("\n");
                            for (var i = 0; i < str.length; i++) {
                                agg += "<p>" + str[i] + "</p>";
                            }
                            $("#descripcion").append(agg);
                            $("#archivo").prepend('<a href="' + json.archivo + '" target="_blank">Archivo</a>');
                        } else {
                            $("#descripcion").prepend("Aun no hay información\n\
                            almacenada en esta seccion");
                        }
                        $("#id").val(id);
                    });
        } else if (url == "seccion/mostrarInfo2.jsp") {
            $("#titulo").prepend(nombre);
            $.getJSON("info_vaieController", {consultarVaie: "true", id: id})
                    .done(function (json) {
                        if (json != null) {
                            var agg = "";
                            var str = json.descripcion.split("\n");
                            for (var i = 0; i < str.length; i++) {
                                agg += "<p>" + str[i] + "</p>";
                            }
                            $("#descripcion").append(agg);
                            $("#id").val(json.id);
                        } else {
                            $("#descripcion").prepend("Aun no hay información\n\
                        almacenada en esta seccion");
                        }
                        $.getJSON("info_vaieController", {consultarArchivos: "true", id: json.id})
                                .done(function (json) {
                                    if (json != null) {
                                        for (var i = 0; i < json.length; i++) {
                                            var name = json[i].nombre.split("/")[3];
                                            $("#agregarA").prepend('<a href="' + json[i].nombre + '" target="_blank">' + name + '</a><br>');
                                        }
                                    }
                                });
                    });
        } else if (url == "seccion/mostrarNo.jsp") {
            $.getJSON("infoController", {consultarInfo: "true", id: id})
                    .done(function (json) {
                        if (json !== null) {
                            $("#titulo").prepend(json.titulo);
                            var agg = "";
                            var str = json.descripcion.split("\n");
                            for (var i = 0; i < str.length; i++) {
                                agg += "<p>" + str[i] + "</p>";
                            }
                            $("#descripcion").append(agg);
                            $("#imagen").prepend("<img src='" + json.archivo + "'>");
                        } else {
                            $("#descripcion").prepend("Aun no hay información almacenada en esta seccion");
                        }
                        $("#id").val(id);
                    });
                }

});
}
    




function borrar(id) {
    $("#" + id).remove();
}

function borrarP(id, id_p) {
    var tds = '<input type="hidden" name="id_borrarT" id="id_borrarT" value="' + id_p + '">';
    var i = $("#cantB").val();
    console.log(i);
    i++;
    $("#cantB").val(i);
    $("#id_info").append(tds);
    borrar(id);
}

function eliminar(id, n) {
    if (n == "esmenu") {
        alertify.confirm("\u00BFEst\u00E1 seguro de eliminar?", function () {
            $.ajax({
                type: "GET",
                url: "../info_vaieController",
                data: {eliminarMenu: "true", id: id},
                success: function (data) {
                    alertify.logPosition("bottom right");
                    alertify.success("Se ha eliminado correctamente");
                    setTimeout(function () {
                        location.reload();
                    }, 700);
                }
            });
        }, function () {

        });
    } else if (n != "Eventos") {
        alertify.confirm("\u00BFEst\u00E1 segur@ de eliminar?", function () {
            $.ajax({
                type: "GET",
                url: "../infoController",
                data: {eliminarInfo: "true", id: id},
                success: function (data) {
                    alertify.logPosition("bottom right");
                    alertify.success("Se ha eliminado correctamente");
                    setTimeout(function () {
                        redirigir('Consultar',n,id,0);
                    }, 700);
                }
            });
        }, function () {

        });
    } else {
        alertify.confirm("\u00BFEst\u00E1 segur@ de eliminar?", function () {
            $.ajax({
                type: "GET",
                url: "../infoController",
                data: {eliminarEvento: "true", id: id},
                success: function (data) {
                    alertify.logPosition("bottom right");
                    alertify.success("Se ha eliminado correctamente");
                    setTimeout(function () {
                        redirigir('Consultar','Eventos',id,0);
                    }, 700);
                }
            });
        }, function () {

        });
    }
}
    

