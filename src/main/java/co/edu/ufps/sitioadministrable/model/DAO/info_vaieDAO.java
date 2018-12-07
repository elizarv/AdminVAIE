/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.ufps.sitioadministrable.model.DAO;

import co.edu.ufps.sitioadministrable.model.DTO.archivoDTO;
import co.edu.ufps.sitioadministrable.model.DTO.info_vaieDTO;
import co.edu.ufps.sitioadministrable.model.DTO.informacionDTO;
import co.edu.ufps.sitioadministrable.model.DTO.menuDTO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

/**
 *
 * @author Eliza
 */
public class info_vaieDAO {

    private Connection con;

    //REGISTRAR
    public int registrarDinamico(info_vaieDTO dto) throws Exception {
        int exito = 0;
        con = conexion.generarConexion();
        if (con != null) {
            PreparedStatement stmt = con.prepareStatement("insert into info_vaie "
                    + "(descripcion, archivo, id_menu)"
                    + " values (?,?,?)", Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, dto.getDescripcion());
            stmt.setString(2, dto.getArchivo());
            stmt.setInt(3, dto.getMenu().getId());
            try {
                stmt.executeUpdate();
                ResultSet rs = stmt.getGeneratedKeys();
                rs.next();
                exito = rs.getInt(1);
            } catch (SQLException ex) {
                ex.printStackTrace();
            } finally {
                stmt.close();
                con.close();
            }
        }
        return exito;
    }

    public boolean registrarArchivo(archivoDTO dto) throws Exception {
        boolean exito = false;
        dto = this.buscarTipoA(dto);
        con = conexion.generarConexion();
        if (con != null) {
            PreparedStatement stmt = con.prepareStatement("INSERT INTO archivo"
                    + "(nombre,id_info, id_tipoA) values (?,?,?)");
            stmt.setString(1, dto.getNombre());
            stmt.setInt(2, dto.getId_info());
            stmt.setInt(3, dto.getId_tipoA().getId());
            try {
                exito = stmt.executeUpdate() > 0;
            } catch (SQLException ex) {
                ex.printStackTrace();
            } finally {
                con.close();
                stmt.close();
            }
        }
        return exito;
    }

    public int agregarMenu(menuDTO dto) throws Exception {
        int exito = 0;
        con = conexion.generarConexion();
        if (dto.getTiene_submenu() == 1) {
            dto.setUrl("Menu");
        } else {
            if (dto.getId_menu() == 0) {
                dto.setUrl("Menu");
            }
            dto.setUrl("Informacion");
        }
        if (con != null) {
            PreparedStatement stmt = con.prepareStatement("INSERT INTO MENU"
                    + "(nombre, url,id_menu, tiene_submenu,redirigir) values (?,?,?,?,?)",
                    Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, dto.getNombre());
            stmt.setString(2, dto.getUrl());
            stmt.setInt(3, dto.getId_menu());
            stmt.setInt(4, dto.getTiene_submenu());
            stmt.setString(5, "");
            try {
                stmt.executeUpdate();
                ResultSet rs = stmt.getGeneratedKeys();
                rs.next();
                exito = rs.getInt(1);
            } catch (SQLException ex) {
                ex.printStackTrace();
            } finally {
                con.close();
                stmt.close();
            }
        }
        return exito;
    }

    public int agregarSubMenu(menuDTO dto) throws Exception {
        int exito = 0;
        con = conexion.generarConexion();
        if (con != null) {
            PreparedStatement stmt = con.prepareStatement("INSERT INTO MENU"
                    + "(nombre, url,id_menu, redirigir) values (?,?,?,?)",
                    Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, dto.getNombre());
            stmt.setString(2, dto.getUrl());
            stmt.setInt(3, dto.getId_menu());
            stmt.setString(4, "");
            try {
                stmt.executeUpdate();
                ResultSet rs = stmt.getGeneratedKeys();
                rs.next();
                exito = rs.getInt(1);
            } catch (SQLException ex) {
                ex.printStackTrace();
            } finally {
                con.close();
                stmt.close();
            }
        }
        return exito;
    }

