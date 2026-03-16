/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.itson.dto;

import Enumeradores.MetodoPagoDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 *
 * @author erika
 */
public class PagoDTO {
    public Integer id; 
    public LocalDateTime fechaHora;
    public BigDecimal total;
    public String concepto;
    public MetodoPagoDTO metodoPago;
    @JsonIgnore
    public List<CitaDTO> citas;
    public PsicologoDTO psicologo;

    public PagoDTO() {
    }

    public PagoDTO(Integer id, LocalDateTime fechaHora, BigDecimal total, String concepto, MetodoPagoDTO metodoPago, List<CitaDTO> citas, PsicologoDTO psicologo) {
        this.id = id;
        this.fechaHora = fechaHora;
        this.total = total;
        this.concepto = concepto;
        this.metodoPago = metodoPago;
        this.citas = citas;
        this.psicologo = psicologo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(LocalDateTime fechHora) {
        this.fechaHora = fechHora;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
 
    public String getConcepto() {
        return concepto;
    }

    public void setConcepto(String concepto) {
        this.concepto = concepto;
    }

    public MetodoPagoDTO getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(MetodoPagoDTO metodoPago) {
        this.metodoPago = metodoPago;
    }

    public List<CitaDTO> getCitas() {
        return citas;
    }

    public void setCitas(List<CitaDTO> citas) {
        this.citas = citas;
    }

    public PsicologoDTO getPsicologo() {
        return psicologo;
    }

    public void setPsicologo(PsicologoDTO psicologo) {
        this.psicologo = psicologo;
    }
    
    
    
    
}
