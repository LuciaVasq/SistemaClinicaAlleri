/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.itson.dto;

import java.math.BigDecimal;
import java.util.List;

/**
 *
 * @author erika
 */
public class AdeudoDTO {
    public Integer id;
    public BigDecimal total;
    public List<CitaDTO> citas;

    public AdeudoDTO(Integer id, BigDecimal total, List<CitaDTO> citas) {
        this.id = id;
        this.total = total;
        this.citas = citas;
    }

    public AdeudoDTO() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public List<CitaDTO> getCitas() {
        return citas;
    }

    public void setCitas(List<CitaDTO> citas) {
        this.citas = citas;
    }
    
    
}