    //ACTUALIZAR
    
    public boolean actualizarUrlMenu(menuDTO dto) throws Exception{
        boolean exito = false;
        con = conexion.generarConexion();
        PreparedStatement stmt;
        System.out.println("redirigir"+dto.getRedirigir());
        System.out.println("id"+dto.getId());
        try{
            String update = "UPDATE menu SET redirigir = ? WHERE id = ?";
            stmt = con.prepareStatement(update);
            stmt.setString(1, dto.getRedirigir());
            stmt.setInt(2, dto.getId());
            int total = stmt.executeUpdate();
            if (total > 0) {
                exito = true;
            }
            stmt.close();
        }catch (Exception e) {
            e.printStackTrace();

        } finally {
            try {
                con.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }     
        return exito;
    }
    
    public boolean actualizarMenu(menuDTO dto) throws Exception {
        boolean exito = false;
        con = conexion.generarConexion();
        if (dto.getTiene_submenu() == 1) {
            dto.setUrl("Menu");
        } else {
            dto.setUrl("Informacion");
        }
        PreparedStatement stmt;
        try {
            String update = "UPDATE menu SET nombre = ? , url = ? , id_menu = ? ,"
                    + " tiene_submenu = ? WHERE id = ?";
            stmt = con.prepareStatement(update);
            stmt.setString(1, dto.getNombre());
            stmt.setString(2, dto.getUrl());
            stmt.setInt(3, dto.getId_menu());
            stmt.setInt(4, dto.getTiene_submenu());
            stmt.setInt(5, dto.getId());
            int total = stmt.executeUpdate();
            if (total > 0) {
                exito = true;
            }
            stmt.close();

        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            try {
                con.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return exito;
    }
    
    public boolean actualizarSubmenu(menuDTO dto) throws Exception {
        boolean exito = false;
        con = conexion.generarConexion();
        PreparedStatement stmt;
        try {
            String update = "UPDATE menu SET nombre = ?, id_menu=? WHERE id = ?";
            stmt = con.prepareStatement(update);
            stmt.setString(1, dto.getNombre());
            stmt.setInt(2, dto.getId_menu());
            stmt.setInt(3, dto.getId());
            int total = stmt.executeUpdate();
            if (total > 0) {
                exito = true;
            }
            stmt.close();

        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            try {
                con.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return exito;
    }

    public boolean actualizarArchivo(archivoDTO dto) throws Exception {
        boolean exito = false;
        con = conexion.generarConexion();
        PreparedStatement stmt;
        try {
            String update = "UPDATE archivo set nombre = ? WHERE id_info = ? AND id=?";
            stmt = con.prepareStatement(update);
            stmt.setString(1, dto.getNombre());
            stmt.setInt(2, dto.getId_info());
            stmt.setInt(3, dto.getId());
            int total = stmt.executeUpdate();
            if (total > 0) {
                exito = true;
            }
            stmt.close();

        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            try {
                con.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return exito;
    }
    
    
    //ACTUALIZAR
    public boolean actualizarDinamico(info_vaieDTO dto) throws Exception {
        boolean exito = false;
        con = conexion.generarConexion();
        PreparedStatement stmt;
        try {
            String update = "UPDATE info_vaie set descripcion = ?, archivo = ? WHERE id_menu = ?";
            stmt = con.prepareStatement(update);
            stmt.setString(1, dto.getDescripcion());
            stmt.setString(2, dto.getArchivo());
            stmt.setInt(3, dto.getMenu().getId());
            int total = stmt.executeUpdate();
            if (total > 0) {
                exito = true;
            }
            stmt.close();

        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            try {
                con.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return exito;
    }

    //CONSULTAR
    
    public int buscarIdInfo(int id_menu) throws Exception{
        int r=0;
        con = conexion.generarConexion();
        PreparedStatement stmt = con.prepareStatement("SELECT id FROM info_vaie WHERE id_menu = ?");
        stmt.setInt(1, id_menu);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            r=rs.getInt(1);
        }
        con.close();
        return r;
    }
    
    public archivoDTO buscarTipoA(archivoDTO dto) throws Exception {
        con = conexion.generarConexion();
        PreparedStatement stmt = con.prepareStatement("SELECT id FROM tipo_archivo WHERE ext = ?");
        stmt.setString(1, dto.getId_tipoA().getExt());
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            dto.getId_tipoA().setId(rs.getInt(1));
        }
        con.close();
        return dto;
    }

    public ArrayList<menuDTO> consultarMenu() throws Exception {
        ArrayList<menuDTO> list = new ArrayList<>();
        con = conexion.generarConexion();
        PreparedStatement stmt = con.prepareStatement("SELECT id, nombre, url, "
                + "id_menu, tiene_submenu, redirigir from menu");
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            menuDTO rel = new menuDTO();
            rel.setId(rs.getInt(1));
            rel.setNombre(rs.getString(2));
            rel.setUrl(rs.getString(3));
            rel.setId_menu(rs.getInt(4));
            rel.setTiene_submenu(rs.getInt(5));
            rel.setRedirigir(rs.getString(6));
            list.add(rel);
        }
        return list;
    }

    public ArrayList<menuDTO> consultarSubmenu(menuDTO dto) throws Exception {
        ArrayList<menuDTO> list = new ArrayList<>();
        con = conexion.generarConexion();
        PreparedStatement stmt = con.prepareStatement("SELECT id, nombre, url "
                + "FROM menu WHERE id_menu = ?");
        stmt.setInt(1, dto.getId());
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            menuDTO rel = new menuDTO();
            rel.setId(rs.getInt(1));
            rel.setNombre(rs.getString(2));
            rel.setUrl(rs.getString(3));
            list.add(rel);
        }
        return list;
    }

    public int buscarTipoArchivo(String i) throws Exception {
        int x = 0;
        con = conexion.generarConexion();
        PreparedStatement stmt = con.prepareStatement("SELECT id FROM tipo_archivo WHERE ext=?");
        stmt.setString(1, i);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            x = (rs.getInt(1));
        }
        return x;
    }

    public info_vaieDTO consultarInfoVaie2(int id) throws Exception {
        info_vaieDTO dto = null;
        con = conexion.generarConexion();
        PreparedStatement stmt = con.prepareStatement("SELECT descripcion, "
                + "id,archivo FROM info_vaie WHERE id_menu= ?");
        stmt.setInt(1, id);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            dto = new info_vaieDTO();
            dto.setDescripcion(rs.getString(1));
            dto.setId(rs.getInt(2));
            dto.setArchivo(rs.getString(3));
        }
        dto.setArchivos(this.consultarArchivosInfo(dto.getId()));
        dto.setCantA(dto.getArchivos().size());
        dto.getMenu().setId(id);
        dto.getMenu().setRedirigir(this.consultarRedirigirMenu(dto.getMenu().getId()));
        return dto;
    }

    public info_vaieDTO consultarInfoVaie(int id) throws Exception {
        info_vaieDTO dto = null;
        con = conexion.generarConexion();
        PreparedStatement stmt = con.prepareStatement("SELECT descripcion, "
                + "id,archivo FROM info_vaie WHERE id_menu= ?");
        stmt.setInt(1, id);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            dto = new info_vaieDTO();
            dto.setDescripcion(rs.getString(1));
            dto.setId(rs.getInt(2));
            dto.setArchivo(rs.getString(3));
        }
        return dto;
    }

    public ArrayList<archivoDTO> consultarArchivosInfo(int id) throws Exception {
        ArrayList<archivoDTO> list = new ArrayList<>();
        archivoDTO aDto = null;
        con = conexion.generarConexion();
        PreparedStatement stmt = con.prepareStatement("SELECT nombre, id FROM archivo WHERE id_info = ?");
        stmt.setInt(1, id);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            aDto = new archivoDTO();
            aDto.setId_info(id);
            aDto.setNombre(rs.getString(1));
            aDto.setId(rs.getInt(2));
            list.add(aDto);
        }
        con.close();
        return list;
    }
    
    public String consultarRedirigirMenu(int id) throws Exception {
        String r="";
        con = conexion.generarConexion();
        PreparedStatement stmt = con.prepareStatement("SELECT redirigir FROM menu WHERE id = ?");
        stmt.setInt(1, id);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            r=rs.getString(1);
        }
        con.close();
        return r;
    }

