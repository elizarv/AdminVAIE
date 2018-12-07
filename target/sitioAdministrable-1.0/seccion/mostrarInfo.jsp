<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>

<section class="content">
    <div class="row no-margin">
        <div class="container">
            <div class="col-md-12 col-xs-12" style="border-bottom: 3px solid #aa1916;">
                <h3 class =" box-title" id="titulo"></h3>
            </div>
        </div>
        <div class="container content profile">
            <div class="col-md-12">
                <div class="row" style="padding-top: 15px">
                    <div class="margin-bottom-40 fadeInUp animated">
                        <h5 id="descripcion" name="descripcion"></h5>
                    </div>
                </div>
                <div class="row" style="padding-top: 15px">
                    <div class="col-md-12">
                        <label>Archivo:</label>
                        <label id="archivo">&nbsp</label><br>
                        
                    </div>
                </div>
                <input type="hidden" id="id" name="id">
            </div>
        </div>
    </div>

</section>
