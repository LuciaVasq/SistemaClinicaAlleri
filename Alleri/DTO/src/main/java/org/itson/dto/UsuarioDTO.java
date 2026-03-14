/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.itson.dto;

/**
 *
 * @author erika
 */
public class UsuarioDTO {
    public int id;
    public String usuario; 

    public UsuarioDTO() {
    }

    public UsuarioDTO(int id, String usuario) {
        this.id = id;
        this.usuario = usuario;
    }

   

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
}
