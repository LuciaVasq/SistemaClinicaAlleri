/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.itson.dominio.entidades;

import jakarta.persistence.*;

/**
 *
 * @author Maryr
 */
@Entity
@DiscriminatorValue("ADMINISTRADOR")
public class Administrador extends Usuario {

}
