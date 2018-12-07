/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.ufps.sitioadministrable.model.DTO;

import java.io.Serializable;
import java.util.ArrayList;

/**
 *
 * @author Eliza
 */
public class info_vaieDTO implements Serializable{
    
    private int id, cantA;
    private String nombre, descripcion, archivo;
    private menuDTO menu;
    private ArrayList<archivoDTO> archivos;

    public info_vaieDTO() {
        menu = new menuDTO();
        archivos = new ArrayList<>();
    }

    public ArrayList<archivoDTO> getArchivos() {
        return archivos;
    }

    public void setArchivos(ArrayList<archivoDTO> archivos) {
        this.archivos = archivos;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getArchivo() {
        return archivo;
    }

    public void setArchivo(String archivo) {
        this.archivo = archivo;
    }

    public menuDTO getMenu() {
        return menu;
    }

    public void setMenu(menuDTO menu) {
        this.menu = menu;
    }

    public int getCantA() {
        return cantA;
    }

    public void setCantA(int cantA) {
        this.cantA = cantA;
    }
    
    
    
    
}
