/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.itson.dto;

import Enumeradores.EstadoDTO;

/**
 *
 * @author erika
 */
public class PsicologoDTO {
    public int id;
    public String apellidoPaterno;
    public String apellidoMaterno;
    public String nombres;
    public String correo;
    public String telefono;
    public EstadoDTO estado;
    public AdeudoDTO adeudo;

    public PsicologoDTO() {
    }

    public PsicologoDTO(int id, String apellidoPaterno, String apellidoMaterno, String nombres, String correo, String telefono, EstadoDTO estado, AdeudoDTO adeudo) {
        this.id = id;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.nombres = nombres;
        this.correo = correo;
        this.telefono = telefono;
        this.estado = estado;
        this.adeudo = adeudo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public EstadoDTO getEstado() {
        return estado;
    }

    public void setEstado(EstadoDTO estado) {
        this.estado = estado;
    }

    public AdeudoDTO getAdeudo() {
        return adeudo;
    }

    public void setAdeudo(AdeudoDTO adeudo) {
        this.adeudo = adeudo;
    }
    
    
}
