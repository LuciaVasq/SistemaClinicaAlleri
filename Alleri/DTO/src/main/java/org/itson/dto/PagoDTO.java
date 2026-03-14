/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.itson.dto;

import Enumeradores.MetodoPagoDTO;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 *
 * @author erika
 */
public class PagoDTO {
    public int id; 
    public LocalDateTime fehcaHora;
    public BigDecimal total;
    public String concepto;
    public MetodoPagoDTO metodoPago;
    public List<CitaDTO> citas;

    public PagoDTO() {
    }

    public PagoDTO(int id, LocalDateTime fehcaHora, BigDecimal total, String concepto, MetodoPagoDTO metodoPago, List<CitaDTO> citas) {
        this.id = id;
        this.fehcaHora = fehcaHora;
        this.total = total;
        this.concepto = concepto;
        this.metodoPago = metodoPago;
        this.citas = citas;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getFehcaHora() {
        return fehcaHora;
    }

    public void setFehcaHora(LocalDateTime fehcaHora) {
        this.fehcaHora = fehcaHora;
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
    
    
    
    
}
