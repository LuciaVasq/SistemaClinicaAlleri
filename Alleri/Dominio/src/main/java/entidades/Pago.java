/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package entidades;

import enumeradores.MetodoPago;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 *
 * @author Maryr
 */
@Entity
@Table(name = "pago")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime fechaHora;
    private BigDecimal total;
    private String concepto;

    @Enumerated(EnumType.STRING)
    private MetodoPago metodoPago;

    @ManyToOne
    @JoinColumn(name = "adeudo_id", nullable = false)
    private Adeudo adeudo;

    @ManyToOne
    @JoinColumn(name = "psicologo_id", nullable = false)
    private Psicologo psicologo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
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

    public MetodoPago getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(MetodoPago metodoPago) {
        this.metodoPago = metodoPago;
    }

    public Adeudo getAdeudo() {
        return adeudo;
    }

    public void setAdeudo(Adeudo adeudo) {
        this.adeudo = adeudo;
    }

    public Psicologo getPsicologo() {
        return psicologo;
    }

    public void setPsicologo(Psicologo psicologo) {
        this.psicologo = psicologo;
    }
    
    
}
