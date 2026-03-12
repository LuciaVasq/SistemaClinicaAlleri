/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.itson.dominio.entidades;

import jakarta.persistence.*;
import java.util.List;

/**
 *
 * @author Maryr
 */
@Entity
@DiscriminatorValue("RECEPCIONISTA")
public class Recepcionista extends Usuario {

    @OneToMany(mappedBy = "recepcionista")
    private List<Cita> citas;

    public List<Cita> getCitas() {
        return citas;
    }

    public void setCitas(List<Cita> citas) {
        this.citas = citas;
    }

}