    //ELIMINAR
    public boolean eliminarMenu(menuDTO dto) throws Exception {
        boolean exito = false;
        this.eliminarSubmenu(dto);
        this.eliminarInfoVaieMenu(dto);
        con = conexion.generarConexion();
        PreparedStatement stmt;
        try {
            String delete = "DELETE FROM menu WHERE id = ?";
            stmt = con.prepareStatement(delete);
            stmt.setInt(1, dto.getId());
            int total = stmt.executeUpdate();
            if (total > 0) {
                exito = true;
            }
            stmt.close();

        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            try {
                con.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return exito;
    }

    public boolean eliminarSubmenu(menuDTO dto) throws Exception {
        boolean exito = false;
        this.eliminarInfoVaieSubmenu(dto);
        con = conexion.generarConexion();
        PreparedStatement stmt;
        try {
            String delete = "DELETE FROM menu WHERE id_menu = ?";
            stmt = con.prepareStatement(delete);
            stmt.setInt(1, dto.getId());
            int total = stmt.executeUpdate();
            if (total > 0) {
                exito = true;
            }
            stmt.close();

        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            try {
                con.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return exito;
    }

    public boolean eliminarInfoVaieSubmenu(menuDTO dto) throws Exception {
        ArrayList<menuDTO> submenus = this.consultarSubmenu(dto);
        boolean exito = false;
        for (int i = 0; i < submenus.size(); i++) {
            this.eliminarArchivos(submenus.get(i).getId());
            con = conexion.generarConexion();
            PreparedStatement stmt;
            try {
                String delete = "DELETE FROM info_vaie WHERE id_menu = ?";
                stmt = con.prepareStatement(delete);
                stmt.setInt(1, submenus.get(i).getId());
                int total = stmt.executeUpdate();
                if (total > 0) {
                    exito = true;
                }
                stmt.close();

            } catch (Exception e) {
                e.printStackTrace();

            } finally {
                try {
                    con.close();
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        }
        return exito;
    }

    public boolean eliminarInfoVaieMenu(menuDTO dto) throws Exception {
        boolean exito = false;
        this.eliminarArchivos(dto.getId());
        con = conexion.generarConexion();
        PreparedStatement stmt;
        try {
            String delete = "DELETE FROM info_vaie WHERE id_menu = ?";
            stmt = con.prepareStatement(delete);
            stmt.setInt(1, dto.getId());
            int total = stmt.executeUpdate();
            if (total > 0) {
                exito = true;
            }
            stmt.close();

        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            try {
                con.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return exito;
    }

    public boolean eliminarArchivoById(archivoDTO[] archivos) throws Exception {
        boolean exito = false;
        for (int i = 0; i < archivos.length; i++) {
            archivoDTO archivo = archivos[i];
            con = conexion.generarConexion();
            PreparedStatement stmt;
            try {
                String delete = "DELETE FROM archivo WHERE id = ?";
                stmt = con.prepareStatement(delete);
                stmt.setInt(1, archivo.getId());
                int total = stmt.executeUpdate();
                if (total > 0) {
                    exito = true;
                }
                stmt.close();

            } catch (Exception e) {
                e.printStackTrace();

            } finally {
                try {
                    con.close();
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        }

        return exito;
    }

    public boolean eliminarArchivos(int id) throws Exception {
        info_vaieDTO infoDto = this.consultarInfoVaie(id);
        boolean exito = false;
        con = conexion.generarConexion();
        PreparedStatement stmt;
        try {
            String delete = "DELETE FROM archivo WHERE id_info = ?";
            stmt = con.prepareStatement(delete);
            stmt.setInt(1, infoDto.getId());
            int total = stmt.executeUpdate();
            if (total > 0) {
                exito = true;
            }
            stmt.close();

        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            try {
                con.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return exito;
    }
}
