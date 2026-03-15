/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.itson.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 *
 * @author erika
 */
public class CitaDTO {
    public int id; 
    public CubiculoDTO cubiculo; 
    public PacienteDTO paciente; 
    public PsicologoDTO psicologo; 
    public LocalDateTime fechaHoraInicio;
    public LocalDateTime fechaHoraFin;
    public BigDecimal precio;
    public UsuarioDTO recepcionista; 
    public PagoDTO pago; 
    public AdeudoDTO adeudo;

    public CitaDTO(int id, CubiculoDTO cubiculo, PacienteDTO paciente, PsicologoDTO psicologo, LocalDateTime fechaHoraInicio, LocalDateTime fechaHoraFin, BigDecimal precio, UsuarioDTO recepcionista, PagoDTO pago, AdeudoDTO adeudo) {
        this.id = id;
        this.cubiculo = cubiculo;
        this.paciente = paciente;
        this.psicologo = psicologo;
        this.fechaHoraInicio = fechaHoraInicio;
        this.fechaHoraFin = fechaHoraFin;
        this.precio = precio;
        this.recepcionista = recepcionista;
        this.pago = pago;
        this.adeudo = adeudo;
    }

    public CitaDTO() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public CubiculoDTO getCubiculo() {
        return cubiculo;
    }

    public void setCubiculo(CubiculoDTO cubiculo) {
        this.cubiculo = cubiculo;
    }

    public PacienteDTO getPaciente() {
        return paciente;
    }

    public void setPaciente(PacienteDTO paciente) {
        this.paciente = paciente;
    }

    public PsicologoDTO getPsicologo() {
        return psicologo;
    }

    public void setPsicologo(PsicologoDTO psicologo) {
        this.psicologo = psicologo;
    }

    public LocalDateTime getFechaHoraInicio() {
        return fechaHoraInicio;
    }

    public void setFechaHoraInicio(LocalDateTime fechaHoraInicio) {
        this.fechaHoraInicio = fechaHoraInicio;
    }

    public LocalDateTime getFechaHoraFin() {
        return fechaHoraFin;
    }

    public void setFechaHoraFin(LocalDateTime fechaHoraFin) {
        this.fechaHoraFin = fechaHoraFin;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public UsuarioDTO getRecepcionista() {
        return recepcionista;
    }

    public void setRecepcionista(UsuarioDTO recepcionista) {
        this.recepcionista = recepcionista;
    }

    public PagoDTO getPago() {
        return pago;
    }

    public void setPago(PagoDTO pago) {
        this.pago = pago;
    }

    public AdeudoDTO getAdeudo() {
        return adeudo;
    }

    public void setAdeudo(AdeudoDTO adeudo) {
        this.adeudo = adeudo;
    }
}
